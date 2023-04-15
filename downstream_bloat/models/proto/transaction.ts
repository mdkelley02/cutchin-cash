// @generated by protobuf-ts 2.8.3
// @generated from protobuf file "transaction.proto" (package "cutchin_cash.transaction", syntax proto3)
// tslint:disable
import { ServiceType } from "@protobuf-ts/runtime-rpc";
import type { BinaryWriteOptions } from "@protobuf-ts/runtime";
import type { IBinaryWriter } from "@protobuf-ts/runtime";
import { WireType } from "@protobuf-ts/runtime";
import type { BinaryReadOptions } from "@protobuf-ts/runtime";
import type { IBinaryReader } from "@protobuf-ts/runtime";
import { UnknownFieldHandler } from "@protobuf-ts/runtime";
import type { PartialMessage } from "@protobuf-ts/runtime";
import { reflectionMergePartial } from "@protobuf-ts/runtime";
import { MESSAGE_TYPE } from "@protobuf-ts/runtime";
import { MessageType } from "@protobuf-ts/runtime";
import { TransactionStatus } from "./common";
import { Transaction } from "./common";
import { Money } from "./common";
/**
 * @generated from protobuf message cutchin_cash.transaction.SendPaymentRequest
 */
export interface SendPaymentRequest {
    /**
     * @generated from protobuf field: string receivingUserId = 2;
     */
    receivingUserId: string;
    /**
     * @generated from protobuf field: string description = 3;
     */
    description: string;
    /**
     * @generated from protobuf field: cutchin_cash.common.Money amount = 4;
     */
    amount?: Money;
}
/**
 * @generated from protobuf message cutchin_cash.transaction.SendPaymentResponse
 */
export interface SendPaymentResponse {
    /**
     * @generated from protobuf field: cutchin_cash.common.Transaction transaction = 1;
     */
    transaction?: Transaction;
}
/**
 * @generated from protobuf message cutchin_cash.transaction.DemandPaymentRequest
 */
export interface DemandPaymentRequest {
    /**
     * @generated from protobuf field: string payingUserId = 1;
     */
    payingUserId: string;
    /**
     * @generated from protobuf field: string description = 2;
     */
    description: string;
    /**
     * @generated from protobuf field: cutchin_cash.common.Money amount = 3;
     */
    amount?: Money;
}
/**
 * @generated from protobuf message cutchin_cash.transaction.DemandPaymentResponse
 */
export interface DemandPaymentResponse {
    /**
     * @generated from protobuf field: cutchin_cash.common.Transaction transaction = 1;
     */
    transaction?: Transaction;
}
/**
 * @generated from protobuf message cutchin_cash.transaction.DecisionPaymentRequest
 */
export interface DecisionPaymentRequest {
    /**
     * @generated from protobuf field: string transactionId = 1;
     */
    transactionId: string;
    /**
     * @generated from protobuf field: cutchin_cash.common.TransactionStatus status = 2;
     */
    status: TransactionStatus;
}
/**
 * @generated from protobuf message cutchin_cash.transaction.DecisionPaymentResponse
 */
export interface DecisionPaymentResponse {
    /**
     * @generated from protobuf field: cutchin_cash.common.Transaction transaction = 1;
     */
    transaction?: Transaction;
}
/**
 * @generated from protobuf message cutchin_cash.transaction.ListTransactionsRequest
 */
export interface ListTransactionsRequest {
    /**
     * @generated from protobuf field: string userId = 1;
     */
    userId: string;
}
/**
 * @generated from protobuf message cutchin_cash.transaction.ListTransactionsResponse
 */
export interface ListTransactionsResponse {
    /**
     * @generated from protobuf field: repeated cutchin_cash.common.Transaction transactions = 1;
     */
    transactions: Transaction[];
}
// @generated message type with reflection information, may provide speed optimized methods
class SendPaymentRequest$Type extends MessageType<SendPaymentRequest> {
    constructor() {
        super("cutchin_cash.transaction.SendPaymentRequest", [
            { no: 2, name: "receivingUserId", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 3, name: "description", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 4, name: "amount", kind: "message", T: () => Money }
        ]);
    }
    create(value?: PartialMessage<SendPaymentRequest>): SendPaymentRequest {
        const message = { receivingUserId: "", description: "" };
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<SendPaymentRequest>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: SendPaymentRequest): SendPaymentRequest {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* string receivingUserId */ 2:
                    message.receivingUserId = reader.string();
                    break;
                case /* string description */ 3:
                    message.description = reader.string();
                    break;
                case /* cutchin_cash.common.Money amount */ 4:
                    message.amount = Money.internalBinaryRead(reader, reader.uint32(), options, message.amount);
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: SendPaymentRequest, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* string receivingUserId = 2; */
        if (message.receivingUserId !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.receivingUserId);
        /* string description = 3; */
        if (message.description !== "")
            writer.tag(3, WireType.LengthDelimited).string(message.description);
        /* cutchin_cash.common.Money amount = 4; */
        if (message.amount)
            Money.internalBinaryWrite(message.amount, writer.tag(4, WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message cutchin_cash.transaction.SendPaymentRequest
 */
export const SendPaymentRequest = new SendPaymentRequest$Type();
// @generated message type with reflection information, may provide speed optimized methods
class SendPaymentResponse$Type extends MessageType<SendPaymentResponse> {
    constructor() {
        super("cutchin_cash.transaction.SendPaymentResponse", [
            { no: 1, name: "transaction", kind: "message", T: () => Transaction }
        ]);
    }
    create(value?: PartialMessage<SendPaymentResponse>): SendPaymentResponse {
        const message = {};
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<SendPaymentResponse>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: SendPaymentResponse): SendPaymentResponse {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* cutchin_cash.common.Transaction transaction */ 1:
                    message.transaction = Transaction.internalBinaryRead(reader, reader.uint32(), options, message.transaction);
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: SendPaymentResponse, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* cutchin_cash.common.Transaction transaction = 1; */
        if (message.transaction)
            Transaction.internalBinaryWrite(message.transaction, writer.tag(1, WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message cutchin_cash.transaction.SendPaymentResponse
 */
export const SendPaymentResponse = new SendPaymentResponse$Type();
// @generated message type with reflection information, may provide speed optimized methods
class DemandPaymentRequest$Type extends MessageType<DemandPaymentRequest> {
    constructor() {
        super("cutchin_cash.transaction.DemandPaymentRequest", [
            { no: 1, name: "payingUserId", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "description", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 3, name: "amount", kind: "message", T: () => Money }
        ]);
    }
    create(value?: PartialMessage<DemandPaymentRequest>): DemandPaymentRequest {
        const message = { payingUserId: "", description: "" };
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<DemandPaymentRequest>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: DemandPaymentRequest): DemandPaymentRequest {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* string payingUserId */ 1:
                    message.payingUserId = reader.string();
                    break;
                case /* string description */ 2:
                    message.description = reader.string();
                    break;
                case /* cutchin_cash.common.Money amount */ 3:
                    message.amount = Money.internalBinaryRead(reader, reader.uint32(), options, message.amount);
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: DemandPaymentRequest, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* string payingUserId = 1; */
        if (message.payingUserId !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.payingUserId);
        /* string description = 2; */
        if (message.description !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.description);
        /* cutchin_cash.common.Money amount = 3; */
        if (message.amount)
            Money.internalBinaryWrite(message.amount, writer.tag(3, WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message cutchin_cash.transaction.DemandPaymentRequest
 */
export const DemandPaymentRequest = new DemandPaymentRequest$Type();
// @generated message type with reflection information, may provide speed optimized methods
class DemandPaymentResponse$Type extends MessageType<DemandPaymentResponse> {
    constructor() {
        super("cutchin_cash.transaction.DemandPaymentResponse", [
            { no: 1, name: "transaction", kind: "message", T: () => Transaction }
        ]);
    }
    create(value?: PartialMessage<DemandPaymentResponse>): DemandPaymentResponse {
        const message = {};
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<DemandPaymentResponse>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: DemandPaymentResponse): DemandPaymentResponse {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* cutchin_cash.common.Transaction transaction */ 1:
                    message.transaction = Transaction.internalBinaryRead(reader, reader.uint32(), options, message.transaction);
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: DemandPaymentResponse, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* cutchin_cash.common.Transaction transaction = 1; */
        if (message.transaction)
            Transaction.internalBinaryWrite(message.transaction, writer.tag(1, WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message cutchin_cash.transaction.DemandPaymentResponse
 */
export const DemandPaymentResponse = new DemandPaymentResponse$Type();
// @generated message type with reflection information, may provide speed optimized methods
class DecisionPaymentRequest$Type extends MessageType<DecisionPaymentRequest> {
    constructor() {
        super("cutchin_cash.transaction.DecisionPaymentRequest", [
            { no: 1, name: "transactionId", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "status", kind: "enum", T: () => ["cutchin_cash.common.TransactionStatus", TransactionStatus] }
        ]);
    }
    create(value?: PartialMessage<DecisionPaymentRequest>): DecisionPaymentRequest {
        const message = { transactionId: "", status: 0 };
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<DecisionPaymentRequest>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: DecisionPaymentRequest): DecisionPaymentRequest {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* string transactionId */ 1:
                    message.transactionId = reader.string();
                    break;
                case /* cutchin_cash.common.TransactionStatus status */ 2:
                    message.status = reader.int32();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: DecisionPaymentRequest, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* string transactionId = 1; */
        if (message.transactionId !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.transactionId);
        /* cutchin_cash.common.TransactionStatus status = 2; */
        if (message.status !== 0)
            writer.tag(2, WireType.Varint).int32(message.status);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message cutchin_cash.transaction.DecisionPaymentRequest
 */
export const DecisionPaymentRequest = new DecisionPaymentRequest$Type();
// @generated message type with reflection information, may provide speed optimized methods
class DecisionPaymentResponse$Type extends MessageType<DecisionPaymentResponse> {
    constructor() {
        super("cutchin_cash.transaction.DecisionPaymentResponse", [
            { no: 1, name: "transaction", kind: "message", T: () => Transaction }
        ]);
    }
    create(value?: PartialMessage<DecisionPaymentResponse>): DecisionPaymentResponse {
        const message = {};
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<DecisionPaymentResponse>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: DecisionPaymentResponse): DecisionPaymentResponse {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* cutchin_cash.common.Transaction transaction */ 1:
                    message.transaction = Transaction.internalBinaryRead(reader, reader.uint32(), options, message.transaction);
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: DecisionPaymentResponse, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* cutchin_cash.common.Transaction transaction = 1; */
        if (message.transaction)
            Transaction.internalBinaryWrite(message.transaction, writer.tag(1, WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message cutchin_cash.transaction.DecisionPaymentResponse
 */
export const DecisionPaymentResponse = new DecisionPaymentResponse$Type();
// @generated message type with reflection information, may provide speed optimized methods
class ListTransactionsRequest$Type extends MessageType<ListTransactionsRequest> {
    constructor() {
        super("cutchin_cash.transaction.ListTransactionsRequest", [
            { no: 1, name: "userId", kind: "scalar", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
    create(value?: PartialMessage<ListTransactionsRequest>): ListTransactionsRequest {
        const message = { userId: "" };
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<ListTransactionsRequest>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: ListTransactionsRequest): ListTransactionsRequest {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* string userId */ 1:
                    message.userId = reader.string();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: ListTransactionsRequest, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* string userId = 1; */
        if (message.userId !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.userId);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message cutchin_cash.transaction.ListTransactionsRequest
 */
export const ListTransactionsRequest = new ListTransactionsRequest$Type();
// @generated message type with reflection information, may provide speed optimized methods
class ListTransactionsResponse$Type extends MessageType<ListTransactionsResponse> {
    constructor() {
        super("cutchin_cash.transaction.ListTransactionsResponse", [
            { no: 1, name: "transactions", kind: "message", repeat: 1 /*RepeatType.PACKED*/, T: () => Transaction }
        ]);
    }
    create(value?: PartialMessage<ListTransactionsResponse>): ListTransactionsResponse {
        const message = { transactions: [] };
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<ListTransactionsResponse>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: ListTransactionsResponse): ListTransactionsResponse {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* repeated cutchin_cash.common.Transaction transactions */ 1:
                    message.transactions.push(Transaction.internalBinaryRead(reader, reader.uint32(), options));
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: ListTransactionsResponse, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* repeated cutchin_cash.common.Transaction transactions = 1; */
        for (let i = 0; i < message.transactions.length; i++)
            Transaction.internalBinaryWrite(message.transactions[i], writer.tag(1, WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message cutchin_cash.transaction.ListTransactionsResponse
 */
export const ListTransactionsResponse = new ListTransactionsResponse$Type();
/**
 * @generated ServiceType for protobuf service cutchin_cash.transaction.TransactionService
 */
export const TransactionService = new ServiceType("cutchin_cash.transaction.TransactionService", [
    { name: "SendPayment", options: {}, I: SendPaymentRequest, O: SendPaymentResponse },
    { name: "DemandPayment", options: {}, I: DemandPaymentRequest, O: DemandPaymentResponse },
    { name: "DecisionPayment", options: {}, I: DecisionPaymentRequest, O: DecisionPaymentResponse },
    { name: "ListTransactions", options: {}, I: ListTransactionsRequest, O: ListTransactionsResponse }
]);
