package cutchin_cash.storage;

import java.util.UUID;
import cutchin_cash.models.common.TransactionStatus;

public class TransactionModel extends BaseModel {
    public final String transactionId;
    public final String userId;
    public final String description;
    public final MoneyModel amount;
    public final String timestamp;
    public final TransactionStatus status;

    private TransactionModel(
            String transactionId,
            String userId,
            String description,
            MoneyModel amount,
            String timestamp,
            TransactionStatus status) {
        this.transactionId = transactionId;
        this.userId = userId;
        this.description = description;
        this.amount = amount;
        this.timestamp = timestamp;
        this.status = status;
    }

    public static TransactionModel fromJson(String json) {
        return gson.fromJson(json, TransactionModel.class);
    }

    public static TransactionModel fromNew(
            String userId,
            String description,
            MoneyModel amount,
            String timestamp,
            TransactionStatus status) {
        String transactionId = UUID.randomUUID().toString();

        return new TransactionModel(
                transactionId, userId, description,
                amount, timestamp, status);
    }

    public static TransactionModel fromDecision(TransactionModel model, TransactionStatus status) {
        return new TransactionModel(
                model.transactionId, model.userId,
                model.description, model.amount,
                model.timestamp, status);
    }

    public static String toJson(TransactionModel model) {
        return gson.toJson(model);
    }
}
