"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const projectTypes = ["Hackathon", "Club Project", "Personal Project", "Course Project"];
const roleCards = [
  { title: "Frontend", sub: "React, Vue, HTML/CSS/JS" },
  { title: "Backend", sub: "APIs, databases, server" },
  { title: "UI/UX", sub: "Figma, prototyping, research" },
  { title: "AI/ML", sub: "PyTorch, TensorFlow, Pandas" },
  { title: "App dev", sub: "Flutter, Kotlin, Swift" },
];
const skillMap: Record<string, string[]> = {
  Frontend: ["React", "Vue", "Angular", "HTML", "CSS", "Tailwind CSS"],
  Backend: ["Node.js", "Django", "FastAPI", "PostgreSQL", "MongoDB"],
  "UI/UX": ["Figma", "Adobe XD", "Prototyping", "User Research"],
  "AI/ML": ["PyTorch", "TensorFlow", "scikit-learn", "Pandas", "NumPy"],
  "App dev": ["Flutter", "React Native", "Kotlin", "Swift", "Dart"],
};
const dummyStatuses: Array<{ name: string; status: "Rejected" | "Accepted" | "Pending" }> = [
  { name: "Project Alpha", status: "Rejected" },
  { name: "Project Beta", status: "Accepted" },
  { name: "Project Gamma", status: "Pending" },
  { name: "Project Delta", status: "Accepted" },
];
const statusColor: Record<string, string> = {
  Rejected: "#9E0000",
  Accepted: "#098B00",
  Pending: "#E3C500",
};

export default function MyProjectsPage() {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedRoles, setSelectedRoles] = useState<Record<string, number>>({});
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const toggleRole = (role: string) => {
    setSelectedRoles((prev) => {
      const next = { ...prev };
      if (next[role]) delete next[role];
      else next[role] = 1;
      return next;
    });
  };

  const changeCount = (role: string, delta: number) => {
    setSelectedRoles((prev) => {
      const next = { ...prev };
      const val = (next[role] ?? 1) + delta;
      if (val <= 0) delete next[role];
      else next[role] = val;
      return next;
    });
  };

  const toggleSkill = (s: string) =>
    setSelectedSkills((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );

  return (
    <>
      <style>{`
        @import url('https://fonts.cdnfonts.com/css/maghfirea');
        @import url('https://fonts.googleapis.com/css2?family=Actor&display=swap');

        .mp-page {
          background: #000;
          min-height: 100vh;
          padding: 0 48px 80px;
          color: #fff;
        }
        .mp-title {
          font-family: 'Maghfirea', serif;
          font-size: 64px;
          font-weight: 400;
          padding-top: 28px;
          margin-bottom: 48px;
          line-height: 100%;
        }
        .mp-top-row {
          display: flex;
          gap: 40px;
          margin-bottom: 60px;
        }
        .mp-top-row > * {
          flex: 1 1 0;
          min-width: 0;
        }
        .mp-card {
          background: #08183F;
          border: 1px solid #fff;
          border-radius: 25px;
          box-shadow: 0 4px 4px #00000040;
          padding: 28px;
        }
        .mp-card-title {
          font-family: 'Maghfirea', serif;
          font-size: 32px;
          font-weight: 400;
          margin-bottom: 20px;
        }
        .mp-inner-box {
          background: rgba(97,113,182,0.4);
          border-radius: 25px;
          box-shadow: 0 4px 4px #00000040;
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .mp-skeleton {
          background: rgba(255,255,255,0.18);
          border-radius: 8px;
          height: 30px;
        }
        .mp-apps-inner {
          background: rgba(97,113,182,0.4);
          border-radius: 25px;
          box-shadow: 0 4px 4px #00000040;
          padding: 20px;
        }
        .mp-apps-header {
          display: flex;
          gap: 16px;
          margin-bottom: 14px;
        }
        .mp-pill-header {
          border: 1px solid #fff;
          border-radius: 40px;
          background: rgba(9,28,73,0.4);
          padding: 7px 22px;
          font-family: 'Actor', sans-serif;
          font-size: 15px;
          color: #fff;
        }
        .mp-apps-row {
          display: flex;
          gap: 16px;
          align-items: center;
          margin-bottom: 12px;
        }
        .mp-pill-name {
          background: rgba(217,217,217,0.4);
          border-radius: 40px;
          padding: 7px 18px;
          font-family: 'Actor', sans-serif;
          font-size: 14px;
          color: #fff;
          flex: 1;
        }
        .mp-pill-status {
          border-radius: 40px;
          padding: 7px 18px;
          font-family: 'Actor', sans-serif;
          font-size: 14px;
          color: #fff;
          min-width: 90px;
          text-align: center;
        }
        .mp-section-title {
          font-family: 'Maghfirea', serif;
          font-size: 64px;
          font-weight: 400;
          margin-bottom: 28px;
        }
        .mp-form-box {
          border: 1px solid #fff;
          border-radius: 16px;
          padding: 32px;
          margin-bottom: 32px;
        }
        .mp-form-section-title {
          font-family: 'Maghfirea', serif;
          font-size: 32px;
          font-weight: 400;
          margin-bottom: 22px;
        }
        .mp-label {
          font-family: 'Actor', sans-serif;
          font-size: 20px;
          margin-bottom: 8px;
        }
        .mp-sublabel {
          font-family: 'Actor', sans-serif;
          font-size: 16px;
          opacity: 0.7;
          margin-bottom: 10px;
        }
        .mp-input {
          width: 100%;
          background: transparent;
          border: 1px solid rgba(255,255,255,0.4);
          border-radius: 10px;
          padding: 12px 16px;
          font-family: 'Actor', sans-serif;
          font-size: 16px;
          color: #fff;
          outline: none;
          resize: none;
          box-sizing: border-box;
          transition: border-color 0.2s;
        }
        .mp-input:focus { border-color: rgba(255,255,255,0.85); }
        .mp-input::placeholder { color: rgba(255,255,255,0.45); }
        .mp-types { display: flex; flex-wrap: wrap; gap: 12px; }
        .mp-type-btn {
          border: 1px solid rgba(255,255,255,0.4);
          border-radius: 10px;
          background: transparent;
          color: rgba(255,255,255,0.7);
          font-family: 'Actor', sans-serif;
          font-size: 16px;
          padding: 8px 22px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .mp-type-btn:hover {
          background: rgba(255,255,255,0.12);
          color: #fff;
          border-color: rgba(255,255,255,0.7);
        }
        .mp-type-btn.active {
          background: rgba(255,255,255,0.18);
          color: #fff;
          border-color: #fff;
        }
        .mp-roles-box {
          background: #08183F;
          border: 1px solid #fff;
          border-radius: 25px;
          box-shadow: 0 4px 4px #00000040;
          padding: 32px;
          margin-bottom: 32px;
        }
        .mp-roles-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
          margin: 18px 0 28px;
        }
        .mp-role-card {
          background: #fff;
          border-radius: 12px;
          padding: 18px 20px;
          width: 175px;
          cursor: pointer;
          transition: opacity 0.2s, transform 0.15s, box-shadow 0.15s;
        }
        .mp-role-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(0,0,0,0.5);
        }
        .mp-role-card.inactive { opacity: 0.45; }
        .mp-role-card-title {
          font-family: 'Actor', sans-serif;
          font-size: 18px;
          font-weight: 700;
          color: #08183F;
          margin-bottom: 6px;
        }
        .mp-role-card-sub {
          font-family: 'Actor', sans-serif;
          font-size: 14px;
          color: #444;
          line-height: 1.4;
        }
        .mp-role-counter {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-top: 12px;
        }
        .mp-counter-btn {
          background: #08183F;
          color: #fff;
          border: none;
          border-radius: 50%;
          width: 24px;
          height: 24px;
          font-size: 16px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s;
        }
        .mp-counter-btn:hover { background: #1a3a8f; }
        .mp-counter-val {
          font-family: 'Actor', sans-serif;
          font-size: 16px;
          color: #08183F;
          font-weight: 700;
        }
        .mp-skill-group { margin-bottom: 20px; }
        .mp-skill-role-label {
          font-family: 'Actor', sans-serif;
          font-size: 16px;
          color: #909DD4;
          margin-bottom: 10px;
        }
        .mp-skills-row { display: flex; flex-wrap: wrap; gap: 12px; }
        .mp-skill-btn {
          border: 1px solid rgba(255,255,255,0.4);
          border-radius: 10px;
          background: transparent;
          color: rgba(255,255,255,0.75);
          font-family: 'Actor', sans-serif;
          font-size: 17px;
          padding: 10px 22px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .mp-skill-btn:hover {
          background: rgba(255,255,255,0.1);
          color: #fff;
          border-color: rgba(255,255,255,0.7);
        }
        .mp-skill-btn.active {
          background: rgba(255,255,255,0.2);
          color: #fff;
          border-color: #fff;
        }
        .mp-btn-row {
          display: flex;
          gap: 20px;
          margin-top: 16px;
        }
        .mp-btn-cancel {
          background: #9E0000;
          border: 1px solid #fff;
          border-radius: 20px;
          color: #fff;
          font-family: 'Maghfirea', serif;
          font-size: 24px;
          letter-spacing: 0.5px;
          cursor: pointer;
          width: 220px;
          height: 66px;
          transition: background 0.2s, transform 0.15s, box-shadow 0.15s;
        }
        .mp-btn-cancel:hover {
          background: #c40000;
          transform: translateY(-2px);
          box-shadow: 0 6px 18px rgba(158,0,0,0.5);
        }
        .mp-btn-post {
          background: #08183F;
          border: 1px solid #fff;
          border-radius: 20px;
          color: #fff;
          font-family: 'Maghfirea', serif;
          font-size: 24px;
          letter-spacing: 0.5px;
          cursor: pointer;
          width: 220px;
          height: 66px;
          transition: background 0.2s, transform 0.15s, box-shadow 0.15s;
        }
        .mp-btn-post:hover {
          background: #132d6e;
          transform: translateY(-2px);
          box-shadow: 0 6px 18px rgba(8,24,63,0.6);
        }
      `}</style>

      <div className="mp-page">
        <div className="mp-title">My Projects</div>

        {/* Top row */}
        <div className="mp-top-row">
          <div className="mp-card">
            <div className="mp-card-title">Projects on my profile</div>
            <div className="mp-inner-box" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="mp-skeleton" style={{ width: "100%", height: 38, borderRadius: 10 }} />
              ))}
            </div>
          </div>

          <div className="mp-card">
            <div className="mp-card-title">Applications Sent</div>
            <div className="mp-apps-inner">
              <div className="mp-apps-header">
                <div className="mp-pill-header" style={{ flex: 1 }}>Projects</div>
                <div className="mp-pill-header" style={{ minWidth: 90 }}>Status</div>
              </div>
              {dummyStatuses.map((row) => (
                <div key={row.name} className="mp-apps-row">
                  <div className="mp-pill-name">{row.name}</div>
                  <div className="mp-pill-status" style={{ background: statusColor[row.status] }}>
                    {row.status}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Create a Project */}
        <div className="mp-section-title">Create a Project</div>

        <div className="mp-form-box">
          <div className="mp-form-section-title">Basic information</div>

          <div className="mp-label">Project Name</div>
          <input className="mp-input" placeholder="e.g. Taxi booking app" style={{ marginBottom: 28 }} />

          <div className="mp-label">Description</div>
          <div className="mp-sublabel">Briefly explain what you are building</div>
          <textarea className="mp-input" rows={5} placeholder="What are you building and why?" style={{ marginBottom: 28 }} />

          <div className="mp-label">Project Type</div>
          <div className="mp-types">
            {projectTypes.map((t) => (
              <button
                key={t}
                className={`mp-type-btn${selectedType === t ? " active" : ""}`}
                onClick={() => setSelectedType(t === selectedType ? null : t)}
              >{t}</button>
            ))}
          </div>
        </div>

        <div className="mp-roles-box">
          <div className="mp-form-section-title">Roles &amp; Skills Needed</div>
          <div className="mp-label">Select roles you need</div>
          <div className="mp-sublabel">Skills for each role will appear below automatically</div>

          <div className="mp-roles-grid">
            {roleCards.map((r) => {
              const active = r.title in selectedRoles;
              return (
                <div
                  key={r.title}
                  className={`mp-role-card${active ? "" : " inactive"}`}
                  onClick={() => toggleRole(r.title)}
                >
                  <div className="mp-role-card-title">{r.title}</div>
                  <div className="mp-role-card-sub">{r.sub}</div>
                  {active && (
                    <div className="mp-role-counter" onClick={(e) => e.stopPropagation()}>
                      <button className="mp-counter-btn" onClick={() => changeCount(r.title, -1)}>−</button>
                      <span className="mp-counter-val">{selectedRoles[r.title]}</span>
                      <button className="mp-counter-btn" onClick={() => changeCount(r.title, 1)}>+</button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {Object.keys(selectedRoles).length > 0 && (
            <>
              <div className="mp-label" style={{ marginBottom: 12 }}>Skills needed – select what applies</div>
              {Object.keys(selectedRoles).map((role) => (
                <div key={role} className="mp-skill-group">
                  <div className="mp-skill-role-label">{role}</div>
                  <div className="mp-skills-row">
                    {(skillMap[role] ?? []).map((s) => (
                      <button
                        key={s}
                        className={`mp-skill-btn${selectedSkills.includes(s) ? " active" : ""}`}
                        onClick={() => toggleSkill(s)}
                      >{s}</button>
                    ))}
                  </div>
                </div>
              ))}
            </>
          )}
        </div>

        <div className="mp-btn-row">
          <button className="mp-btn-cancel" onClick={() => router.push("/dashboard")}>Cancel</button>
          <button className="mp-btn-post">Post Project</button>
        </div>
      </div>
    </>
  );
}