import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";

const campuses = [
  { name: "Islamabad", est: "1997", desc: "Oldest and main campus with a strong computing culture and active student life.", tag: "Headquarters" },
  { name: "Lahore", est: "2000", desc: "One of the largest and most competitive campuses in the FAST network.", tag: "" },
  { name: "Karachi", est: "2000", desc: "Located in Pakistan's economic hub with strong industry exposure.", tag: "" },
  { name: "Peshawar", est: "2001", desc: "Serving students from KPK and surrounding regions.", tag: "" },
  { name: "Chiniot-Faisalabad", est: "2012", desc: "Located near Pakistan's industrial center with strong industry connections.", tag: "" },
  { name: "Multan", est: "2025", desc: "Newest campus expanding FAST's reach in South Punjab.", tag: "Newest" },
];

const programs = [
  { category: "Computing", list: ["BS Computer Science", "BS Software Engineering", "BS Artificial Intelligence", "BS Data Science", "BS Cyber Security"] },
  { category: "Engineering", list: ["BS Computer Engineering", "BS Electrical Engineering", "BS Civil Engineering"] },
  { category: "Business", list: ["BBA", "BS Accounting & Finance", "BS Business Analytics"] },
];

const stats = [
  { value: "6", label: "Campuses Nationwide" },
  { value: "11,000+", label: "Enrolled Students" },
  { value: "500+", label: "Faculty Members" },
  { value: "1997", label: "Year Established" },
];

const admissionSteps = [
  { num: "01", title: "Check Eligibility", desc: "Matric 60%+ and FSc 50%+ with Mathematics. O/A-Level students need IBCC equivalence." },
  { num: "02", title: "Choose Entry Route", desc: "Apply via FAST NU Test, NTS NAT, or SAT. Select your preferred route during application." },
  { num: "03", title: "Understand Merit", desc: "NU Test: 50% test + 40% FSc + 10% Matric. No interview required for undergraduate admissions." },
  { num: "04", title: "Submit Application", desc: "Apply online through the official FAST-NUCES admissions portal. Track your application status online." },
];

export default function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const bottomRef = useRef(null);
  const assistantRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async (text) => {
    const msg = text || input;
    if (!msg.trim()) return;
    setMessages((p) => [...p, { role: "user", content: msg }]);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:8000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ session_id: "student1", message: msg }),
      });
      const data = await res.json();
      setMessages((p) => [...p, { role: "assistant", content: data.reply }]);
    } catch {
      setMessages((p) => [...p, { role: "assistant", content: "Connection error. Please ensure the server is running." }]);
    }
    setLoading(false);
  };

  return (
    <div style={g.root}>
      <style>{`
        * { box-sizing: border-box; }
        a, button { transition: all 0.2s ease; }
        .nav-link { position: relative; }
        .nav-link::after {
          content: ""; position: absolute; left: 0; bottom: -4px; width: 0; height: 2px;
          background: #2d6a2d; transition: width 0.25s ease;
        }
        .nav-link:hover { color: #1a1a1a; }
        .nav-link:hover::after { width: 100%; }
        .nav-btn:hover { background: #245424; transform: translateY(-1px); box-shadow: 0 4px 12px rgba(45,106,45,0.3); }
        .btn-primary:hover { background: #333; transform: translateY(-1px); box-shadow: 0 6px 16px rgba(0,0,0,0.2); }
        .btn-ghost:hover { color: #1a4a1a; text-decoration: underline; }
        .tab-btn:hover { border-color: #2d6a2d; color: #2d6a2d; }
        .tab-btn.active:hover { background: #245424; }
        .prog-card { transition: all 0.2s ease; cursor: default; }
        .prog-card:hover { background: #f7f5f1; }
        .prog-card:hover .prog-arrow { transform: translateX(4px); color: #1a4a1a; }
        .prog-arrow { display: inline-block; transition: transform 0.2s ease; }
        .camp-card { transition: all 0.2s ease; cursor: default; }
        .camp-card:hover { background: #242424; }
        .camp-card:hover .camp-name { color: #7cb87c; }
        .camp-name { transition: color 0.2s ease; }
        .step-card { transition: all 0.2s ease; }
        .step-card:hover { transform: translateY(-4px); }
        .step-card:hover .step-num { -webkit-text-stroke-color: #1a4a1a; }
        .merit-block { transition: all 0.2s ease; cursor: default; }
        .merit-block:hover { transform: translateY(-3px); box-shadow: 0 8px 20px rgba(0,0,0,0.08); }
        .aid-card { transition: all 0.2s ease; cursor: default; }
        .aid-card:hover { background: #e8e2d6; }
        .chip:hover { background: #2d6a2d; color: #fff; border-color: #2d6a2d; }
        .chat-input:focus { border-color: #2d6a2d; background: #fff; }
        .send-btn:hover:not(:disabled) { background: #245424; transform: scale(1.05); }
      `}</style>

      {/* NAV */}
      <nav style={g.nav}>
        <div style={g.navInner}>
          <div style={g.logo}>
            <span style={g.logoMain}>FAST</span>
            <span style={g.logoDash}>—</span>
            <span style={g.logoSub}>NUCES</span>
          </div>
          <div style={g.navRight}>
            <a href="#programs" style={g.navLink} className="nav-link">Programs</a>
            <a href="#campuses" style={g.navLink} className="nav-link">Campuses</a>
            <a href="#admission" style={g.navLink} className="nav-link">Admission</a>
            <a
              href="#assistant"
              style={g.navBtn}
              className="nav-btn"
              onClick={() => setTimeout(() => assistantRef.current?.scrollIntoView({ behavior: "smooth" }), 100)}
            >
              AI Assistant →
            </a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section style={g.hero}>
        <div style={g.heroInner}>
          <p style={g.heroEyebrow}>Federally Chartered · Est. 1997 · 6 Campuses</p>
          <h1 style={g.heroH1}>
            Where Pakistan's<br />
            <em style={g.heroEm}>Best Minds</em> Begin
          </h1>
          <p style={g.heroP}>
            FAST-NUCES has shaped Pakistan's technology landscape for over 25 years.
            Join 11,000+ students building careers in Computing, Engineering, and Business.
          </p>
          <div style={g.heroBtns}>
            <button
              style={g.heroPrimary}
              className="btn-primary"
              onClick={() => assistantRef.current?.scrollIntoView({ behavior: "smooth" })}
            >
              Ask Our AI Assistant
            </button>
            <a href="#admission" style={g.heroGhost} className="btn-ghost">View Admission Guide →</a>
          </div>
        </div>
        <div style={g.heroStrip}>
          {stats.map((s, i) => (
            <div key={i} style={g.heroStat}>
              <span style={g.heroStatVal}>{s.value}</span>
              <span style={g.heroStatLbl}>{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* PROGRAMS */}
      <section id="programs" style={g.sec}>
        <div style={g.secInner}>
          <div style={g.secLabel}>Undergraduate Programs</div>
          <h2 style={g.secH2}>11 Programs Across<br />Three Disciplines</h2>
          <div style={g.tabRow}>
            {programs.map((p, i) => (
              <button
                key={i}
                style={activeTab === i ? g.tabOn : g.tabOff}
                className={activeTab === i ? "tab-btn active" : "tab-btn"}
                onClick={() => setActiveTab(i)}
              >
                {p.category}
              </button>
            ))}
          </div>
          <div style={g.progGrid}>
            {programs[activeTab].list.map((name, i) => (
              <div key={i} style={g.progCard} className="prog-card">
                <span style={g.progArrow} className="prog-arrow">→</span>
                <span style={g.progName}>{name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CAMPUSES */}
      <section id="campuses" style={{ ...g.sec, background: "#1a1a1a" }}>
        <div style={g.secInner}>
          <div style={{ ...g.secLabel, color: "#5a8a5a" }}>Our Campuses</div>
          <h2 style={{ ...g.secH2, color: "#f0ede8" }}>Present Across<br />Pakistan</h2>
          <div style={g.campGrid}>
            {campuses.map((c, i) => (
              <div key={i} style={g.campCard} className="camp-card">
                <div style={g.campTop}>
                  <span style={g.campName} className="camp-name">{c.name}</span>
                  {c.tag && <span style={g.campTag}>{c.tag}</span>}
                </div>
                <span style={g.campEst}>Est. {c.est}</span>
                <p style={g.campDesc}>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ADMISSION */}
      <section id="admission" style={g.sec}>
        <div style={g.secInner}>
          <div style={g.secLabel}>How To Apply</div>
          <h2 style={g.secH2}>Simple. Merit-Based.<br />No Interviews.</h2>
          <div style={g.stepsGrid}>
            {admissionSteps.map((step, i) => (
              <div key={i} style={g.stepCard} className="step-card">
                <span style={g.stepNum} className="step-num">{step.num}</span>
                <h3 style={g.stepTitle}>{step.title}</h3>
                <p style={g.stepDesc}>{step.desc}</p>
              </div>
            ))}
          </div>

          <div style={g.meritBox}>
            <p style={g.meritLabel}>Merit Calculation — NU Test Route</p>
            <div style={g.meritRow}>
              {[["50%", "Admission Test"], ["40%", "FSc / HSSC"], ["10%", "Matric / SSC"]].map(([pct, lbl], i) => (
                <div key={i} style={g.meritBlock} className="merit-block">
                  <span style={g.meritPct}>{pct}</span>
                  <span style={g.meritLbl}>{lbl}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FINANCIAL AID */}
      <section style={{ ...g.sec, background: "#f0ede8" }}>
        <div style={g.secInner}>
          <div style={g.secLabel}>Financial Support</div>
          <h2 style={g.secH2}>We Invest In<br />Our Students</h2>
          <div style={g.aidGrid}>
            {[
              ["2,000+", "Students on financial aid"],
              ["Rs. 60M", "FAST-funded assistance"],
              ["Rs. 40M", "Donor-funded assistance"],
              ["25%+", "Female student population"],
            ].map(([val, lbl], i) => (
              <div key={i} style={g.aidCard} className="aid-card">
                <span style={g.aidVal}>{val}</span>
                <span style={g.aidLbl}>{lbl}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI ASSISTANT */}
      <section id="assistant" ref={assistantRef} style={{ ...g.sec, background: "#fff" }}>
        <div style={g.secInner}>
          <div style={g.secLabel}>AI-Powered Help</div>
          <h2 style={g.secH2}>Have Questions?<br />Ask Our Assistant.</h2>
          <p style={g.assistantSub}>
            Get instant answers about programs, admission, fee structure, and campus life — 24 hours a day.
          </p>

          <div style={g.chatBox}>
            <div style={g.chatTop}>
              <div style={g.onlineDot} />
              <span style={g.chatTopText}>FAST Assistant · Online</span>
            </div>

            <div style={g.chatMessages}>
              {messages.length === 0 && (
                <div style={g.emptyChat}>
                  <p style={g.emptyChatText}>
                    Hello! I'm the FAST-NUCES AI Assistant. I can help you with admissions, programs, fee structure, financial aid, and campus life across all 6 campuses.
                  </p>
                  <div style={g.chips}>
                    {[
                      "What is the fee structure?",
                      "How is merit calculated?",
                      "What programs are offered?",
                      "Tell me about financial aid",
                      "Which campus should I choose?",
                    ].map((q, i) => (
                      <button key={i} style={g.chip} className="chip" onClick={() => sendMessage(q)}>{q}</button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((msg, i) => (
                <div key={i} style={msg.role === "user" ? g.userRow : g.botRow}>
                  {msg.role === "assistant" && <div style={g.avatar}>F</div>}
                  <div style={msg.role === "user" ? g.userBubble : g.botBubble}>
                    {msg.role === "user"
                      ? msg.content
                      : <ReactMarkdown>{msg.content}</ReactMarkdown>}
                  </div>
                </div>
              ))}

              {loading && (
                <div style={g.botRow}>
                  <div style={g.avatar}>F</div>
                  <div style={g.botBubble}>
                    <span style={g.dots}>● ● ●</span>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            <div style={g.chatInputRow}>
              <input
                style={g.chatInput}
                className="chat-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Ask about admissions, programs, campus life..."
              />
              <button
                style={loading ? g.sendOff : g.sendOn}
                className="send-btn"
                onClick={() => sendMessage()}
                disabled={loading}
              >↑</button>
            </div>
          </div>

          <p style={g.disclaimer}>
            FAST Assistant may make mistakes. Always verify critical information with the official admissions office.
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={g.footer}>
        <div style={g.footerInner}>
          <div style={g.footerLogo}>FAST—NUCES</div>
          <p style={g.footerText}>National University of Computer and Emerging Sciences</p>
          <p style={g.footerText}>Federally Chartered University · Islamabad, Pakistan</p>
          <p style={{ ...g.footerText, marginTop: "20px", color: "#444" }}>
            This is a student-built AI project and is not an official university website.
          </p>
        </div>
      </footer>

    </div>
  );
}

const g = {
  root: { fontFamily: "'Segoe UI', system-ui, sans-serif", color: "#1a1a1a", background: "#fff", overflowX: "hidden" },

  nav: { position: "sticky", top: 0, background: "rgba(255,255,255,0.95)", backdropFilter: "blur(8px)", borderBottom: "1px solid #e8e4de", zIndex: 100 },
  navInner: { maxWidth: "1100px", margin: "0 auto", padding: "0 40px", height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between" },
  logo: { display: "flex", alignItems: "center", gap: "4px" },
  logoMain: { fontSize: "18px", fontWeight: "700", color: "#1a1a1a", letterSpacing: "2px" },
  logoDash: { fontSize: "18px", color: "#2d6a2d", fontWeight: "300" },
  logoSub: { fontSize: "18px", fontWeight: "700", color: "#2d6a2d", letterSpacing: "2px" },
  navRight: { display: "flex", alignItems: "center", gap: "32px" },
  navLink: { fontSize: "14px", color: "#555", textDecoration: "none", letterSpacing: "0.3px" },
  navBtn: { fontSize: "13px", background: "#2d6a2d", color: "#fff", padding: "8px 18px", borderRadius: "4px", textDecoration: "none", letterSpacing: "0.3px", cursor: "pointer" },

  hero: { background: "#f0ede8", paddingTop: "100px" },
  heroInner: { maxWidth: "1100px", margin: "0 auto", padding: "0 40px 80px" },
  heroEyebrow: { fontSize: "12px", letterSpacing: "2px", color: "#2d6a2d", fontWeight: "600", marginBottom: "24px", textTransform: "uppercase" },
  heroH1: { fontSize: "64px", fontWeight: "700", lineHeight: "1.1", color: "#1a1a1a", marginBottom: "24px", letterSpacing: "-1px" },
  heroEm: { fontStyle: "italic", color: "#2d6a2d", fontWeight: "400" },
  heroP: { fontSize: "18px", color: "#555", lineHeight: "1.8", maxWidth: "560px", marginBottom: "40px" },
  heroBtns: { display: "flex", gap: "16px", alignItems: "center" },
  heroPrimary: { background: "#1a1a1a", color: "#fff", padding: "14px 28px", borderRadius: "4px", border: "none", fontSize: "15px", cursor: "pointer", letterSpacing: "0.3px" },
  heroGhost: { fontSize: "15px", color: "#2d6a2d", textDecoration: "none", letterSpacing: "0.3px", cursor: "pointer" },
  heroStrip: { background: "#1a1a1a", display: "flex", justifyContent: "center" },
  heroStat: { display: "flex", flexDirection: "column", alignItems: "center", padding: "32px 60px", borderRight: "1px solid #2a2a2a" },
  heroStatVal: { fontSize: "28px", fontWeight: "700", color: "#fff" },
  heroStatLbl: { fontSize: "12px", color: "#888", marginTop: "4px", letterSpacing: "0.5px" },

  sec: { padding: "96px 40px" },
  secInner: { maxWidth: "1100px", margin: "0 auto" },
  secLabel: { fontSize: "11px", fontWeight: "700", letterSpacing: "2px", textTransform: "uppercase", color: "#2d6a2d", marginBottom: "16px" },
  secH2: { fontSize: "44px", fontWeight: "700", lineHeight: "1.15", color: "#1a1a1a", marginBottom: "48px", letterSpacing: "-0.5px" },

  tabRow: { display: "flex", gap: "8px", marginBottom: "32px" },
  tabOn: { padding: "8px 20px", background: "#1a1a1a", color: "#fff", border: "1px solid #1a1a1a", borderRadius: "2px", fontSize: "13px", cursor: "pointer", letterSpacing: "0.3px" },
  tabOff: { padding: "8px 20px", background: "transparent", color: "#555", border: "1px solid #ddd", borderRadius: "2px", fontSize: "13px", cursor: "pointer", letterSpacing: "0.3px" },
  progGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1px", background: "#e8e4de" },
  progCard: { background: "#fff", padding: "20px 24px", display: "flex", alignItems: "center", gap: "12px" },
  progArrow: { color: "#2d6a2d", fontSize: "16px", flexShrink: 0 },
  progName: { fontSize: "15px", color: "#1a1a1a" },

  campGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1px", background: "#2a2a2a" },
  campCard: { background: "#1a1a1a", padding: "32px" },
  campTop: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "6px" },
  campName: { fontSize: "20px", fontWeight: "600", color: "#f0ede8" },
  campTag: { fontSize: "10px", background: "#2d6a2d", color: "#fff", padding: "3px 8px", borderRadius: "2px", letterSpacing: "1px", textTransform: "uppercase" },
  campEst: { fontSize: "12px", color: "#555", display: "block", marginBottom: "12px" },
  campDesc: { fontSize: "14px", color: "#888", lineHeight: "1.7", margin: 0 },

  stepsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "32px", marginBottom: "48px" },
  stepCard: { borderTop: "2px solid #2d6a2d", paddingTop: "24px" },
  stepNum: { fontSize: "40px", fontWeight: "700", color: "transparent", WebkitTextStroke: "1.5px #c3ddc3", display: "block", marginBottom: "12px", transition: "-webkit-text-stroke-color 0.2s ease" },
  stepTitle: { fontSize: "16px", fontWeight: "600", color: "#1a1a1a", marginBottom: "10px" },
  stepDesc: { fontSize: "14px", color: "#666", lineHeight: "1.7", margin: 0 },

  meritBox: { background: "#f0ede8", padding: "40px", borderRadius: "8px" },
  meritLabel: { fontSize: "13px", fontWeight: "600", color: "#555", marginBottom: "24px", letterSpacing: "0.5px" },
  meritRow: { display: "flex", gap: "16px" },
  meritBlock: { flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "#fff", borderRadius: "6px", padding: "28px 16px" },
  meritPct: { fontSize: "36px", fontWeight: "700", color: "#2d6a2d", lineHeight: 1 },
  meritLbl: { fontSize: "13px", color: "#666", marginTop: "10px", textAlign: "center" },

  aidGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "1px", background: "#ddd" },
  aidCard: { background: "#f0ede8", padding: "32px 24px" },
  aidVal: { fontSize: "32px", fontWeight: "700", color: "#1a1a1a", display: "block", marginBottom: "8px" },
  aidLbl: { fontSize: "14px", color: "#666", lineHeight: "1.5" },

  assistantSub: { fontSize: "16px", color: "#666", lineHeight: "1.7", maxWidth: "520px", marginBottom: "40px", marginTop: "-24px" },

  chatBox: { border: "1px solid #e8e4de", borderRadius: "8px", overflow: "hidden", maxWidth: "760px" },
  chatTop: { display: "flex", alignItems: "center", gap: "10px", padding: "16px 20px", borderBottom: "1px solid #e8e4de", background: "#fafaf8" },
  onlineDot: { width: "8px", height: "8px", borderRadius: "50%", background: "#2d6a2d" },
  chatTopText: { fontSize: "14px", fontWeight: "600", color: "#1a1a1a" },
  chatMessages: { height: "440px", overflowY: "auto", padding: "24px 20px", background: "#fafaf8" },

  emptyChat: { padding: "8px 0 16px" },
  emptyChatText: { fontSize: "14px", color: "#555", lineHeight: "1.7", marginBottom: "20px" },
  chips: { display: "flex", flexWrap: "wrap", gap: "8px" },
  chip: { background: "#fff", border: "1px solid #e0dcd6", borderRadius: "20px", padding: "7px 14px", fontSize: "13px", color: "#444", cursor: "pointer" },

  userRow: { display: "flex", justifyContent: "flex-end", marginBottom: "16px" },
  botRow: { display: "flex", alignItems: "flex-start", gap: "10px", marginBottom: "16px" },
  avatar: { width: "30px", height: "30px", borderRadius: "50%", background: "#2d6a2d", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", fontWeight: "700", flexShrink: 0 },
  userBubble: { background: "#1a1a1a", color: "#fff", padding: "10px 16px", borderRadius: "16px 16px 4px 16px", maxWidth: "65%", fontSize: "14px", lineHeight: "1.6" },
  botBubble: { background: "#fff", border: "1px solid #e8e4de", color: "#1a1a1a", padding: "10px 16px", borderRadius: "4px 16px 16px 16px", maxWidth: "75%", fontSize: "14px", lineHeight: "1.6" },
  dots: { color: "#aaa", letterSpacing: "4px", fontSize: "12px" },

  chatInputRow: { display: "flex", gap: "10px", padding: "14px 16px", borderTop: "1px solid #e8e4de", background: "#fff" },
  chatInput: { flex: 1, padding: "10px 16px", borderRadius: "4px", border: "1px solid #e0dcd6", fontSize: "14px", outline: "none", background: "#fafaf8", color: "#1a1a1a" },
  sendOn: { width: "40px", height: "40px", borderRadius: "4px", background: "#1a1a1a", color: "#fff", border: "none", fontSize: "16px", cursor: "pointer" },
  sendOff: { width: "40px", height: "40px", borderRadius: "4px", background: "#ccc", color: "#fff", border: "none", fontSize: "16px", cursor: "not-allowed" },

  disclaimer: { textAlign: "center", fontSize: "12px", color: "#aaa", marginTop: "16px" },

  footer: { background: "#0f0f0f", padding: "60px 40px" },
  footerInner: { maxWidth: "1100px", margin: "0 auto", textAlign: "center" },
  footerLogo: { fontSize: "24px", fontWeight: "700", color: "#fff", letterSpacing: "3px", marginBottom: "16px" },
  footerText: { fontSize: "13px", color: "#555", lineHeight: "1.8", margin: "4px 0" },
};