"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

const ALL_SKILLS = [
  "C","C++","Java","Python","JavaScript","Go","Rust","HTML","CSS",
  "React.js","Tailwind","Bootstrap","Node.js","Express.js","REST APIs",
  "MySQL","PostgreSQL","MongoDB","SQLite","Operating Systems","DBMS",
  "Computer Networks","OOP","Git & GitHub","Docker","Linux / Unix",
  "VS Code","Postman","Pandas","NumPy","Matplotlib","Bokeh",
  "Cybersecurity","Blockchain","Android Development",
];

const MAX_PER_ROW = 6;

const statusStyle = {
  Ongoing:   { bg: "#6B1A1A", color: "#e05555", border: "#e05555" },
  Completed: { bg: "#1A4A2A", color: "#45c878", border: "#45c878" },
  Pending:   { bg: "#4A3A00", color: "#c8a020", border: "#c8a020" },
  Rejected:  { bg: "#5a1020", color: "#e05555", border: "#e05555" },
  Accepted:  { bg: "#1a4a2a", color: "#45c878", border: "#45c878" },
};

const avatarColors = ["#e8c030", "#e040c0", "#30b0e8", "#40c840"];

const initialProjectsData = [
  { people: ["P","D","A","K"], status: "Ongoing" },
  { people: [],                status: "Completed" },
  { people: [],                status: "Pending" },
  { people: [],                status: null },
  { people: [],                status: null },
  { people: [],                status: null },
];

const initialApplicationsData = [
  { status: "Rejected" },
  { status: "Accepted" },
  { status: "Pending" },
  { status: null },
  { status: null },
  { status: null },
];

function chunkSkills(arr: string[]) {
  const rows = [];
  for (let i = 0; i < arr.length; i += MAX_PER_ROW) rows.push(arr.slice(i, i + MAX_PER_ROW));
  return rows;
}

function AnimatedButton({ children, style, onClick, baseColor, hoverColor }: any) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        ...style,
        backgroundColor: hovered ? hoverColor : baseColor,
        transform: hovered ? "scale(1.04)" : "scale(1)",
        transition: "background-color 0.2s, transform 0.15s, box-shadow 0.2s",
        boxShadow: hovered ? "0 6px 20px rgba(0,0,0,0.4)" : "none",
        cursor: "pointer",
      }}
    >{children}</button>
  );
}

function StatusPill({ value }: { value: string | null }) {
  const s = value ? statusStyle[value as keyof typeof statusStyle] : null;
  return (
    <div style={{
      height: "36px", borderRadius: "40px",
      backgroundColor: s ? s.bg : "rgba(217,217,217,0.4)",
      border: s ? `1px solid ${s.border}` : "1px solid rgba(217,217,217,0.4)",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: "15px", color: "#ffffff", fontWeight: 500, userSelect: "none",
    }}>
      {value || "—"}
    </div>
  );
}

export default function DashboardPage() {
  const router = useRouter();
  const [skills, setSkills] = useState(["React", "Node.js", "MySQL", "JavaScript", "MySQL", "Docker"]);
  const [showSkillDropdown, setShowSkillDropdown] = useState(false);
  const [skillSearch, setSkillSearch] = useState("");
  const [projectsData] = useState(initialProjectsData);
  const [applicationsData] = useState(initialApplicationsData);
  const skillDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (skillDropdownRef.current && !skillDropdownRef.current.contains(e.target as Node))
        setShowSkillDropdown(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const addSkill = (skill: string) => {
    if (!skills.includes(skill)) setSkills(prev => [...prev, skill]);
    setShowSkillDropdown(false);
    setSkillSearch("");
  };

  const filteredSkills = ALL_SKILLS.filter(s =>
    s.toLowerCase().includes(skillSearch.toLowerCase()) && !skills.includes(s)
  );
  const skillRows = chunkSkills(skills);

  return (
    <>
      <style>{`
        @import url('https://fonts.cdnfonts.com/css/maghfirea');
        *, *::before, *::after { font-family: 'Maghfirea', Georgia, serif !important; box-sizing: border-box; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: rgba(255,255,255,0.05); }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.2); border-radius: 3px; }
      `}</style>

      <main style={{ flex: 1, minWidth: 0, padding: "32px 28px", display: "flex", flexDirection: "column", gap: "16px" }}>

        <h1 style={{ fontSize: "64px", fontWeight: 400, lineHeight: "100%", color: "#fff", margin: 0 }}>Welcome Back, Name</h1>

        {/* Profile Card */}
        <div style={{
          background: "#435787", border: "1.5px solid #FFF5F5", borderRadius: "25px",
          padding: "20px 24px", display: "flex", alignItems: "flex-start", gap: "18px",
        }}>
          {/* Avatar */}
          <div style={{
            width: 68, height: 68, borderRadius: "50%", backgroundColor: "#c0c5d8",
            border: "2px solid #aab0c4", display: "flex", alignItems: "center",
            justifyContent: "center", flexShrink: 0,
          }}>
            <svg width="38" height="38" viewBox="0 0 24 24" fill="#3a4060">
              <circle cx="12" cy="8" r="5"/><path d="M2 20c0-5.5 4.5-9 10-9s10 3.5 10 9"/>
            </svg>
          </div>

          {/* Name + skills */}
          <div style={{ flex: "0 0 auto", minWidth: 0, maxWidth: "340px" }}>
            <div style={{ fontSize: "32px", fontWeight: 400, lineHeight: "100%", color: "#ffffff", marginBottom: "4px" }}>Name Surname</div>
            <div style={{ fontSize: "24px", fontWeight: 400, lineHeight: "100%", color: "rgba(255,255,255,0.8)", marginBottom: "12px" }}>B240060CS &nbsp;&nbsp; 2nd year</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              {skillRows.map((row, ri) => (
                <div key={ri} style={{ display: "flex", flexWrap: "nowrap", gap: "6px", alignItems: "center" }}>
                  {row.map((s, idx) => (
                    <span key={idx} style={{
                      fontSize: "13px", padding: "3px 10px", borderRadius: "20px",
                      border: "1px solid #000", backgroundColor: "#FFFFFF", color: "#000",
                      opacity: 0.75, height: "22px", display: "flex", alignItems: "center",
                      justifyContent: "center", whiteSpace: "nowrap",
                    }}>{s}</span>
                  ))}
                </div>
              ))}

              {/* Add skill */}
              <div ref={skillDropdownRef} style={{ position: "relative", display: "inline-block", marginTop: "2px" }}>
                <span
                  onClick={() => setShowSkillDropdown(o => !o)}
                  style={{
                    fontSize: "13px", padding: "3px 12px", borderRadius: "20px",
                    backgroundColor: showSkillDropdown ? "#3a4a8a" : "#00051D",
                    color: "#ffffff", height: "22px", display: "inline-flex", alignItems: "center",
                    cursor: "pointer", boxShadow: "0 4px 4px rgba(0,0,0,0.25)",
                    transition: "background-color 0.2s, transform 0.15s",
                    transform: showSkillDropdown ? "scale(1.07)" : "scale(1)",
                    userSelect: "none",
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = "#3a4a8a"; (e.currentTarget as HTMLElement).style.transform = "scale(1.07)"; }}
                  onMouseLeave={e => { if (!showSkillDropdown) { (e.currentTarget as HTMLElement).style.backgroundColor = "#00051D"; (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}}
                >Add skill +</span>

                {showSkillDropdown && (
                  <div style={{
                    position: "absolute", top: "28px", left: 0,
                    backgroundColor: "#0d1e4a", border: "1px solid rgba(255,255,255,0.2)",
                    borderRadius: "14px", zIndex: 300, width: "220px",
                    boxShadow: "0 8px 28px rgba(0,0,0,0.6)", overflow: "hidden",
                  }}>
                    <div style={{ padding: "8px 10px", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
                      <input
                        autoFocus value={skillSearch} onChange={e => setSkillSearch(e.target.value)}
                        placeholder="Search skills…"
                        style={{
                          width: "100%", background: "rgba(255,255,255,0.08)",
                          border: "1px solid rgba(255,255,255,0.2)", borderRadius: "8px",
                          color: "#fff", padding: "5px 10px", fontSize: "13px", outline: "none",
                        }}
                      />
                    </div>
                    <div style={{ maxHeight: "220px", overflowY: "auto" }}>
                      {filteredSkills.length === 0
                        ? <div style={{ padding: "10px 14px", fontSize: "13px", color: "rgba(255,255,255,0.4)" }}>No more skills to add</div>
                        : filteredSkills.map(skill => (
                          <div key={skill} onClick={() => addSkill(skill)}
                            style={{ padding: "8px 14px", fontSize: "14px", color: "#fff", cursor: "pointer", transition: "background 0.15s" }}
                            onMouseEnter={e => (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(255,255,255,0.1)"}
                            onMouseLeave={e => (e.currentTarget as HTMLElement).style.backgroundColor = "transparent"}
                          >{skill}</div>
                        ))
                      }
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Pinned projects */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
            <div style={{
              width: "80%", height: "32px", borderRadius: "40px", backgroundColor: "rgba(217,217,217,0.35)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "20px", fontWeight: 400, color: "rgba(255,255,255,0.85)",
            }}>pinned projects</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "6px", width: "80%" }}>
              {[1,2,3,4,5,6].map(i => (
                <div key={i} style={{ height: 22, borderRadius: 12, backgroundColor: "rgba(160,170,200,0.4)" }} />
              ))}
            </div>
          </div>

          {/* Profile progress + Edit */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "8px", flexShrink: 0, minWidth: 160 }}>
            <div style={{ fontSize: "16px", fontWeight: 400, color: "#ffffff", whiteSpace: "nowrap" }}>Profile 70% complete</div>
            <div style={{ width: "140px", height: "9px", borderRadius: "80px", backgroundColor: "#D9D9D9", overflow: "hidden" }}>
              <div style={{ width: "70%", height: "100%", background: "linear-gradient(90deg,#1a48d0,#4878f8)", borderRadius: "80px" }} />
            </div>
            <AnimatedButton
              baseColor="#929FD7" hoverColor="#7a8fcf"
              style={{ width: "90px", height: "26px", borderRadius: "50px", border: "none", color: "#000000", fontSize: "13px", display: "flex", alignItems: "center", justifyContent: "center" }}
            >Edit Profile</AnimatedButton>
          </div>
        </div>

        {/* Stats + Buttons row */}
        <div style={{ display: "flex", gap: "14px", alignItems: "center" }}>
          <div style={{ display: "flex", gap: "14px", flex: 1 }}>
            {[
              { label: "Projects joined",   value: "3" },
              { label: "Applications sent", value: "5" },
              { label: "Recommendations",   value: "3" },
            ].map(({ label, value }) => (
              <div key={label} style={{
                flex: 1, height: "100px", borderRadius: "25px",
                border: "1px solid #FFFFFF", backgroundColor: "#435787",
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "4px",
              }}>
                <div style={{ fontSize: "17px", color: "#ffffff", textAlign: "center" }}>{label}</div>
                <div style={{ fontSize: "42px", fontWeight: 700, color: "#ffffff", lineHeight: 1 }}>{value}</div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <AnimatedButton
              baseColor="#7F849A" hoverColor="#5e6690"
              onClick={() => router.push("/projects")}
              style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", width: "275px", height: "57px", borderRadius: "25px", border: "1px solid #FFFFFF", color: "#ffffff", fontSize: "24px", fontWeight: 400 }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
              Create Project
            </AnimatedButton>
            <AnimatedButton
              baseColor="#17266B" hoverColor="#2540a0"
              onClick={() => router.push("/browse")}
              style={{ width: "275px", height: "57px", borderRadius: "25px", border: "1px solid #FFFFFF", color: "#ffffff", fontSize: "24px", fontWeight: 400 }}
            >Join Project</AnimatedButton>
          </div>
        </div>

        {/* Bottom panels */}
        <div style={{ display: "flex", gap: "20px", alignItems: "flex-start", width: "100%" }}>

          {/* Projects started by me */}
          <div style={{
            flex: "1 1 0", minWidth: 0, minHeight: "421px", borderRadius: "25px",
            border: "1px solid #FFFFFF", backgroundColor: "#08183F",
            boxShadow: "0px 4px 4px 0px #00000040", padding: "20px 22px",
            display: "flex", flexDirection: "column", gap: "12px",
          }}>
            <div style={{ fontSize: "32px", fontWeight: 400, color: "#ffffff", textAlign: "center" }}>Projects started by me</div>
            <div style={{ borderRadius: "25px", backgroundColor: "rgba(97,113,182,0.4)", boxShadow: "0px 4px 4px 0px #00000040", padding: "14px 16px", display: "flex", flexDirection: "column", gap: "10px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                {["Projects", "People", "Status"].map(h => (
                  <div key={h} style={{
                    height: "36px", borderRadius: "40px",
                    border: "1px solid rgba(255,255,255,0.6)", backgroundColor: "rgba(9,28,73,0.6)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "17px", color: "#ffffff", boxShadow: "0px 4px 4px 0px #00000040",
                    width: h === "Projects" ? "38%" : "28%", flexShrink: 0,
                  }}>{h}</div>
                ))}
              </div>
              {projectsData.map((row, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ width: "38%", height: "36px", borderRadius: "40px", backgroundColor: "rgba(217,217,217,0.4)", flexShrink: 0 }} />
                  <div style={{ width: "28%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    {row.people.map((letter, j) => (
                      <div key={j} style={{
                        width: 30, height: 30, borderRadius: "50%",
                        backgroundColor: avatarColors[j % avatarColors.length],
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: "13px", fontWeight: 700, color: "#fff",
                        border: "2px solid #08183F", marginLeft: j === 0 ? 0 : -9,
                        position: "relative", zIndex: row.people.length - j,
                      }}>{letter}</div>
                    ))}
                  </div>
                  <div style={{ width: "28%", flexShrink: 0 }}>
                    <StatusPill value={row.status} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Applications Sent */}
          <div style={{
            flex: "1 1 0", minWidth: 0, minHeight: "421px", borderRadius: "25px",
            border: "1px solid #FFFFFF", backgroundColor: "#08183F",
            boxShadow: "0px 4px 4px 0px #00000040", padding: "20px 22px",
            display: "flex", flexDirection: "column", gap: "12px",
          }}>
            <div style={{ fontSize: "32px", fontWeight: 400, color: "#ffffff", textAlign: "center" }}>Applications Sent</div>
            <div style={{ borderRadius: "25px", backgroundColor: "rgba(97,113,182,0.4)", boxShadow: "0px 4px 4px 0px #00000040", padding: "14px 16px", display: "flex", flexDirection: "column", gap: "10px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                {["Projects", "Status"].map(h => (
                  <div key={h} style={{
                    height: "36px", borderRadius: "40px",
                    border: "1px solid rgba(255,255,255,0.6)", backgroundColor: "rgba(9,28,73,0.6)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "17px", color: "#ffffff", boxShadow: "0px 4px 4px 0px #00000040",
                    width: h === "Projects" ? "55%" : "40%", flexShrink: 0,
                  }}>{h}</div>
                ))}
              </div>
              {applicationsData.map((row, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ width: "55%", height: "36px", borderRadius: "40px", backgroundColor: "rgba(217,217,217,0.4)", flexShrink: 0 }} />
                  <div style={{ width: "40%", flexShrink: 0 }}>
                    <StatusPill value={row.status} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}