package cutchin_cash.storage;

import java.util.UUID;
import cutchin_cash.models.common.PrivateUser;
import cutchin_cash.models.common.User;
import cutchin_cash.services.AuthService;
import cutchin_cash.services.PasswordsService;

public class UserModel extends BaseModel {
    public final static int STARTING_BALANCE = 10;
    public final String userId;
    public final String displayname;
    public final String fullName;
    public final String email;
    public final MoneyModel balance;
    public final String password;
    public final String salt;

    private UserModel(
            String userId,
            String displayname,
            String fullName,
            String email,
            MoneyModel balance,
            String password,
            String salt) {
        this.userId = userId;
        this.displayname = displayname;
        this.fullName = fullName;
        this.email = email;
        this.balance = balance;
        this.password = password;
        this.salt = salt;
    }

    public static UserModel fromJson(String json) {
        return gson.fromJson(json, UserModel.class);
    }

    public static UserModel fromNew(
            String displayname,
            String fullName,
            String email,
            String password) {
        String userId = UUID.randomUUID().toString();
        MoneyModel balance = MoneyModel.fromNew(STARTING_BALANCE, 0);
        String salt = UUID.randomUUID().toString();
        String hashedPassword = PasswordsService.hashWithSalt(password, salt);

        return new UserModel(
                userId,
                displayname,
                fullName,
                email,
                balance,
                hashedPassword,
                salt);
    }

    public static UserModel fromUpdateBalance(UserModel model, MoneyModel balance) {
        return new UserModel(
                model.userId,
                model.displayname,
                model.fullName,
                model.email,
                balance,
                model.password,
                model.salt);
    }


    public static String toJson(UserModel model) {
        return gson.toJson(model);
    }

    public static User toUser(UserModel model) {
        return User.newBuilder()
                .setUserId(model.userId)
                .setDisplayName(model.displayname)
                .setFullName(model.fullName)
                .setEmail(model.email)
                .setBalance(MoneyModel.toMoney(model.balance))
                .build();
    }

    public static PrivateUser toPrivateUser(UserModel user) {
        return PrivateUser.newBuilder()
                .setUserId(user.userId)
                .setFullName(user.fullName)
                .build();
    }
}
