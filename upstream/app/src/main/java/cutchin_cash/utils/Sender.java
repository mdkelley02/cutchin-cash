package cutchin_cash.utils;

import com.google.protobuf.GeneratedMessageV3;

import io.grpc.Status;
import io.grpc.StatusException;
import io.grpc.stub.StreamObserver;

/*
* This class is a helper class to send responses to the client.
* It is used to reduce the amount of boilerplate code in the service
*/
public class Sender<RespT extends GeneratedMessageV3> {
    private final StreamObserver<RespT> responseObserver;

    public Sender(StreamObserver<RespT> responseObserver) {
        this.responseObserver = responseObserver;
    }

    public void response(RespT response) {
        responseObserver.onNext(response);
        responseObserver.onCompleted();
    }

    public void error(Status status) {
        responseObserver.onError(new StatusException(status));
    }
}