package cutchin_cash.grpc_services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import cutchin_cash.models.common.Money;
import cutchin_cash.models.common.User;
import cutchin_cash.models.user.GetUserRequest;
import cutchin_cash.models.user.GetUserResponse;
import cutchin_cash.models.user.UserServiceGrpc.UserServiceImplBase;
import cutchin_cash.services.UserService;
import cutchin_cash.utils.Sender;
import io.grpc.stub.StreamObserver;

public class GrpcUserService extends UserServiceImplBase {
        private final Logger log = LoggerFactory.getLogger(GrpcUserService.class);
        private final UserService userService;

        public GrpcUserService(UserService userService) {
                this.userService = userService;
        }

        @Override
        public void getUser(GetUserRequest request,
                        StreamObserver<GetUserResponse> responseObserver) {
                Sender<GetUserResponse> sender = new Sender<>(responseObserver);

                sender.response(GetUserResponse.newBuilder().setUser(User
                                .newBuilder()
                                .setFullName("John Doe")
                                .setBalance(Money.newBuilder().setWhole(100)
                                                .setFraction(0).build())
                                .setDisplayName("john-doe-69")
                                .setEmail("johndoe69@gmail.com")
                                .build()).build());
        }
}
