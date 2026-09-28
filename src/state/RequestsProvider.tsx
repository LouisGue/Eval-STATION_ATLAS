import { useReducer, type ReactNode } from "react";
import { RequestsContext } from "./requestsContext";
import { requestsReducer } from "./requestsReducer";

export function RequestsProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(requestsReducer, []);
  return (
    <RequestsContext value={{ state, dispatch }}>{children}</RequestsContext>
  );
}
