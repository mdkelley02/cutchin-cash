package cutchin_cash.interceptors;

import com.google.protobuf.GeneratedMessageV3;
import cutchin_cash.services.ValidationService;
import cutchin_cash.utils.ValidationException;
import io.grpc.Metadata;
import io.grpc.ServerCall;
import io.grpc.ServerCallHandler;
import io.grpc.ServerInterceptor;
import io.grpc.ForwardingServerCall.SimpleForwardingServerCall;
import io.grpc.ForwardingServerCallListener.SimpleForwardingServerCallListener;

public class ValidationInterceptor implements ServerInterceptor {
    @Override
    public <ReqT, RespT> ServerCall.Listener<ReqT> interceptCall(
            ServerCall<ReqT, RespT> call,
            Metadata headers,
            ServerCallHandler<ReqT, RespT> next) {
        ServerCall.Listener<ReqT> listener =
                next.startCall(new SimpleForwardingServerCall<ReqT, RespT>(call) {}, headers);

        return new SimpleForwardingServerCallListener<ReqT>(listener) {
            private GeneratedMessageV3 request;

            @Override
            public void onMessage(ReqT message) {
                request = (GeneratedMessageV3)message;
                super.onMessage(message);
            }

            @Override
            public void onHalfClose() {
                try {
                    ValidationService
                            .validateFields(request.getAllFields());
                    super.onHalfClose();
                } catch (ValidationException e) {
                    call.close(e.getStatus(), headers);
                }
            }
        };
    }

}
