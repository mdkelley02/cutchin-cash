package cutchin_cash.grpc_services;

import cutchin_cash.models.transaction.TransactionServiceGrpc.TransactionServiceImplBase;
import cutchin_cash.services.TransactionService;

public class GrpcTransactionService extends TransactionServiceImplBase {
    private final TransactionService transactionService;

    public GrpcTransactionService(TransactionService transactionService) {
        this.transactionService = transactionService;
    }
}
