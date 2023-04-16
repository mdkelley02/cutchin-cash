export const Events = {
  Pay: "Pay",
  Request: "Request",
  AddFunds: "AddFunds",
} as const;
export type Event = keyof typeof Events;

export const Routes = {
  Dashboard: "Dashboard",
  Pay: "KeyPad",
  ExecutePayModal: "ExecutePayModal",
  Profile: "Profile",
} as const;
export type Route = keyof typeof Routes;

export type ExecutePayPayload = {
  type: typeof Events.Pay | typeof Events.Request | typeof Events.AddFunds;
  whole: number;
  fraction: number;
};

export type PayPayload = {
  type: typeof Events.AddFunds;
};
