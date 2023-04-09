package cutchin_cash.utils;

import java.util.HashMap;
import java.util.Map;
import cutchin_cash.models.common.ErrorType;
import io.grpc.Status;
import io.grpc.StatusException;

public final class TransactionException extends StatusException {
    public final ErrorType errorType;
    private final static Map<ErrorType, Status> toStatus = new HashMap<ErrorType, Status>() {
        {
            put(ErrorType.INVALID_CREDENTIALS, Status.UNAUTHENTICATED);
            put(ErrorType.PAYING_USER_NOT_FOUND, Status.NOT_FOUND);
            put(ErrorType.RECEIVING_USER_NOT_FOUND, Status.NOT_FOUND);
            put(ErrorType.CANNOT_SEND_TO_SELF, Status.INVALID_ARGUMENT);
            put(ErrorType.TRANSACTION_NOT_FOUND, Status.NOT_FOUND);
            put(ErrorType.TRANSACTION_ALREADY_DECISIONED, Status.ALREADY_EXISTS);
            put(ErrorType.INSUFFICIENT_BALANCE, Status.FAILED_PRECONDITION);
            put(ErrorType.INVALID_AMOUNT, Status.INVALID_ARGUMENT);
        }
    };

    public TransactionException(ErrorType errorType) {
        super(toStatus.get(errorType).withDescription(errorType.toString()));
        this.errorType = errorType;
    }

    public boolean compareTo(ErrorType errorType) {
        return this.errorType.compareTo(errorType) == 0;
    }
}
