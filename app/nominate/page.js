"use client";

const COLORS = {
  navy: "#1E2D3D",
  red: "#C8453A",
  mint: "#6ECAB0",
  orange: "#E8913A",
  cream: "#FAF8F5",
  white: "#FFFFFF",
  midGray: "#B8B2AA",
};

function LogoMark({ size = 48 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <circle cx="50" cy="50" r="48" stroke={COLORS.navy} strokeWidth="3" fill={COLORS.white} />
      <path d="M50 18 C38 22, 32 36, 40 46 C44 50, 50 48, 54 44 C62 34, 60 22, 50 18Z" fill={COLORS.red} />
      <path d="M82 50 C78 38, 64 32, 54 40 C50 44, 52 50, 56 54 C66 62, 78 60, 82 50Z" fill={COLORS.mint} />
      <path d="M50 82 C62 78, 68 64, 60 54 C56 50, 50 52, 46 56 C38 66, 40 78, 50 82Z" fill={COLORS.orange} />
      <path d="M18 50 C22 62, 36 68, 46 60 C50 56, 48 50, 44 46 C34 38, 22 40, 18 50Z" fill={COLORS.navy} />
    </svg>
  );
}

export default function NominationsClosedPage() {
  return (
    <div style={{
      minHeight: "100vh",
      background: `linear-gradient(135deg, ${COLORS.cream} 0%, #EDE8E3 100%)`,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: "'DM Sans', sans-serif", padding: 20,
    }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Serif+Display&display=swap" rel="stylesheet" />
      <div style={{ textAlign: "center", maxWidth: 480 }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}>
          <LogoMark size={56} />
        </div>
        <div style={{
          display: "inline-block",
          padding: "6px 16px", borderRadius: 100, marginBottom: 20,
          background: `${COLORS.red}12`, border: `1px solid ${COLORS.red}25`,
          fontSize: 12, fontWeight: 700, color: COLORS.red,
          textTransform: "uppercase", letterSpacing: "0.08em",
        }}>Nominations Closed</div>
        <h1 style={{
          fontFamily: "'DM Serif Display', serif", fontSize: 32,
          color: COLORS.navy, marginBottom: 12, fontWeight: 400,
        }}>Nominations have closed</h1>
        <p style={{
          color: "#6B6560", lineHeight: 1.6, fontSize: 15, marginBottom: 28,
        }}>
          The nomination period ended on Friday, April 3. Candidates are now set.
          Head over to see who's running and cast your vote on Election Day.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <a href="/candidates" style={{
            padding: "12px 24px", borderRadius: 10,
            background: COLORS.white, border: `2px solid #E5E1DC`,
            color: COLORS.navy, fontSize: 14, fontWeight: 600,
            textDecoration: "none", fontFamily: "'DM Sans', sans-serif",
            transition: "all 0.2s ease",
          }}>Meet Candidates</a>
          <a href="/vote" style={{
            padding: "12px 24px", borderRadius: 10,
            background: `linear-gradient(135deg, ${COLORS.navy}, #2A3F52)`,
            color: COLORS.white, fontSize: 14, fontWeight: 600,
            textDecoration: "none", fontFamily: "'DM Sans', sans-serif",
          }}>Cast Your Vote</a>
        </div>
        <a href="/" style={{
          display: "inline-block", marginTop: 24,
          fontSize: 13, color: COLORS.midGray, textDecoration: "none",
          fontFamily: "'DM Sans', sans-serif",
        }}>← Back to home</a>
      </div>
    </div>
  );
}
