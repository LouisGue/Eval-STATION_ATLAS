// route /docks/:dockId
import { Link, useParams } from "react-router-dom";
import { StatusBadge } from "../components/StatusBadge";
import { useDocks } from "../hooks/useDocks";
import { dockSpecificInfo, KIND_LABELS } from "../lib/dock";

export function DockDetailPage() {
  const { dockId } = useParams();
  const { state, retry } = useDocks();
  const dock =
    state.status === "success"
      ? state.data.find((d) => d.id === dockId)
      : undefined;

  if (state.status === "loading") {
    return (
      <>
        <h1>Fiche du quai</h1>
        <p>Chargement du quai…</p>
      </>
    );
  }

  if (state.status === "error") {
    return (
      <>
        <h1>Fiche du quai</h1>
        <div role="alert">
          <p>Impossible de charger les quais : {state.message}</p>
          <button type="button" onClick={retry}>
            Réessayer
          </button>
        </div>
      </>
    );
  }

  if (!dock) {
    return (
      <>
        <h1>Quai introuvable</h1>
        <p>Aucun quai ne porte l'identifiant « {dockId} ».</p>
        <Link to="/docks">Retour aux quais</Link>
      </>
    );
  }

  return (
    <>
      <Link to="/docks">Retour aux quais</Link>
      <h1>{dock.name}</h1>
      <StatusBadge status={dock.status} />

      <div className="dock-grid">
        <section>
          <h2>Identité</h2>
          <p>Identifiant : {dock.id}</p>
          <p>Type : {KIND_LABELS[dock.kind]}</p>
          <p>
            Statut : <StatusBadge status={dock.status} />
          </p>
        </section>

        <section>
          <h2>Contraintes</h2>
          <p>Capacité : {dock.capacityTons} t</p>
          <p>{dockSpecificInfo(dock)}</p>
        </section>
      </div>
    </>
  );
}
