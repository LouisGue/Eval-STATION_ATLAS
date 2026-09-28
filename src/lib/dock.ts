import type { Dock, DockKind } from "../types/dock";

export const KIND_LABELS: Record<DockKind, string> = {
  crew: "Équipage",
  cargo: "Fret",
  service: "Service",
};

function assertNever(x: never): never {
  throw new Error(`Cas non géré : ${JSON.stringify(x)}`);
}

export function dockSpecificInfo(dock: Dock): string {
  switch (dock.kind) {
    case "crew":
      return `${dock.maxPeople} personnes`;
    case "cargo":
      return `${dock.craneCount} grues`;
    case "service":
      return `Station d'outillage: ${dock.toolStation}`;
    default:
      return assertNever(dock);
  }
}

export function toDock(raw: unknown): Dock {
  if (typeof raw !== "object" || raw === null) {
    throw new Error("Dock invalide : ce n'est pas un objet");
  }
  if (
    !("dock_id" in raw) ||
    typeof raw.dock_id !== "string" ||
    raw.dock_id.trim() === ""
  ) {
    throw new Error("Dock invalide : dock_id manquant ou non valide");
  }
  if (
    !("label" in raw) ||
    typeof raw.label !== "string" ||
    raw.label.trim() === ""
  ) {
    throw new Error("Dock invalide : label manquant ou non valide");
  }
  if (!("state" in raw) || (raw.state !== "OPEN" && raw.state !== "BLOCKED")) {
    throw new Error("Dock invalide : state manquant ou non valide");
  }
  if (
    !("limit_tons" in raw) ||
    typeof raw.limit_tons !== "number" ||
    !Number.isFinite(raw.limit_tons) ||
    raw.limit_tons < 0
  ) {
    throw new Error("Dock invalide : limit_tons manquant ou non valide");
  }
  if (
    !("kind" in raw) ||
    (raw.kind !== "crew" && raw.kind !== "cargo" && raw.kind !== "service")
  ) {
    throw new Error("Dock invalide : kind manquant ou non valide");
  }
  switch (raw.kind) {
    case "crew":
      if (
        !("max_people" in raw) ||
        typeof raw.max_people !== "number" ||
        !Number.isFinite(raw.max_people) ||
        raw.max_people < 0
      ) {
        throw new Error(
          "Dock invalide : max_people manquant ou non valide pour un dock de type crew",
        );
      }
      return {
        id: raw.dock_id,
        name: raw.label,
        status: raw.state === "OPEN" ? "available" : "blocked",
        capacityTons: raw.limit_tons,
        kind: "crew",
        maxPeople: raw.max_people,
      };
    case "cargo":
      if (
        !("crane_count" in raw) ||
        typeof raw.crane_count !== "number" ||
        !Number.isFinite(raw.crane_count) ||
        raw.crane_count < 0
      ) {
        throw new Error(
          "Dock invalide : crane_count manquant ou non valide pour un dock de type cargo",
        );
      }
      return {
        id: raw.dock_id,
        name: raw.label,
        status: raw.state === "OPEN" ? "available" : "blocked",
        capacityTons: raw.limit_tons,
        kind: "cargo",
        craneCount: raw.crane_count,
      };
    case "service":
      if (
        !("tool_station" in raw) ||
        typeof raw.tool_station !== "string" ||
        raw.tool_station.trim() === ""
      ) {
        throw new Error(
          "Dock invalide : tool_station manquant ou non valide pour un dock de type service",
        );
      }
      return {
        id: raw.dock_id,
        name: raw.label,
        status: raw.state === "OPEN" ? "available" : "blocked",
        capacityTons: raw.limit_tons,
        kind: "service",
        toolStation: raw.tool_station,
      };
    default:
      return assertNever(raw.kind);
  }
}
