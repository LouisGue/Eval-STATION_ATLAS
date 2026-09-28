import { createContext, useContext, type Dispatch } from "react";
import type { RequestsAction, RequestsState } from "./requestsReducer";

type RequestsContextValue = {
  state: RequestsState;
  dispatch: Dispatch<RequestsAction>;
};

export const RequestsContext = createContext<RequestsContextValue | null>(null);

export function useRequests(): RequestsContextValue {
  const ctx = useContext(RequestsContext);
  if (ctx === null) {
    throw new Error(
      "useRequests() doit être utilisé à l'intérieur de <RequestsProvider>.",
    );
  }
  return ctx;
}
