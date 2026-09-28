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
