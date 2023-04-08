package cutchin_cash;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.io.IOException;
import java.util.UUID;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;

import cutchin_cash.configs.Settings;
import io.grpc.Channel;
import io.grpc.ChannelCredentials;
import io.grpc.Grpc;
import io.grpc.ManagedChannelBuilder;
import io.grpc.Status;
import io.grpc.TlsChannelCredentials;

import redis.clients.jedis.Jedis;
import redis.clients.jedis.exceptions.JedisConnectionException;

import static org.mockito.Mockito.*;

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class AppTest {
    private Settings settings = Settings.parse();
    private Jedis jedis = new Jedis(settings.REDIS_HOST, settings.REDIS_PORT);
    private String dialAddr = "localhost:" + settings.PORT;

    @BeforeAll
    public void setup() throws IOException {}

    @BeforeEach
    public void clearRedis() {
        jedis.flushAll();
    }

    @AfterAll
    public void teardown() throws InterruptedException {
        jedis.close();
    }
}
