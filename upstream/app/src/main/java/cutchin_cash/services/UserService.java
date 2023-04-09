package cutchin_cash.services;

import java.util.Set;
import java.util.stream.Collectors;
import cutchin_cash.storage.MoneyModel;
import cutchin_cash.storage.UserModel;
import cutchin_cash.utils.Const;
import redis.clients.jedis.Jedis;

public class UserService {
    private final Jedis redisClient;

    public UserService(Jedis redisClient) {
        this.redisClient = redisClient;
    }

    public String getUserId(String email) {
        String userProfileFromEmailKey = Const.RedisKeys.userProfileFromEmail(email);
        return redisClient.get(userProfileFromEmailKey);
    }

    public UserModel getUser(String userId) {
        String userProfileKey = Const.RedisKeys.userProfile(userId);
        String userProfileJson = redisClient.get(userProfileKey);
        if (userProfileJson == null) {
            return null;
        }

        return UserModel.fromJson(userProfileJson);
    }

    public UserModel createUser(String fullName, String displayName, String email,
            String password) {
        if (getUserId(email) != null) {
            return null;
        }

        UserModel user = UserModel.fromNew(displayName, fullName, email, password);
        System.out.println(UserModel.fromJson(UserModel.toJson(user)));
        // Set user profile
        String userProfileKey = Const.RedisKeys.userProfile(user.userId);
        redisClient.set(userProfileKey, UserModel.toJson(user));

        // Set user email
        String userEmailKey = Const.RedisKeys.userProfileFromEmail(email);
        redisClient.set(userEmailKey, user.userId);

        // Add user to the set of all users
        String allUserProfiles = Const.RedisKeys.allUserProfiles;
        redisClient.sadd(allUserProfiles, user.userId);

        // Create user's transaction set
        String userTransactionsKey = Const.RedisKeys.usersTransactions(user.userId);
        redisClient.sadd(userTransactionsKey, "");

        return user;
    }

    public Set<UserModel> getAllUsers() {
        String allUserProfiles = Const.RedisKeys.allUserProfiles;
        Set<String> allUserIds = redisClient.smembers(allUserProfiles);
        return allUserIds.stream()
                .map(this::getUser)
                .collect(Collectors.toSet());
    }

    public UserModel addFunds(String userId, MoneyModel amount) {
        UserModel user = getUser(userId);
        if (user == null) {
            return null;
        }

        MoneyModel nextBalance = user.balance.fromAdd(amount.whole, amount.fraction);
        UserModel nextUser = UserModel.fromUpdateBalance(user, nextBalance);

        String userProfileKey = Const.RedisKeys.userProfile(userId);
        redisClient.set(userProfileKey, UserModel.toJson(nextUser));

        return nextUser;
    }
}
