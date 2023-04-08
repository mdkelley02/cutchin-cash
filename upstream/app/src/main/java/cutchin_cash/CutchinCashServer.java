package cutchin_cash;

import java.io.IOException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import io.grpc.Server;
import io.grpc.netty.shaded.io.grpc.netty.GrpcSslContexts;
import io.grpc.netty.shaded.io.grpc.netty.NettyServerBuilder;
import io.grpc.netty.shaded.io.netty.handler.ssl.ClientAuth;
import io.grpc.netty.shaded.io.netty.handler.ssl.SslProvider;
import io.grpc.protobuf.services.ProtoReflectionService;
import redis.clients.jedis.Jedis;
import java.io.File;

import cutchin_cash.grpc_services.GrpcAuthService;
import cutchin_cash.grpc_services.GrpcTransactionService;
import cutchin_cash.grpc_services.GrpcUserService;
import cutchin_cash.interceptors.AuthInterceptor;
import cutchin_cash.interceptors.LogInterceptor;
import cutchin_cash.services.AuthService;
import cutchin_cash.services.TransactionService;
import cutchin_cash.services.UserService;

public class CutchinCashServer {
    private final int port;
    private final Logger log = LoggerFactory.getLogger(CutchinCashServer.class);
    private final Server server;
    private final Jedis redisClient;

    public CutchinCashServer(
            int port,
            Jedis redisClient,
            File certChain,
            File privateKey,
            String hs256Key) throws IOException {
        this.port = port;
        this.redisClient = redisClient;

        AuthService authService = new AuthService(hs256Key);
        UserService userService = new UserService(redisClient);
        TransactionService transactionService =
                new TransactionService(redisClient, userService);

        server = NettyServerBuilder.forPort(this.port)
                .sslContext(GrpcSslContexts.forServer(certChain, privateKey)
                        .clientAuth(ClientAuth.NONE)
                        .sslProvider(SslProvider.OPENSSL).build())
                .intercept(new LogInterceptor())
                .intercept(new AuthInterceptor(authService))
                .addService(new GrpcUserService(userService))
                .addService(new GrpcTransactionService(transactionService))
                .addService(new GrpcAuthService(authService, userService))
                .addService(ProtoReflectionService.newInstance()).build();
    }

    public void start() throws IOException {
        server.start();
        log.info("Server started, listening on {}", port);

        Runtime.getRuntime().addShutdownHook(new Thread(() -> {
            System.err.println(
                    "*** shutting down gRPC server since JVM is shutting down");
            System.out.println("Saving data to redis");
            redisClient.save();
            redisClient.close();
            CutchinCashServer.this.stop();
            System.err.println("*** server shut down");
        }));

    }

    public void blockUntilShutdown() throws InterruptedException {
        if (server == null) {
            return;
        }
        server.awaitTermination();
    }

    public void stop() {
        if (server == null) {
            return;
        }
        server.shutdown();
    }
}
