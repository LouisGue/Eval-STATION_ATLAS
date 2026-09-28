import { toDock } from "../lib/dock";
import type { Dock } from "../types/dock";

export function fetchDocks(signal: AbortSignal): Promise<Dock[]> {
  return fetch("/api/docks.json", { signal })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Erreur HTTP ${response.status}`);
      }
      return response.json();
    })
    .then((data: unknown) => {
      if (!Array.isArray(data)) {
        throw new Error("Données invalides : ce n'est pas un tableau");
      }
      return data.map(toDock);
    });
}
