import type { Dock } from "../types/dock";

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
