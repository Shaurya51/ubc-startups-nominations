"use client";
import { useState, useEffect, useRef } from "react";

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
      <circle cx="50" cy="50" r="48" stroke="white" strokeWidth="3" fill="transparent" />
      <path d="M50 18 C38 22, 32 36, 40 46 C44 50, 50 48, 54 44 C62 34, 60 22, 50 18Z" fill={COLORS.red} />
      <path d="M82 50 C78 38, 64 32, 54 40 C50 44, 52 50, 56 54 C66 62, 78 60, 82 50Z" fill={COLORS.mint} />
      <path d="M50 82 C62 78, 68 64, 60 54 C56 50, 50 52, 46 56 C38 66, 40 78, 50 82Z" fill={COLORS.orange} />
      <path d="M18 50 C22 62, 36 68, 46 60 C50 56, 48 50, 44 46 C34 38, 22 40, 18 50Z" fill="white" />
    </svg>
  );
}

function CountdownUnit({ value, label, delay }) {
  return (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
      animation: `fadeSlideUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s both`,
    }}>
      <div style={{
        fontFamily: "'Instrument Serif', serif",
        fontSize: 52,
        fontWeight: 400,
        color: "white",
        lineHeight: 1,
        letterSpacing: "-0.03em",
        textShadow: "0 2px 20px rgba(0,0,0,0.3)",
      }}>{String(value).padStart(2, "0")}</div>
      <div style={{
        fontSize: 11,
        fontWeight: 600,
        textTransform: "uppercase",
        letterSpacing: "0.14em",
        color: "rgba(255,255,255,0.6)",
        fontFamily: "'DM Sans', sans-serif",
      }}>{label}</div>
    </div>
  );
}

function CountdownSeparator({ delay }) {
  return (
    <div style={{
      fontFamily: "'Instrument Serif', serif",
      fontSize: 40,
      color: "rgba(255,255,255,0.3)",
      lineHeight: 1,
      paddingBottom: 18,
      animation: `fadeSlideUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s both`,
    }}>:</div>
  );
}

export default function LandingPage() {
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [scrollY, setScrollY] = useState(0);
  const videoRef = useRef(null);

  // Election Day: April 7, 2026, 6 PM PST
  const target = new Date("2026-04-07T18:00:00-07:00").getTime();

  useEffect(() => {
    const tick = () => {
      const now = Date.now();
      const diff = Math.max(0, target - now);
      setTime({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div style={{ background: COLORS.navy, minHeight: "100vh", fontFamily: "'DM Sans', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet" />

      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 20px rgba(200, 69, 58, 0.3), 0 0 60px rgba(200, 69, 58, 0.1); }
          50% { box-shadow: 0 0 30px rgba(200, 69, 58, 0.5), 0 0 80px rgba(200, 69, 58, 0.2); }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        @keyframes grainAnim {
          0%, 100% { transform: translate(0, 0); }
          10% { transform: translate(-5%, -10%); }
          20% { transform: translate(-15%, 5%); }
          30% { transform: translate(7%, -25%); }
          40% { transform: translate(-5%, 25%); }
          50% { transform: translate(-15%, 10%); }
          60% { transform: translate(15%, 0%); }
          70% { transform: translate(0%, 15%); }
          80% { transform: translate(3%, 35%); }
          90% { transform: translate(-10%, 10%); }
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
      `}</style>

      {/* ─── HERO SECTION ─── */}
      <section style={{
        position: "relative",
        height: "100vh",
        minHeight: 700,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}>
        {/* Background video */}
        <video
          ref={videoRef}
          autoPlay muted loop playsInline
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: `scale(${1 + scrollY * 0.0003})`,
            transition: "transform 0.1s linear",
          }}
        >
          <source src="/bg-video.mp4" type="video/mp4" />
        </video>

        {/* Dark overlay with gradient */}
        <div style={{
          position: "absolute", inset: 0,
          background: `linear-gradient(180deg,
            ${COLORS.navy}E6 0%,
            ${COLORS.navy}B3 30%,
            ${COLORS.navy}99 50%,
            ${COLORS.navy}CC 75%,
            ${COLORS.navy} 100%)`,
        }} />

        {/* Film grain overlay */}
        <div style={{
          position: "absolute", inset: "-50%",
          width: "200%", height: "200%",
          background: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
          opacity: 0.5,
          pointerEvents: "none",
          animation: "grainAnim 8s steps(10) infinite",
        }} />

        {/* Top bar */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0,
          padding: "28px 40px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          zIndex: 10,
          animation: "fadeIn 1s 0.2s both",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <LogoMark size={38} />
            <span style={{ color: "white", fontSize: 14, fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase" }}>UBC Startups</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{
              width: 8, height: 8, borderRadius: "50%",
              background: COLORS.mint,
              animation: "pulseGlow 2s ease-in-out infinite",
              boxShadow: `0 0 8px ${COLORS.mint}80`,
            }} />
            <span style={{ color: "rgba(255,255,255,0.7)", fontSize: 12, fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase" }}>Elections Live</span>
          </div>
        </div>

        {/* Hero content */}
        <div style={{ position: "relative", zIndex: 5, textAlign: "center", padding: "0 24px", maxWidth: 800 }}>
          <div style={{
            display: "inline-block",
            padding: "8px 20px",
            borderRadius: 100,
            border: "1px solid rgba(255,255,255,0.15)",
            background: "rgba(255,255,255,0.06)",
            backdropFilter: "blur(12px)",
            marginBottom: 32,
            animation: "fadeSlideUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.3s both",
          }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.8)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
              Election Day · Tuesday, April 7
            </span>
          </div>

          <h1 style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: "clamp(48px, 8vw, 88px)",
            color: "white",
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            fontWeight: 400,
            marginBottom: 20,
            animation: "fadeSlideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.5s both",
          }}>
            Your Club.<br />
            <span style={{
              fontStyle: "italic",
              background: `linear-gradient(135deg, ${COLORS.red}, ${COLORS.orange}, ${COLORS.mint})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>Your Vote.</span>
          </h1>

          <p style={{
            fontSize: "clamp(15px, 2vw, 18px)",
            color: "rgba(255,255,255,0.6)",
            lineHeight: 1.7,
            maxWidth: 480,
            margin: "0 auto 44px",
            fontWeight: 400,
            animation: "fadeSlideUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.7s both",
          }}>
            UBC Startups Elections 2026. Read the platforms, know the candidates, then make your choice count.
          </p>

          {/* Countdown */}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: 20,
            marginBottom: 48,
          }}>
            <CountdownUnit value={time.days} label="Days" delay={0.8} />
            <CountdownSeparator delay={0.85} />
            <CountdownUnit value={time.hours} label="Hours" delay={0.9} />
            <CountdownSeparator delay={0.95} />
            <CountdownUnit value={time.minutes} label="Min" delay={1.0} />
            <CountdownSeparator delay={1.05} />
            <CountdownUnit value={time.seconds} label="Sec" delay={1.1} />
          </div>

          {/* CTA Buttons */}
          <div style={{
            display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap",
            animation: "fadeSlideUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) 1.2s both",
          }}>
            <a
              href="/candidates"
              style={{
                display: "inline-flex", alignItems: "center", gap: 10,
                padding: "16px 36px",
                borderRadius: 14,
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.15)",
                backdropFilter: "blur(12px)",
                color: "white",
                fontSize: 15,
                fontWeight: 600,
                textDecoration: "none",
                fontFamily: "'DM Sans', sans-serif",
                letterSpacing: "0.02em",
                transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.14)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="white" strokeWidth="2" strokeLinecap="round" />
                <circle cx="9" cy="7" r="4" stroke="white" strokeWidth="2" />
                <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="white" strokeWidth="2" strokeLinecap="round" />
              </svg>
              Meet the Candidates
            </a>

            <a
              href="/vote"
              style={{
                display: "inline-flex", alignItems: "center", gap: 10,
                padding: "16px 36px",
                borderRadius: 14,
                background: `linear-gradient(135deg, ${COLORS.red}, ${COLORS.red}DD)`,
                border: "1px solid rgba(255,255,255,0.1)",
                color: "white",
                fontSize: 15,
                fontWeight: 600,
                textDecoration: "none",
                fontFamily: "'DM Sans', sans-serif",
                letterSpacing: "0.02em",
                transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                cursor: "pointer",
                animation: "pulseGlow 3s ease-in-out infinite",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px) scale(1.03)";
                e.currentTarget.style.background = `linear-gradient(135deg, ${COLORS.red}, ${COLORS.orange})`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0) scale(1)";
                e.currentTarget.style.background = `linear-gradient(135deg, ${COLORS.red}, ${COLORS.red}DD)`;
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M20 12a8 8 0 11-16 0 8 8 0 0116 0z" stroke="white" strokeWidth="2" />
              </svg>
              Cast Your Vote
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: "absolute", bottom: 36, left: "50%", transform: "translateX(-50%)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
          animation: "fadeIn 1s 2s both",
          zIndex: 5,
        }}>
          <span style={{ fontSize: 10, fontWeight: 600, color: "rgba(255,255,255,0.35)", letterSpacing: "0.15em", textTransform: "uppercase" }}>Scroll</span>
          <div style={{
            width: 1, height: 32,
            background: "linear-gradient(to bottom, rgba(255,255,255,0.4), transparent)",
            animation: "float 2s ease-in-out infinite",
          }} />
        </div>
      </section>

      {/* ─── CANDIDATES PREVIEW SECTION ─── */}
      <section style={{
        position: "relative",
        padding: "100px 24px 80px",
        background: `linear-gradient(180deg, ${COLORS.navy} 0%, #162230 100%)`,
      }}>
        {/* Subtle top divider */}
        <div style={{
          position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
          width: 60, height: 1,
          background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)`,
        }} />

        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          {/* Section header */}
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <div style={{
              fontSize: 11, fontWeight: 700, color: COLORS.mint, textTransform: "uppercase",
              letterSpacing: "0.18em", marginBottom: 16, fontFamily: "'DM Sans', sans-serif",
            }}>The Race</div>
            <h2 style={{
              fontFamily: "'Instrument Serif', serif",
              fontSize: "clamp(32px, 5vw, 48px)",
              color: "white",
              fontWeight: 400,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}>Who's Running</h2>
          </div>

          {/* President race */}
          <div style={{ marginBottom: 48 }}>
            <div style={{
              display: "flex", alignItems: "center", gap: 12, marginBottom: 24,
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10,
                background: `${COLORS.red}20`,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke={COLORS.red} strokeWidth="2" fill="none" />
                </svg>
              </div>
              <h3 style={{
                fontFamily: "'Instrument Serif', serif",
                fontSize: 24, color: "white", fontWeight: 400,
              }}>President</h3>
              <div style={{
                marginLeft: "auto",
                padding: "6px 14px", borderRadius: 100,
                background: `${COLORS.red}15`, border: `1px solid ${COLORS.red}30`,
                fontSize: 12, fontWeight: 600, color: COLORS.red,
                fontFamily: "'DM Sans', sans-serif",
              }}>2 Teams Running</div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {[
                { names: "Maddie & Samuel", tagline: "Elevating the UBC Startups experience, together.", roles: "Software Developer & VP Internal" },
                { names: "Mostafa & Katelyn", tagline: "The year of your peak university memories starts here.", roles: "Current Co-Presidents" },
              ].map((c, i) => (
                <a
                  key={i}
                  href="/candidates"
                  style={{
                    display: "block",
                    padding: "28px 24px",
                    borderRadius: 16,
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    textDecoration: "none",
                    transition: "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                    e.currentTarget.style.borderColor = `${COLORS.red}40`;
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow = `0 16px 48px ${COLORS.navy}80`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <div style={{
                    display: "flex", alignItems: "center", gap: 10, marginBottom: 16,
                  }}>
                    <div style={{
                      width: 42, height: 42, borderRadius: 12,
                      background: `linear-gradient(135deg, ${COLORS.red}30, ${COLORS.orange}20)`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 18, fontWeight: 700, color: COLORS.red,
                      fontFamily: "'Instrument Serif', serif",
                    }}>{i + 1}</div>
                    <div>
                      <div style={{ fontSize: 10, fontWeight: 600, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 2 }}>Co-President Duo</div>
                      <div style={{ fontSize: 18, fontWeight: 600, color: "white", fontFamily: "'Instrument Serif', serif" }}>{c.names}</div>
                    </div>
                  </div>
                  <p style={{
                    fontSize: 13.5, color: "rgba(255,255,255,0.5)", lineHeight: 1.6,
                    fontStyle: "italic", margin: "0 0 12px", fontFamily: "'DM Sans', sans-serif",
                  }}>"{c.tagline}"</p>
                  <div style={{
                    fontSize: 12, color: "rgba(255,255,255,0.35)", fontFamily: "'DM Sans', sans-serif",
                  }}>{c.roles}</div>
                </a>
              ))}
            </div>
          </div>

          {/* Treasurer race */}
          <div style={{ marginBottom: 48 }}>
            <div style={{
              display: "flex", alignItems: "center", gap: 12, marginBottom: 24,
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10,
                background: `${COLORS.orange}20`,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" stroke={COLORS.orange} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 style={{
                fontFamily: "'Instrument Serif', serif",
                fontSize: 24, color: "white", fontWeight: 400,
              }}>Treasurer</h3>
              <div style={{
                marginLeft: "auto",
                padding: "6px 14px", borderRadius: 100,
                background: `${COLORS.orange}15`, border: `1px solid ${COLORS.orange}30`,
                fontSize: 12, fontWeight: 600, color: COLORS.orange,
                fontFamily: "'DM Sans', sans-serif",
              }}>Uncontested</div>
            </div>

            <a
              href="/candidates"
              style={{
                display: "block",
                padding: "28px 24px",
                borderRadius: 16,
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                textDecoration: "none",
                maxWidth: "calc(50% - 8px)",
                transition: "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                e.currentTarget.style.borderColor = `${COLORS.orange}40`;
                e.currentTarget.style.transform = "translateY(-4px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                <div style={{
                  width: 42, height: 42, borderRadius: 12,
                  background: `linear-gradient(135deg, ${COLORS.orange}30, ${COLORS.mint}20)`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 18, fontWeight: 700, color: COLORS.orange,
                  fontFamily: "'Instrument Serif', serif",
                }}>1</div>
                <div>
                  <div style={{ fontSize: 10, fontWeight: 600, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 2 }}>Solo Candidate</div>
                  <div style={{ fontSize: 18, fontWeight: 600, color: "white", fontFamily: "'Instrument Serif', serif" }}>Ines Bouvier</div>
                </div>
              </div>
              <p style={{
                fontSize: 13.5, color: "rgba(255,255,255,0.5)", lineHeight: 1.6,
                fontStyle: "italic", margin: "0 0 12px", fontFamily: "'DM Sans', sans-serif",
              }}>"Strategic growth and organised delegation to fuel the future of UBC Startups"</p>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", fontFamily: "'DM Sans', sans-serif" }}>Finance Director · 2nd Year · Sauder</div>
            </a>
          </div>

          {/* Read full platforms CTA */}
          <div style={{ textAlign: "center" }}>
            <a
              href="/candidates"
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "14px 28px",
                borderRadius: 12,
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.12)",
                color: "rgba(255,255,255,0.7)",
                fontSize: 14, fontWeight: 600,
                textDecoration: "none",
                fontFamily: "'DM Sans', sans-serif",
                transition: "all 0.3s ease",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.1)";
                e.currentTarget.style.color = "white";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                e.currentTarget.style.color = "rgba(255,255,255,0.7)";
              }}
            >
              Read full platforms & Q&A
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section style={{
        padding: "80px 24px 100px",
        background: "#162230",
        position: "relative",
      }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div style={{
              fontSize: 11, fontWeight: 700, color: COLORS.orange, textTransform: "uppercase",
              letterSpacing: "0.18em", marginBottom: 16, fontFamily: "'DM Sans', sans-serif",
            }}>Timeline</div>
            <h2 style={{
              fontFamily: "'Instrument Serif', serif",
              fontSize: "clamp(28px, 4vw, 40px)",
              color: "white", fontWeight: 400, lineHeight: 1.15,
            }}>How Election Day Works</h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {[
              {
                time: "6:00 PM",
                title: "Doors Open",
                desc: "Grab a seat. In-person at the meeting room.",
                color: COLORS.mint,
                icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
              },
              {
                time: "6:05 PM",
                title: "Candidate Speeches",
                desc: "Each candidate gets ~5 minutes to make their case.",
                color: COLORS.red,
                icon: "M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0-11V3m0 0L9.5 7.5M12 3l2.5 4.5",
              },
              {
                time: "6:30 PM",
                title: "Q&A",
                desc: "Ask questions. Get real answers. Hold them accountable.",
                color: COLORS.orange,
                icon: "M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
              },
              {
                time: "6:50 PM",
                title: "Vote",
                desc: "Cast your ballot. Results announced shortly after.",
                color: COLORS.mint,
                icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
              },
            ].map((step, i) => (
              <div key={i} style={{ display: "flex", gap: 24, position: "relative" }}>
                {/* Timeline line */}
                <div style={{
                  display: "flex", flexDirection: "column", alignItems: "center",
                  width: 48, flexShrink: 0,
                }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: 12,
                    background: `${step.color}18`,
                    border: `1.5px solid ${step.color}30`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0,
                  }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path d={step.icon} stroke={step.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  {i < 3 && (
                    <div style={{
                      width: 1, flex: 1, minHeight: 40,
                      background: `linear-gradient(to bottom, ${step.color}30, transparent)`,
                    }} />
                  )}
                </div>

                <div style={{ paddingBottom: i < 3 ? 36 : 0, paddingTop: 6 }}>
                  <div style={{
                    fontSize: 11, fontWeight: 700, color: step.color, textTransform: "uppercase",
                    letterSpacing: "0.1em", marginBottom: 4, fontFamily: "'DM Sans', sans-serif",
                  }}>{step.time}</div>
                  <div style={{
                    fontSize: 17, fontWeight: 600, color: "white", marginBottom: 4,
                    fontFamily: "'DM Sans', sans-serif",
                  }}>{step.title}</div>
                  <div style={{
                    fontSize: 14, color: "rgba(255,255,255,0.45)", lineHeight: 1.6,
                    fontFamily: "'DM Sans', sans-serif",
                  }}>{step.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── BOTTOM CTA ─── */}
      <section style={{
        padding: "80px 24px",
        background: COLORS.navy,
        textAlign: "center",
        position: "relative",
      }}>
        {/* Subtle radial glow */}
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          width: 500, height: 300,
          background: `radial-gradient(ellipse, ${COLORS.red}10 0%, transparent 70%)`,
          pointerEvents: "none",
        }} />

        <div style={{ position: "relative", maxWidth: 500, margin: "0 auto" }}>
          <LogoMark size={48} />
          <h2 style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: "clamp(28px, 4vw, 38px)",
            color: "white", fontWeight: 400, lineHeight: 1.15,
            margin: "24px 0 12px",
            letterSpacing: "-0.02em",
          }}>Make it count.</h2>
          <p style={{
            fontSize: 15, color: "rgba(255,255,255,0.5)", lineHeight: 1.6,
            marginBottom: 32, fontFamily: "'DM Sans', sans-serif",
          }}>
            Tuesday, April 7 · 6–7 PM · In-person meeting
          </p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <a
              href="/candidates"
              style={{
                padding: "14px 28px", borderRadius: 12,
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.12)",
                color: "white", fontSize: 14, fontWeight: 600,
                textDecoration: "none", fontFamily: "'DM Sans', sans-serif",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.14)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; }}
            >Meet Candidates</a>
            <a
              href="/vote"
              style={{
                padding: "14px 28px", borderRadius: 12,
                background: COLORS.red,
                color: "white", fontSize: 14, fontWeight: 600,
                textDecoration: "none", fontFamily: "'DM Sans', sans-serif",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; }}
            >Cast Your Vote</a>
          </div>
        </div>

        <div style={{
          marginTop: 60, fontSize: 12, color: "rgba(255,255,255,0.2)",
          fontFamily: "'DM Sans', sans-serif",
        }}>
          UBC Startups Elections 2026 · Nominations are closed
        </div>
      </section>
    </div>
  );
}
