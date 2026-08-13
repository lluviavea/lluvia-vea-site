"use client";

import dynamic from "next/dynamic";

const DigitalTwin = dynamic(
  () => import("@/components/digital-twin").then((m) => m.DigitalTwin),
  {
    ssr: false,
    loading: () => null,
  },
);

export function DigitalTwinLoader() {
  return <DigitalTwin />;
}
