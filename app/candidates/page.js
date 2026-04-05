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

const PRESIDENT_CANDIDATES = [
  {
    names: ["Maddie Wright", "Samuel Ma"],
    type: "team",
    details: [
      { name: "Maddie Wright", year: "3rd Year", faculty: "Faculty of Science", role: "Software Developer" },
      { name: "Samuel Ma", year: "4th Year", faculty: "Sauder School of Business", role: "VP Internal" },
    ],
    tagline: "Elevating the UBC Startups experience, together.",
    answers: {
      q1: "We want UBC Startups to feel more connected, organized, and valuable for everyone involved. This means clearer communication and timelines so executives know what they are working toward, and events that are built around clear purpose. We desire to expand our network by building stronger relationships with founders, VCs, and partners across campus, creating more opportunities through mixers, panels, and collaborations. Overall, we hope this helps increase meaningful exposure to professional opportunities for executives. At the same time, we intend to strengthen the club's presence in the community while building a more supportive team culture through bonding and open feedback.",
      q2: "We both bring different but complementary experiences across business, tech, and entrepreneurship. Sam, as one of the longest-serving executives, brings a strong business-focused perspective shaped by leadership roles across campus and experience scaling a six-figure startup. Maddie brings a strong technical background, having led a team of ten developers and held leadership roles in MINT and Girls in STEAM. Forged in fire, surviving CPSC 304 together, at the end of the day we're friends who enjoy working together. Together, our mix of experience and perspectives makes us a strong and balanced team to lead UBC Startups.",
      q3: "Our main priority is positioning UBC Startups as the central hub on campus for startups, VCs, and related organizations. We believe this is key to creating more meaningful opportunities for both executives and attendees by strengthening the connection between students and the broader startup ecosystem. Through intentional outreach to founders and investors, along with diverse events that provide lasting value, we aim to ensure each experience is purposeful and impactful. By focusing on this, we also hope to naturally strengthen engagement, turnout, and the club's overall presence within the community.",
    },
  },
  {
    names: ["Mostafa Mostafa", "Katelyn Jang"],
    type: "team",
    details: [
      { name: "Mostafa Mostafa", year: "3rd Year", faculty: "Faculty of Science", role: "Co-President" },
      { name: "Katelyn Jang", year: "3rd Year", faculty: "Sauder School of Business", role: "Co-President" },
    ],
    tagline: "The year of your peak university memories starts here. Let's build it together ✨",
    answers: {
      q1: "We envision UBC Startups to be a highlight of your university experience, and go down as one of the best decisions you make in university.\n\nA big theme for next year is \"giving\". The club \"giving\" you a platform for you to meet incredible people, build lasting friendships, and create memories that you ponder about for years. But also, an opportunity to exercise your creativity, increase confidence, and build real-world skills to shape your growth.\n\nExpand our team to 50+ execs, and empower each person with ownership and creative freedom to build an impact and spread our mission.",
      q2: "This past year, UBC Startups has reached new heights: from our largest events, the largest number of sponsors, and the highest growth in social media and our team. As the previous Co-presidents, we directed the team to make this possible.\n\nMostafa brings creativity, strong team leadership, and energy to the team, while Katelyn brings dedication, strong organization, and focus on execution. Both of our skill sets fill in each other's gaps, and together, our strengths bring out the best in our team.\n\nWe understand what makes the club thrive, and we're ready to bring the best year yet!",
      q3: "Our main focus this year has to be: building a community to grow. UBC Startups is like a second family to us, not just an extracurricular. Both of us have seen first-hand the power of being included in a community where people care about each other and drive one another to do their best.\n\nIn the upcoming year, we will bring opportunities to create an environment that encourages you to grow, take risks, and learn by doing. If you know your work has an impact, you give more. This, as a collective, makes the club even stronger.",
    },
  },
];

const TREASURER_CANDIDATES = [
  {
    names: ["Ines Bouvier"],
    type: "individual",
    details: [
      { name: "Ines Bouvier", year: "2nd Year", faculty: "Sauder School of Business", role: "Finance Director" },
    ],
    tagline: "Strategic growth and organised delegation to fuel the future of UBC Startups",
    answers: {
      q1: "As a Finance Director, I view our finances as the engine that powers the wings of our club's ideas, operations, and aspirations. After looking back at our past financial statements and doing my own research, my vision is to shift our focus toward proactively securing diverse funding, specifically through new grants and strategic sponsorships, to remove the constant stress of budget constraints. I want to build a stable financial runway so our teams can focus on innovation/expansion, instead of just \"making ends meet.\"",
      q2: "I'm a persistent and quick learner who enjoys and thrives with responsibility. I've recently stepped into financial leadership as the Finance Head for the NGO Inspired 2 Uplift, where I oversee international financial strategies, budgeting, and Board reporting. Although I joined UBC Startups recently, I've demonstrated my proactivity. For SOAR 2026, I took initiative on our outreach list and secured sponsorships from Rumble Boxing, Teadot, and PepsiCo with a 25% conversion rate, exceeding our 20% target. I also invited the team that ultimately won the competition to apply initially. I'm ready to bring this same dedication to the Treasurer role.",
      q3: "I want to eliminate bottlenecks by truly empowering our team. I've noticed our Finance team has incredible individual strengths, and I believe we can multiply our impact by moving away from a top-down model. My priority is to introduce \"mini-verticals,\" an organised delegation system where directors lead areas they are genuinely interested in, such as grant-writing or corporate outreach. This directly addresses the delegation challenges the portfolio faced this year. By aligning our team's interests with the club's needs, we can secure more resources and support our members faster.",
    },
  },
];

const PRES_Q_LABELS = ["Their vision", "Why them", "Their priority"];
const TRES_Q_LABELS = ["Their vision", "Why them", "Their priority"];

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

function CandidateCard({ candidate, accentColor, qLabels }) {
  const [expanded, setExpanded] = useState(null);
  const isDuo = candidate.type === "team";

  return (
    <div style={{ background: COLORS.white, borderRadius: 16, overflow: "hidden", boxShadow: "0 2px 20px rgba(30,45,61,0.06)" }}>
      {/* Header bar */}
      <div style={{ background: `linear-gradient(135deg, ${accentColor}, ${accentColor}DD)`, padding: "24px 28px", color: COLORS.white }}>
        <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", opacity: 0.8, marginBottom: 8, fontFamily: "'DM Sans', sans-serif" }}>
          {isDuo ? "Co-President Duo" : "Solo Candidate"}
        </div>
        <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 24, margin: "0 0 8px", fontWeight: 400 }}>
          {candidate.names.join(" & ")}
        </h3>
        <p style={{ fontSize: 14, margin: 0, opacity: 0.9, fontFamily: "'DM Sans', sans-serif", fontStyle: "italic", lineHeight: 1.5 }}>
          "{candidate.tagline}"
        </p>
      </div>

      <div style={{ padding: "24px 28px" }}>
        {/* Member details */}
        <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
          {candidate.details.map((d) => (
            <div key={d.name} style={{ flex: 1, minWidth: 200, padding: "12px 14px", borderRadius: 10, background: COLORS.cream, border: "1.5px solid #E5E1DC" }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.navy, marginBottom: 4, fontFamily: "'DM Sans', sans-serif" }}>{d.name}</div>
              <div style={{ fontSize: 12, color: COLORS.midGray, fontFamily: "'DM Sans', sans-serif", lineHeight: 1.5 }}>
                {d.role} · {d.year} · {d.faculty}
              </div>
            </div>
          ))}
        </div>

        {/* Q&A Accordion */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {["q1", "q2", "q3"].map((qKey, i) => {
            const isOpen = expanded === qKey;
            return (
              <div key={qKey} style={{ borderRadius: 10, border: `1.5px solid ${isOpen ? accentColor + "40" : "#E5E1DC"}`, overflow: "hidden", transition: "border-color 0.2s ease" }}>
                <button
                  onClick={() => setExpanded(isOpen ? null : qKey)}
                  style={{
                    width: "100%", padding: "14px 16px", background: isOpen ? `${accentColor}08` : "transparent",
                    border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between",
                    fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 600, color: COLORS.navy, textAlign: "left",
                  }}
                >
                  <span>{qLabels[i]}</span>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ transform: isOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s ease", flexShrink: 0 }}>
                    <path d="M3 5L7 9L11 5" stroke={COLORS.midGray} strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </button>
                {isOpen && (
                  <div style={{ padding: "0 16px 16px", fontSize: 14, color: COLORS.darkText, lineHeight: 1.7, fontFamily: "'DM Sans', sans-serif", whiteSpace: "pre-line" }}>
                    {candidate.answers[qKey]}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function CandidatesPage() {
  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(135deg, ${COLORS.cream} 0%, #EDE8E3 100%)`, fontFamily: "'DM Sans', sans-serif", padding: "40px 20px" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Serif+Display&display=swap" rel="stylesheet" />

      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}><LogoMark size={56} /></div>
          <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 36, color: COLORS.navy, margin: "0 0 10px", lineHeight: 1.15, fontWeight: 400 }}>Meet Your Candidates</h1>
          <p style={{ color: "#6B6560", fontSize: 15, margin: "0 0 6px", lineHeight: 1.6, maxWidth: 480, marginLeft: "auto", marginRight: "auto" }}>
            Read through each candidate's responses before you vote. Take your time. These are the people who want to lead your club next year.
          </p>
          <a href="/vote" style={{ display: "inline-block", marginTop: 14, padding: "10px 24px", borderRadius: 10, background: COLORS.navy, color: COLORS.white, fontSize: 14, fontWeight: 600, fontFamily: "'DM Sans', sans-serif", textDecoration: "none", transition: "opacity 0.2s" }}>
            Ready to vote →
          </a>
        </div>

        {/* President Section */}
        <div style={{ marginBottom: 40 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
            <div style={{ width: 32, height: 32, borderRadius: 10, background: COLORS.red, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="white" strokeWidth="2" fill="none" /></svg>
            </div>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 22, color: COLORS.navy, margin: 0, fontWeight: 400 }}>President</h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {PRESIDENT_CANDIDATES.map((c, i) => (
              <CandidateCard key={i} candidate={c} accentColor={COLORS.red} qLabels={PRES_Q_LABELS} />
            ))}
          </div>
        </div>

        {/* Treasurer Section */}
        <div style={{ marginBottom: 40 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
            <div style={{ width: 32, height: 32, borderRadius: 10, background: COLORS.orange, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 22, color: COLORS.navy, margin: 0, fontWeight: 400 }}>Treasurer</h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {TREASURER_CANDIDATES.map((c, i) => (
              <CandidateCard key={i} candidate={c} accentColor={COLORS.orange} qLabels={TRES_Q_LABELS} />
            ))}
          </div>
        </div>

        {/* Vote CTA */}
        <div style={{ textAlign: "center", padding: "32px 24px", background: COLORS.white, borderRadius: 16, boxShadow: "0 2px 20px rgba(30,45,61,0.06)" }}>
          <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 22, color: COLORS.navy, margin: "0 0 8px", fontWeight: 400 }}>Ready to cast your vote?</h3>
          <p style={{ color: "#6B6560", fontSize: 14, margin: "0 0 16px", lineHeight: 1.5 }}>Voting takes place on Election Day, Tuesday April 7, 6 to 7 PM.</p>
          <a href="/vote" style={{ display: "inline-block", padding: "14px 32px", borderRadius: 12, background: `linear-gradient(135deg, ${COLORS.navy}, #2A3F52)`, color: COLORS.white, fontSize: 16, fontWeight: 700, fontFamily: "'DM Sans', sans-serif", textDecoration: "none" }}>
            Vote Now
          </a>
        </div>

        <p style={{ textAlign: "center", fontSize: 12, color: COLORS.midGray, marginTop: 20 }}>
          UBC Startups Elections 2026
        </p>
      </div>
    </div>
  );
}
