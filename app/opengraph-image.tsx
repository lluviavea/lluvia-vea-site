import { ImageResponse } from "next/og";
import { profile } from "@/lib/content";

export const alt = `${profile.shortName} — ${profile.role}`;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: 80,
        background:
          "linear-gradient(135deg, #0b0b12 0%, #17102a 50%, #2a1450 100%)",
        color: "white",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          fontSize: 32,
          letterSpacing: 6,
          color: "#a78bfa",
          textTransform: "uppercase",
        }}
      >
        {profile.role}
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 92,
          fontWeight: 700,
          marginTop: 16,
          lineHeight: 1.05,
        }}
      >
        {profile.name}
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 30,
          marginTop: 28,
          color: "#c4b5fd",
        }}
      >
        {profile.locationShort} · Cosmiatría · Marketing
      </div>
    </div>,
    { ...size },
  );
}
