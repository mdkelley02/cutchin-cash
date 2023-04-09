/* eslint-disable */
import _m0 from "protobufjs/minimal";

export enum TransactionStatus {
  UNKNOWN = 0,
  PENDING = 1,
  ACCEPTED = 2,
  REJECTED = 3,
  UNRECOGNIZED = -1,
}

export function transactionStatusFromJSON(object: any): TransactionStatus {
  switch (object) {
    case 0:
    case "UNKNOWN":
      return TransactionStatus.UNKNOWN;
    case 1:
    case "PENDING":
      return TransactionStatus.PENDING;
    case 2:
    case "ACCEPTED":
      return TransactionStatus.ACCEPTED;
    case 3:
    case "REJECTED":
      return TransactionStatus.REJECTED;
    case -1:
    case "UNRECOGNIZED":
    default:
      return TransactionStatus.UNRECOGNIZED;
  }
}

export function transactionStatusToJSON(object: TransactionStatus): string {
  switch (object) {
    case TransactionStatus.UNKNOWN:
      return "UNKNOWN";
    case TransactionStatus.PENDING:
      return "PENDING";
    case TransactionStatus.ACCEPTED:
      return "ACCEPTED";
    case TransactionStatus.REJECTED:
      return "REJECTED";
    case TransactionStatus.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export enum ErrorType {
  INVALID_CREDENTIALS = 0,
  PAYING_USER_NOT_FOUND = 1,
  RECEIVING_USER_NOT_FOUND = 2,
  CANNOT_SEND_TO_SELF = 3,
  TRANSACTION_NOT_FOUND = 4,
  TRANSACTION_ALREADY_DECISIONED = 5,
  INSUFFICIENT_BALANCE = 6,
  INVALID_AMOUNT = 7,
  UNRECOGNIZED = -1,
}

export function errorTypeFromJSON(object: any): ErrorType {
  switch (object) {
    case 0:
    case "INVALID_CREDENTIALS":
      return ErrorType.INVALID_CREDENTIALS;
    case 1:
    case "PAYING_USER_NOT_FOUND":
      return ErrorType.PAYING_USER_NOT_FOUND;
    case 2:
    case "RECEIVING_USER_NOT_FOUND":
      return ErrorType.RECEIVING_USER_NOT_FOUND;
    case 3:
    case "CANNOT_SEND_TO_SELF":
      return ErrorType.CANNOT_SEND_TO_SELF;
    case 4:
    case "TRANSACTION_NOT_FOUND":
      return ErrorType.TRANSACTION_NOT_FOUND;
    case 5:
    case "TRANSACTION_ALREADY_DECISIONED":
      return ErrorType.TRANSACTION_ALREADY_DECISIONED;
    case 6:
    case "INSUFFICIENT_BALANCE":
      return ErrorType.INSUFFICIENT_BALANCE;
    case 7:
    case "INVALID_AMOUNT":
      return ErrorType.INVALID_AMOUNT;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ErrorType.UNRECOGNIZED;
  }
}

export function errorTypeToJSON(object: ErrorType): string {
  switch (object) {
    case ErrorType.INVALID_CREDENTIALS:
      return "INVALID_CREDENTIALS";
    case ErrorType.PAYING_USER_NOT_FOUND:
      return "PAYING_USER_NOT_FOUND";
    case ErrorType.RECEIVING_USER_NOT_FOUND:
      return "RECEIVING_USER_NOT_FOUND";
    case ErrorType.CANNOT_SEND_TO_SELF:
      return "CANNOT_SEND_TO_SELF";
    case ErrorType.TRANSACTION_NOT_FOUND:
      return "TRANSACTION_NOT_FOUND";
    case ErrorType.TRANSACTION_ALREADY_DECISIONED:
      return "TRANSACTION_ALREADY_DECISIONED";
    case ErrorType.INSUFFICIENT_BALANCE:
      return "INSUFFICIENT_BALANCE";
    case ErrorType.INVALID_AMOUNT:
      return "INVALID_AMOUNT";
    case ErrorType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface User {
  userId: string;
  displayName: string;
  fullName: string;
  email: string;
  balance?: Money;
}

export interface PrivateUser {
  userId: string;
  displayName: string;
  fullName: string;
}

export interface Money {
  whole: number;
  fraction: number;
}

export interface Transaction {
  transactionId: string;
  receivingUserId: string;
  payingUserId: string;
  description: string;
  amount?: Money;
  timestamp: string;
  status: TransactionStatus;
}

export interface Empty {
}

export interface Token {
  token: string;
}

function createBaseUser(): User {
  return { userId: "", displayName: "", fullName: "", email: "", balance: undefined };
}

export const User = {
  encode(message: User, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.userId !== "") {
      writer.uint32(10).string(message.userId);
    }
    if (message.displayName !== "") {
      writer.uint32(18).string(message.displayName);
    }
    if (message.fullName !== "") {
      writer.uint32(26).string(message.fullName);
    }
    if (message.email !== "") {
      writer.uint32(34).string(message.email);
    }
    if (message.balance !== undefined) {
      Money.encode(message.balance, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): User {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUser();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.userId = reader.string();
          continue;
        case 2:
          if (tag != 18) {
            break;
          }

          message.displayName = reader.string();
          continue;
        case 3:
          if (tag != 26) {
            break;
          }

          message.fullName = reader.string();
          continue;
        case 4:
          if (tag != 34) {
            break;
          }

          message.email = reader.string();
          continue;
        case 5:
          if (tag != 42) {
            break;
          }

          message.balance = Money.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): User {
    return {
      userId: isSet(object.userId) ? String(object.userId) : "",
      displayName: isSet(object.displayName) ? String(object.displayName) : "",
      fullName: isSet(object.fullName) ? String(object.fullName) : "",
      email: isSet(object.email) ? String(object.email) : "",
      balance: isSet(object.balance) ? Money.fromJSON(object.balance) : undefined,
    };
  },

  toJSON(message: User): unknown {
    const obj: any = {};
    message.userId !== undefined && (obj.userId = message.userId);
    message.displayName !== undefined && (obj.displayName = message.displayName);
    message.fullName !== undefined && (obj.fullName = message.fullName);
    message.email !== undefined && (obj.email = message.email);
    message.balance !== undefined && (obj.balance = message.balance ? Money.toJSON(message.balance) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<User>, I>>(base?: I): User {
    return User.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<User>, I>>(object: I): User {
    const message = createBaseUser();
    message.userId = object.userId ?? "";
    message.displayName = object.displayName ?? "";
    message.fullName = object.fullName ?? "";
    message.email = object.email ?? "";
    message.balance = (object.balance !== undefined && object.balance !== null)
      ? Money.fromPartial(object.balance)
      : undefined;
    return message;
  },
};

function createBasePrivateUser(): PrivateUser {
  return { userId: "", displayName: "", fullName: "" };
}

export const PrivateUser = {
  encode(message: PrivateUser, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.userId !== "") {
      writer.uint32(10).string(message.userId);
    }
    if (message.displayName !== "") {
      writer.uint32(18).string(message.displayName);
    }
    if (message.fullName !== "") {
      writer.uint32(26).string(message.fullName);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PrivateUser {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePrivateUser();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.userId = reader.string();
          continue;
        case 2:
          if (tag != 18) {
            break;
          }

          message.displayName = reader.string();
          continue;
        case 3:
          if (tag != 26) {
            break;
          }

          message.fullName = reader.string();
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): PrivateUser {
    return {
      userId: isSet(object.userId) ? String(object.userId) : "",
      displayName: isSet(object.displayName) ? String(object.displayName) : "",
      fullName: isSet(object.fullName) ? String(object.fullName) : "",
    };
  },

  toJSON(message: PrivateUser): unknown {
    const obj: any = {};
    message.userId !== undefined && (obj.userId = message.userId);
    message.displayName !== undefined && (obj.displayName = message.displayName);
    message.fullName !== undefined && (obj.fullName = message.fullName);
    return obj;
  },

  create<I extends Exact<DeepPartial<PrivateUser>, I>>(base?: I): PrivateUser {
    return PrivateUser.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<PrivateUser>, I>>(object: I): PrivateUser {
    const message = createBasePrivateUser();
    message.userId = object.userId ?? "";
    message.displayName = object.displayName ?? "";
    message.fullName = object.fullName ?? "";
    return message;
  },
};

function createBaseMoney(): Money {
  return { whole: 0, fraction: 0 };
}

export const Money = {
  encode(message: Money, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.whole !== 0) {
      writer.uint32(8).sint32(message.whole);
    }
    if (message.fraction !== 0) {
      writer.uint32(16).int32(message.fraction);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Money {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMoney();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 8) {
            break;
          }

          message.whole = reader.sint32();
          continue;
        case 2:
          if (tag != 16) {
            break;
          }

          message.fraction = reader.int32();
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Money {
    return {
      whole: isSet(object.whole) ? Number(object.whole) : 0,
      fraction: isSet(object.fraction) ? Number(object.fraction) : 0,
    };
  },

  toJSON(message: Money): unknown {
    const obj: any = {};
    message.whole !== undefined && (obj.whole = Math.round(message.whole));
    message.fraction !== undefined && (obj.fraction = Math.round(message.fraction));
    return obj;
  },

  create<I extends Exact<DeepPartial<Money>, I>>(base?: I): Money {
    return Money.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<Money>, I>>(object: I): Money {
    const message = createBaseMoney();
    message.whole = object.whole ?? 0;
    message.fraction = object.fraction ?? 0;
    return message;
  },
};

function createBaseTransaction(): Transaction {
  return {
    transactionId: "",
    receivingUserId: "",
    payingUserId: "",
    description: "",
    amount: undefined,
    timestamp: "",
    status: 0,
  };
}

export const Transaction = {
  encode(message: Transaction, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.transactionId !== "") {
      writer.uint32(10).string(message.transactionId);
    }
    if (message.receivingUserId !== "") {
      writer.uint32(18).string(message.receivingUserId);
    }
    if (message.payingUserId !== "") {
      writer.uint32(26).string(message.payingUserId);
    }
    if (message.description !== "") {
      writer.uint32(34).string(message.description);
    }
    if (message.amount !== undefined) {
      Money.encode(message.amount, writer.uint32(42).fork()).ldelim();
    }
    if (message.timestamp !== "") {
      writer.uint32(50).string(message.timestamp);
    }
    if (message.status !== 0) {
      writer.uint32(56).int32(message.status);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Transaction {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTransaction();
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
          if (tag != 18) {
            break;
          }

          message.receivingUserId = reader.string();
          continue;
        case 3:
          if (tag != 26) {
            break;
          }

          message.payingUserId = reader.string();
          continue;
        case 4:
          if (tag != 34) {
            break;
          }

          message.description = reader.string();
          continue;
        case 5:
          if (tag != 42) {
            break;
          }

          message.amount = Money.decode(reader, reader.uint32());
          continue;
        case 6:
          if (tag != 50) {
            break;
          }

          message.timestamp = reader.string();
          continue;
        case 7:
          if (tag != 56) {
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

  fromJSON(object: any): Transaction {
    return {
      transactionId: isSet(object.transactionId) ? String(object.transactionId) : "",
      receivingUserId: isSet(object.receivingUserId) ? String(object.receivingUserId) : "",
      payingUserId: isSet(object.payingUserId) ? String(object.payingUserId) : "",
      description: isSet(object.description) ? String(object.description) : "",
      amount: isSet(object.amount) ? Money.fromJSON(object.amount) : undefined,
      timestamp: isSet(object.timestamp) ? String(object.timestamp) : "",
      status: isSet(object.status) ? transactionStatusFromJSON(object.status) : 0,
    };
  },

  toJSON(message: Transaction): unknown {
    const obj: any = {};
    message.transactionId !== undefined && (obj.transactionId = message.transactionId);
    message.receivingUserId !== undefined && (obj.receivingUserId = message.receivingUserId);
    message.payingUserId !== undefined && (obj.payingUserId = message.payingUserId);
    message.description !== undefined && (obj.description = message.description);
    message.amount !== undefined && (obj.amount = message.amount ? Money.toJSON(message.amount) : undefined);
    message.timestamp !== undefined && (obj.timestamp = message.timestamp);
    message.status !== undefined && (obj.status = transactionStatusToJSON(message.status));
    return obj;
  },

  create<I extends Exact<DeepPartial<Transaction>, I>>(base?: I): Transaction {
    return Transaction.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<Transaction>, I>>(object: I): Transaction {
    const message = createBaseTransaction();
    message.transactionId = object.transactionId ?? "";
    message.receivingUserId = object.receivingUserId ?? "";
    message.payingUserId = object.payingUserId ?? "";
    message.description = object.description ?? "";
    message.amount = (object.amount !== undefined && object.amount !== null)
      ? Money.fromPartial(object.amount)
      : undefined;
    message.timestamp = object.timestamp ?? "";
    message.status = object.status ?? 0;
    return message;
  },
};

function createBaseEmpty(): Empty {
  return {};
}

export const Empty = {
  encode(_: Empty, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Empty {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEmpty();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): Empty {
    return {};
  },

  toJSON(_: Empty): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<Empty>, I>>(base?: I): Empty {
    return Empty.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<Empty>, I>>(_: I): Empty {
    const message = createBaseEmpty();
    return message;
  },
};

function createBaseToken(): Token {
  return { token: "" };
}

export const Token = {
  encode(message: Token, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.token !== "") {
      writer.uint32(10).string(message.token);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Token {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseToken();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.token = reader.string();
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Token {
    return { token: isSet(object.token) ? String(object.token) : "" };
  },

  toJSON(message: Token): unknown {
    const obj: any = {};
    message.token !== undefined && (obj.token = message.token);
    return obj;
  },

  create<I extends Exact<DeepPartial<Token>, I>>(base?: I): Token {
    return Token.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<Token>, I>>(object: I): Token {
    const message = createBaseToken();
    message.token = object.token ?? "";
    return message;
  },
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
