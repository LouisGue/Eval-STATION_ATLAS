import { useEffect, useState } from "react";
import { fetchDocks } from "../api/docks";
import type { Dock } from "../types/dock";

export type DocksState =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "empty" }
  | { status: "success"; data: Dock[] };

export function useDocks() {
  const [state, setState] = useState<DocksState>({ status: "loading" });
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    fetchDocks(controller.signal)
      .then((data) => {
        if (data.length === 0) {
          setState({ status: "empty" });
        } else {
          setState({ status: "success", data });
        }
      })
      .catch((error: unknown) => {
        if (controller.signal.aborted) {
          return;
        }
        const message =
          error instanceof Error ? error.message : "Erreur inconnue";
        setState({ status: "error", message });
      });

    return () => {
      controller.abort();
    };
  }, [retryCount]);

  const retry = () => {
    setState({ status: "loading" });
    setRetryCount((prev) => prev + 1);
  };

  return { state, retry };
}
