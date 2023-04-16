import { faker } from "@faker-js/faker";

export enum TransactionStatus {
  UNKNOWN = "UNKNOWN",
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  REJECTED = "REJECTED",
}

export type Money = {
  whole: number;
  fraction: number;
};

export type Transaction = {
  transactionId: string;
  receivingUserId: string;
  payingUserId: string;
  description: string;
  amount: Money;
  timestamp: string;
  status: TransactionStatus;
};

export const MOCK_TRANSACTIONS: Transaction[] = Array.from(
  { length: 10 },
  (_, i) => ({
    transactionId: faker.datatype.uuid(),
    receivingUserId: faker.datatype.uuid(),
    payingUserId: faker.datatype.uuid(),
    description: faker.lorem.sentence(),
    amount: {
      whole: faker.datatype.number(100),
      fraction: faker.datatype.number(99),
    },
    timestamp: faker.date.past().toISOString(),
    status: Object.values(TransactionStatus)[Math.floor(Math.random() * 3) + 1],
  })
);

export function getUsersTransactions(userId: string): Promise<Transaction[]> {
  return new Promise<Transaction[]>((resolve) => {
    setTimeout(() => {
      resolve(MOCK_TRANSACTIONS);
    }, 1000);
  });
}
