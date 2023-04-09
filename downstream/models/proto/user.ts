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
import { Empty, Money, PrivateUser, User } from "./common";

export interface GetUserRequest {
  userId: string;
}

export interface GetUserResponse {
  user?: User;
}

export interface GetAllUsersResponse {
  users: PrivateUser[];
}

export interface AddFundsRequest {
  amount?: Money;
}

export interface AddFundsResponse {
  user?: User;
}

function createBaseGetUserRequest(): GetUserRequest {
  return { userId: "" };
}

export const GetUserRequest = {
  encode(message: GetUserRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.userId !== "") {
      writer.uint32(10).string(message.userId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetUserRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetUserRequest();
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

  fromJSON(object: any): GetUserRequest {
    return { userId: isSet(object.userId) ? String(object.userId) : "" };
  },

  toJSON(message: GetUserRequest): unknown {
    const obj: any = {};
    message.userId !== undefined && (obj.userId = message.userId);
    return obj;
  },

  create<I extends Exact<DeepPartial<GetUserRequest>, I>>(base?: I): GetUserRequest {
    return GetUserRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<GetUserRequest>, I>>(object: I): GetUserRequest {
    const message = createBaseGetUserRequest();
    message.userId = object.userId ?? "";
    return message;
  },
};

function createBaseGetUserResponse(): GetUserResponse {
  return { user: undefined };
}

export const GetUserResponse = {
  encode(message: GetUserResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.user !== undefined) {
      User.encode(message.user, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetUserResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetUserResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.user = User.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetUserResponse {
    return { user: isSet(object.user) ? User.fromJSON(object.user) : undefined };
  },

  toJSON(message: GetUserResponse): unknown {
    const obj: any = {};
    message.user !== undefined && (obj.user = message.user ? User.toJSON(message.user) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<GetUserResponse>, I>>(base?: I): GetUserResponse {
    return GetUserResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<GetUserResponse>, I>>(object: I): GetUserResponse {
    const message = createBaseGetUserResponse();
    message.user = (object.user !== undefined && object.user !== null) ? User.fromPartial(object.user) : undefined;
    return message;
  },
};

function createBaseGetAllUsersResponse(): GetAllUsersResponse {
  return { users: [] };
}

export const GetAllUsersResponse = {
  encode(message: GetAllUsersResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.users) {
      PrivateUser.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetAllUsersResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetAllUsersResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.users.push(PrivateUser.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetAllUsersResponse {
    return { users: Array.isArray(object?.users) ? object.users.map((e: any) => PrivateUser.fromJSON(e)) : [] };
  },

  toJSON(message: GetAllUsersResponse): unknown {
    const obj: any = {};
    if (message.users) {
      obj.users = message.users.map((e) => e ? PrivateUser.toJSON(e) : undefined);
    } else {
      obj.users = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetAllUsersResponse>, I>>(base?: I): GetAllUsersResponse {
    return GetAllUsersResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<GetAllUsersResponse>, I>>(object: I): GetAllUsersResponse {
    const message = createBaseGetAllUsersResponse();
    message.users = object.users?.map((e) => PrivateUser.fromPartial(e)) || [];
    return message;
  },
};

function createBaseAddFundsRequest(): AddFundsRequest {
  return { amount: undefined };
}

export const AddFundsRequest = {
  encode(message: AddFundsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.amount !== undefined) {
      Money.encode(message.amount, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AddFundsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAddFundsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
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

  fromJSON(object: any): AddFundsRequest {
    return { amount: isSet(object.amount) ? Money.fromJSON(object.amount) : undefined };
  },

  toJSON(message: AddFundsRequest): unknown {
    const obj: any = {};
    message.amount !== undefined && (obj.amount = message.amount ? Money.toJSON(message.amount) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<AddFundsRequest>, I>>(base?: I): AddFundsRequest {
    return AddFundsRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<AddFundsRequest>, I>>(object: I): AddFundsRequest {
    const message = createBaseAddFundsRequest();
    message.amount = (object.amount !== undefined && object.amount !== null)
      ? Money.fromPartial(object.amount)
      : undefined;
    return message;
  },
};

function createBaseAddFundsResponse(): AddFundsResponse {
  return { user: undefined };
}

export const AddFundsResponse = {
  encode(message: AddFundsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.user !== undefined) {
      User.encode(message.user, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AddFundsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAddFundsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.user = User.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AddFundsResponse {
    return { user: isSet(object.user) ? User.fromJSON(object.user) : undefined };
  },

  toJSON(message: AddFundsResponse): unknown {
    const obj: any = {};
    message.user !== undefined && (obj.user = message.user ? User.toJSON(message.user) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<AddFundsResponse>, I>>(base?: I): AddFundsResponse {
    return AddFundsResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<AddFundsResponse>, I>>(object: I): AddFundsResponse {
    const message = createBaseAddFundsResponse();
    message.user = (object.user !== undefined && object.user !== null) ? User.fromPartial(object.user) : undefined;
    return message;
  },
};

export type UserServiceService = typeof UserServiceService;
export const UserServiceService = {
  addFunds: {
    path: "/cutchin_cash.user.UserService/AddFunds",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: AddFundsRequest) => Buffer.from(AddFundsRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => AddFundsRequest.decode(value),
    responseSerialize: (value: AddFundsResponse) => Buffer.from(AddFundsResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => AddFundsResponse.decode(value),
  },
  getUser: {
    path: "/cutchin_cash.user.UserService/GetUser",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: GetUserRequest) => Buffer.from(GetUserRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => GetUserRequest.decode(value),
    responseSerialize: (value: GetUserResponse) => Buffer.from(GetUserResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => GetUserResponse.decode(value),
  },
  getAllUsers: {
    path: "/cutchin_cash.user.UserService/GetAllUsers",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: Empty) => Buffer.from(Empty.encode(value).finish()),
    requestDeserialize: (value: Buffer) => Empty.decode(value),
    responseSerialize: (value: GetAllUsersResponse) => Buffer.from(GetAllUsersResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => GetAllUsersResponse.decode(value),
  },
} as const;

export interface UserServiceServer extends UntypedServiceImplementation {
  addFunds: handleUnaryCall<AddFundsRequest, AddFundsResponse>;
  getUser: handleUnaryCall<GetUserRequest, GetUserResponse>;
  getAllUsers: handleUnaryCall<Empty, GetAllUsersResponse>;
}

export interface UserServiceClient extends Client {
  addFunds(
    request: AddFundsRequest,
    callback: (error: ServiceError | null, response: AddFundsResponse) => void,
  ): ClientUnaryCall;
  addFunds(
    request: AddFundsRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: AddFundsResponse) => void,
  ): ClientUnaryCall;
  addFunds(
    request: AddFundsRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: AddFundsResponse) => void,
  ): ClientUnaryCall;
  getUser(
    request: GetUserRequest,
    callback: (error: ServiceError | null, response: GetUserResponse) => void,
  ): ClientUnaryCall;
  getUser(
    request: GetUserRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: GetUserResponse) => void,
  ): ClientUnaryCall;
  getUser(
    request: GetUserRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: GetUserResponse) => void,
  ): ClientUnaryCall;
  getAllUsers(
    request: Empty,
    callback: (error: ServiceError | null, response: GetAllUsersResponse) => void,
  ): ClientUnaryCall;
  getAllUsers(
    request: Empty,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: GetAllUsersResponse) => void,
  ): ClientUnaryCall;
  getAllUsers(
    request: Empty,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: GetAllUsersResponse) => void,
  ): ClientUnaryCall;
}

export const UserServiceClient = makeGenericClientConstructor(
  UserServiceService,
  "cutchin_cash.user.UserService",
) as unknown as {
  new (address: string, credentials: ChannelCredentials, options?: Partial<ClientOptions>): UserServiceClient;
  service: typeof UserServiceService;
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
