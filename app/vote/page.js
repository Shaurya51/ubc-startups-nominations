"use client";
import { useState } from "react";

const COLORS = {
  navy: "#1E2D3D",
  red: "#C8453A",
  mint: "#6ECAB0",
  orange: "#E8913A",
  cream: "#FAF8F5",
  white: "#FFFFFF",
  lightGray: "#F0EDEA",
  midGray: "#B8B2AA",
  darkText: "#1E2D3D",
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

function VoteOption({ label, selected, onSelect, accentColor }) {
  return (
    <label
      onClick={onSelect}
      style={{
        display: "flex", alignItems: "center", gap: 12, cursor: "pointer",
        padding: "14px 16px", borderRadius: 10,
        border: `2px solid ${selected ? accentColor : "#E5E1DC"}`,
        background: selected ? `${accentColor}10` : COLORS.white,
        transition: "all 0.2s ease",
      }}
    >
      <div style={{ width: 20, height: 20, borderRadius: "50%", border: `2px solid ${selected ? accentColor : COLORS.midGray}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        {selected && <div style={{ width: 10, height: 10, borderRadius: "50%", background: accentColor }} />}
      </div>
      <span style={{ fontSize: 15, color: COLORS.darkText, fontFamily: "'DM Sans', sans-serif", fontWeight: 600 }}>{label}</span>
    </label>
  );
}

export default function VotePage() {
  const [studentNumber, setStudentNumber] = useState("");
  const [fullName, setFullName] = useState("");
  const [presidentVote, setPresidentVote] = useState("");
  const [treasurerVote, setTreasurerVote] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [duplicateError, setDuplicateError] = useState(false);

  const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbz3mit3fX2ZsdkCkWmjMSnMHabphf264p_1LHL5CH9JOLEOsVs4DmcoyALZ-0v27tKW/exec";

  const validate = () => {
    if (!fullName.trim()) {
      setError("Please enter your full name");
      return false;
    }
    if (!studentNumber.trim() || !/^\d{8}$/.test(studentNumber)) {
      setError("Please enter a valid 8-digit student number");
      return false;
    }
    if (!presidentVote) {
      setError("Please cast your vote for President");
      return false;
    }
    if (!treasurerVote) {
      setError("Please cast your vote for Treasurer");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setSubmitting(true);
    setDuplicateError(false);

    try {
      const response = await fetch(SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sheet: "Votes",
          action: "vote",
          fullName,
          studentNumber,
          presidentVote,
          treasurerVote,
          timestamp: new Date().toISOString(),
        }),
      });
      setSubmitted(true);
    } catch (err) {
      console.error("Vote error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div style={{ minHeight: "100vh", background: `linear-gradient(135deg, ${COLORS.cream} 0%, #EDE8E3 100%)`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'DM Sans', sans-serif", padding: 20 }}>
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Serif+Display&display=swap" rel="stylesheet" />
        <div style={{ textAlign: "center", maxWidth: 460 }}>
          <div style={{ width: 80, height: 80, borderRadius: "50%", background: `linear-gradient(135deg, ${COLORS.mint}, ${COLORS.mint}CC)`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none"><path d="M5 12L10 17L19 7" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </div>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 28, color: COLORS.navy, marginBottom: 12, fontWeight: 400 }}>Vote submitted!</h2>
          <p style={{ color: "#6B6560", lineHeight: 1.6, fontSize: 15 }}>
            Thanks for voting. Your voice matters and helps shape the future of this club.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(135deg, ${COLORS.cream} 0%, #EDE8E3 100%)`, fontFamily: "'DM Sans', sans-serif", padding: "40px 20px" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Serif+Display&display=swap" rel="stylesheet" />

      <div style={{ maxWidth: 560, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}><LogoMark size={56} /></div>
          <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 36, color: COLORS.navy, margin: "0 0 10px", lineHeight: 1.15, fontWeight: 400 }}>Cast Your Vote</h1>
          <p style={{ color: "#6B6560", fontSize: 15, margin: "0 0 6px", lineHeight: 1.6 }}>
            One vote per member. Make it count.
          </p>
          <a href="/candidates" style={{ fontSize: 13, color: COLORS.navy, fontWeight: 600, textDecoration: "underline", fontFamily: "'DM Sans', sans-serif" }}>
            Haven't read the candidates yet? Do that first →
          </a>
        </div>

        {/* Vote Card */}
        <div style={{ background: COLORS.white, borderRadius: 16, padding: "32px 28px", boxShadow: "0 2px 20px rgba(30,45,61,0.06)" }}>
          {/* Student Number */}
          <div style={{ marginBottom: 28 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16, paddingBottom: 14, borderBottom: `2px solid ${COLORS.lightGray}` }}>
              <div style={{ width: 28, height: 28, borderRadius: 8, background: COLORS.navy, display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: 14, fontWeight: 700 }}>1</div>
              <span style={{ fontWeight: 700, fontSize: 17, color: COLORS.navy }}>Verify Yourself</span>
            </div>
            <label style={{ fontSize: 13, fontWeight: 600, color: COLORS.navy, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6, display: "block" }}>Full Name</label>
            <input
              value={fullName}
              onChange={(e) => { setFullName(e.target.value); setError(""); }}
              placeholder="e.g. Jane Doe"
              style={{ width: "100%", padding: "12px 14px", borderRadius: 10, border: "2px solid #E5E1DC", fontSize: 15, fontFamily: "'DM Sans', sans-serif", color: COLORS.darkText, background: COLORS.white, outline: "none", boxSizing: "border-box", marginBottom: 14 }}
            />
            <label style={{ fontSize: 13, fontWeight: 600, color: COLORS.navy, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6, display: "block" }}>Student Number</label>
            <input
              value={studentNumber}
              onChange={(e) => { const v = e.target.value.replace(/\D/g, "").slice(0, 8); setStudentNumber(v); setError(""); }}
              placeholder="Enter your 8-digit student number"
              maxLength={8}
              style={{ width: "100%", padding: "12px 14px", borderRadius: 10, border: "2px solid #E5E1DC", fontSize: 15, fontFamily: "'DM Sans', sans-serif", color: COLORS.darkText, background: COLORS.white, outline: "none", boxSizing: "border-box" }}
            />
            <p style={{ fontSize: 12, color: COLORS.midGray, margin: "6px 0 0", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.5 }}>
              All responses are anonymous. Your name and student number will only be used by the AMS to verify voting and won't be shared publicly.
            </p>
          </div>

          {/* President Vote */}
          <div style={{ marginBottom: 28 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16, paddingBottom: 14, borderBottom: `2px solid ${COLORS.lightGray}` }}>
              <div style={{ width: 28, height: 28, borderRadius: 8, background: COLORS.red, display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: 14, fontWeight: 700 }}>2</div>
              <span style={{ fontWeight: 700, fontSize: 17, color: COLORS.navy }}>Vote for President</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <VoteOption label="Maddie & Samuel" selected={presidentVote === "Maddie & Samuel"} onSelect={() => setPresidentVote("Maddie & Samuel")} accentColor={COLORS.red} />
              <VoteOption label="Mostafa & Katelyn" selected={presidentVote === "Mostafa & Katelyn"} onSelect={() => setPresidentVote("Mostafa & Katelyn")} accentColor={COLORS.red} />
              <VoteOption label="Abstain" selected={presidentVote === "Abstain"} onSelect={() => setPresidentVote("Abstain")} accentColor={COLORS.midGray} />
            </div>
          </div>

          {/* Treasurer Vote */}
          <div style={{ marginBottom: 28 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16, paddingBottom: 14, borderBottom: `2px solid ${COLORS.lightGray}` }}>
              <div style={{ width: 28, height: 28, borderRadius: 8, background: COLORS.orange, display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: 14, fontWeight: 700 }}>3</div>
              <span style={{ fontWeight: 700, fontSize: 17, color: COLORS.navy }}>Vote for Treasurer</span>
            </div>
            <p style={{ fontSize: 14, color: "#6B6560", margin: "0 0 12px", lineHeight: 1.5, fontFamily: "'DM Sans', sans-serif" }}>
              One candidate is running: <strong>Ines Bouvier</strong>. Do you approve?
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <VoteOption label="Yes" selected={treasurerVote === "Yes"} onSelect={() => setTreasurerVote("Yes")} accentColor={COLORS.mint} />
              <VoteOption label="No" selected={treasurerVote === "No"} onSelect={() => setTreasurerVote("No")} accentColor={COLORS.red} />
              <VoteOption label="Abstain" selected={treasurerVote === "Abstain"} onSelect={() => setTreasurerVote("Abstain")} accentColor={COLORS.midGray} />
            </div>
          </div>

          {/* Error */}
          {error && (
            <div style={{ fontSize: 13, color: COLORS.red, textAlign: "center", marginBottom: 16, padding: "10px 14px", borderRadius: 8, background: `${COLORS.red}08`, fontFamily: "'DM Sans', sans-serif" }}>
              {error}
            </div>
          )}

          {duplicateError && (
            <div style={{ fontSize: 13, color: COLORS.orange, textAlign: "center", marginBottom: 16, padding: "10px 14px", borderRadius: 8, background: `${COLORS.orange}08`, fontFamily: "'DM Sans', sans-serif" }}>
              This student number has already voted.
            </div>
          )}

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={submitting}
            style={{
              width: "100%", padding: "16px", borderRadius: 12, border: "none",
              background: submitting ? COLORS.midGray : `linear-gradient(135deg, ${COLORS.navy}, #2A3F52)`,
              color: COLORS.white, fontSize: 16, fontWeight: 700, fontFamily: "'DM Sans', sans-serif",
              cursor: submitting ? "not-allowed" : "pointer", transition: "all 0.2s ease",
              letterSpacing: "0.02em", opacity: submitting ? 0.7 : 1,
            }}
          >
            {submitting ? "Submitting..." : "Submit Vote"}
          </button>
        </div>

        <p style={{ textAlign: "center", fontSize: 12, color: COLORS.midGray, marginTop: 20, lineHeight: 1.5 }}>
          Your vote is confidential. One vote per student number.
        </p>
      </div>
    </div>
  );
}
