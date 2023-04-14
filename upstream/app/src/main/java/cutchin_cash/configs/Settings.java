package cutchin_cash.configs;

import com.google.gson.GsonBuilder;
import cutchin_cash.utils.GsonFileTypeAdapter;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import org.slf4j.LoggerFactory;
import cutchin_cash.utils.Const;

public class Settings {
    public final int PORT;
    public final String REDIS_HOST;
    public final String PEPPER;
    public final String HS256_KEY;
    public File CERT_CHAIN;
    public File PRIVATE_KEY;


    private Settings(
            String port,
            String redisHost,
            String pepper,
            String certChainPath,
            String privateKeyPath,
            String hs256Key) throws IOException {
        this.PORT = Integer.parseInt(port);
        this.REDIS_HOST = redisHost;
        this.PEPPER = pepper;
        this.HS256_KEY = hs256Key;
        this.CERT_CHAIN = fileFromResource(certChainPath);
        this.PRIVATE_KEY = fileFromResource(privateKeyPath);

        LoggerFactory.getLogger(Settings.class).info("Settings:\n{}", this);
    }

    public File fileFromResource(String path) throws IOException {
        InputStream in = getClass().getClassLoader().getResourceAsStream(path);

        File file = File.createTempFile("temp", ".tmp");
        file.deleteOnExit();

        try (OutputStream output = new FileOutputStream(file)) {
            in.transferTo(output);
        } catch (IOException ioException) {
            ioException.printStackTrace();
        }

        return file;
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

    public static Settings parse() throws IOException {
        return new Settings(
                getEnvOrDefault(Const.Config.PORT),
                getEnvOrDefault(Const.Config.REDIS_HOST),
                getEnvOrDefault(Const.Config.PEPPER),
                getEnvOrDefault(Const.Config.CERT_CHAIN_PATH),
                getEnvOrDefault(Const.Config.PRIVATE_KEY_PATH),
                getEnvOrDefault(Const.Config.HS256_KEY));
    }
}

