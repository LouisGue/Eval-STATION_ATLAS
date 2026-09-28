export type RequestStatus = "requested" | "authorized" | "docked";

export interface DockingRequest {
  readonly reference: string;
  shipName: string;
  dockId: string;
  arrivalDate: string;
  massTons: number;
  status: RequestStatus;
}

const TRANSITIONS: Record<RequestStatus, readonly RequestStatus[]> = {
  requested: ["authorized"],
  authorized: ["docked"],
  docked: [],
};

export function canTransition(from: RequestStatus, to: RequestStatus): boolean {
  return TRANSITIONS[from].includes(to);
}
