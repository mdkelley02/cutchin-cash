package cutchin_cash.interceptors;

import io.grpc.Metadata;
import io.grpc.ServerCall;
import io.grpc.ServerCallHandler;
import io.grpc.ServerInterceptor;
import io.grpc.Context;
import io.grpc.Contexts;
import io.grpc.StatusException;
import com.auth0.jwt.interfaces.DecodedJWT;

import cutchin_cash.services.AuthService;
import cutchin_cash.utils.Const;

public class AuthInterceptor implements ServerInterceptor {
    private final AuthService authService;

    public AuthInterceptor(AuthService authService) {
        this.authService = authService;
    }

    @Override
    public <ReqT, RespT> ServerCall.Listener<ReqT> interceptCall(
            ServerCall<ReqT, RespT> serverCall,
            Metadata metadata,
            ServerCallHandler<ReqT, RespT> serverCallHandler) {
        try {

            if (AuthService.shouldSkipAuth(serverCall.getMethodDescriptor()
                    .getFullMethodName()))
                return serverCallHandler.startCall(serverCall, metadata);

            DecodedJWT decodedToken = authService.verifyToken(
                    AuthService.parseAuthorizationMetadata(metadata));

            return Contexts.interceptCall(
                    Context.current().withValue(
                            Const.Auth.SUB_CTX_KEY,
                            decodedToken.getSubject()),
                    serverCall,
                    metadata,
                    serverCallHandler);
        } catch (StatusException e) {
            serverCall.close(e.getStatus(), new Metadata());
            return new ServerCall.Listener<ReqT>() {
                // noop
            };
        }
    }
}
