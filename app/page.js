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

const ROLE_GROUPS = [
  { label: "Executive", roles: ["Co-President", "Treasurer"] },
  { label: "Vice Presidents", roles: ["VP Admin", "VP Events", "VP Marketing", "VP Partnerships", "VP Tech", "VP Internal"] },
  { label: "Directors", roles: ["Events Director", "Partnership Director", "Internal Director", "Finance Director", "Marketing Director"] },
  { label: "Team Members", roles: ["Graphic Designer", "Content Creator", "Photographer", "Videographer", "Software Developer", "UI/UX Designer"] },
];

const YEARS = ["1st Year", "2nd Year", "3rd Year", "4th Year", "5th Year+", "Graduate"];
const FACULTIES = [
  "Sauder School of Business", "Faculty of Arts", "Faculty of Science",
  "Faculty of Applied Science (Engineering)", "Faculty of Forestry",
  "Faculty of Land & Food Systems", "Faculty of Education",
  "Faculty of Medicine", "Faculty of Pharmaceutical Sciences", "Other",
];

const PRESIDENT_QUESTIONS = [
  {
    id: "q1",
    label: "Your vision",
    question: "What's your vision for UBC Startups next year? What would the club look like if you were leading it?",
    duoQuestion: "What's your shared vision for UBC Startups next year? What would the club look like with you two at the helm?",
    tip: "People want to know where you'd take this. Be specific about what would actually change.",
  },
  {
    id: "q2",
    label: "Why you",
    question: "What about your experience in the club makes you the right person for this role?",
    duoQuestion: "What about your combined experience makes you two the right pair to lead this club?",
    tip: "This is your chance to connect what you've done to what you'd do next.",
    duoTip: "What do you each bring to the table? Tell us why you work better together than apart.",
  },
  {
    id: "q3",
    label: "Your priority",
    question: "If you could only focus on one thing as President, what would it be and why?",
    duoQuestion: "If you two could only focus on one thing as Co-Presidents, what would it be and why?",
    tip: "Pick the thing you care about most. Trying to say everything usually means saying nothing.",
  },
];

const TREASURER_QUESTIONS = [
  {
    id: "q1",
    label: "Your vision",
    question: "How would you approach managing the club's finances? What would you do differently or keep the same?",
    tip: "Members want to trust that their funds are in good hands. Show them why.",
  },
  {
    id: "q2",
    label: "Why you",
    question: "What about your background or experience makes you a good fit for Treasurer?",
    tip: "This doesn't have to be finance experience. Anything that shows you're detail-oriented and trustworthy counts.",
  },
  {
    id: "q3",
    label: "Your priority",
    question: "What's one thing you'd want to improve about how the club allocates its budget?",
    tip: "Be real about what you've noticed. Members appreciate transparency.",
  },
];

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

function SearchableRoleDropdown({ value, onChange, error }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const filtered = search.trim()
    ? ROLE_GROUPS.map((g) => ({ ...g, roles: g.roles.filter((r) => r.toLowerCase().includes(search.toLowerCase())) })).filter((g) => g.roles.length > 0)
    : ROLE_GROUPS;

  return (
    <div style={{ position: "relative" }}>
      <div onClick={() => setOpen(!open)} style={{ width: "100%", padding: "12px 14px", borderRadius: 10, border: `2px solid ${error ? COLORS.red : open ? COLORS.navy : "#E5E1DC"}`, fontSize: 15, fontFamily: "'DM Sans', sans-serif", color: value ? COLORS.darkText : COLORS.midGray, background: COLORS.white, cursor: "pointer", boxSizing: "border-box", display: "flex", alignItems: "center", justifyContent: "space-between", transition: "border-color 0.2s ease" }}>
        <span>{value || "Select your role"}</span>
        <svg width="12" height="8" viewBox="0 0 12 8" style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform 0.2s ease" }}>
          <path d="M1 1L6 6L11 1" stroke={COLORS.midGray} strokeWidth="2" fill="none" />
        </svg>
      </div>
      {open && (
        <div style={{ position: "absolute", top: "calc(100% + 4px)", left: 0, right: 0, background: COLORS.white, borderRadius: 10, border: "2px solid #E5E1DC", boxShadow: "0 8px 24px rgba(30,45,61,0.12)", zIndex: 50, maxHeight: 280, overflowY: "auto", animation: "fadeIn 0.15s ease" }}>
          <div style={{ padding: "8px 10px", borderBottom: "1px solid #F0EDEA", position: "sticky", top: 0, background: COLORS.white, zIndex: 1 }}>
            <input autoFocus placeholder="Search roles..." value={search} onChange={(e) => setSearch(e.target.value)} onClick={(e) => e.stopPropagation()} style={{ width: "100%", padding: "8px 10px", borderRadius: 8, border: "1.5px solid #E5E1DC", fontSize: 14, fontFamily: "'DM Sans', sans-serif", color: COLORS.darkText, outline: "none", background: COLORS.cream, boxSizing: "border-box" }} />
          </div>
          {filtered.length === 0 && <div style={{ padding: "14px 16px", fontSize: 14, color: COLORS.midGray, fontFamily: "'DM Sans', sans-serif" }}>No roles found</div>}
          {filtered.map((group) => (
            <div key={group.label}>
              <div style={{ padding: "8px 14px 4px", fontSize: 11, fontWeight: 700, color: COLORS.midGray, textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "'DM Sans', sans-serif" }}>{group.label}</div>
              {group.roles.map((role) => (
                <div key={role} onClick={() => { onChange(role); setOpen(false); setSearch(""); }} style={{ padding: "10px 14px", fontSize: 14, fontFamily: "'DM Sans', sans-serif", color: value === role ? COLORS.navy : COLORS.darkText, fontWeight: value === role ? 600 : 400, background: value === role ? `${COLORS.navy}08` : "transparent", cursor: "pointer" }} onMouseEnter={(e) => { if (value !== role) e.target.style.background = COLORS.cream; }} onMouseLeave={(e) => { if (value !== role) e.target.style.background = "transparent"; }}>
                  {role}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function TeamMemberList({ members, onChange, accentColor }) {
  const addMember = () => onChange([...members, { name: "", studentNumber: "", year: "", faculty: "", role: "" }]);
  const removeMember = (i) => onChange(members.filter((_, idx) => idx !== i));
  const updateMember = (i, field, value) => {
    const updated = [...members];
    updated[i] = { ...updated[i], [field]: value };
    onChange(updated);
  };

  const fieldInput = { width: "100%", padding: "10px 12px", borderRadius: 8, border: "2px solid #E5E1DC", fontSize: 14, fontFamily: "'DM Sans', sans-serif", color: COLORS.darkText, outline: "none", background: COLORS.white, boxSizing: "border-box" };
  const fieldSelect = { ...fieldInput, appearance: "none", backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1L6 6L11 1' stroke='%23B8B2AA' stroke-width='2' fill='none'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 12px center", paddingRight: 32, cursor: "pointer" };
  const miniLabel = { fontSize: 11, fontWeight: 600, color: COLORS.midGray, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4, display: "block", fontFamily: "'DM Sans', sans-serif" };

  return (
    <div style={{ marginTop: 12 }}>
      <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.navy, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 10, fontFamily: "'DM Sans', sans-serif" }}>Your running mate</div>
      {members.map((m, i) => (
        <div key={i} style={{ padding: 16, borderRadius: 10, border: "1.5px solid #E5E1DC", background: COLORS.cream, marginBottom: 10, position: "relative" }}>
          {members.length > 1 && (
            <button type="button" onClick={(e) => { e.stopPropagation(); removeMember(i); }} style={{ position: "absolute", top: 10, right: 10, width: 26, height: 26, borderRadius: 6, border: "none", background: `${COLORS.red}14`, color: COLORS.red, fontSize: 16, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", lineHeight: 1 }}>×</button>
          )}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
            <div><span style={miniLabel}>Full Name</span><input placeholder="e.g. Jane Doe" value={m.name} onChange={(e) => updateMember(i, "name", e.target.value)} style={fieldInput} /></div>
            <div><span style={miniLabel}>Student Number</span><input placeholder="8 digits" value={m.studentNumber} onChange={(e) => { const v = e.target.value.replace(/\D/g, "").slice(0, 8); updateMember(i, "studentNumber", v); }} style={fieldInput} maxLength={8} /></div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
            <div><span style={miniLabel}>Year</span><select style={fieldSelect} value={m.year} onChange={(e) => updateMember(i, "year", e.target.value)}><option value="">Select</option>{YEARS.map((y) => <option key={y} value={y}>{y}</option>)}</select></div>
            <div><span style={miniLabel}>Faculty</span><select style={fieldSelect} value={m.faculty} onChange={(e) => updateMember(i, "faculty", e.target.value)}><option value="">Select</option>{FACULTIES.map((f) => <option key={f} value={f}>{f}</option>)}</select></div>
          </div>
          <div><span style={miniLabel}>Role in Club</span><SearchableRoleDropdown value={m.role} onChange={(val) => updateMember(i, "role", val)} error={false} /></div>
        </div>
      ))}
      {members.length < 1 && (
        <button type="button" onClick={(e) => { e.stopPropagation(); addMember(); }} style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", borderRadius: 8, border: `1.5px dashed ${accentColor}60`, background: `${accentColor}08`, color: accentColor, fontSize: 13, fontWeight: 600, fontFamily: "'DM Sans', sans-serif", cursor: "pointer", marginTop: 4 }}>
          <span style={{ fontSize: 16, lineHeight: 1 }}>+</span> Add running mate
        </button>
      )}
    </div>
  );
}

function QuestionBlock({ questions, answers, onChange, accentColor, errors, isDuo }) {
  return (
    <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 22 }}>
      {questions.map((q) => {
        const wordCount = (answers[q.id] || "").trim().split(/\s+/).filter(Boolean).length;
        const questionText = isDuo && q.duoQuestion ? q.duoQuestion : q.question;
        const tipText = isDuo && q.duoTip ? q.duoTip : q.tip;
        return (
          <div key={q.id} style={{ padding: "18px 16px", borderRadius: 10, background: COLORS.cream, border: `1.5px solid ${errors?.[q.id] ? COLORS.red : "#E5E1DC"}` }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: accentColor, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6, fontFamily: "'DM Sans', sans-serif" }}>{q.label}</div>
            <p style={{ fontSize: 14, color: COLORS.darkText, lineHeight: 1.6, margin: "0 0 6px", fontFamily: "'DM Sans', sans-serif" }}>{questionText}</p>
            {tipText && <p style={{ fontSize: 12.5, color: COLORS.midGray, lineHeight: 1.5, margin: "0 0 12px", fontFamily: "'DM Sans', sans-serif", fontStyle: "italic" }}>Pro tip: {tipText}</p>}
            <textarea
              value={answers[q.id] || ""}
              onChange={(e) => { const val = e.target.value; const words = val.trim().split(/\s+/).filter(Boolean); if (words.length > 100) { onChange(q.id, words.slice(0, 100).join(" ")); } else { onChange(q.id, val); } }}
              placeholder="Write in your own words..."
              rows={5}
              style={{ width: "100%", padding: "12px 14px", borderRadius: 10, border: `2px solid ${errors?.[q.id] ? COLORS.red : "#E5E1DC"}`, fontSize: 14, fontFamily: "'DM Sans', sans-serif", color: COLORS.darkText, background: COLORS.white, outline: "none", resize: "vertical", lineHeight: 1.5, boxSizing: "border-box", transition: "border-color 0.2s ease" }}
            />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 6 }}>
              {errors?.[q.id] ? <div style={{ fontSize: 12, color: COLORS.red, fontFamily: "'DM Sans', sans-serif" }}>{errors[q.id]}</div> : <div />}
              <div style={{ fontSize: 11, color: wordCount > 100 ? COLORS.red : wordCount > 80 ? COLORS.orange : COLORS.midGray, fontFamily: "'DM Sans', sans-serif", fontWeight: wordCount > 100 ? 600 : 400 }}>
                {wordCount} / 100 words max
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function NominationSection({ title, sectionNumber, accentColor, nominated, onNominated, type, onType, teamMembers, onTeamMembers, soloOnly, questions, answers, onAnswerChange, questionErrors, tagline, onTaglineChange }) {
  return (
    <div style={{ marginBottom: 32 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20, paddingBottom: 14, borderBottom: `2px solid ${COLORS.lightGray}` }}>
        <div style={{ width: 28, height: 28, borderRadius: 8, background: accentColor, display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: 14, fontWeight: 700 }}>{sectionNumber}</div>
        <span style={{ fontWeight: 700, fontSize: 17, color: COLORS.navy, fontFamily: "'DM Sans', sans-serif" }}>Nominate for {title}</span>
      </div>

      <label onClick={onNominated} style={{ display: "flex", alignItems: "center", gap: 12, cursor: "pointer", padding: "14px 16px", borderRadius: 10, border: `2px ${nominated ? "solid" : "dashed"} ${nominated ? accentColor : "#E5E1DC"}`, background: nominated ? `${accentColor}10` : COLORS.cream, transition: "all 0.2s ease", marginBottom: nominated ? 16 : 0 }}>
        <div style={{ width: 22, height: 22, borderRadius: 6, border: `2px solid ${nominated ? accentColor : COLORS.midGray}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, background: nominated ? accentColor : "transparent", transition: "all 0.2s ease" }}>
          {nominated && <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7L6 10L11 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>}
        </div>
        <span style={{ fontSize: 15, color: COLORS.darkText, fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}>I'm running for {title}</span>
      </label>

      {nominated && (
        <div style={{ animation: "fadeIn 0.25s ease" }}>
          {!soloOnly && (
            <>
              <div style={{ display: "flex", gap: 10, marginBottom: 0 }}>
                {["individual", "team"].map((opt) => (
                  <label key={opt} onClick={() => onType(opt)} style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, cursor: "pointer", padding: "12px 14px", borderRadius: 10, border: `2px solid ${type === opt ? accentColor : "#E5E1DC"}`, background: type === opt ? `${accentColor}10` : COLORS.white, transition: "all 0.2s ease" }}>
                    <div style={{ width: 18, height: 18, borderRadius: "50%", border: `2px solid ${type === opt ? accentColor : COLORS.midGray}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      {type === opt && <div style={{ width: 9, height: 9, borderRadius: "50%", background: accentColor }} />}
                    </div>
                    <span style={{ fontSize: 14, fontWeight: 500, color: COLORS.darkText, fontFamily: "'DM Sans', sans-serif" }}>
                      {opt === "individual" ? "Running solo" : "Running as a team"}
                    </span>
                  </label>
                ))}
              </div>
              {type === "team" && <TeamMemberList members={teamMembers} onChange={onTeamMembers} accentColor={accentColor} />}
              {type === "team" && (
                <p style={{ fontSize: 12.5, color: COLORS.midGray, fontStyle: "italic", margin: "10px 0 0", lineHeight: 1.5, fontFamily: "'DM Sans', sans-serif" }}>
                  Only one of you needs to fill this out. One submission from either person is all we need.
                </p>
              )}
            </>
          )}

          {/* Tagline */}
          <div style={{ marginTop: 20 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: accentColor, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6, fontFamily: "'DM Sans', sans-serif" }}>Campaign tagline</div>
            <p style={{ fontSize: 13, color: COLORS.midGray, margin: "0 0 8px", fontFamily: "'DM Sans', sans-serif" }}>One line that sums up what you're about. Keep it short and memorable.</p>
            <input
              value={tagline}
              onChange={(e) => onTaglineChange(e.target.value)}
              placeholder="Sum up your campaign in one line"
              maxLength={80}
              style={{ width: "100%", padding: "12px 14px", borderRadius: 10, border: "2px solid #E5E1DC", fontSize: 14, fontFamily: "'DM Sans', sans-serif", color: COLORS.darkText, background: COLORS.white, outline: "none", boxSizing: "border-box" }}
            />
            <div style={{ fontSize: 11, color: COLORS.midGray, marginTop: 4, textAlign: "right", fontFamily: "'DM Sans', sans-serif" }}>{tagline.length} / 80</div>
          </div>

          <QuestionBlock questions={questions} answers={answers} onChange={onAnswerChange} accentColor={accentColor} errors={questionErrors} isDuo={!soloOnly && type === "team"} />
        </div>
      )}
    </div>
  );
}

export default function NominationForm() {
  const [form, setForm] = useState({ fullName: "", studentNumber: "", year: "", faculty: "", role: "" });
  const [president, setPresident] = useState({ nominated: false, type: "individual", teamMembers: [{ name: "", studentNumber: "", year: "", faculty: "", role: "" }], answers: {}, tagline: "" });
  const [treasurer, setTreasurer] = useState({ nominated: false, type: "individual", teamMembers: [{ name: "", studentNumber: "", year: "", faculty: "", role: "" }], answers: {}, tagline: "" });
  const [acknowledged, setAcknowledged] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [presQErrors, setPresQErrors] = useState({});
  const [tresQErrors, setTresQErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbz3mit3fX2ZsdkCkWmjMSnMHabphf264p_1LHL5CH9JOLEOsVs4DmcoyALZ-0v27tKW/exec";

  const update = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: null }));
  };

  const MAX_WORDS = 100;

  const validate = () => {
    const e = {};
    if (!form.fullName.trim()) e.fullName = "Required";
    if (!form.studentNumber.trim()) e.studentNumber = "Required";
    else if (!/^\d{8}$/.test(form.studentNumber)) e.studentNumber = "Must be exactly 8 digits";
    if (!form.year) e.year = "Required";
    if (!form.faculty) e.faculty = "Required";
    if (!form.role) e.role = "Required";
    if (!president.nominated && !treasurer.nominated) e.nomination = "Please nominate for at least one position";
    if ((president.nominated || treasurer.nominated) && !acknowledged) e.acknowledged = "Please confirm your commitment";

    const pqe = {};
    if (president.nominated) {
      PRESIDENT_QUESTIONS.forEach((q) => {
        const words = (president.answers[q.id] || "").trim().split(/\s+/).filter(Boolean).length;
        if (words === 0) pqe[q.id] = "This one's required";
        else if (words > MAX_WORDS) pqe[q.id] = `Keep it under ${MAX_WORDS} words (you're at ${words})`;
      });
    }

    const tqe = {};
    if (treasurer.nominated) {
      TREASURER_QUESTIONS.forEach((q) => {
        const words = (treasurer.answers[q.id] || "").trim().split(/\s+/).filter(Boolean).length;
        if (words === 0) tqe[q.id] = "This one's required";
        else if (words > MAX_WORDS) tqe[q.id] = `Keep it under ${MAX_WORDS} words (you're at ${words})`;
      });
    }

    setErrors(e);
    setPresQErrors(pqe);
    setTresQErrors(tqe);
    return Object.keys(e).length === 0 && Object.keys(pqe).length === 0 && Object.keys(tqe).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setSubmitting(true);

    const base = { fullName: form.fullName, studentNumber: form.studentNumber, year: form.year, faculty: form.faculty, role: form.role, timestamp: new Date().toISOString() };

    try {
      const requests = [];
      if (president.nominated) {
        requests.push(fetch(SCRIPT_URL, { method: "POST", mode: "no-cors", headers: { "Content-Type": "application/json" }, body: JSON.stringify({
          sheet: "President", ...base, nominationType: president.type,
          teamMember1Name: president.type === "team" ? president.teamMembers[0]?.name || "" : "",
          teamMember1StudentNumber: president.type === "team" ? president.teamMembers[0]?.studentNumber || "" : "",
          teamMember1Year: president.type === "team" ? president.teamMembers[0]?.year || "" : "",
          teamMember1Faculty: president.type === "team" ? president.teamMembers[0]?.faculty || "" : "",
          teamMember1Role: president.type === "team" ? president.teamMembers[0]?.role || "" : "",
          answer1: president.answers.q1 || "", answer2: president.answers.q2 || "",
          answer3: president.answers.q3 || "", tagline: president.tagline || "",
        }) }));
      }
      if (treasurer.nominated) {
        requests.push(fetch(SCRIPT_URL, { method: "POST", mode: "no-cors", headers: { "Content-Type": "application/json" }, body: JSON.stringify({
          sheet: "Treasurer", ...base, nominationType: "individual",
          teamMember1Name: "", teamMember1StudentNumber: "", teamMember1Year: "", teamMember1Faculty: "", teamMember1Role: "",
          answer1: treasurer.answers.q1 || "", answer2: treasurer.answers.q2 || "",
          answer3: treasurer.answers.q3 || "", tagline: treasurer.tagline || "",
        }) }));
      }
      await Promise.all(requests);
      setSubmitted(true);
    } catch (err) {
      console.error("Submit error:", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputStyle = (field) => ({ width: "100%", padding: "12px 14px", borderRadius: 10, border: `2px solid ${errors[field] ? COLORS.red : "#E5E1DC"}`, fontSize: 15, fontFamily: "'DM Sans', sans-serif", color: COLORS.darkText, background: COLORS.white, outline: "none", transition: "border-color 0.2s ease", boxSizing: "border-box" });
  const selectStyle = (field) => ({ ...inputStyle(field), appearance: "none", backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1L6 6L11 1' stroke='%23B8B2AA' stroke-width='2' fill='none'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 14px center", paddingRight: 36, cursor: "pointer" });
  const labelStyle = { fontSize: 13, fontWeight: 600, color: COLORS.navy, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6, display: "block", fontFamily: "'DM Sans', sans-serif" };
  const errorStyle = { fontSize: 12, color: COLORS.red, marginTop: 4, fontFamily: "'DM Sans', sans-serif" };

  if (submitted) {
    return (
      <div style={{ minHeight: "100vh", background: `linear-gradient(135deg, ${COLORS.cream} 0%, #EDE8E3 100%)`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'DM Sans', sans-serif", padding: 20 }}>
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Serif+Display&display=swap" rel="stylesheet" />
        <div style={{ textAlign: "center", maxWidth: 480 }}>
          <div style={{ width: 80, height: 80, borderRadius: "50%", background: `linear-gradient(135deg, ${COLORS.mint}, ${COLORS.mint}CC)`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none"><path d="M5 12L10 17L19 7" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </div>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 32, color: COLORS.navy, marginBottom: 12, fontWeight: 400 }}>You're in, {form.fullName.split(" ")[0]}!</h2>
          <p style={{ color: "#6B6560", lineHeight: 1.6, fontSize: 15, marginBottom: 20 }}>
            Your nomination has been recorded. We appreciate you stepping up. We'll be reviewing everything carefully and reaching out soon.
          </p>
          <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
            {president.nominated && <div style={{ padding: "10px 20px", borderRadius: 10, background: `${COLORS.red}14`, border: `1px solid ${COLORS.red}30` }}><span style={{ fontSize: 14, fontWeight: 600, color: COLORS.red }}>President {president.type === "team" ? "(Team)" : "(Solo)"}</span></div>}
            {treasurer.nominated && <div style={{ padding: "10px 20px", borderRadius: 10, background: `${COLORS.orange}14`, border: `1px solid ${COLORS.orange}30` }}><span style={{ fontSize: 14, fontWeight: 600, color: COLORS.orange }}>Treasurer (Solo)</span></div>}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(135deg, ${COLORS.cream} 0%, #EDE8E3 100%)`, fontFamily: "'DM Sans', sans-serif", padding: "40px 20px" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Serif+Display&display=swap" rel="stylesheet" />
      <style>{`@keyframes fadeIn { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: translateY(0); } }`}</style>

      <div style={{ maxWidth: 600, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}><LogoMark size={56} /></div>
          <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 36, color: COLORS.navy, margin: "0 0 12px", lineHeight: 1.15, fontWeight: 400 }}>UBC Startups Elections 2026</h1>
          <p style={{ color: "#6B6560", fontSize: 15, margin: "0 0 6px", lineHeight: 1.6, maxWidth: 440, marginLeft: "auto", marginRight: "auto" }}>Every year, someone steps up and changes how this club runs. This is where that starts. If you've been thinking about it, now's the time.</p>
        </div>

        {/* Navigation Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 20 }}>
          <a
            href="/candidates"
            style={{
              position: "relative",
              display: "block",
              padding: "22px 20px",
              borderRadius: 14,
              background: `linear-gradient(135deg, ${COLORS.navy} 0%, #2A3F52 60%, ${COLORS.red}44 100%)`,
              textDecoration: "none",
              overflow: "hidden",
              transition: "transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.25s ease",
              boxShadow: `0 4px 20px ${COLORS.navy}30`,
              cursor: "pointer",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-3px) scale(1.02)"; e.currentTarget.style.boxShadow = `0 8px 32px ${COLORS.navy}40`; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0) scale(1)"; e.currentTarget.style.boxShadow = `0 4px 20px ${COLORS.navy}30`; }}
          >
            {/* Decorative circles */}
            <div style={{ position: "absolute", top: -20, right: -20, width: 80, height: 80, borderRadius: "50%", background: `${COLORS.red}20`, pointerEvents: "none" }} />
            <div style={{ position: "absolute", bottom: -10, right: 30, width: 40, height: 40, borderRadius: "50%", background: `${COLORS.mint}15`, pointerEvents: "none" }} />
            <div style={{ position: "relative", zIndex: 1 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(255,255,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14, backdropFilter: "blur(4px)" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="9" cy="7" r="4" stroke="white" strokeWidth="2"/>
                  <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 18, color: COLORS.white, marginBottom: 4, lineHeight: 1.2 }}>Meet the Candidates</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.7)", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.4 }}>Read their platforms before you vote</div>
              <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 12, fontSize: 12, fontWeight: 600, color: COLORS.mint, fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.02em" }}>
                <span>View all</span>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7H11M11 7L7.5 3.5M11 7L7.5 10.5" stroke={COLORS.mint} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
            </div>
          </a>

          <a
            href="/vote"
            style={{
              position: "relative",
              display: "block",
              padding: "22px 20px",
              borderRadius: 14,
              background: `linear-gradient(135deg, ${COLORS.red} 0%, ${COLORS.red}DD 60%, ${COLORS.orange}88 100%)`,
              textDecoration: "none",
              overflow: "hidden",
              transition: "transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.25s ease",
              boxShadow: `0 4px 20px ${COLORS.red}30`,
              cursor: "pointer",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-3px) scale(1.02)"; e.currentTarget.style.boxShadow = `0 8px 32px ${COLORS.red}40`; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0) scale(1)"; e.currentTarget.style.boxShadow = `0 4px 20px ${COLORS.red}30`; }}
          >
            {/* Decorative circles */}
            <div style={{ position: "absolute", top: -15, right: -15, width: 70, height: 70, borderRadius: "50%", background: `${COLORS.orange}25`, pointerEvents: "none" }} />
            <div style={{ position: "absolute", bottom: -8, left: 20, width: 35, height: 35, borderRadius: "50%", background: "rgba(255,255,255,0.08)", pointerEvents: "none" }} />
            <div style={{ position: "relative", zIndex: 1 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(255,255,255,0.18)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14, backdropFilter: "blur(4px)" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M20 12a8 8 0 11-16 0 8 8 0 0116 0z" stroke="white" strokeWidth="2"/>
                </svg>
              </div>
              <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 18, color: COLORS.white, marginBottom: 4, lineHeight: 1.2 }}>Cast Your Vote</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.75)", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.4 }}>Election Day · Tue Apr 7</div>
              <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 12, fontSize: 12, fontWeight: 600, color: COLORS.white, fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.02em" }}>
                <span>Vote now</span>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7H11M11 7L7.5 3.5M11 7L7.5 10.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
            </div>
          </a>
        </div>

        {/* Timeline */}
        <div style={{ background: COLORS.white, borderRadius: 12, padding: "22px 24px", marginBottom: 20, boxShadow: "0 2px 12px rgba(30,45,61,0.04)" }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.navy, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 16, fontFamily: "'DM Sans', sans-serif" }}>How this works</div>
          
          <div style={{ display: "flex", gap: 14, marginBottom: 14 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: `${COLORS.red}14`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2" stroke={COLORS.red} strokeWidth="2" strokeLinecap="round"/><path d="M15 2H9a1 1 0 00-1 1v1a1 1 0 001 1h6a1 1 0 001-1V3a1 1 0 00-1-1z" stroke={COLORS.red} strokeWidth="2"/></svg>
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.navy, fontFamily: "'DM Sans', sans-serif" }}>Nominations <span style={{ fontWeight: 500, color: COLORS.midGray }}>Sun Mar 29 – Fri Apr 3</span></div>
              <p style={{ fontSize: 13, color: "#6B6560", margin: "4px 0 0", lineHeight: 1.5, fontFamily: "'DM Sans', sans-serif" }}>Submit your application for President (solo or duo) and/or Treasurer by Friday, April 3.</p>
            </div>
          </div>

          <div style={{ display: "flex", gap: 14, marginBottom: 14 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: `${COLORS.orange}14`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" stroke={COLORS.orange} strokeWidth="2" strokeLinecap="round"/></svg>
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.navy, fontFamily: "'DM Sans', sans-serif" }}>Campaigning <span style={{ fontWeight: 500, color: COLORS.midGray }}>After Apr 3</span></div>
              <p style={{ fontSize: 13, color: "#6B6560", margin: "4px 0 0", lineHeight: 1.5, fontFamily: "'DM Sans', sans-serif" }}>Once nominations close, candidates can start campaigning to the club.</p>
            </div>
          </div>

          <div style={{ display: "flex", gap: 14 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: `${COLORS.mint}14`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke={COLORS.mint} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.navy, fontFamily: "'DM Sans', sans-serif" }}>Election Day <span style={{ fontWeight: 500, color: COLORS.midGray }}>Tue Apr 7, 6–7 PM</span></div>
              <p style={{ fontSize: 13, color: "#6B6560", margin: "4px 0 0", lineHeight: 1.5, fontFamily: "'DM Sans', sans-serif" }}>In-person meeting. Each candidate gets ~5 min to speak, followed by Q&A, then we vote.</p>
            </div>
          </div>
        </div>

        {/* AI Warning */}
        <div style={{ background: `linear-gradient(135deg, ${COLORS.navy}, #2A3F52)`, borderRadius: 12, padding: "20px 22px", marginBottom: 24, color: COLORS.white }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(255,255,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 9v4m0 4h.01M12 3l9.66 16.5a1 1 0 01-.87 1.5H3.21a1 1 0 01-.87-1.5L12 3z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 6 }}>Before you start writing</div>
              <p style={{ fontSize: 13, lineHeight: 1.65, margin: 0, opacity: 0.92 }}>
                Your responses below will be visible to all club members before they vote. This is how people get to know you as a candidate. So write like you'd talk to the club, not like you're submitting an essay.
              </p>
              <p style={{ fontSize: 13, lineHeight: 1.65, margin: "8px 0 0", opacity: 0.92 }}>
                One more thing: people can tell when something is written by AI. It's more obvious than you think. Genuine responses stand out. AI-generated ones do too, just not in a good way. Be yourself, that's what people actually want to see.
              </p>
            </div>
          </div>
        </div>

        {/* Form Card */}
        <div style={{ background: COLORS.white, borderRadius: 16, padding: "32px 28px", boxShadow: "0 2px 20px rgba(30,45,61,0.06)" }}>
          {/* Section 1 */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24, paddingBottom: 14, borderBottom: `2px solid ${COLORS.lightGray}` }}>
            <div style={{ width: 28, height: 28, borderRadius: 8, background: COLORS.navy, display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: 14, fontWeight: 700 }}>1</div>
            <span style={{ fontWeight: 700, fontSize: 17, color: COLORS.navy }}>About You</span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 18, marginBottom: 32 }}>
            <div>
              <label style={labelStyle}>Full Name</label>
              <input style={inputStyle("fullName")} placeholder="e.g. Jane Doe" value={form.fullName} onChange={(e) => update("fullName", e.target.value)} />
              {errors.fullName && <div style={errorStyle}>{errors.fullName}</div>}
            </div>
            <div>
              <label style={labelStyle}>Student Number</label>
              <input style={inputStyle("studentNumber")} placeholder="e.g. 12345678" value={form.studentNumber} onChange={(e) => { const v = e.target.value.replace(/\D/g, "").slice(0, 8); update("studentNumber", v); }} maxLength={8} />
              {errors.studentNumber && <div style={errorStyle}>{errors.studentNumber}</div>}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              <div>
                <label style={labelStyle}>Year</label>
                <select style={selectStyle("year")} value={form.year} onChange={(e) => update("year", e.target.value)}>
                  <option value="">Select</option>
                  {YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
                </select>
                {errors.year && <div style={errorStyle}>{errors.year}</div>}
              </div>
              <div>
                <label style={labelStyle}>Faculty</label>
                <select style={selectStyle("faculty")} value={form.faculty} onChange={(e) => update("faculty", e.target.value)}>
                  <option value="">Select</option>
                  {FACULTIES.map((f) => <option key={f} value={f}>{f}</option>)}
                </select>
                {errors.faculty && <div style={errorStyle}>{errors.faculty}</div>}
              </div>
            </div>
            <div>
              <label style={labelStyle}>Your Current Role in Club</label>
              <SearchableRoleDropdown value={form.role} onChange={(val) => update("role", val)} error={errors.role} />
              {errors.role && <div style={errorStyle}>{errors.role}</div>}
            </div>
          </div>

          {/* Section 2: President */}
          <NominationSection
            title="President" sectionNumber={2} accentColor={COLORS.red}
            nominated={president.nominated} onNominated={() => setPresident((p) => ({ ...p, nominated: !p.nominated }))}
            type={president.type} onType={(t) => setPresident((p) => ({ ...p, type: t }))}
            teamMembers={president.teamMembers} onTeamMembers={(m) => setPresident((p) => ({ ...p, teamMembers: m }))}
            soloOnly={false} questions={PRESIDENT_QUESTIONS} answers={president.answers}
            onAnswerChange={(id, val) => { setPresident((p) => ({ ...p, answers: { ...p.answers, [id]: val } })); if (presQErrors[id]) setPresQErrors((prev) => ({ ...prev, [id]: null })); }}
            questionErrors={presQErrors}
            tagline={president.tagline} onTaglineChange={(val) => setPresident((p) => ({ ...p, tagline: val }))}
          />

          {/* Section 3: Treasurer */}
          <NominationSection
            title="Treasurer" sectionNumber={3} accentColor={COLORS.orange}
            nominated={treasurer.nominated} onNominated={() => setTreasurer((p) => ({ ...p, nominated: !p.nominated }))}
            type={treasurer.type} onType={(t) => setTreasurer((p) => ({ ...p, type: t }))}
            teamMembers={treasurer.teamMembers} onTeamMembers={(m) => setTreasurer((p) => ({ ...p, teamMembers: m }))}
            soloOnly={true} questions={TREASURER_QUESTIONS} answers={treasurer.answers}
            onAnswerChange={(id, val) => { setTreasurer((p) => ({ ...p, answers: { ...p.answers, [id]: val } })); if (tresQErrors[id]) setTresQErrors((prev) => ({ ...prev, [id]: null })); }}
            questionErrors={tresQErrors}
            tagline={treasurer.tagline} onTaglineChange={(val) => setTreasurer((p) => ({ ...p, tagline: val }))}
          />

          {errors.nomination && <div style={{ ...errorStyle, textAlign: "center", marginBottom: 16, padding: "10px 14px", borderRadius: 8, background: `${COLORS.red}08` }}>{errors.nomination}</div>}

          {/* Acknowledgment */}
          {(president.nominated || treasurer.nominated) && (
            <div style={{ marginBottom: 20 }}>
              <label
                onClick={() => setAcknowledged((a) => !a)}
                style={{
                  display: "flex", alignItems: "flex-start", gap: 12, cursor: "pointer",
                  padding: "16px", borderRadius: 10,
                  border: `2px ${acknowledged ? "solid" : "dashed"} ${acknowledged ? COLORS.mint : errors.acknowledged ? COLORS.red : "#E5E1DC"}`,
                  background: acknowledged ? `${COLORS.mint}10` : COLORS.cream,
                  transition: "all 0.2s ease",
                }}
              >
                <div style={{ width: 22, height: 22, borderRadius: 6, border: `2px solid ${acknowledged ? COLORS.mint : COLORS.midGray}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, background: acknowledged ? COLORS.mint : "transparent", transition: "all 0.2s ease", marginTop: 1 }}>
                  {acknowledged && <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7L6 10L11 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                </div>
                <div>
                  <span style={{ fontSize: 14, color: COLORS.darkText, fontFamily: "'DM Sans', sans-serif", fontWeight: 500, lineHeight: 1.5 }}>
                    I understand that by nominating myself, I'm committing to serve the full term if elected. I'll show up, put in the work, and do right by the club and its members.
                  </span>
                </div>
              </label>
              {errors.acknowledged && <div style={{ ...errorStyle, marginTop: 6 }}>{errors.acknowledged}</div>}
            </div>
          )}

          <button onClick={handleSubmit} disabled={submitting} style={{ width: "100%", padding: "16px", borderRadius: 12, border: "none", background: submitting ? COLORS.midGray : `linear-gradient(135deg, ${COLORS.navy}, #2A3F52)`, color: COLORS.white, fontSize: 16, fontWeight: 700, fontFamily: "'DM Sans', sans-serif", cursor: submitting ? "not-allowed" : "pointer", transition: "all 0.2s ease", letterSpacing: "0.02em", opacity: submitting ? 0.7 : 1 }} onMouseEnter={(e) => { if (!submitting) e.target.style.transform = "translateY(-1px)"; }} onMouseLeave={(e) => (e.target.style.transform = "translateY(0)")}>
            {submitting ? "Submitting..." : "Submit Nomination"}
          </button>
        </div>

        <p style={{ textAlign: "center", fontSize: 12, color: COLORS.midGray, marginTop: 20, lineHeight: 1.5 }}>
          One submission per member. Nominations close Friday, April 3, 2026.
        </p>
      </div>
    </div>
  );
}
