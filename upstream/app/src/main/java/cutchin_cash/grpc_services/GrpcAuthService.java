package cutchin_cash.grpc_services;

import cutchin_cash.models.auth.AuthServiceGrpc.AuthServiceImplBase;

import com.auth0.jwt.exceptions.TokenExpiredException;

import cutchin_cash.models.auth.LoginRequest;
import cutchin_cash.models.auth.RegisterRequest;
import cutchin_cash.models.auth.RegisterResponse;
import cutchin_cash.models.common.Token;
import cutchin_cash.models.common.User;
import cutchin_cash.services.AuthService;
import cutchin_cash.services.UserService;
import cutchin_cash.utils.Const;
import cutchin_cash.utils.Sender;
import io.grpc.Status;
import io.grpc.stub.StreamObserver;


public class GrpcAuthService extends AuthServiceImplBase {
    private final AuthService authService;
    private final UserService userService;

    public GrpcAuthService(AuthService authService, UserService userService) {
        this.authService = authService;
        this.userService = userService;
    }

    @Override
    public void login(LoginRequest request,
            StreamObserver<Token> responseObserver) {
        Sender<Token> sender = new Sender<Token>(responseObserver);

        String userId = userService.getUserId(request.getEmail());
        if (userId == null)
            sender.error(Status.NOT_FOUND);

        Token token = Token.newBuilder()
                .setToken(authService.createToken(userId)).build();

        sender.response(token);
    }

    @Override
    public void register(RegisterRequest request,
            StreamObserver<RegisterResponse> responseObserver) {
        Sender<RegisterResponse> sender = new Sender<>(responseObserver);
        String userId = userService.getUserId(request.getEmail());
        if (userId != null) {
            sender.error(Status.ALREADY_EXISTS);
            return;
        }

        User user = userService.createUser(request.getFullName(),
                request.getDisplayName(),
                request.getEmail(), request.getPassword());

        Token token =
                Token.newBuilder()
                        .setToken(authService.createToken(user.getUserId()))
                        .build();

        RegisterResponse response =
                RegisterResponse.newBuilder().setUser(user).setToken(token)
                        .build();

        sender.response(response);
    }

    @Override
    public void refresh(Token request,
            StreamObserver<Token> responseObserver) {
        Sender<Token> sender = new Sender<>(responseObserver);

        try {
            authService.decodeToken(request.getToken());
        } catch (TokenExpiredException e) {
            String userId = Const.Auth.SUB_CTX_KEY.get();
            String token = authService.createToken(userId);
            sender.response(Token.newBuilder().setToken(token).build());
        } catch (Exception e) {
            sender.error(Status.INVALID_ARGUMENT);
            return;
        }

    }
}
