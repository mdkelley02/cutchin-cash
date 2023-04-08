package cutchin_cash.services;

import cutchin_cash.models.common.ErrorType;
import cutchin_cash.models.common.Money;
import cutchin_cash.models.common.Transaction;
import cutchin_cash.models.common.TransactionStatus;
import cutchin_cash.utils.Pair;
import redis.clients.jedis.Jedis;

public class TransactionService {
    private final Jedis redisClient;
    private final UserService userService;

    public TransactionService(Jedis redisClient, UserService userService) {
        this.redisClient = redisClient;
        this.userService = userService;
    }

    public Pair<Transaction, ErrorType> demandTransaction(
            String demanderUserId,
            String targetUserId,
            Money amount,
            String description) {
        return new Pair<Transaction, ErrorType>(null, null);
    }

    public Pair<Transaction, ErrorType> doTransaction(
            String toUserId,
            String fromUserId,
            Money amount,
            String description) {
        return new Pair<Transaction, ErrorType>(null, null);
    }

    public ErrorType decisionTransaction(
            String transactionId,
            String userId,
            TransactionStatus status) {
        return null;
    }
}
