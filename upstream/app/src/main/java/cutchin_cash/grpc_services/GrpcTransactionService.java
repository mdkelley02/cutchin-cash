package cutchin_cash.grpc_services;

import cutchin_cash.models.common.Transaction;
import cutchin_cash.models.transaction.DecisionPaymentRequest;
import cutchin_cash.models.transaction.DecisionPaymentResponse;
import cutchin_cash.models.transaction.DemandPaymentRequest;
import cutchin_cash.models.transaction.DemandPaymentResponse;
import cutchin_cash.models.transaction.ListTransactionsRequest;
import cutchin_cash.models.transaction.ListTransactionsResponse;
import cutchin_cash.models.transaction.SendPaymentRequest;
import cutchin_cash.models.transaction.SendPaymentResponse;
import cutchin_cash.models.transaction.TransactionServiceGrpc.TransactionServiceImplBase;
import cutchin_cash.services.TransactionService;
import cutchin_cash.storage.TransactionModel;
import cutchin_cash.utils.Const;
import cutchin_cash.utils.Sender;
import cutchin_cash.utils.TransactionException;
import io.grpc.Status;
import io.grpc.StatusException;
import io.grpc.stub.StreamObserver;
import java.util.ArrayList;
import java.util.List;

public class GrpcTransactionService extends TransactionServiceImplBase {
    private final TransactionService transactionService;

    public GrpcTransactionService(TransactionService transactionService) {
        this.transactionService = transactionService;
    }

    @Override
    public void sendPayment(SendPaymentRequest request,
            StreamObserver<SendPaymentResponse> responseObserver) {
        Sender<SendPaymentResponse> sender = new Sender<>(responseObserver);

        try {
            String currentUser = Const.Auth.SUB_CTX_KEY.get();
            if (currentUser == null) {
                throw new StatusException(Status.UNAUTHENTICATED);
            }

            sender.response(
                    SendPaymentResponse.newBuilder()
                            .setTransaction(
                                    TransactionModel.toTransaction(transactionService.sendPayment(
                                            currentUser, request.getReceivingUserId(),
                                            request.getAmount(), request.getDescription())))
                            .build());
        } catch (TransactionException e) {
            sender.error(e);
            return;
        } catch (StatusException e) {
            sender.error(e.getStatus());
            return;
        }
    }

    @Override
    public void demandPayment(DemandPaymentRequest request,
            StreamObserver<DemandPaymentResponse> responseObserver) {
        Sender<DemandPaymentResponse> sender = new Sender<>(responseObserver);

        try {
            String currentUser = Const.Auth.SUB_CTX_KEY.get();
            if (currentUser == null) {
                throw new StatusException(Status.UNAUTHENTICATED);
            }

            sender.response(
                    DemandPaymentResponse.newBuilder()
                            .setTransaction(TransactionModel.toTransaction(
                                    transactionService.demandPayment(
                                            currentUser, request.getPayingUserId(),
                                            request.getAmount(), request.getDescription())))
                            .build());
        } catch (TransactionException e) {
            sender.error(e);
            return;
        } catch (StatusException e) {
            sender.error(e.getStatus());
            return;
        }
    }

    @Override
    public void decisionPayment(DecisionPaymentRequest request,
            StreamObserver<DecisionPaymentResponse> responseObserver) {
        Sender<DecisionPaymentResponse> sender = new Sender<>(responseObserver);

        try {
            String currentUser = Const.Auth.SUB_CTX_KEY.get();
            if (currentUser == null) {
                throw new StatusException(Status.UNAUTHENTICATED);
            }

            sender.response(DecisionPaymentResponse.newBuilder()
                    .setTransaction(TransactionModel.toTransaction(
                            transactionService.decisionPayment(
                                    currentUser, request.getTransactionId(),
                                    request.getStatus())))
                    .build());
        } catch (TransactionException e) {
            sender.error(e);
            return;
        } catch (StatusException e) {
            sender.error(e.getStatus());
            return;
        }
    }

    @Override
    public void listTransactions(ListTransactionsRequest request,
            StreamObserver<ListTransactionsResponse> responseObserver) {
        Sender<ListTransactionsResponse> sender = new Sender<>(responseObserver);

        try {
            String currentUser = Const.Auth.SUB_CTX_KEY.get();
            if (currentUser == null) {
                throw new StatusException(Status.UNAUTHENTICATED);
            }

            List<Transaction> transactions = new ArrayList<>();
            for (TransactionModel transaction : transactionService.getTransactions(currentUser)) {
                transactions.add(TransactionModel.toTransaction(transaction));
            }

            sender.response(ListTransactionsResponse.newBuilder()
                    .addAllTransactions(transactions)
                    .build());
        } catch (TransactionException e) {
            sender.error(e);
            return;
        } catch (StatusException e) {
            sender.error(e.getStatus());
            return;
        }
    }
}
