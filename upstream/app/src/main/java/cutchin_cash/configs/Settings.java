package cutchin_cash.configs;

import com.google.gson.GsonBuilder;
import cutchin_cash.utils.GsonFileTypeAdapter;
import java.io.File;

import org.slf4j.LoggerFactory;
import cutchin_cash.utils.Const;

public class Settings {
    public final int PORT;
    public final String REDIS_HOST;
    public final int REDIS_PORT;
    public final String PEPPER;
    public final File CERT_CHAIN;
    public final File PRIVATE_KEY;
    public final String HS256_KEY;

    private Settings(
            String port,
            String redisHost,
            String redisPort,
            String pepper,
            String certChainPath,
            String privateKeyPath,
            String hs256Key) {
        this.PORT = Integer.parseInt(port);
        this.REDIS_HOST = redisHost;
        this.REDIS_PORT = Integer.parseInt(redisPort);
        this.PEPPER = pepper;
        this.CERT_CHAIN = new File(certChainPath);
        this.PRIVATE_KEY = new File(privateKeyPath);
        this.HS256_KEY = hs256Key;

        LoggerFactory.getLogger(Settings.class).info("Settings:\n{}", this);
    }

    private static String getEnvOrDefault(String key) {
        String setting = System.getenv(key);
        return setting == null ? Const.Config.DEFAULTS.get(key) : setting;
    }

    @Override
    public String toString() {
        return new GsonBuilder()
                .registerTypeAdapter(File.class,
                        new GsonFileTypeAdapter())
                .setPrettyPrinting()
                .create()
                .toJson(this);
    }

    public static Settings parse() {
        return new Settings(
                getEnvOrDefault(Const.Config.PORT),
                getEnvOrDefault(Const.Config.REDIS_HOST),
                getEnvOrDefault(Const.Config.REDIS_PORT),
                getEnvOrDefault(Const.Config.PEPPER),
                getEnvOrDefault(Const.Config.CERT_CHAIN_PATH),
                getEnvOrDefault(Const.Config.PRIVATE_KEY_PATH),
                getEnvOrDefault(Const.Config.HS256_KEY));
    }
}

