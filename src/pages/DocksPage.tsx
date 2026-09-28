// route /docks

import { useDocks } from "../hooks/useDocks";

export function DocksPage() {
  const { state, retry } = useDocks();

  return (
    <div>
      <h1>Quais d'amarrage</h1>

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
        <ul>
          {state.data.map((dock) => (
            <li key={dock.id}>{dock.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
