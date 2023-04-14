package cutchin_cash.services;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import cutchin_cash.storage.UserModel;

public class PasswordsService {
    public static String generateSalt() {
        return java.util.UUID.randomUUID().toString();
    }

    // Utility method to hash a password with salt and pepper
    public static String hashWithSalt(String password, String salt) {
        try {
            String combined = String.format("%s%s", salt, password);
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest(combined.getBytes(StandardCharsets.UTF_8));
            return new String(hash, StandardCharsets.UTF_8);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public static boolean verifyPassword(String password, UserModel user) {
        return hashWithSalt(password, user.salt).equals(user.password);
    }
}
