package cutchin_cash;

import java.io.IOException;
import cutchin_cash.configs.Settings;
import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;
import redis.clients.jedis.exceptions.JedisConnectionException;

public class App {
    public static void main(String[] args)
            throws IOException, JedisConnectionException, InterruptedException {
        Settings settings = Settings.parse();
        Jedis jedis = new JedisPool(settings.REDIS_HOST, settings.REDIS_PORT)
                .getResource();

        CutchinCashServer server = new CutchinCashServer(
                settings.PORT,
                jedis,
                settings.CERT_CHAIN,
                settings.PRIVATE_KEY,
                settings.HS256_KEY);

        server.start();
        server.blockUntilShutdown();
    }
}
