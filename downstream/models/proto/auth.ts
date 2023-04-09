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
import { Token, User } from "./common";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  displayName: string;
  fullName: string;
}

export interface RegisterResponse {
  user?: User;
  token?: Token;
}

function createBaseLoginRequest(): LoginRequest {
  return { email: "", password: "" };
}

export const LoginRequest = {
  encode(message: LoginRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.email !== "") {
      writer.uint32(10).string(message.email);
    }
    if (message.password !== "") {
      writer.uint32(18).string(message.password);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LoginRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLoginRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.email = reader.string();
          continue;
        case 2:
          if (tag != 18) {
            break;
          }

          message.password = reader.string();
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): LoginRequest {
    return {
      email: isSet(object.email) ? String(object.email) : "",
      password: isSet(object.password) ? String(object.password) : "",
    };
  },

  toJSON(message: LoginRequest): unknown {
    const obj: any = {};
    message.email !== undefined && (obj.email = message.email);
    message.password !== undefined && (obj.password = message.password);
    return obj;
  },

  create<I extends Exact<DeepPartial<LoginRequest>, I>>(base?: I): LoginRequest {
    return LoginRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<LoginRequest>, I>>(object: I): LoginRequest {
    const message = createBaseLoginRequest();
    message.email = object.email ?? "";
    message.password = object.password ?? "";
    return message;
  },
};

function createBaseRegisterRequest(): RegisterRequest {
  return { email: "", password: "", displayName: "", fullName: "" };
}

export const RegisterRequest = {
  encode(message: RegisterRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.email !== "") {
      writer.uint32(10).string(message.email);
    }
    if (message.password !== "") {
      writer.uint32(18).string(message.password);
    }
    if (message.displayName !== "") {
      writer.uint32(26).string(message.displayName);
    }
    if (message.fullName !== "") {
      writer.uint32(34).string(message.fullName);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RegisterRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRegisterRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.email = reader.string();
          continue;
        case 2:
          if (tag != 18) {
            break;
          }

          message.password = reader.string();
          continue;
        case 3:
          if (tag != 26) {
            break;
          }

          message.displayName = reader.string();
          continue;
        case 4:
          if (tag != 34) {
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

  fromJSON(object: any): RegisterRequest {
    return {
      email: isSet(object.email) ? String(object.email) : "",
      password: isSet(object.password) ? String(object.password) : "",
      displayName: isSet(object.displayName) ? String(object.displayName) : "",
      fullName: isSet(object.fullName) ? String(object.fullName) : "",
    };
  },

  toJSON(message: RegisterRequest): unknown {
    const obj: any = {};
    message.email !== undefined && (obj.email = message.email);
    message.password !== undefined && (obj.password = message.password);
    message.displayName !== undefined && (obj.displayName = message.displayName);
    message.fullName !== undefined && (obj.fullName = message.fullName);
    return obj;
  },

  create<I extends Exact<DeepPartial<RegisterRequest>, I>>(base?: I): RegisterRequest {
    return RegisterRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<RegisterRequest>, I>>(object: I): RegisterRequest {
    const message = createBaseRegisterRequest();
    message.email = object.email ?? "";
    message.password = object.password ?? "";
    message.displayName = object.displayName ?? "";
    message.fullName = object.fullName ?? "";
    return message;
  },
};

function createBaseRegisterResponse(): RegisterResponse {
  return { user: undefined, token: undefined };
}

export const RegisterResponse = {
  encode(message: RegisterResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.user !== undefined) {
      User.encode(message.user, writer.uint32(10).fork()).ldelim();
    }
    if (message.token !== undefined) {
      Token.encode(message.token, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RegisterResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRegisterResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.user = User.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag != 18) {
            break;
          }

          message.token = Token.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RegisterResponse {
    return {
      user: isSet(object.user) ? User.fromJSON(object.user) : undefined,
      token: isSet(object.token) ? Token.fromJSON(object.token) : undefined,
    };
  },

  toJSON(message: RegisterResponse): unknown {
    const obj: any = {};
    message.user !== undefined && (obj.user = message.user ? User.toJSON(message.user) : undefined);
    message.token !== undefined && (obj.token = message.token ? Token.toJSON(message.token) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<RegisterResponse>, I>>(base?: I): RegisterResponse {
    return RegisterResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<RegisterResponse>, I>>(object: I): RegisterResponse {
    const message = createBaseRegisterResponse();
    message.user = (object.user !== undefined && object.user !== null) ? User.fromPartial(object.user) : undefined;
    message.token = (object.token !== undefined && object.token !== null) ? Token.fromPartial(object.token) : undefined;
    return message;
  },
};

export type AuthServiceService = typeof AuthServiceService;
export const AuthServiceService = {
  login: {
    path: "/cutchin_cash.auth.AuthService/Login",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: LoginRequest) => Buffer.from(LoginRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => LoginRequest.decode(value),
    responseSerialize: (value: Token) => Buffer.from(Token.encode(value).finish()),
    responseDeserialize: (value: Buffer) => Token.decode(value),
  },
  register: {
    path: "/cutchin_cash.auth.AuthService/Register",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: RegisterRequest) => Buffer.from(RegisterRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => RegisterRequest.decode(value),
    responseSerialize: (value: RegisterResponse) => Buffer.from(RegisterResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => RegisterResponse.decode(value),
  },
  refresh: {
    path: "/cutchin_cash.auth.AuthService/Refresh",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: Token) => Buffer.from(Token.encode(value).finish()),
    requestDeserialize: (value: Buffer) => Token.decode(value),
    responseSerialize: (value: Token) => Buffer.from(Token.encode(value).finish()),
    responseDeserialize: (value: Buffer) => Token.decode(value),
  },
} as const;

export interface AuthServiceServer extends UntypedServiceImplementation {
  login: handleUnaryCall<LoginRequest, Token>;
  register: handleUnaryCall<RegisterRequest, RegisterResponse>;
  refresh: handleUnaryCall<Token, Token>;
}

export interface AuthServiceClient extends Client {
  login(request: LoginRequest, callback: (error: ServiceError | null, response: Token) => void): ClientUnaryCall;
  login(
    request: LoginRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: Token) => void,
  ): ClientUnaryCall;
  login(
    request: LoginRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: Token) => void,
  ): ClientUnaryCall;
  register(
    request: RegisterRequest,
    callback: (error: ServiceError | null, response: RegisterResponse) => void,
  ): ClientUnaryCall;
  register(
    request: RegisterRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: RegisterResponse) => void,
  ): ClientUnaryCall;
  register(
    request: RegisterRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: RegisterResponse) => void,
  ): ClientUnaryCall;
  refresh(request: Token, callback: (error: ServiceError | null, response: Token) => void): ClientUnaryCall;
  refresh(
    request: Token,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: Token) => void,
  ): ClientUnaryCall;
  refresh(
    request: Token,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: Token) => void,
  ): ClientUnaryCall;
}

export const AuthServiceClient = makeGenericClientConstructor(
  AuthServiceService,
  "cutchin_cash.auth.AuthService",
) as unknown as {
  new (address: string, credentials: ChannelCredentials, options?: Partial<ClientOptions>): AuthServiceClient;
  service: typeof AuthServiceService;
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
