// route /docks
import { useState } from "react";
import { DockCard } from "../components/DockCard";
import { useDocks } from "../hooks/useDocks";
import type { DockStatus } from "../types/dock";

type StatusFilter = DockStatus | "all";

function isStatusFilter(value: string): value is StatusFilter {
  return value === "all" || value === "available" || value === "blocked";
}

export function DocksPage() {
  const { state, retry } = useDocks();
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");

  const search = query.trim().toLowerCase();
  const visibleDocks =
    state.status === "success"
      ? state.data.filter(
          (dock) =>
            dock.name.toLowerCase().includes(search) &&
            (statusFilter === "all" || dock.status === statusFilter),
        )
      : [];

  function reset() {
    setQuery("");
    setStatusFilter("all");
  }

  return (
    <div>
      <h1>Quais d'amarrage</h1>
      <p>Consultez la disponibilité des quais de la station Atlas.</p>

      {state.status === "loading" && <p>Chargement des quais...</p>}

      {state.status === "error" && (
        <div role="alert">
          <p>Impossible de charger les quais : {state.message}</p>
          <button type="button" onClick={retry}>
            Réessayer
          </button>
        </div>
      )}

      {state.status === "empty" && (
        <p>Aucun quai disponible dans le manifeste</p>
      )}

      {state.status === "success" && (
        <>
          <p>
            {visibleDocks.length} quai{visibleDocks.length > 1 ? "s" : ""}
          </p>

          <div className="dock-controls">
            <label htmlFor="search">Rechercher par nom</label>
            <input
              id="search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />

            <label htmlFor="status-filter">Statut</label>
            <select
              id="status-filter"
              value={statusFilter}
              onChange={(e) => {
                if (isStatusFilter(e.target.value)) {
                  setStatusFilter(e.target.value);
                }
              }}
            >
              <option value="all">Tous</option>
              <option value="available">Disponible</option>
              <option value="blocked">Bloqué</option>
            </select>

            <button type="button" onClick={reset}>
              Réinitialiser
            </button>
          </div>

          {visibleDocks.length === 0 ? (
            <div>
              <p>Aucun quai ne correspond à votre recherche</p>
              <button type="button" onClick={reset}>
                Remettre à zéro
              </button>
            </div>
          ) : (
            <div className="dock-grid">
              {visibleDocks.map((dock) => (
                <DockCard key={dock.id} dock={dock} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
