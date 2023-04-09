package cutchin_cash.grpc_services;

import java.util.Set;
import java.util.stream.Collectors;
import cutchin_cash.models.common.Empty;
import cutchin_cash.models.common.PrivateUser;
import cutchin_cash.models.common.User;
import cutchin_cash.models.user.AddFundsRequest;
import cutchin_cash.models.user.AddFundsResponse;
import cutchin_cash.models.user.GetAllUsersResponse;
import cutchin_cash.models.user.GetUserRequest;
import cutchin_cash.models.user.GetUserResponse;
import cutchin_cash.models.user.UserServiceGrpc.UserServiceImplBase;
import cutchin_cash.services.UserService;
import cutchin_cash.storage.MoneyModel;
import cutchin_cash.storage.UserModel;
import cutchin_cash.utils.Const;
import cutchin_cash.utils.Sender;
import io.grpc.Status;
import io.grpc.stub.StreamObserver;

public class GrpcUserService extends UserServiceImplBase {
    private final UserService userService;

    public GrpcUserService(UserService userService) {
        this.userService = userService;
    }

    @Override
    public void getUser(
            GetUserRequest request,
            StreamObserver<GetUserResponse> responseObserver) {
        Sender<GetUserResponse> sender = new Sender<>(responseObserver);


        UserModel user = userService.getUser(request.getUserId());
        if (user == null) {
            sender.error(Status.NOT_FOUND);
            return;
        }

        String currentUser = Const.Auth.SUB_CTX_KEY.get();
        if (currentUser == null) {
            sender.error(Status.UNAUTHENTICATED);
            return;
        }

        sender.response(GetUserResponse.newBuilder()
                .setUser(!currentUser.equals(user.userId)
                        ? User.newBuilder()
                                .setFullName(user.fullName)
                                .setDisplayName(user.displayname)
                                .setUserId(user.userId)
                                .build()
                        : UserModel.toUser(user))
                .build());
    }

    @Override
    public void getAllUsers(
            Empty request,
            StreamObserver<GetAllUsersResponse> responseObserver) {
        Sender<cutchin_cash.models.user.GetAllUsersResponse> sender =
                new Sender<>(responseObserver);
        Set<PrivateUser> users = userService.getAllUsers()
                .stream()
                .map(UserModel::toPrivateUser)
                .collect(Collectors.toSet());

        sender.response(GetAllUsersResponse.newBuilder()
                .addAllUsers(users)
                .build());
    }

    @Override
    public void addFunds(
            AddFundsRequest request,
            StreamObserver<AddFundsResponse> responseObserver) {
        Sender<AddFundsResponse> sender = new Sender<>(responseObserver);

        String userId = Const.Auth.SUB_CTX_KEY.get();
        if (userId == null) {
            sender.error(Status.UNAUTHENTICATED);
            return;
        }

        UserModel updated = userService.addFunds(
                userId,
                MoneyModel.fromMoney(request.getAmount()));

        sender.response(AddFundsResponse.newBuilder()
                .setUser(UserModel.toUser(updated))
                .build());
    }
}
