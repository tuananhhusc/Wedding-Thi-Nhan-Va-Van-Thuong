import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background:
            "radial-gradient(circle at center, #fffaf7 0%, #f8ede7 58%, #f2dfd6 100%)",
          color: "#8a1827",
          fontFamily: "serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 46,
            letterSpacing: "0.5em",
            fontSize: 24,
            color: "#c4a964",
            textTransform: "uppercase",
          }}
        >
          Thiệp mời hôn phối
        </div>
        <div style={{ fontSize: 76, lineHeight: 1.05, textAlign: "center", marginBottom: 8 }}>
          Giuse Nguyễn Văn Thường
        </div>
        <div style={{ fontSize: 38, color: "#c4961b", marginBottom: 8 }}>&amp;</div>
        <div style={{ fontSize: 76, lineHeight: 1.05, textAlign: "center" }}>
          Terexa Phạm Thị Nhàn
        </div>
        <div
          style={{
            marginTop: 26,
            width: 160,
            height: 2,
            background: "linear-gradient(90deg, transparent, #dfb12c, transparent)",
          }}
        />
        <div
          style={{
            marginTop: 20,
            fontSize: 28,
            letterSpacing: "0.22em",
            color: "#7d7070",
            textTransform: "uppercase",
          }}
        >
          29 . 04 . 2026
        </div>
      </div>
    ),
    size
  );
}
