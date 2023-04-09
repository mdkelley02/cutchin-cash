/* eslint-disable */
import {
  CallOptions,
  ChannelCredentials,
  Client,
  ClientOptions,
  ClientUnaryCall,
  handleUnaryCall,
  makeGenericClientConstructor,
  Metadata,
  ServiceError,
  UntypedServiceImplementation,
} from "@grpc/grpc-js";
import _m0 from "protobufjs/minimal";
import { Money, Transaction, TransactionStatus, transactionStatusFromJSON, transactionStatusToJSON } from "./common";

export interface SendPaymentRequest {
  receivingUserId: string;
  description: string;
  amount?: Money;
}

export interface SendPaymentResponse {
  transaction?: Transaction;
}

export interface DemandPaymentRequest {
  payingUserId: string;
  description: string;
  amount?: Money;
}

export interface DemandPaymentResponse {
  transaction?: Transaction;
}

export interface DecisionPaymentRequest {
  transactionId: string;
  status: TransactionStatus;
}

export interface DecisionPaymentResponse {
  transaction?: Transaction;
}

export interface ListTransactionsRequest {
  userId: string;
}

export interface ListTransactionsResponse {
  transactions: Transaction[];
}

function createBaseSendPaymentRequest(): SendPaymentRequest {
  return { receivingUserId: "", description: "", amount: undefined };
}

export const SendPaymentRequest = {
  encode(message: SendPaymentRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.receivingUserId !== "") {
      writer.uint32(18).string(message.receivingUserId);
    }
    if (message.description !== "") {
      writer.uint32(26).string(message.description);
    }
    if (message.amount !== undefined) {
      Money.encode(message.amount, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SendPaymentRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSendPaymentRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 2:
          if (tag != 18) {
            break;
          }

          message.receivingUserId = reader.string();
          continue;
        case 3:
          if (tag != 26) {
            break;
          }

          message.description = reader.string();
          continue;
        case 4:
          if (tag != 34) {
            break;
          }

          message.amount = Money.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SendPaymentRequest {
    return {
      receivingUserId: isSet(object.receivingUserId) ? String(object.receivingUserId) : "",
      description: isSet(object.description) ? String(object.description) : "",
      amount: isSet(object.amount) ? Money.fromJSON(object.amount) : undefined,
    };
  },

  toJSON(message: SendPaymentRequest): unknown {
    const obj: any = {};
    message.receivingUserId !== undefined && (obj.receivingUserId = message.receivingUserId);
    message.description !== undefined && (obj.description = message.description);
    message.amount !== undefined && (obj.amount = message.amount ? Money.toJSON(message.amount) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<SendPaymentRequest>, I>>(base?: I): SendPaymentRequest {
    return SendPaymentRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<SendPaymentRequest>, I>>(object: I): SendPaymentRequest {
    const message = createBaseSendPaymentRequest();
    message.receivingUserId = object.receivingUserId ?? "";
    message.description = object.description ?? "";
    message.amount = (object.amount !== undefined && object.amount !== null)
      ? Money.fromPartial(object.amount)
      : undefined;
    return message;
  },
};

function createBaseSendPaymentResponse(): SendPaymentResponse {
  return { transaction: undefined };
}

export const SendPaymentResponse = {
  encode(message: SendPaymentResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.transaction !== undefined) {
      Transaction.encode(message.transaction, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SendPaymentResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSendPaymentResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.transaction = Transaction.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SendPaymentResponse {
    return { transaction: isSet(object.transaction) ? Transaction.fromJSON(object.transaction) : undefined };
  },

  toJSON(message: SendPaymentResponse): unknown {
    const obj: any = {};
    message.transaction !== undefined &&
      (obj.transaction = message.transaction ? Transaction.toJSON(message.transaction) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<SendPaymentResponse>, I>>(base?: I): SendPaymentResponse {
    return SendPaymentResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<SendPaymentResponse>, I>>(object: I): SendPaymentResponse {
    const message = createBaseSendPaymentResponse();
    message.transaction = (object.transaction !== undefined && object.transaction !== null)
      ? Transaction.fromPartial(object.transaction)
      : undefined;
    return message;
  },
};

function createBaseDemandPaymentRequest(): DemandPaymentRequest {
  return { payingUserId: "", description: "", amount: undefined };
}

export const DemandPaymentRequest = {
  encode(message: DemandPaymentRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.payingUserId !== "") {
      writer.uint32(10).string(message.payingUserId);
    }
    if (message.description !== "") {
      writer.uint32(18).string(message.description);
    }
    if (message.amount !== undefined) {
      Money.encode(message.amount, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DemandPaymentRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDemandPaymentRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.payingUserId = reader.string();
          continue;
        case 2:
          if (tag != 18) {
            break;
          }

          message.description = reader.string();
          continue;
        case 3:
          if (tag != 26) {
            break;
          }

          message.amount = Money.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DemandPaymentRequest {
    return {
      payingUserId: isSet(object.payingUserId) ? String(object.payingUserId) : "",
      description: isSet(object.description) ? String(object.description) : "",
      amount: isSet(object.amount) ? Money.fromJSON(object.amount) : undefined,
    };
  },

  toJSON(message: DemandPaymentRequest): unknown {
    const obj: any = {};
    message.payingUserId !== undefined && (obj.payingUserId = message.payingUserId);
    message.description !== undefined && (obj.description = message.description);
    message.amount !== undefined && (obj.amount = message.amount ? Money.toJSON(message.amount) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<DemandPaymentRequest>, I>>(base?: I): DemandPaymentRequest {
    return DemandPaymentRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<DemandPaymentRequest>, I>>(object: I): DemandPaymentRequest {
    const message = createBaseDemandPaymentRequest();
    message.payingUserId = object.payingUserId ?? "";
    message.description = object.description ?? "";
    message.amount = (object.amount !== undefined && object.amount !== null)
      ? Money.fromPartial(object.amount)
      : undefined;
    return message;
  },
};

function createBaseDemandPaymentResponse(): DemandPaymentResponse {
  return { transaction: undefined };
}

export const DemandPaymentResponse = {
  encode(message: DemandPaymentResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.transaction !== undefined) {
      Transaction.encode(message.transaction, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DemandPaymentResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDemandPaymentResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.transaction = Transaction.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DemandPaymentResponse {
    return { transaction: isSet(object.transaction) ? Transaction.fromJSON(object.transaction) : undefined };
  },

  toJSON(message: DemandPaymentResponse): unknown {
    const obj: any = {};
    message.transaction !== undefined &&
      (obj.transaction = message.transaction ? Transaction.toJSON(message.transaction) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<DemandPaymentResponse>, I>>(base?: I): DemandPaymentResponse {
    return DemandPaymentResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<DemandPaymentResponse>, I>>(object: I): DemandPaymentResponse {
    const message = createBaseDemandPaymentResponse();
    message.transaction = (object.transaction !== undefined && object.transaction !== null)
      ? Transaction.fromPartial(object.transaction)
      : undefined;
    return message;
  },
};

function createBaseDecisionPaymentRequest(): DecisionPaymentRequest {
  return { transactionId: "", status: 0 };
}

export const DecisionPaymentRequest = {
  encode(message: DecisionPaymentRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.transactionId !== "") {
      writer.uint32(10).string(message.transactionId);
    }
    if (message.status !== 0) {
      writer.uint32(16).int32(message.status);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DecisionPaymentRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDecisionPaymentRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.transactionId = reader.string();
          continue;
        case 2:
          if (tag != 16) {
            break;
          }

          message.status = reader.int32() as any;
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DecisionPaymentRequest {
    return {
      transactionId: isSet(object.transactionId) ? String(object.transactionId) : "",
      status: isSet(object.status) ? transactionStatusFromJSON(object.status) : 0,
    };
  },

  toJSON(message: DecisionPaymentRequest): unknown {
    const obj: any = {};
    message.transactionId !== undefined && (obj.transactionId = message.transactionId);
    message.status !== undefined && (obj.status = transactionStatusToJSON(message.status));
    return obj;
  },

  create<I extends Exact<DeepPartial<DecisionPaymentRequest>, I>>(base?: I): DecisionPaymentRequest {
    return DecisionPaymentRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<DecisionPaymentRequest>, I>>(object: I): DecisionPaymentRequest {
    const message = createBaseDecisionPaymentRequest();
    message.transactionId = object.transactionId ?? "";
    message.status = object.status ?? 0;
    return message;
  },
};

function createBaseDecisionPaymentResponse(): DecisionPaymentResponse {
  return { transaction: undefined };
}

export const DecisionPaymentResponse = {
  encode(message: DecisionPaymentResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.transaction !== undefined) {
      Transaction.encode(message.transaction, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DecisionPaymentResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDecisionPaymentResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.transaction = Transaction.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DecisionPaymentResponse {
    return { transaction: isSet(object.transaction) ? Transaction.fromJSON(object.transaction) : undefined };
  },

  toJSON(message: DecisionPaymentResponse): unknown {
    const obj: any = {};
    message.transaction !== undefined &&
      (obj.transaction = message.transaction ? Transaction.toJSON(message.transaction) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<DecisionPaymentResponse>, I>>(base?: I): DecisionPaymentResponse {
    return DecisionPaymentResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<DecisionPaymentResponse>, I>>(object: I): DecisionPaymentResponse {
    const message = createBaseDecisionPaymentResponse();
    message.transaction = (object.transaction !== undefined && object.transaction !== null)
      ? Transaction.fromPartial(object.transaction)
      : undefined;
    return message;
  },
};

function createBaseListTransactionsRequest(): ListTransactionsRequest {
  return { userId: "" };
}

export const ListTransactionsRequest = {
  encode(message: ListTransactionsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.userId !== "") {
      writer.uint32(10).string(message.userId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListTransactionsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListTransactionsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.userId = reader.string();
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ListTransactionsRequest {
    return { userId: isSet(object.userId) ? String(object.userId) : "" };
  },

  toJSON(message: ListTransactionsRequest): unknown {
    const obj: any = {};
    message.userId !== undefined && (obj.userId = message.userId);
    return obj;
  },

  create<I extends Exact<DeepPartial<ListTransactionsRequest>, I>>(base?: I): ListTransactionsRequest {
    return ListTransactionsRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ListTransactionsRequest>, I>>(object: I): ListTransactionsRequest {
    const message = createBaseListTransactionsRequest();
    message.userId = object.userId ?? "";
    return message;
  },
};

function createBaseListTransactionsResponse(): ListTransactionsResponse {
  return { transactions: [] };
}

export const ListTransactionsResponse = {
  encode(message: ListTransactionsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.transactions) {
      Transaction.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListTransactionsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListTransactionsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.transactions.push(Transaction.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ListTransactionsResponse {
    return {
      transactions: Array.isArray(object?.transactions)
        ? object.transactions.map((e: any) => Transaction.fromJSON(e))
        : [],
    };
  },

  toJSON(message: ListTransactionsResponse): unknown {
    const obj: any = {};
    if (message.transactions) {
      obj.transactions = message.transactions.map((e) => e ? Transaction.toJSON(e) : undefined);
    } else {
      obj.transactions = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ListTransactionsResponse>, I>>(base?: I): ListTransactionsResponse {
    return ListTransactionsResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ListTransactionsResponse>, I>>(object: I): ListTransactionsResponse {
    const message = createBaseListTransactionsResponse();
    message.transactions = object.transactions?.map((e) => Transaction.fromPartial(e)) || [];
    return message;
  },
};

export type TransactionServiceService = typeof TransactionServiceService;
export const TransactionServiceService = {
  sendPayment: {
    path: "/cutchin_cash.transaction.TransactionService/SendPayment",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: SendPaymentRequest) => Buffer.from(SendPaymentRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => SendPaymentRequest.decode(value),
    responseSerialize: (value: SendPaymentResponse) => Buffer.from(SendPaymentResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => SendPaymentResponse.decode(value),
  },
  demandPayment: {
    path: "/cutchin_cash.transaction.TransactionService/DemandPayment",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: DemandPaymentRequest) => Buffer.from(DemandPaymentRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => DemandPaymentRequest.decode(value),
    responseSerialize: (value: DemandPaymentResponse) => Buffer.from(DemandPaymentResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => DemandPaymentResponse.decode(value),
  },
  decisionPayment: {
    path: "/cutchin_cash.transaction.TransactionService/DecisionPayment",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: DecisionPaymentRequest) => Buffer.from(DecisionPaymentRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => DecisionPaymentRequest.decode(value),
    responseSerialize: (value: DecisionPaymentResponse) => Buffer.from(DecisionPaymentResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => DecisionPaymentResponse.decode(value),
  },
  listTransactions: {
    path: "/cutchin_cash.transaction.TransactionService/ListTransactions",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: ListTransactionsRequest) => Buffer.from(ListTransactionsRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => ListTransactionsRequest.decode(value),
    responseSerialize: (value: ListTransactionsResponse) =>
      Buffer.from(ListTransactionsResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => ListTransactionsResponse.decode(value),
  },
} as const;

export interface TransactionServiceServer extends UntypedServiceImplementation {
  sendPayment: handleUnaryCall<SendPaymentRequest, SendPaymentResponse>;
  demandPayment: handleUnaryCall<DemandPaymentRequest, DemandPaymentResponse>;
  decisionPayment: handleUnaryCall<DecisionPaymentRequest, DecisionPaymentResponse>;
  listTransactions: handleUnaryCall<ListTransactionsRequest, ListTransactionsResponse>;
}

export interface TransactionServiceClient extends Client {
  sendPayment(
    request: SendPaymentRequest,
    callback: (error: ServiceError | null, response: SendPaymentResponse) => void,
  ): ClientUnaryCall;
  sendPayment(
    request: SendPaymentRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: SendPaymentResponse) => void,
  ): ClientUnaryCall;
  sendPayment(
    request: SendPaymentRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: SendPaymentResponse) => void,
  ): ClientUnaryCall;
  demandPayment(
    request: DemandPaymentRequest,
    callback: (error: ServiceError | null, response: DemandPaymentResponse) => void,
  ): ClientUnaryCall;
  demandPayment(
    request: DemandPaymentRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: DemandPaymentResponse) => void,
  ): ClientUnaryCall;
  demandPayment(
    request: DemandPaymentRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: DemandPaymentResponse) => void,
  ): ClientUnaryCall;
  decisionPayment(
    request: DecisionPaymentRequest,
    callback: (error: ServiceError | null, response: DecisionPaymentResponse) => void,
  ): ClientUnaryCall;
  decisionPayment(
    request: DecisionPaymentRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: DecisionPaymentResponse) => void,
  ): ClientUnaryCall;
  decisionPayment(
    request: DecisionPaymentRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: DecisionPaymentResponse) => void,
  ): ClientUnaryCall;
  listTransactions(
    request: ListTransactionsRequest,
    callback: (error: ServiceError | null, response: ListTransactionsResponse) => void,
  ): ClientUnaryCall;
  listTransactions(
    request: ListTransactionsRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: ListTransactionsResponse) => void,
  ): ClientUnaryCall;
  listTransactions(
    request: ListTransactionsRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: ListTransactionsResponse) => void,
  ): ClientUnaryCall;
}

export const TransactionServiceClient = makeGenericClientConstructor(
  TransactionServiceService,
  "cutchin_cash.transaction.TransactionService",
) as unknown as {
  new (address: string, credentials: ChannelCredentials, options?: Partial<ClientOptions>): TransactionServiceClient;
  service: typeof TransactionServiceService;
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
