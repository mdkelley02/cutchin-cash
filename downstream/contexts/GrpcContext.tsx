import React, { createContext, useState, useContext } from "react";
import {
  AuthServiceClient,
  LoginRequest,
  RegisterRequest,
  RegisterResponse,
} from "../models/proto/auth";
import { Token, User, Empty } from "../models/proto/common";
import { Metadata, ServiceError } from "@grpc/grpc-js";
import {
  AddFundsRequest,
  AddFundsResponse,
  GetAllUsersResponse,
  GetUserRequest,
  GetUserResponse,
  UserServiceClient,
} from "../models/proto/user";
import {
  DecisionPaymentRequest,
  DecisionPaymentResponse,
  DemandPaymentRequest,
  DemandPaymentResponse,
  ListTransactionsRequest,
  ListTransactionsResponse,
  SendPaymentRequest,
  SendPaymentResponse,
  TransactionServiceClient,
} from "../models/proto/transaction";
import { GrpcOptions } from "../models/grpc";
import { Status } from "@grpc/grpc-js/build/src/constants";

export interface GrpcContextType {
  login: (request: LoginRequest) => Promise<Token>;
  register: (request: RegisterRequest) => Promise<RegisterResponse>;
  refresh: (request: Token) => Promise<Token>;
  addFunds: (request: AddFundsRequest) => Promise<AddFundsResponse>;
  getUser: (request: GetUserRequest) => Promise<GetUserResponse>;
  getAllUsers: () => Promise<GetAllUsersResponse>;
  sendPayment: (request: SendPaymentRequest) => Promise<SendPaymentResponse>;
  demandPayment: (
    request: DemandPaymentRequest
  ) => Promise<DemandPaymentResponse>;
  decisionPayment: (
    request: DecisionPaymentRequest
  ) => Promise<DecisionPaymentResponse>;
  listTransactions: (
    request: ListTransactionsRequest
  ) => Promise<ListTransactionsResponse>;
  logout: () => void;
  user: User | null;
}

const GrpcContext = createContext<GrpcContextType>({
  login: () => Promise.reject(),
  register: () => Promise.reject(),
  refresh: () => Promise.reject(),
  addFunds: () => Promise.reject(),
  getUser: () => Promise.reject(),
  getAllUsers: () => Promise.reject(),
  sendPayment: () => Promise.reject(),
  demandPayment: () => Promise.reject(),
  decisionPayment: () => Promise.reject(),
  listTransactions: () => Promise.reject(),
  logout: () => {},
  user: null,
});

export function useUpstream() {
  return useContext(GrpcContext);
}

const services = {
  auth: new AuthServiceClient(
    GrpcOptions.address,
    GrpcOptions.credentials,
    GrpcOptions.options
  ),
  user: new UserServiceClient(
    GrpcOptions.address,
    GrpcOptions.credentials,
    GrpcOptions.options
  ),
  transaction: new TransactionServiceClient(
    GrpcOptions.address,
    GrpcOptions.credentials,
    GrpcOptions.options
  ),
} as const;

export function GrpcProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [metadata, setMetadata] = useState<Metadata>(new Metadata());
  const [user, setUser] = useState<User | null>(null);

  function setAuthInformation({ token }: Token) {
    setToken(token);
    setMetadata(new Metadata());
    metadata.set("authorization", `Bearer ${token}`);
  }

  function interceptAndPromisify<ReqT, RespT>(
    request: ReqT,
    handler: (
      request: ReqT,
      metadata: Metadata,
      callback: (err: ServiceError, response: RespT) => void
    ) => void
  ): Promise<RespT> {
    return new Promise<RespT>((resolve, reject) => {
      handler(request, metadata, (err: ServiceError, response: RespT) => {
        if (err && err.code === Status.UNAUTHENTICATED) {
          refresh({ token: token! }).then(() => {
            interceptAndPromisify(request, handler).then(resolve).catch(reject);
          });
        } else if (err) {
          reject(err);
        } else {
          resolve(response);
        }
      });
    });
  }

  // Auth
  async function login(request: LoginRequest): Promise<Token> {
    return interceptAndPromisify<LoginRequest, Token>(
      request,
      services.auth.login
    ).then((response) => {
      setAuthInformation(response);
      return response;
    });
  }

  async function register(request: RegisterRequest): Promise<RegisterResponse> {
    return interceptAndPromisify<RegisterRequest, RegisterResponse>(
      request,
      services.auth.register
    ).then((response) => {
      setAuthInformation(response.token);
      setUser(response.user);
      return response;
    });
  }

  async function refresh(request: Token): Promise<Token> {
    return interceptAndPromisify<Token, Token>(
      request,
      services.auth.refresh
    ).then((response) => {
      setAuthInformation(response);
      return response;
    });
  }

  // User
  async function addFunds(request: AddFundsRequest): Promise<AddFundsResponse> {
    return interceptAndPromisify<AddFundsRequest, AddFundsResponse>(
      request,
      services.user.addFunds
    );
  }

  async function getUser(request: GetUserRequest): Promise<GetUserResponse> {
    return interceptAndPromisify<GetUserRequest, GetUserResponse>(
      request,
      services.user.getUser
    ).then((response) => {
      setUser(response.user);
      return response;
    });
  }

  async function getAllUsers(): Promise<GetAllUsersResponse> {
    return interceptAndPromisify<Empty, GetAllUsersResponse>(
      Empty.fromJSON({}),
      services.user.getAllUsers
    );
  }

  // Transactions
  async function sendPayment(
    request: SendPaymentRequest
  ): Promise<SendPaymentResponse> {
    return interceptAndPromisify<SendPaymentRequest, SendPaymentResponse>(
      request,
      services.transaction.sendPayment
    );
  }

  async function demandPayment(
    request: DemandPaymentRequest
  ): Promise<DemandPaymentResponse> {
    return interceptAndPromisify<DemandPaymentRequest, DemandPaymentResponse>(
      request,
      services.transaction.demandPayment
    );
  }

  async function decisionPayment(
    request: DecisionPaymentRequest
  ): Promise<DecisionPaymentResponse> {
    return interceptAndPromisify<
      DecisionPaymentRequest,
      DecisionPaymentResponse
    >(request, services.transaction.decisionPayment);
  }

  async function listTransactions(
    request: ListTransactionsRequest
  ): Promise<ListTransactionsResponse> {
    return interceptAndPromisify<
      ListTransactionsRequest,
      ListTransactionsResponse
    >(request, services.transaction.listTransactions);
  }

  function logout() {
    setToken(null);
    setMetadata(new Metadata());
    setUser(null);
  }

  return (
    <GrpcContext.Provider
      value={{
        login,
        register,
        refresh,
        addFunds,
        getUser,
        getAllUsers,
        sendPayment,
        demandPayment,
        decisionPayment,
        listTransactions,
        logout,
        user,
      }}
    >
      {children}
    </GrpcContext.Provider>
  );
}
