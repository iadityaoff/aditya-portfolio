import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "Aditya Tripathi — Senior UI/UX Designer";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#FAFAF7",
          padding: "80px",
          fontFamily: "system-ui, -apple-system, sans-serif",
          border: "12px solid #0E0E10",
        }}
      >
        {/* Top Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <div
              style={{
                width: "28px",
                height: "28px",
                borderRadius: "50%",
                backgroundColor: "#2F4BFF",
              }}
            />
            <span
              style={{
                fontSize: "24px",
                fontWeight: 700,
                color: "#0E0E10",
                letterSpacing: "-0.02em",
              }}
            >
              Aditya Tripathi
            </span>
          </div>

          <span
            style={{
              fontSize: "16px",
              fontFamily: "monospace",
              color: "#5F5F68",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}
          >
            Senior UI/UX Designer
          </span>
        </div>

        {/* Central Headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px", maxWidth: "950px" }}>
          <h1
            style={{
              fontSize: "58px",
              fontWeight: 800,
              lineHeight: 1.15,
              color: "#0E0E10",
              letterSpacing: "-0.03em",
              margin: 0,
            }}
          >
            Complex products. Clear experiences. Scalable systems.
          </h1>
          <p
            style={{
              fontSize: "24px",
              color: "#5F5F68",
              lineHeight: 1.4,
              margin: 0,
            }}
          >
            Designing high-stakes SaaS workflows, clinical platforms, and token-driven design systems.
          </p>
        </div>

        {/* Bottom Metadata */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "2px solid #E7E5DF",
            paddingTop: "30px",
            fontFamily: "monospace",
            fontSize: "18px",
            color: "#0E0E10",
          }}
        >
          <span>5+ Years Experience · SaaS &amp; Enterprise</span>
          <span style={{ color: "#2F4BFF", fontWeight: 700 }}>adityatripathi.design</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
