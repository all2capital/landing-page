import { ImageResponse } from "next/og";
import { readFileSync } from "node:fs";
import path from "node:path";

export const alt = "All Together Capital";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  const root = process.cwd();
  const bgBuffer = readFileSync(
    path.join(root, "public/design-assets/landing.jpg"),
  );
  const bgDataUri = `data:image/jpeg;base64,${bgBuffer.toString("base64")}`;

  const geistMedium = readFileSync(
    path.join(root, "public/fonts/Geist-Medium.ttf"),
  );
  const geistMonoMedium = readFileSync(
    path.join(root, "public/fonts/GeistMono-Medium.ttf"),
  );

  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          fontFamily: "Geist",
        }}
      >
        {/* Background photo */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={bgDataUri}
          alt=""
          width={1200}
          height={630}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />

        {/* Top-left logo group — no panel */}
        <div
          style={{
            position: "absolute",
            top: 56,
            left: 56,
            display: "flex",
            alignItems: "center",
            gap: 22,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 92,
              height: 92,
              backgroundColor: "#c14405",
            }}
          >
            <span
              style={{
                color: "#ffffff",
                fontSize: 44,
                fontWeight: 500,
                fontFamily: "Geist Mono",
                lineHeight: 1,
              }}
            >
              at
            </span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              color: "#0A0A0A",
              fontFamily: "Geist",
            }}
          >
            <span
              style={{
                fontSize: 32,
                fontWeight: 500,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                lineHeight: 1.1,
              }}
            >
              All Together
            </span>
            <span
              style={{
                marginTop: 6,
                fontSize: 22,
                fontWeight: 500,
                letterSpacing: "0.32em",
                textTransform: "uppercase",
                lineHeight: 1.1,
              }}
            >
              Capital
            </span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Geist", data: geistMedium, weight: 500, style: "normal" },
        {
          name: "Geist Mono",
          data: geistMonoMedium,
          weight: 500,
          style: "normal",
        },
      ],
    },
  );
}
