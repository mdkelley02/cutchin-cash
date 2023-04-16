import { PayEvent } from "../store";

export const PayEventToLabel: Record<PayEvent, string> = {
  Pay: "Pay",
  Request: "Request",
  AddFunds: "Add Funds",
};
