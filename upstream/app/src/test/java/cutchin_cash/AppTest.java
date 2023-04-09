package cutchin_cash;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import cutchin_cash.configs.Settings;
import cutchin_cash.models.auth.AuthServiceGrpc;
import cutchin_cash.models.auth.AuthServiceGrpc.AuthServiceBlockingStub;
import cutchin_cash.models.auth.LoginRequest;
import cutchin_cash.models.auth.RegisterRequest;
import cutchin_cash.models.auth.RegisterResponse;
import cutchin_cash.models.common.Money;
import cutchin_cash.models.common.Token;
import cutchin_cash.models.common.Transaction;
import cutchin_cash.models.common.TransactionStatus;
import cutchin_cash.models.common.User;
import cutchin_cash.models.transaction.DecisionPaymentRequest;
import cutchin_cash.models.transaction.DecisionPaymentResponse;
import cutchin_cash.models.transaction.DemandPaymentRequest;
import cutchin_cash.models.transaction.DemandPaymentResponse;
import cutchin_cash.models.transaction.ListTransactionsRequest;
import cutchin_cash.models.transaction.SendPaymentRequest;
import cutchin_cash.models.transaction.SendPaymentResponse;
import cutchin_cash.models.transaction.TransactionServiceGrpc;
import cutchin_cash.models.transaction.TransactionServiceGrpc.TransactionServiceBlockingStub;
import cutchin_cash.models.user.AddFundsRequest;
import cutchin_cash.models.user.AddFundsResponse;
import cutchin_cash.models.user.GetUserRequest;
import cutchin_cash.models.user.UserServiceGrpc;
import cutchin_cash.models.user.UserServiceGrpc.UserServiceBlockingStub;
import cutchin_cash.storage.MoneyModel;
import cutchin_cash.storage.UserModel;
import io.grpc.Channel;
import io.grpc.ChannelCredentials;
import io.grpc.Grpc;
import io.grpc.Metadata;
import io.grpc.TlsChannelCredentials;
import io.grpc.stub.MetadataUtils;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import com.github.javafaker.Faker;
import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;
import redis.clients.jedis.exceptions.JedisConnectionException;

class Client {
  public final static Faker faker = new Faker();
  public UserServiceBlockingStub userService;
  public AuthServiceBlockingStub authService;
  public TransactionServiceBlockingStub transactionService;

  public String token;
  public User user;

  public String displayName = faker.name().username();
  public String fullName = faker.name().fullName();
  public String email = faker.internet().emailAddress();
  public String password = faker.internet().password();
  public String userId;


  public Client(
      UserServiceBlockingStub userService,
      AuthServiceBlockingStub authService,
      TransactionServiceBlockingStub transactionService) {
    this.userService = userService;
    this.authService = authService;
    this.transactionService = transactionService;
  }

  public void registerUser() {
    RegisterRequest registerRequest = RegisterRequest.newBuilder()
        .setDisplayName(displayName)
        .setFullName(fullName)
        .setEmail(email)
        .setPassword(password)
        .build();

    RegisterResponse registerResponse = authService.register(registerRequest);

    token = registerResponse.getToken().getToken();
    user = registerResponse.getUser();
    userId = user.getUserId();
  }

  public void loginUser() {
    LoginRequest loginRequest = LoginRequest.newBuilder()
        .setEmail(email)
        .setPassword(password)
        .build();

    Token token = authService.login(loginRequest);

    this.token = token.getToken();
  }

  public void addFunds(MoneyModel money) {
    AddFundsRequest addFundsRequest = AddFundsRequest.newBuilder()
        .setAmount(MoneyModel.toMoney(money))
        .build();

    userService.addFunds(addFundsRequest);

    refreshUser();
  }

  public void refreshUser() {
    GetUserRequest getUserRequest = GetUserRequest.newBuilder()
        .setUserId(userId)
        .build();

    user = userService.getUser(getUserRequest).getUser();
  }

  public List<Transaction> listTransactions() {
    ListTransactionsRequest listTransactionsRequest = ListTransactionsRequest.newBuilder()
        .setUserId(userId)
        .build();

    return transactionService.listTransactions(listTransactionsRequest).getTransactionsList();
  }

  public DecisionPaymentResponse decisionPayment(String transactionId, boolean approve) {
    DecisionPaymentRequest decisionPaymentRequest = DecisionPaymentRequest.newBuilder()
        .setTransactionId(transactionId)
        .setStatus(approve ? TransactionStatus.ACCEPTED : TransactionStatus.REJECTED)
        .build();

    DecisionPaymentResponse response = transactionService.decisionPayment(decisionPaymentRequest);

    refreshUser();

    return response;
  }

  public DemandPaymentResponse demandPayment(String payingUserId, MoneyModel amount) {
    DemandPaymentRequest demandPaymentRequest = DemandPaymentRequest.newBuilder()
        .setPayingUserId(payingUserId)
        .setAmount(MoneyModel.toMoney(amount))
        .build();

    DemandPaymentResponse response = transactionService.demandPayment(demandPaymentRequest);

    refreshUser();

    return response;
  }

  public static Money randomMoney() {
    return Money.newBuilder()
        .setWhole(faker.number().numberBetween(0, 100))
        .setFraction(faker.number().numberBetween(0, 99))
        .build();
  }

  public static MoneyModel randomMoneyModel() {
    return MoneyModel.fromMoney(randomMoney());
  }

  public void authenticateStubs() {
    Metadata metadata = new Metadata();
    metadata.put(Metadata.Key.of("Authorization", Metadata.ASCII_STRING_MARSHALLER),
        "Bearer " + token);
    this.userService =
        userService.withInterceptors(MetadataUtils.newAttachHeadersInterceptor(metadata));
    this.transactionService =
        transactionService.withInterceptors(MetadataUtils.newAttachHeadersInterceptor(metadata));
    this.authService =
        authService.withInterceptors(MetadataUtils.newAttachHeadersInterceptor(metadata));
  }
}


@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class AppTest {
  private Settings settings = Settings.parse();
  private Jedis jedis = new Jedis(settings.REDIS_HOST, settings.REDIS_PORT);
  private String dialAddr = "localhost:" + settings.PORT;

  private UserServiceBlockingStub userService;
  private AuthServiceBlockingStub authService;
  private TransactionServiceBlockingStub transactionService;

  private Client drew;
  private Client matthew;

  private final org.slf4j.Logger log = org.slf4j.LoggerFactory.getLogger(AppTest.class);

  @BeforeAll
  public void setup() throws IOException {
    Settings settings = Settings.parse();
    Jedis jedis = new JedisPool(settings.REDIS_HOST, settings.REDIS_PORT).getResource();
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
