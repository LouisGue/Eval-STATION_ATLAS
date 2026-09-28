export interface DockDto {
  dock_id: string;
  label: string;
  kind: "crew" | "cargo" | "service";
  state: "OPEN" | "BLOCKED";
  limit_tons: number;
  max_people?: number;
  crane_count?: number;
  tool_station?: string;
}

export type DockStatus = "available" | "blocked";

export interface DockBase {
  readonly id: string;
  name: string;
  status: DockStatus;
  capacityTons: number;
}

export interface CrewDock extends DockBase {
  kind: "crew";
  maxPeople: number;
}

export interface CargoDock extends DockBase {
  kind: "cargo";
  craneCount: number;
}

export interface ServiceDock extends DockBase {
  kind: "service";
  toolStation: string;
}

export type Dock = CrewDock | CargoDock | ServiceDock;
