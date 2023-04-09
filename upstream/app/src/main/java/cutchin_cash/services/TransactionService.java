package cutchin_cash.services;

import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;
import cutchin_cash.models.common.ErrorType;
import cutchin_cash.models.common.Money;
import cutchin_cash.models.common.TransactionStatus;
import cutchin_cash.storage.MoneyModel;
import cutchin_cash.storage.TransactionModel;
import cutchin_cash.storage.UserModel;
import cutchin_cash.utils.Const;
import cutchin_cash.utils.TransactionException;
import redis.clients.jedis.Jedis;

/**
 * This class provides services for managing transactions between users.
 */
public class TransactionService {
    private final Jedis redisClient;
    private final UserService userService;

    /**
     * Constructs a new TransactionService instance.
     *
     * @param redisClient The Redis client to use for data storage and
     *        retrieval.
     * @param userService The UserService instance to interact with user-related
     *        data.
     */
    public TransactionService(Jedis redisClient, UserService userService) {
        this.redisClient = redisClient;
        this.userService = userService;
    }

    /**
     * Sends a payment from one user to another. Creates a transaction with
     * status accepted.
     *
     * @param sendingUserId The ID of the user sending the payment.
     * @param receivingUserId The ID of the user receiving the payment.
     * @param amount The amount of money being sent.
     * @param description A description of the payment.
     * @return A TransactionModel representing the completed transaction.
     * @throws TransactionException If an error occurs during the transaction.
     */
    public TransactionModel sendPayment(
            String sendingUserId,
            String receivingUserId,
            Money amount,
            String description) throws TransactionException {
        if (sendingUserId == receivingUserId)
            throw new TransactionException(ErrorType.CANNOT_SEND_TO_SELF);

        TransactionModel transactionModel = TransactionModel.fromNew(
                receivingUserId,
                sendingUserId,
                description,
                MoneyModel.fromMoney(amount),
                description,
                TransactionStatus.ACCEPTED);

        TransactionModel response = transact(transactionModel);

        return response;
    }

    /**
     * Demands a payment from one user to another. Creates a transaction with
     * status pending.
     *
     * @param demandingUserId The ID of the user demanding the payment.
     * @param payingUserId The ID of the user supposed to make the payment.
     * @param amount The amount of money being requested.
     * @param description A description of the payment request.
     * @return A TransactionModel representing the created transaction.
     * @throws TransactionException If an error occurs during the transaction.
     */
    public TransactionModel demandPayment(
            String demandingUserId,
            String payingUserId,
            Money amount,
            String description) throws TransactionException {
        // Cannot request payment from yourself
        if (demandingUserId == payingUserId) {
            throw new TransactionException(ErrorType.CANNOT_SEND_TO_SELF);
        }

        // Check if paying user exists
        UserModel payingUser = userService.getUser(payingUserId);
        if (payingUser == null) {
            throw new TransactionException(ErrorType.PAYING_USER_NOT_FOUND);
        }

        // Construct transaction with status pending
        TransactionModel transactionModel = TransactionModel.fromNew(
                demandingUserId,
                payingUserId,
                description,
                MoneyModel.fromMoney(amount),
                description,
                TransactionStatus.PENDING);

        String transactionKey = Const.RedisKeys.transaction(transactionModel.transactionId);

        // Store transaction
        redisClient.set(transactionKey, TransactionModel.toJson(transactionModel));

        // Add transaction to user's transactions
        addToUsersTransactions(demandingUserId, transactionModel.transactionId);
        addToUsersTransactions(payingUserId, transactionModel.transactionId);

        return transactionModel;
    }

    /**
     * Updates the status of a transaction.
     *
     * @param initiatingUserId The ID of the user initiating the status update.
     * @param transactionId The ID of the transaction to update.
     * @param status The new status of the transaction.
     * @return A TransactionModel representing the updated transaction.
     * @throws TransactionException If an error occurs during the transaction.
     */
    public TransactionModel decisionPayment(
            String initiatingUserId,
            String transactionId,
            TransactionStatus status) throws TransactionException {

        TransactionModel transaction = getTransaction(transactionId);
        System.out.println("initiator" + initiatingUserId);
        System.out.println(TransactionModel.toJson(transaction));
        // transaction does not exist
        if (transaction == null) {
            throw new TransactionException(ErrorType.TRANSACTION_NOT_FOUND);
        }

        System.out.println(TransactionModel.toJson(transaction));

        // User making decision is not the paying user
        if (!initiatingUserId.equals(transaction.payingUserId)) {
            throw new TransactionException(ErrorType.INVALID_CREDENTIALS);
        }

        // transaction already has a decision
        if (transaction.status != TransactionStatus.PENDING) {
            throw new TransactionException(ErrorType.TRANSACTION_ALREADY_DECISIONED);
        }

        TransactionModel decisionedTransaction = TransactionModel.fromDecision(transaction, status);

        return transact(decisionedTransaction);
    }

    /**
     * Retrieves all transactions for a given user.
     *
     * @param userId The ID of the user for which to retrieve transactions.
     * @return A set of TransactionModel objects representing the user's
     *         transactions.
     */
    public Set<TransactionModel> getTransactions(String userId) throws TransactionException {
        Set<String> transactionIds =
                redisClient.smembers(Const.RedisKeys.usersTransactions(userId));
        Set<TransactionModel> transactions = new HashSet<TransactionModel>();

        if (transactionIds == null) {
            return transactions;
        }

        for (String transactionId : transactionIds) {
            try {
                transactions.add(getTransaction(transactionId));
            } catch (TransactionException e) {
                if (e.compareTo(ErrorType.TRANSACTION_NOT_FOUND)) {
                    continue;
                } else {
                    throw e;
                }
            }
        }

        return transactions;
    }

    public Set<TransactionModel> getOutgoingTransactions(String userId)
            throws TransactionException {
        return getTransactions(userId).stream()
                .filter(transaction -> transaction.payingUserId == userId)
                .collect(Collectors.toSet());
    }

    public Set<TransactionModel> getIncomingTransactions(String userId)
            throws TransactionException {
        return getTransactions(userId).stream()
                .filter(transaction -> transaction.receivingUserId == userId)
                .collect(Collectors.toSet());
    }

    public Set<TransactionModel> getTransactionsByStatus(String userId, TransactionStatus status)
            throws TransactionException {
        return getTransactions(userId).stream()
                .filter(transaction -> transaction.status == status)
                .collect(Collectors.toSet());
    }

    private TransactionModel transact(
            TransactionModel transactionModel) throws TransactionException {


        if (transactionModel.status == TransactionStatus.ACCEPTED) {
            UserModel payingUser = userService.getUser(transactionModel.payingUserId);
            // paying user does not exist
            if (payingUser == null) {
                throw new TransactionException(ErrorType.PAYING_USER_NOT_FOUND);
            }
            // Check if paying user has enough money
            if (payingUser.balance.compareTo(transactionModel.amount) < 0) {
                throw new TransactionException(ErrorType.INSUFFICIENT_BALANCE);
            }

            UserModel receivingUser = userService.getUser(transactionModel.receivingUserId);
            // receiving user does not exist
            if (receivingUser == null) {
                throw new TransactionException(ErrorType.RECEIVING_USER_NOT_FOUND);
            }

            // Update user balances
            for (UserModel user : new UserModel[] {payingUser, receivingUser}) {
                // Check if user is paying user
                boolean isPayingUser = user.userId.equals(transactionModel.payingUserId);
                // Calculate multiplier
                int multiplier = isPayingUser ? -1 : 1;
                System.out.println();
                System.out.println("Multiplier: " + multiplier);
                System.out.println("userId: " + user.userId);
                // Calculate amount to add
                int amountWhole = transactionModel.amount.whole * multiplier;
                int amountFraction = transactionModel.amount.fraction * multiplier;

                // Calculate new balance
                System.out.println("Old balance: " + user.balance);
                MoneyModel newBalance =
                        MoneyModel.fromNew(user.balance.whole, user.balance.fraction)
                                .fromAdd(amountWhole, amountFraction);
                System.out.println("New balance: " + newBalance);

                // create new user model with updated balance
                System.out.println("Old user: " + UserModel.toJson(user));
                UserModel updatedUser = UserModel.fromUpdateBalance(user, newBalance);
                System.out.println("new user: " + UserModel.toJson(updatedUser));
                System.out.println();

                // Set user profile
                String userProfileKey = Const.RedisKeys.userProfile(user.userId);
                redisClient.set(userProfileKey, UserModel.toJson(updatedUser));

                // test if user profile was set
                String userProfileJson = redisClient.get(userProfileKey);
                System.out.println("Redis User profile: " + userProfileJson);
            }
        }

        // Update transaction status
        String transactionKey = Const.RedisKeys.transaction(transactionModel.transactionId);
        redisClient.set(transactionKey, TransactionModel.toJson(transactionModel));

        // add transaction to users transactions
        for (String userId : new String[] {
                transactionModel.payingUserId,
                transactionModel.receivingUserId}) {
            addToUsersTransactions(userId, transactionModel.transactionId);
        }

        return transactionModel;
    }

    /**
     * Gets a transaction by its ID.
     *
     * @param transactionId The ID of the transaction to get.
     * @return A TransactionModel representing the transaction.
     */
    private TransactionModel getTransaction(String transactionId) throws TransactionException {
        String transactionKey = Const.RedisKeys.transaction(transactionId);
        String transactionJson = redisClient.get(transactionKey);
        if (transactionJson == null) {
            throw new TransactionException(ErrorType.TRANSACTION_NOT_FOUND);
        }

        return TransactionModel.fromJson(transactionJson);
    }

    private void addToUsersTransactions(String userId, String transactionId) {
        redisClient.sadd(Const.RedisKeys.usersTransactions(userId), transactionId);
    }
}


