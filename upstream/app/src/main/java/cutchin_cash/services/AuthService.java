package cutchin_cash.services;

import java.util.Date;

import com.auth0.jwt.algorithms.*;
import com.auth0.jwt.exceptions.JWTDecodeException;
import com.auth0.jwt.interfaces.DecodedJWT;

import cutchin_cash.utils.Const;

import com.auth0.jwt.JWT;
import io.grpc.Metadata;
import io.grpc.Status;
import io.grpc.StatusException;

public class AuthService {
    private final Algorithm algorithm;

    public AuthService(String hs256Secret) {
        algorithm = Algorithm.HMAC256(hs256Secret);
    }

    public static String parseAuthorizationMetadata(
            Metadata metadata) throws StatusException {
        String authHeader = metadata.get(Const.Auth.METADATA_KEY);
        if (authHeader == null)
            throw new StatusException(Status.UNAUTHENTICATED);

        String[] authHeaderParts = authHeader.split(" ");
        if (authHeaderParts.length != 2)
            throw new StatusException(Status.UNAUTHENTICATED);

        if (!authHeaderParts[0].equals(Const.Auth.AUTH_TYPE))
            throw new StatusException(Status.UNAUTHENTICATED);

        return authHeaderParts[1];
    }

    public static boolean shouldSkipAuth(
            String fullMethodName) {
        return Const.Auth.EXCLUDED_AUTH_METHODS.contains(fullMethodName);
    }

    public String createToken(String userId) {
        return JWT.create()
                .withSubject(userId)
                .withIssuer(Const.Auth.ISS)
                .withAudience(Const.Auth.AUD)
                .withExpiresAt(Date.from(java.time.Instant.now()
                        .plus(Const.Auth.EXPIRATION)))
                .sign(algorithm);
    }

    public DecodedJWT decodeToken(String token) throws JWTDecodeException {
        return JWT.require(algorithm)
                .withIssuer(Const.Auth.ISS)
                .withAudience(Const.Auth.AUD)
                .build()
                .verify(token);
    }

    public DecodedJWT verifyToken(String token) throws StatusException {
        try {
            return decodeToken(token);
        } catch (JWTDecodeException e) {
            throw new StatusException(Status.UNAUTHENTICATED);
        }
    }
}
