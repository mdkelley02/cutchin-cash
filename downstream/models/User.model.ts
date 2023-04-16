import { Money } from "./Transaction.model";
import { faker } from "@faker-js/faker";

export type User = {
  userId: string;
  fullName: string;
  displayName: string;
  email?: string;
  balance?: Money;
};

// create a mock users array called MOCK_USERS, make 10 users
export const MOCK_USERS: User[] = Array.from({ length: 10 }, (_, i) => ({
  userId: faker.datatype.uuid(),
  fullName: faker.name.fullName(),
  displayName: faker.internet.userName(),
  email: faker.internet.email(),
  balance: {
    whole: faker.datatype.number(100),
    fraction: faker.datatype.number(99),
  },
}));

export async function getUsers(): Promise<User[]> {
  return new Promise<User[]>((resolve) => {
    setTimeout(() => {
      resolve(MOCK_USERS);
    }, 1000);
  });
}
