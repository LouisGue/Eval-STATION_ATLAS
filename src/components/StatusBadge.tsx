import type { DockStatus } from "../types/dock";

const STATUS_LABELS: Record<DockStatus, string> = {
  available: "Disponible",
  blocked: "Bloqué",
};

export function StatusBadge({ status }: { status: DockStatus }) {
  return (
    <span
      style={{
        color: status === "available" ? "green" : "red",
        fontWeight: "bold",
      }}
    >
      {STATUS_LABELS[status]}
    </span>
  );
}
