import { assertNever } from "../lib/dock";
import type { DockingRequest, RequestStatus } from "../types/request";
import { canTransition } from "../types/request";

export type RequestsState = DockingRequest[];

export type RequestsAction =
  | { type: "create"; request: DockingRequest }
  | { type: "changeStatus"; reference: string; to: RequestStatus };

export function requestsReducer(
  state: RequestsState,
  action: RequestsAction,
): RequestsState {
  switch (action.type) {
    case "create": {
      const exists = state.some(
        (r) => r.reference === action.request.reference,
      );
      if (exists) {
        return state;
      }
      return [...state, action.request];
    }

    case "changeStatus":
      return state.map((r) => {
        if (r.reference !== action.reference) {
          return r;
        }
        if (!canTransition(r.status, action.to)) {
          return r;
        }
        return { ...r, status: action.to };
      });

    default:
      return assertNever(action);
  }
}
