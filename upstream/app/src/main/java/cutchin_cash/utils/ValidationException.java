package cutchin_cash.utils;

import io.grpc.Status;
import io.grpc.StatusException;

public class ValidationException extends StatusException {
    public ValidationException(String field) {
        super(Status.INVALID_ARGUMENT.withDescription(
                String.format("Invalid field: %s", field)));
    }
}
