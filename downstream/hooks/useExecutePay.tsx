import { User } from "../models/User.model";
import { ExecutePayType, PayEvent } from "../store";
import { useAppState } from "./useAppState";
import { Nullable, useUser } from "./useUser";

function makeDispatch(
  payEvent: Nullable<PayEvent>,
  payingUserId: Nullable<string>,
  receivingUserId: Nullable<string>
) {
  return {
    type: ExecutePayType.SetAll,
    payload: {
      payEvent,
      payingUserId,
      receivingUserId,
    },
  };
}

export function useExecutePay() {
  const { findUser } = useUser();
  const { executePayState, dispatchExecutePay, authState } = useAppState();
  const appUserId = authState.user?.userId ?? null;

  function startAddFundsFlow() {
    dispatchExecutePay(makeDispatch("AddFunds", appUserId, appUserId));
  }

  function startRequestPaymentFlow(payingUserId: string) {
    dispatchExecutePay(makeDispatch("Request", payingUserId, appUserId));
  }

  function startSendPaymentFlow(receivingUserId: string) {
    dispatchExecutePay(makeDispatch("Pay", appUserId, receivingUserId));
  }

  function clearExecutePayState() {
    dispatchExecutePay(makeDispatch(null, null, null));
  }

  function getPayingUser(): Nullable<User> {
    return executePayState.payingUserId != null
      ? findUser(executePayState.payingUserId)
      : null;
  }

  function getReceivingUser(): Nullable<User> {
    return executePayState.receivingUserId != null
      ? findUser(executePayState.receivingUserId)
      : null;
  }

  return {
    executePayState,
    startAddFundsFlow,
    startRequestPaymentFlow,
    startSendPaymentFlow,
    clearExecutePayState,
    getPayingUser,
    getReceivingUser,
  };
}
