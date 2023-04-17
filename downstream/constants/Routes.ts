export const Segments = {
  Tabs: "(tabs)",
  Auth: "(auth)",
};

export type Segment = keyof typeof Segments;

export const Routes = {
  Dashboard: "Dashboard",
  KeyPad: "KeyPad",
  ExecutePayModal: "ExecutePayModal",
  Profile: "Profile",
  TransactionOptions: "TransactionOptions",
  Search: "Search",
  Login: `${Segments.Auth}/Login`,
  Register: `${Segments.Auth}/Register`,
} as const;

export type Route = keyof typeof Routes;
