package cutchin_cash;

import java.util.List;
import com.github.javafaker.Faker;
import cutchin_cash.models.auth.LoginRequest;
import cutchin_cash.models.auth.RegisterRequest;
import cutchin_cash.models.auth.RegisterResponse;
import cutchin_cash.models.auth.AuthServiceGrpc.AuthServiceBlockingStub;
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
import cutchin_cash.models.transaction.TransactionServiceGrpc.TransactionServiceBlockingStub;
import cutchin_cash.models.user.AddFundsRequest;
import cutchin_cash.models.user.GetUserRequest;
import cutchin_cash.models.user.UserServiceGrpc.UserServiceBlockingStub;
import cutchin_cash.storage.MoneyModel;
import io.grpc.Metadata;
import io.grpc.stub.MetadataUtils;

public class Client {
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

        DecisionPaymentResponse response =
                transactionService.decisionPayment(decisionPaymentRequest);

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
                transactionService
                        .withInterceptors(MetadataUtils.newAttachHeadersInterceptor(metadata));
        this.authService =
                authService.withInterceptors(MetadataUtils.newAttachHeadersInterceptor(metadata));
    }
}


