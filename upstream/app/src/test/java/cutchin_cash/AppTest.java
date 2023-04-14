package cutchin_cash;

import static org.junit.jupiter.api.Assertions.assertEquals;
import cutchin_cash.configs.Settings;
import cutchin_cash.models.auth.AuthServiceGrpc;
import cutchin_cash.models.auth.AuthServiceGrpc.AuthServiceBlockingStub;
import cutchin_cash.models.common.Money;
import cutchin_cash.models.common.Transaction;
import cutchin_cash.models.common.TransactionStatus;
import cutchin_cash.models.transaction.DecisionPaymentResponse;
import cutchin_cash.models.transaction.DemandPaymentResponse;
import cutchin_cash.models.transaction.ListTransactionsRequest;
import cutchin_cash.models.transaction.SendPaymentRequest;
import cutchin_cash.models.transaction.SendPaymentResponse;
import cutchin_cash.models.transaction.TransactionServiceGrpc;
import cutchin_cash.models.transaction.TransactionServiceGrpc.TransactionServiceBlockingStub;
import cutchin_cash.models.user.UserServiceGrpc;
import cutchin_cash.models.user.UserServiceGrpc.UserServiceBlockingStub;
import cutchin_cash.storage.MoneyModel;
import cutchin_cash.storage.UserModel;
import io.grpc.Channel;
import io.grpc.ChannelCredentials;
import io.grpc.Grpc;
import io.grpc.TlsChannelCredentials;
import java.io.IOException;
import java.util.List;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;
import redis.clients.jedis.exceptions.JedisConnectionException;

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class AppTest {
  private Settings settings = Settings.parse();
  private Jedis jedis = new JedisPool(settings.REDIS_HOST, 6379).getResource();
  private String dialAddr = String.format("localhost:%d", settings.PORT);

  private UserServiceBlockingStub userService;
  private AuthServiceBlockingStub authService;
  private TransactionServiceBlockingStub transactionService;

  private Client drew;
  private Client matthew;

  private final Logger log = LoggerFactory.getLogger(AppTest.class);

  public AppTest() throws IOException {}

  @BeforeAll
  public void setup() throws IOException {
    new Thread(() -> {
      try {
        CutchinCashServer server = new CutchinCashServer(settings.PORT, jedis, settings.CERT_CHAIN,
            settings.PRIVATE_KEY, settings.HS256_KEY);
        server.start();
        server.blockUntilShutdown();
      } catch (IOException e) {
        e.printStackTrace();
      } catch (InterruptedException e) {
        e.printStackTrace();
      } catch (JedisConnectionException e) {
        System.out.println(
            "Failed to connect to Redis, try running `gradle startRedis`");
      }
    }).start();

    ChannelCredentials creds = TlsChannelCredentials.newBuilder()
        .trustManager(settings.CERT_CHAIN)
        .build();

    Channel channel = Grpc.newChannelBuilder(dialAddr, creds).build();

    userService = UserServiceGrpc.newBlockingStub(channel);
    authService = AuthServiceGrpc.newBlockingStub(channel);
    transactionService = TransactionServiceGrpc.newBlockingStub(channel);
    System.out.println("Server started, running tests...");
  }

  @BeforeEach
  public void clearRedis() {
    jedis.flushAll();

    drew = new Client(userService, authService, transactionService);
    drew.registerUser();
    drew.authenticateStubs();

    matthew = new Client(userService, authService, transactionService);
    matthew.registerUser();
    matthew.authenticateStubs();
  }

  @AfterAll
  public void teardown() throws InterruptedException {
    jedis.close();
  }

  @Test
  public void registerUser() {
    assertEquals(drew.displayName, drew.user.getDisplayName());
    assertEquals(drew.fullName, drew.user.getFullName());
    assertEquals(drew.email, drew.user.getEmail());
    assertEquals(UserModel.STARTING_BALANCE, drew.user.getBalance().getWhole());
    assertEquals(0, drew.user.getBalance().getFraction());

    drew.authenticateStubs();
    List<Transaction> transactions = drew.transactionService
        .listTransactions(ListTransactionsRequest.newBuilder().setUserId(drew.userId).build())
        .getTransactionsList();
    assertEquals(transactions.size(), 0);
  }

  @Test
  public void login() {
    Client frank = new Client(userService, authService, transactionService);
    frank.registerUser();
    frank.loginUser();

    assertEquals(frank.displayName, frank.user.getDisplayName());
    assertEquals(frank.fullName, frank.user.getFullName());
    assertEquals(frank.email, frank.user.getEmail());
    assertEquals(UserModel.STARTING_BALANCE, frank.user.getBalance().getWhole());
    assertEquals(0, frank.user.getBalance().getFraction());
    assertEquals(frank.userId, frank.user.getUserId());
    assert (frank.token != null);

    frank.authenticateStubs();

    List<Transaction> transactions = frank.transactionService
        .listTransactions(ListTransactionsRequest.newBuilder().setUserId(frank.userId).build())
        .getTransactionsList();
    assertEquals(transactions.size(), 0);
  }

  @Test
  public void addFunds() {
    Money money = Client.randomMoney();
    Money oldBalance = drew.user.getBalance();
    drew.addFunds(MoneyModel.fromMoney(money));

    assertEquals(drew.user.getBalance().getWhole(), oldBalance.getWhole() + money.getWhole());
    assertEquals(drew.user.getBalance().getFraction(),
        oldBalance.getFraction() + money.getFraction());
  }

  @Test
  public void sendPayment() {
    Money money = Client.randomMoney();
    drew.addFunds(MoneyModel.fromMoney(money));

    Money oldBalance = drew.user.getBalance();
    Money oldMatthewBalance = matthew.user.getBalance();

    SendPaymentRequest sendPaymentRequest = SendPaymentRequest.newBuilder()
        .setAmount(money)
        .setReceivingUserId(matthew.userId)
        .build();

    SendPaymentResponse sendPaymentResponse =
        drew.transactionService.sendPayment(sendPaymentRequest);
    drew.refreshUser();
    matthew.refreshUser();
    Transaction transaction = sendPaymentResponse.getTransaction();

    assertEquals(transaction.getAmount().getWhole(), money.getWhole());
    assertEquals(transaction.getAmount().getFraction(), money.getFraction());

    assertEquals(drew.user.getBalance().getWhole(), oldBalance.getWhole() - money.getWhole());
    assertEquals(drew.user.getBalance().getFraction(),
        oldBalance.getFraction() - money.getFraction());

    assertEquals(matthew.user.getBalance().getWhole(),
        oldMatthewBalance.getWhole() + money.getWhole());
    assertEquals(matthew.user.getBalance().getFraction(),
        oldMatthewBalance.getFraction() + money.getFraction());

    List<Transaction> transactions = drew.transactionService
        .listTransactions(ListTransactionsRequest.newBuilder().setUserId(drew.userId).build())
        .getTransactionsList();

    assertEquals(1, transactions.size());
    assertEquals(transaction.getTransactionId(), transactions.get(0).getTransactionId());

    transactions = matthew.transactionService
        .listTransactions(ListTransactionsRequest.newBuilder().setUserId(matthew.userId).build())
        .getTransactionsList();

    assertEquals(1, transactions.size());
    assertEquals(transaction.getTransactionId(), transactions.get(0).getTransactionId());

    assertEquals(transaction.getPayingUserId(), drew.userId);
    assertEquals(transaction.getReceivingUserId(), matthew.userId);
  }

  @Test
  public void demandAndDecisionPayment() {
    Money money = Client.randomMoney();
    drew.addFunds(MoneyModel.fromMoney(money));

    Money oldDrewBalance = drew.user.getBalance();
    Money oldMatthewBalance = matthew.user.getBalance();

    DemandPaymentResponse demandPaymentResponse =
        matthew.demandPayment(drew.userId, MoneyModel.fromMoney(money));
    Transaction transaction = demandPaymentResponse.getTransaction();

    // transaction status should be pending
    assertEquals(transaction.getStatus(), TransactionStatus.PENDING);

    // transaction amount should equal the amount demanded
    assertEquals(transaction.getAmount().getWhole(), money.getWhole());
    assertEquals(transaction.getAmount().getFraction(), money.getFraction());

    // balances should not have changed
    assertEquals(drew.user.getBalance().getWhole(), oldDrewBalance.getWhole());
    assertEquals(drew.user.getBalance().getFraction(), oldDrewBalance.getFraction());
    assertEquals(matthew.user.getBalance().getWhole(), oldMatthewBalance.getWhole());
    assertEquals(matthew.user.getBalance().getFraction(), oldMatthewBalance.getFraction());

    // transaction should be in the list of pending transactions for both users
    for (Client client : new Client[] {drew, matthew}) {
      List<Transaction> transactions = client.transactionService
          .listTransactions(ListTransactionsRequest.newBuilder().setUserId(client.userId).build())
          .getTransactionsList();

      assertEquals(1, transactions.size());
      Transaction transInList = transactions.get(0);
      assertEquals(transaction.getTransactionId(), transInList.getTransactionId());
      assertEquals(TransactionStatus.PENDING, transInList.getStatus());
      assertEquals(matthew.userId, transInList.getReceivingUserId());
      assertEquals(drew.userId, transInList.getPayingUserId());
    }

    // accept the payment
    DecisionPaymentResponse response = drew.decisionPayment(transaction.getTransactionId(), true);
    Transaction decidedTransaction = response.getTransaction();

    // transaction status should be the same but accepted
    assertEquals(transaction.getTransactionId(), decidedTransaction.getTransactionId());
    assertEquals(TransactionStatus.ACCEPTED, decidedTransaction.getStatus());
    assertEquals(matthew.userId, decidedTransaction.getReceivingUserId());
    assertEquals(drew.userId, decidedTransaction.getPayingUserId());

    // balances should have changed
    drew.refreshUser();
    assertEquals(drew.user.getBalance().getWhole(), oldDrewBalance.getWhole() - money.getWhole());
    assertEquals(drew.user.getBalance().getFraction(),
        oldDrewBalance.getFraction() - money.getFraction());
    matthew.refreshUser();
    assertEquals(matthew.user.getBalance().getWhole(),
        oldMatthewBalance.getWhole() + money.getWhole());
    assertEquals(matthew.user.getBalance().getFraction(),
        oldMatthewBalance.getFraction() + money.getFraction());

    // transaction should be in the list of accepted transactions for both users
    for (Client client : new Client[] {drew, matthew}) {
      List<Transaction> transactions = client.transactionService
          .listTransactions(ListTransactionsRequest.newBuilder().setUserId(client.userId).build())
          .getTransactionsList();

      assertEquals(1, transactions.size());
      Transaction transInList = transactions.get(0);
      assertEquals(transaction.getTransactionId(), transInList.getTransactionId());
      assertEquals(TransactionStatus.ACCEPTED, transInList.getStatus());
      assertEquals(matthew.userId, transInList.getReceivingUserId());
      assertEquals(drew.userId, transInList.getPayingUserId());
    }
  }
}
