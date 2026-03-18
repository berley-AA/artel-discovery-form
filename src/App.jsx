import { useState } from "react";

const steps = [
  { id: "about", title: "About You" },
  { id: "business", title: "Your Business" },
  { id: "support", title: "Current Support" },
  { id: "goals", title: "Your Goals" },
  { id: "timeline", title: "Timeline & Budget" },
  { id: "final", title: "Almost Done" },
];

const ACCENT = "#FF7B00";
const BG = "transparent";

function App() {
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "", email: "", company: "", website: "", role: "",
    industry: "", teamSize: "", revenue: "",
    channels: [], inquiryVolume: "", responseTime: "", repetitivePercent: "",
    goals: [], driver: "", triedBefore: "",
    timeline: "", budget: "", decisionMaker: "",
    extra: "",
  });

  const set = (key, val) => setForm((p) => ({ ...p, [key]: val }));
  const toggleArr = (key, val) => {
    setForm((p) => {
      const arr = p[key];
      return { ...p, [key]: arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val] };
    });
  };

  const next = () => { if (step < steps.length - 1) setStep((s) => s + 1); };
  const prev = () => { if (step > 0) setStep((s) => s - 1); };

  const valid = () => {
    switch (step) {
      case 0: return form.name.trim() !== "" && form.email.trim() !== "";
      case 1: return form.industry !== "" && form.teamSize !== "";
      case 2: return form.inquiryVolume !== "";
      case 3: return form.goals.length > 0 && form.driver.trim() !== "";
      case 4: return form.budget !== "" && form.timeline !== "";
      default: return true;
    }
  };

  const handleSubmit = () => {
    setSubmitting(true);
    setTimeout(() => { setSubmitting(false); setSubmitted(true); }, 1800);
  };

  const progress = (step / (steps.length - 1)) * 100;

  const inputBase = {
    width: "100%", padding: "12px 16px", fontSize: "15px",
    border: "1.5px solid #d4d2cc", borderRadius: "10px",
    background: "#fafaf8", outline: "none",
    transition: "border-color 0.2s, box-shadow 0.2s",
    fontFamily: "'DM Sans', system-ui, sans-serif",
    color: "#1a1a1a", boxSizing: "border-box",
  };

  const onFocus = (e) => { e.target.style.borderColor = ACCENT; e.target.style.boxShadow = `0 0 0 3px ${ACCENT}22`; };
  const onBlur = (e) => { e.target.style.borderColor = "#d4d2cc"; e.target.style.boxShadow = "none"; };

  const lbl = { display: "block", fontSize: "13px", fontWeight: 600, color: "#555", marginBottom: "6px", letterSpacing: "0.01em" };

  const chip = (sel) => ({
    padding: "10px 16px", borderRadius: "10px",
    border: sel ? `2px solid ${ACCENT}` : "1.5px solid #d4d2cc",
    background: sel ? `${ACCENT}0D` : "#fafaf8",
    cursor: "pointer", fontSize: "14px", fontWeight: sel ? 600 : 400,
    color: sel ? ACCENT : "#555", transition: "all 0.2s",
    userSelect: "none", textAlign: "center",
  });

  const radioRow = (sel) => ({
    padding: "12px 16px", borderRadius: "10px",
    border: sel ? `2px solid ${ACCENT}` : "1.5px solid #d4d2cc",
    background: sel ? `${ACCENT}0D` : "#fafaf8",
    cursor: "pointer", fontSize: "14px", fontWeight: sel ? 600 : 400,
    color: sel ? "#1a1a1a" : "#555", transition: "all 0.2s",
    display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px",
  });

  const dot = (sel) => ({
    width: "18px", height: "18px", borderRadius: "50%",
    border: sel ? `5px solid ${ACCENT}` : "2px solid #ccc",
    flexShrink: 0, transition: "all 0.2s", boxSizing: "border-box",
  });

  const btnBase = {
    padding: "10px 20px", borderRadius: "10px", fontSize: "14px", fontWeight: 500,
    cursor: "pointer", transition: "all 0.2s",
    fontFamily: "'DM Sans', system-ui, sans-serif",
    display: "flex", alignItems: "center", gap: "6px",
  };

  const col = { display: "flex", flexDirection: "column", gap: "18px" };
  const grid2 = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" };

  if (submitted) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: BG, fontFamily: "'DM Sans', system-ui, sans-serif", padding: "24px" }}>
        <div style={{ background: "#fff", borderRadius: "24px", padding: "60px 48px", textAlign: "center", maxWidth: "480px", width: "100%", boxShadow: "0 8px 40px rgba(0,0,0,0.06)" }}>
          <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: ACCENT, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px", fontSize: "28px", color: "#fff" }}>✓</div>
          <h2 style={{ fontSize: "26px", fontWeight: 700, color: "#1a1a1a", marginBottom: "12px" }}>You're all set!</h2>
          <p style={{ fontSize: "15px", color: "#777", lineHeight: 1.6 }}>Thanks {form.name.split(" ")[0]}! We've received your info and will reach out within 24 hours to schedule your discovery call.</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: BG, fontFamily: "'DM Sans', system-ui, sans-serif", padding: "24px" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,600;0,700&display=swap" rel="stylesheet" />
      <div style={{ width: "100%", maxWidth: "520px" }}>

        {/* Progress */}
        <div style={{ marginBottom: "32px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
            {steps.map((s, i) => (
              <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1 }}>
                <div onClick={() => i <= step && setStep(i)} style={{
                  width: i === step ? "14px" : "10px", height: i === step ? "14px" : "10px",
                  borderRadius: "50%", background: i <= step ? ACCENT : "#d4d2cc",
                  cursor: i <= step ? "pointer" : "default", transition: "all 0.3s",
                  boxShadow: i === step ? `0 0 0 4px ${ACCENT}33` : "none",
                }} />
                <span style={{ fontSize: "10px", marginTop: "6px", color: i === step ? ACCENT : "#999", fontWeight: i === step ? 600 : 400, whiteSpace: "nowrap" }}>{s.title}</span>
              </div>
            ))}
          </div>
          <div style={{ width: "100%", height: "4px", background: "#e5e3de", borderRadius: "4px", overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${progress}%`, background: ACCENT, borderRadius: "4px", transition: "width 0.4s cubic-bezier(0.4, 0, 0.2, 1)" }} />
          </div>
        </div>

        {/* Card */}
        <div style={{ background: "#fff", borderRadius: "20px", boxShadow: "0 4px 30px rgba(0,0,0,0.05)", overflow: "hidden" }}>
          <div style={{ padding: "32px 32px 0" }}>
            <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: ACCENT, marginBottom: "8px" }}>Step {step + 1} of {steps.length}</div>
          </div>
          <div style={{ padding: "8px 32px 32px" }}>

            {step === 0 && (<div>
              <h2 style={{ fontSize: "22px", fontWeight: 700, color: "#1a1a1a", marginBottom: "4px" }}>Tell us about yourself</h2>
              <p style={{ fontSize: "14px", color: "#888", marginBottom: "24px" }}>Basic info so we know who we're talking to</p>
              <div style={col}>
                <div><label style={lbl}>Full name *</label><input style={inputBase} placeholder="Your name" value={form.name} onChange={(e) => set("name", e.target.value)} onFocus={onFocus} onBlur={onBlur} /></div>
                <div><label style={lbl}>Email *</label><input style={inputBase} type="email" placeholder="you@company.com" value={form.email} onChange={(e) => set("email", e.target.value)} onFocus={onFocus} onBlur={onBlur} /></div>
                <div><label style={lbl}>Company name</label><input style={inputBase} placeholder="Your company" value={form.company} onChange={(e) => set("company", e.target.value)} onFocus={onFocus} onBlur={onBlur} /></div>
                <div><label style={lbl}>Website URL</label><input style={inputBase} placeholder="https://yoursite.com" value={form.website} onChange={(e) => set("website", e.target.value)} onFocus={onFocus} onBlur={onBlur} /></div>
                <div><label style={lbl}>Your role</label>
                  <select style={{ ...inputBase, appearance: "none" }} value={form.role} onChange={(e) => set("role", e.target.value)} onFocus={onFocus} onBlur={onBlur}>
                    <option value="">Select your role</option>
                    <option value="founder">Founder / CEO</option>
                    <option value="ops">Operations Manager</option>
                    <option value="cx">Customer Experience Lead</option>
                    <option value="marketing">Marketing Director</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
            </div>)}

            {step === 1 && (<div>
              <h2 style={{ fontSize: "22px", fontWeight: 700, color: "#1a1a1a", marginBottom: "4px" }}>Your business</h2>
              <p style={{ fontSize: "14px", color: "#888", marginBottom: "24px" }}>Help us understand your company</p>
              <div style={col}>
                <div><label style={lbl}>Industry *</label>
                  <div style={grid2}>{["E-commerce", "Agency", "Health & Wellness", "SaaS / Tech", "Professional Services", "Other"].map((ind) => (<div key={ind} style={chip(form.industry === ind)} onClick={() => set("industry", ind)}>{ind}</div>))}</div>
                </div>
                <div><label style={lbl}>Team size *</label>
                  <div style={grid2}>{["Just me", "2–5", "6–15", "16–50", "50+"].map((size) => (<div key={size} style={chip(form.teamSize === size)} onClick={() => set("teamSize", size)}>{size}</div>))}</div>
                </div>
                <div><label style={lbl}>Monthly revenue</label>
                  <select style={{ ...inputBase, appearance: "none" }} value={form.revenue} onChange={(e) => set("revenue", e.target.value)} onFocus={onFocus} onBlur={onBlur}>
                    <option value="">Select range</option>
                    <option value="under-10k">Under $10K</option>
                    <option value="10k-50k">$10K – $50K</option>
                    <option value="50k-150k">$50K – $150K</option>
                    <option value="150k-500k">$150K – $500K</option>
                    <option value="500k+">$500K+</option>
                    <option value="prefer-not">Prefer not to say</option>
                  </select>
                </div>
              </div>
            </div>)}

            {step === 2 && (<div>
              <h2 style={{ fontSize: "22px", fontWeight: 700, color: "#1a1a1a", marginBottom: "4px" }}>Your customer support today</h2>
              <p style={{ fontSize: "14px", color: "#888", marginBottom: "24px" }}>This helps us estimate your potential savings</p>
              <div style={col}>
                <div><label style={lbl}>How do you handle inquiries? (select all)</label>
                  <div style={grid2}>{["Email", "Live chat", "Phone", "Social DMs", "Existing chatbot", "No system yet"].map((ch) => (<div key={ch} style={chip(form.channels.includes(ch))} onClick={() => toggleArr("channels", ch)}>{ch}</div>))}</div>
                </div>
                <div><label style={lbl}>Weekly inquiry volume *</label>
                  {["Under 50", "50–150", "150–500", "500–1,000", "1,000+"].map((vol) => (<div key={vol} style={radioRow(form.inquiryVolume === vol)} onClick={() => set("inquiryVolume", vol)}><div style={dot(form.inquiryVolume === vol)} />{vol}</div>))}
                </div>
                <div><label style={lbl}>Average response time</label>
                  <select style={{ ...inputBase, appearance: "none" }} value={form.responseTime} onChange={(e) => set("responseTime", e.target.value)} onFocus={onFocus} onBlur={onBlur}>
                    <option value="">Select</option><option value="under-1h">Under 1 hour</option><option value="1-4h">1–4 hours</option><option value="same-day">Same day</option><option value="1-3d">1–3 days</option><option value="3d+">3+ days</option>
                  </select>
                </div>
                <div><label style={lbl}>% of repetitive inquiries</label>
                  <div style={grid2}>{["Under 25%", "25–50%", "50–75%", "75%+", "Not sure"].map((pct) => (<div key={pct} style={chip(form.repetitivePercent === pct)} onClick={() => set("repetitivePercent", pct)}>{pct}</div>))}</div>
                </div>
              </div>
            </div>)}

            {step === 3 && (<div>
              <h2 style={{ fontSize: "22px", fontWeight: 700, color: "#1a1a1a", marginBottom: "4px" }}>What you're looking for</h2>
              <p style={{ fontSize: "14px", color: "#888", marginBottom: "24px" }}>Tell us what success looks like for you</p>
              <div style={col}>
                <div><label style={lbl}>Main goals * (select all that apply)</label>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "8px" }}>{["Reduce customer service costs", "Speed up response times", "24/7 support without hiring", "Automate repetitive tasks", "Improve customer satisfaction", "Scale without adding headcount", "Internal tool for my team"].map((goal) => (<div key={goal} style={chip(form.goals.includes(goal))} onClick={() => toggleArr("goals", goal)}>{goal}</div>))}</div>
                </div>
                <div><label style={lbl}>What's driving your interest right now? *</label>
                  <textarea style={{ ...inputBase, minHeight: "100px", resize: "vertical" }} placeholder="A specific pain point, growth challenge, bad experience — anything that prompted you to look into AI" value={form.driver} onChange={(e) => set("driver", e.target.value)} onFocus={onFocus} onBlur={onBlur} />
                </div>
                <div><label style={lbl}>Tried AI / chatbot tools before?</label>
                  {["No, this is new for us", "Yes, but it didn't work well", "Yes, and we want to upgrade", "We built something in-house"].map((opt) => (<div key={opt} style={radioRow(form.triedBefore === opt)} onClick={() => set("triedBefore", opt)}><div style={dot(form.triedBefore === opt)} />{opt}</div>))}
                </div>
              </div>
            </div>)}

            {step === 4 && (<div>
              <h2 style={{ fontSize: "22px", fontWeight: 700, color: "#1a1a1a", marginBottom: "4px" }}>Timeline & budget</h2>
              <p style={{ fontSize: "14px", color: "#888", marginBottom: "24px" }}>Helps us prepare the right proposal for you</p>
              <div style={col}>
                <div><label style={lbl}>When do you want to get started? *</label>
                  {["As soon as possible", "Within 1 month", "Within 3 months", "Just exploring for now"].map((t) => (<div key={t} style={radioRow(form.timeline === t)} onClick={() => set("timeline", t)}><div style={dot(form.timeline === t)} />{t}</div>))}
                </div>
                <div><label style={lbl}>Budget range (CAD) *</label>
                  {["Under $2,000", "$2,000 – $5,000", "$5,000 – $10,000", "$10,000+", "Not sure yet"].map((b) => (<div key={b} style={radioRow(form.budget === b)} onClick={() => set("budget", b)}><div style={dot(form.budget === b)} />{b}</div>))}
                </div>
                <div><label style={lbl}>Are you the decision-maker?</label>
                  {["Yes, I make the final call", "I'm part of the decision team", "I'm researching for someone else"].map((d) => (<div key={d} style={radioRow(form.decisionMaker === d)} onClick={() => set("decisionMaker", d)}><div style={dot(form.decisionMaker === d)} />{d}</div>))}
                </div>
              </div>
            </div>)}

            {step === 5 && (<div>
              <h2 style={{ fontSize: "22px", fontWeight: 700, color: "#1a1a1a", marginBottom: "4px" }}>Almost done</h2>
              <p style={{ fontSize: "14px", color: "#888", marginBottom: "24px" }}>Anything else before we meet?</p>
              <div style={col}>
                <div><label style={lbl}>Anything else you'd like us to know?</label>
                  <textarea style={{ ...inputBase, minHeight: "120px", resize: "vertical" }} placeholder="Special requirements, questions, context — anything helps" value={form.extra} onChange={(e) => set("extra", e.target.value)} onFocus={onFocus} onBlur={onBlur} />
                </div>
                <div style={{ background: "#fafaf8", borderRadius: "12px", padding: "20px", border: "1px solid #e5e3de" }}>
                  <div style={{ fontSize: "13px", fontWeight: 700, color: "#1a1a1a", marginBottom: "12px", textTransform: "uppercase", letterSpacing: "0.08em" }}>Quick summary</div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", fontSize: "13px", color: "#666" }}>
                    <div><strong style={{ color: "#999", fontWeight: 500 }}>Name</strong><br />{form.name || "—"}</div>
                    <div><strong style={{ color: "#999", fontWeight: 500 }}>Company</strong><br />{form.company || "—"}</div>
                    <div><strong style={{ color: "#999", fontWeight: 500 }}>Industry</strong><br />{form.industry || "—"}</div>
                    <div><strong style={{ color: "#999", fontWeight: 500 }}>Team</strong><br />{form.teamSize || "—"}</div>
                    <div><strong style={{ color: "#999", fontWeight: 500 }}>Volume</strong><br />{form.inquiryVolume || "—"}</div>
                    <div><strong style={{ color: "#999", fontWeight: 500 }}>Budget</strong><br />{form.budget || "—"}</div>
                    <div><strong style={{ color: "#999", fontWeight: 500 }}>Timeline</strong><br />{form.timeline || "—"}</div>
                    <div><strong style={{ color: "#999", fontWeight: 500 }}>Decision</strong><br />{form.decisionMaker || "—"}</div>
                  </div>
                  {form.goals.length > 0 && (<div style={{ marginTop: "10px", fontSize: "13px" }}><strong style={{ color: "#999", fontWeight: 500 }}>Goals:</strong> <span style={{ color: "#666" }}>{form.goals.join(", ")}</span></div>)}
                </div>
              </div>
            </div>)}

          </div>

          {/* Buttons */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 32px 28px" }}>
            <button onClick={prev} disabled={step === 0} style={{ ...btnBase, border: "1.5px solid #d4d2cc", background: "#fff", color: step === 0 ? "#ccc" : "#555", cursor: step === 0 ? "default" : "pointer" }}>← Back</button>
            <button onClick={step === steps.length - 1 ? handleSubmit : next} disabled={!valid() || submitting} style={{ ...btnBase, border: "none", background: valid() && !submitting ? ACCENT : "#ddd", color: valid() && !submitting ? "#fff" : "#aaa", cursor: valid() && !submitting ? "pointer" : "default", fontWeight: 600, padding: "10px 24px" }}>
              {submitting ? "Submitting..." : step === steps.length - 1 ? "Book My Discovery Call ✓" : "Next →"}
            </button>
          </div>
        </div>

        <div style={{ textAlign: "center", marginTop: "16px", fontSize: "13px", color: "#999" }}>Step {step + 1} of {steps.length} — {steps[step].title}</div>
      </div>
    </div>
  );
}

export default App;
