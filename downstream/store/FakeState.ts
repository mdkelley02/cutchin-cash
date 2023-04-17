import { faker } from "@faker-js/faker";
import { User } from "../models/User.model";
import { Transaction, TransactionStatus } from "../models/Transaction.model";
import { AppDataState, AuthState, INITIAL_AUTH_STATE } from "./State";

export const token = (): string => faker.datatype.uuid();

export const user = (): User => ({
  userId: faker.datatype.uuid(),
  fullName: faker.name.fullName(),
  displayName: faker.internet.userName(),
  email: faker.internet.email(),
  balance: {
    whole: faker.datatype.number({ min: 0, max: 1000 }),
    fraction: faker.datatype.number({ min: 0, max: 99 }),
  },
});

export const transaction = (
  receivingUserId: string,
  payingUserId: string
): Transaction => ({
  transactionId: faker.datatype.uuid(),
  receivingUserId,
  payingUserId,
  description: faker.lorem.sentence(),
  status: faker.datatype.boolean()
    ? TransactionStatus.ACCEPTED
    : TransactionStatus.REJECTED,
  amount: {
    whole: faker.datatype.number({ min: 0, max: 1000 }),
    fraction: faker.datatype.number({ min: 0, max: 99 }),
  },
  timestamp: faker.date.past().toISOString(),
});

const userSpace = (): User[] => Array.from({ length: 10 }, user);

const transactionSpace = (
  receivingUserId: string,
  payingUserId: string
): Transaction[] =>
  Array.from({ length: 10 }, () => transaction(receivingUserId, payingUserId));

export const FakeState = (): {
  FAKE_AUTH: AuthState;
  FAKE_APP_DATA: AppDataState;
} => {
  const appUser = user();
  const users = [...userSpace(), appUser];
  const receivedTransactions = transactionSpace(
    appUser.userId,
    users[Math.floor(Math.random() * users.length)].userId
  );
  const sentTransactions = transactionSpace(
    users[Math.floor(Math.random() * users.length)].userId,
    appUser.userId
  );
  const transactions = [...receivedTransactions, ...sentTransactions];

  return {
    FAKE_AUTH: {
      token: token(),
      user: appUser,
    },
    FAKE_APP_DATA: {
      users,
      transactions,
    },
  };
};
