package cutchin_cash.services;

import java.util.Map;
import org.slf4j.Logger;
import com.google.protobuf.Descriptors.FieldDescriptor;
import cutchin_cash.models.common.Money;
import cutchin_cash.models.common.TransactionStatus;
import cutchin_cash.utils.ValidationException;
import io.grpc.Status;

public class ValidationService {
    private static boolean isNotEmpty(String str) {
        return str.compareTo("") != 0;
    }

    private static boolean isEmail(String email) {
        return email.matches("^(.+)@(.+)$") && email.length() > 5 && email.length() < 255;
    }

    private static void isValidAmount(Money amount) throws ValidationException {
        int fraction = amount.getFraction();
        int whole = amount.getWhole();

        if (fraction == 0 && whole == 0) {
            throw new ValidationException("amount");
        }

        if (fraction < 0 || fraction > 99) {
            throw new ValidationException("fraction");
        }

        if (whole < 0) {
            throw new ValidationException("whole");
        }
    }

    private static void validateField(
            FieldDescriptor field,
            Object value)
            throws ValidationException {
        FieldDescriptor.Type type = field.getType();
        String fieldName = field.getName();

        if (type == FieldDescriptor.Type.STRING) {
            String stringValue = value.toString();

            if (fieldName.equals("email") && !isEmail(stringValue))
                throw new ValidationException(fieldName);

            if (!isNotEmpty(stringValue))
                throw new ValidationException(fieldName);

        } else if (type == FieldDescriptor.Type.ENUM) {
            String name = field.getEnumType().getName();
            if (name.equals("TransactionStatus")) {
                try {
                    TransactionStatus status = TransactionStatus.valueOf(value.toString());
                    if (status.compareTo(TransactionStatus.PENDING) <= 0)
                        throw new ValidationException(fieldName);
                } catch (IllegalArgumentException e) {
                    throw new ValidationException(fieldName);
                }
            }

        } else if (type == FieldDescriptor.Type.MESSAGE) {
            String name = field.getMessageType().getName();

            if (name.equals("Money"))
                isValidAmount((Money)value);

        } else {
            throw new ValidationException(fieldName);
        }
    }

    public static Status validateFields(Map<FieldDescriptor, Object> fields)
            throws ValidationException {
        for (Map.Entry<FieldDescriptor, Object> field : fields.entrySet()) {
            validateField(field.getKey(), field.getValue());
        }
        return null;
    }
}
