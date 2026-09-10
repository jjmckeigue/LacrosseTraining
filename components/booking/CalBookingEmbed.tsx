"use client";

import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

type CalBookingEmbedProps = {
  calLink: string;
  /** Cal.com embed namespace. Cal.com's own dashboard-generated snippet
   * namespaces every embed (even a single one), so this mirrors that
   * rather than relying on the unnamed default instance. */
  namespace: string;
};

/**
 * Isolated client boundary for Cal.com's inline embed. Cal.com owns every
 * scheduling concern here (availability, conflicts, time zones, booking
 * questions); this component only mounts the widget.
 *
 * layout/useSlotsViewOnSmallScreen are passed as iframe query params via
 * `config` (Cal.com applies these before the iframe loads). hideEventTypeDetails
 * goes through the officially supported `cal("ui", ...)` postMessage
 * instruction, matching Cal.com's own generated embed snippet for this
 * account (Cal.com dashboard > Embed on an event type).
 */
export default function CalBookingEmbed({ calLink, namespace }: CalBookingEmbedProps) {
  useEffect(() => {
    let cancelled = false;

    getCalApi({ namespace })
      .then((cal) => {
        if (cancelled) return;
        cal("ui", { hideEventTypeDetails: false, layout: "month_view" });
      })
      .catch(() => {
        // Non-critical: this only tweaks the embed's own presentation.
      });

    return () => {
      cancelled = true;
    };
  }, [namespace]);

  return (
    <Cal
      namespace={namespace}
      calLink={calLink}
      style={{ width: "100%", height: "100%", overflow: "scroll" }}
      config={{
        theme: "light",
        layout: "month_view",
        useSlotsViewOnSmallScreen: "true",
      }}
    />
  );
}
