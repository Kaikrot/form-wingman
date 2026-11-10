import { useMemo, useState } from 'react';

const initialFields = [
  {
    id: 'passenger-name',
    label: 'Passenger full name',
    value: 'Aarav Sharma',
    confidence: 94,
    sensitivity: 'normal',
    status: 'valid',
    type: 'text',
    guidance: 'Enter the full traveler name exactly as shown on the booking document.',
  },
  {
    id: 'travel-date',
    label: 'Travel date',
    value: '14 Feb 2026',
    confidence: 30,
    sensitivity: 'normal',
    status: 'type',
    type: 'date',
    guidance: 'Select the departure date for the journey. It is usually the day the booking is valid.',
  },
  {
    id: 'payment-gateway',
    label: 'Payment (gateway)',
    value: 'Manual handoff required',
    confidence: null,
    sensitivity: 'high',
    status: 'manual',
    type: 'payment',
    guidance: 'This step is fully controlled by the secure payment provider. Wingman never holds card, UPI, or bank details.',
  },
];

function App() {
  const [consent, setConsent] = useState(true);
  const [isAnalyzed, setIsAnalyzed] = useState(true);
  const [activeField, setActiveField] = useState(initialFields[0]);
  const [voiceEnabled, setVoiceEnabled] = useState(true);

  const currentField = useMemo(
    () => initialFields.find((field) => field.id === activeField.id) ?? initialFields[0],
    [activeField],
  );

  const speak = (text) => {
    if (!voiceEnabled || typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.02;
    utterance.pitch = 1.1;
    utterance.volume = 1;
    window.speechSynthesis.speak(utterance);
  };

  const onAnalyze = () => {
    setIsAnalyzed(true);
    setActiveField(initialFields[0]);
    speak('I found the required fields. Passenger name is the next field. Please review the suggested value before you paste it.');
  };

  return (
    <div className="page-shell">
      <header className="topbar">
        <div className="topbar-inner">
          <div className="brand" aria-label="Form Wingman brand">
            <div className="logo-mark" aria-hidden="true" />
            <div className="brand-wrap">
              <span className="brand-name">Form Wingman</span>
              <span className="brand-tag">Trust-First Copilot</span>
            </div>
          </div>

          <nav className="topnav" aria-label="Main navigation">
            <button className="nav-item active" type="button">
              <span className="nav-dot" />
              Copilot
            </button>
            <button className="nav-item" type="button">
              <span className="nav-dot" />
              Templates
            </button>
            <button className="nav-item" type="button">
              <span className="nav-dot" />
              Saved Vault
            </button>
            <button className="nav-item" type="button">
              <span className="nav-dot" />
              Submissions
            </button>
            <button className="nav-item" type="button">
              <span className="nav-dot" />
              Plans
            </button>
          </nav>
        </div>
      </header>

      <main className="content-wrap">
        <div className="notice-bar">
          <span className="notice-shield" aria-hidden="true" />
          <span>
            <strong>Zero Auto-Submit Guarantee:</strong> Wingman never submits forms or touches passwords, OTPs, or payments.
          </span>
        </div>

        <div className="hero-grid">
          <section className="left-panel">
            <div className="trust-pill">
              <span className="trust-badge" aria-hidden="true" />
              <span>Trust-first • Zero auto-submit</span>
            </div>

            <h1>
              Fill any official form with
              <span className="line-break">a copilot you control</span>
            </h1>

            <p className="lead-copy">
              Paste a link — railway booking, public grievance, admission, gas, banking, or any site where you have to type.
              Wingman drafts every value, you review, you paste, you submit. It never presses the final button.
            </p>

            <div className="analysis-card">
              <h2>Start with a form link</h2>

              <label className="field-label" htmlFor="url">Form URL</label>
              <div className="url-box" id="url">https://www.irctc.co.in/nget/</div>

              <label className="field-label" htmlFor="portal-type">Portal type</label>
              <div className="select-wrap">
                <select id="portal-type" defaultValue="auto-detect">
                  <option value="auto-detect">Auto-detect portal</option>
                  <option value="banking">Banking</option>
                  <option value="admission">Admission</option>
                  <option value="grievance">Grievance</option>
                  <option value="railway">Railway</option>
                </select>
              </div>

              <div className="consent-row">
                <label className="custom-check" htmlFor="consent">
                  <input id="consent" type="checkbox" checked={consent} onChange={() => setConsent((v) => !v)} />
                  <span className="checkmark">✓</span>
                </label>
                <span>
                  I consent to <strong>Wingman</strong> running a <strong>demo</strong> analysis on this link. Nothing is submitted, and no data leaves this app.
                </span>
              </div>

              <button className="primary-button" type="button" onClick={onAnalyze}>
                Analyse with Wingman
              </button>
            </div>
          </section>

          <aside className="right-panel">
            <div className="review-card">
              <div className="review-header">
                <span>Review before you paste</span>
                <span className="mini-tag">Demo analysis (mocked)</span>
              </div>

              <div className="review-list">
                {initialFields.map((field) => (
                  <div
                    key={field.id}
                    className={`field-review ${activeField.id === field.id ? 'active' : ''}`}
                    onClick={() => setActiveField(field)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' || event.key === ' ') {
                        setActiveField(field);
                      }
                    }}
                  >
                    <div className="review-topline">
                      <span>{field.label}</span>
                      {field.status === 'valid' ? (
                        <span className="status valid">Valid • {field.confidence}%</span>
                      ) : field.status === 'type' ? (
                        <span className="status type">Type • {field.confidence}%</span>
                      ) : (
                        <span className="status manual">Manual</span>
                      )}
                    </div>
                    <div className="review-bottomline">
                      <span>{field.value}</span>
                      <span className="edit-icon">✎</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="manual-card">
                <div className="manual-title">Manual checkpoint — payment handoff</div>
                <p>
                  The secure gateway step is fully yours. Wingman holds no card or UPI data.
                </p>
              </div>
            </div>
          </aside>
        </div>

        <section className="feature-strip">
          <div className="feature-box">
            <div className="feature-icon">🎧</div>
            <div>
              <h3>Audio guidance</h3>
              <p>Wingman reads the next required field and explains the right choice in plain language.</p>
            </div>
          </div>

          <div className="feature-box">
            <div className="feature-icon">🧠</div>
            <div>
              <h3>AI form detection</h3>
              <p>It recognizes labels, required markers, and validation patterns to find the next step.</p>
            </div>
          </div>

          <div className="feature-box">
            <div className="feature-icon">🔒</div>
            <div>
              <h3>Vault-first security</h3>
              <p>Profile data is stored in the user vault with layered protections and explicit user consent.</p>
            </div>
          </div>
        </section>

        <section className="ops-panel">
          <div className="ops-left">
            <div className="tiny-header">Active field detection</div>
            <h3>{currentField.label}</h3>
            <p>{currentField.guidance}</p>
            <div className="audio-controls">
              <button
                type="button"
                className="secondary-button"
                onClick={() => speak(`Next required field: ${currentField.label}. ${currentField.guidance}`)}
              >
                Play audio guide
              </button>
              <button type="button" className="ghost-button" onClick={() => setVoiceEnabled((v) => !v)}>
                {voiceEnabled ? 'Disable audio' : 'Enable audio'}
              </button>
            </div>
          </div>

          <div className="ops-right">
            <div className="tiny-header">User permission model</div>
            <ul>
              <li>Customer account is separate from admin controls.</li>
              <li>Admins can update website settings and workflows.</li>
              <li>Users review and approve sensitive values before paste.</li>
              <li>Payments and credentials can be routed through secure gateways.</li>
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
