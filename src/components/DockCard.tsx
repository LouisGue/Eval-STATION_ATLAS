import { Link } from "react-router-dom";
import { dockSpecificInfo, KIND_LABELS } from "../lib/dock";
import type { Dock } from "../types/dock";
import { StatusBadge } from "./StatusBadge";

export function DockCard({ dock }: { dock: Dock }) {
  return (
    <article className="dock-card">
      <Link to={`/docks/${dock.id}`}>
        <h2>{dock.name}</h2>
      </Link>
      <p>Identifiant : {dock.id}</p>
      <p>Type : {KIND_LABELS[dock.kind]}</p>
      <StatusBadge status={dock.status} />
      <p>Capacité : {dock.capacityTons} t</p>
      <p>{dockSpecificInfo(dock)}</p>
    </article>
  );
}
