package cutchin_cash.utils;

import static io.grpc.Metadata.ASCII_STRING_MARSHALLER;

import cutchin_cash.models.auth.AuthServiceGrpc;
import io.grpc.Context;
import io.grpc.Metadata;
import java.time.Duration;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;

public final class Const {
    public static String APP_ROLE = "cutchin_cash";

    public static class Auth {
        public final static String ISS = APP_ROLE;
        public final static String AUD = APP_ROLE;
        public final static Duration EXPIRATION = Duration.ofDays(1);
        public final static String AUTH_TYPE = "Bearer";
        public static final Metadata.Key<String> METADATA_KEY =
                Metadata.Key.of("Authorization",
                        ASCII_STRING_MARSHALLER);
        public static final Context.Key<String> SUB_CTX_KEY =
                Context.key("subject");

        public static final HashSet<String> EXCLUDED_AUTH_METHODS =
                new HashSet<String>() {
                    {
                        add(AuthServiceGrpc
                                .getLoginMethod()
                                .getFullMethodName());
                        add(AuthServiceGrpc
                                .getRegisterMethod()
                                .getFullMethodName());
                        add("grpc.reflection.v1alpha.ServerReflection/ServerReflectionInfo");
                    }
                };
    }

    public static class Database {}

    public static class Config {
        public final static String PORT = "APP_PORT";
        public final static String REDIS_HOST = "APP_REDIS_HOST";
        public final static String REDIS_PORT = "APP_REDIS_PORT";
        public final static String PEPPER = "APP_PEPPER";
        public final static String CERT_CHAIN_PATH =
                "APP_CERT_CHAIN_PATH";
        public final static String PRIVATE_KEY_PATH =
                "APP_PRIVATE_KEY_PATH";
        public final static String HS256_KEY = "APP_HS256_KEY";
        public final static Map<String, String> DEFAULTS =
                new HashMap<String, String>() {
                    {
                        put(PORT, "50051");
                        put(REDIS_HOST, "localhost");
                        put(REDIS_PORT, "6379");
                        put(PEPPER, "pepper");
                        put(CERT_CHAIN_PATH,
                                "src/main/resources/certs/certificate.crt");
                        put(PRIVATE_KEY_PATH,
                                "src/main/resources/certs/private.pem.pkcs8");
                        put(HS256_KEY, "HS256_KEY");
                    }
                };
    }
}
