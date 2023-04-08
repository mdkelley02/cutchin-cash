package cutchin_cash.services;

import java.util.Set;
import cutchin_cash.models.common.Money;
import cutchin_cash.models.common.Transaction;
import cutchin_cash.models.common.User;
import cutchin_cash.storage.UserModel;
import redis.clients.jedis.Jedis;

public class UserService {
    private final Jedis redisClient;

    public UserService(Jedis redisClient) {
        this.redisClient = redisClient;
    }

    public String getUserId(String email) {
        return null;
    }

    public User createUser(String fullName, String displayName, String email, String password) {
        return UserModel.toUser(UserModel.fromNew(displayName, fullName, email, password));
    }

    public User addFunds(String userId, Money amount) {
        return User.getDefaultInstance();
    }

    public User removeFunds(String userId, Money amount) {
        return User.getDefaultInstance();
    }

    public Transaction addTransaction(String toUserId, String fromUserId, Money amount,
            String description) {
        return Transaction.getDefaultInstance();
    }

    public Set<Transaction> getTransactionHistory(String userId) {
        return null;
    }
}
