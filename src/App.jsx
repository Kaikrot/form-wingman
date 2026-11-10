import { useEffect, useMemo, useState } from 'react';

const navigation = [
  { id: 'copilot', label: 'Copilot', icon: '✦' },
  { id: 'templates', label: 'Templates', icon: '▤' },
  { id: 'vault', label: 'Saved Vault', icon: '◇' },
  { id: 'submissions', label: 'Submissions', icon: '◷' },
  { id: 'plans', label: 'Plans', icon: '▱' },
];

const demoFields = [
  {
    id: 'fullName', label: 'Passenger full name', required: true, confidence: 94,
    value: 'Aarav Sharma', type: 'text', source: 'Demo profile',
    guidance: 'Enter the traveler’s full name as it appears on their travel document.',
  },
  {
    id: 'email', label: 'Email address', required: true, confidence: 88,
    value: 'aarav@example.com', type: 'email', source: 'Demo profile',
    guidance: 'Use an email address where booking updates can be received.',
  },
  {
    id: 'travelDate', label: 'Travel date', required: true, confidence: 30,
    value: '2026-12-14', type: 'date', source: 'Needs your review',
    guidance: 'Choose the date you plan to travel. Check that it matches your itinerary.',
  },
  {
    id: 'travelClass', label: 'Travel class', required: true, confidence: 0,
    value: '', type: 'select', source: 'Your choice',
    options: ['Select a class', 'Sleeper', 'AC 3 Tier', 'AC 2 Tier', 'AC First Class'],
    guidance: 'Choose the travel class that suits your journey and budget.',
  },
  {
    id: 'payment', label: 'Payment details', required: true, confidence: null,
    value: 'Complete manually on the secure payment page', type: 'manual', source: 'Manual checkpoint',
    guidance: 'Complete payment directly with the official payment provider. Wingman does not collect or enter card, UPI, bank, or password details.',
  },
];

const templates = [
  { title: 'Railway booking', category: 'Travel', url: 'https://www.irctc.co.in/nget/' },
  { title: 'Public grievance', category: 'Government', url: 'https://example.gov/grievance' },
  { title: 'School admission', category: 'Education', url: 'https://example.edu/admissions' },
];

function App() {
  const [activeView, setActiveView] = useState('copilot');
  const [formUrl, setFormUrl] = useState('https://www.irctc.co.in/nget/');
  const [portal, setPortal] = useState('auto');
  const [consent, setConsent] = useState(false);
  const [fields, setFields] = useState(demoFields);
  const [analyzed, setAnalyzed] = useState(false);
  const [activeFieldId, setActiveFieldId] = useState('fullName');
  const [guideIndex, setGuideIndex] = useState(0);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [filter, setFilter] = useState('all');
  const [notice, setNotice] = useState('');

  const activeField = useMemo(
    () => fields.find((field) => field.id === activeFieldId) ?? fields[0],
    [fields, activeFieldId],
  );
  const guidedFields = fields.filter((field) => field.required);
  const currentGuideField = guidedFields[guideIndex] ?? guidedFields[0];
  const visibleFields = fields.filter((field) => filter === 'all' || (filter === 'required' ? field.required : field.confidence !== null && field.confidence < 70));
  const completedCount = fields.filter((field) => field.type !== 'manual' && (field.value || '').trim()).length;

  useEffect(() => () => {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
  }, []);

  const showNotice = (message) => {
    setNotice(message);
    window.setTimeout(() => setNotice(''), 3500);
  };

  const speak = (text) => {
    if (!voiceEnabled) {
      showNotice('Turn on audio guidance to hear this instruction.');
      return;
    }
    if (!('speechSynthesis' in window)) {
      showNotice('Audio guidance is not supported in this browser. You can still follow the written steps.');
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.96;
    window.speechSynthesis.speak(utterance);
  };

  const analyze = (event) => {
    event.preventDefault();
    if (!consent) {
      showNotice('Please confirm consent before starting the demo analysis.');
      return;
    }
    let parsed;
    try {
      parsed = new URL(formUrl);
      if (!['http:', 'https:'].includes(parsed.protocol)) throw new Error('Unsupported protocol');
    } catch {
      showNotice('Enter a complete website address beginning with https://');
      return;
    }
    // This prototype intentionally uses local mock data and does not open or inspect the submitted website.
    setAnalyzed(true);
    setFields(demoFields);
    setActiveFieldId('fullName');
    setGuideIndex(0);
    showNotice(`Demo analysis ready for ${parsed.hostname}. No website was contacted and no data was sent.`);
  };

  const updateField = (id, value) => {
    setFields((current) => current.map((field) => field.id === id ? { ...field, value, source: 'Edited by you' } : field));
  };

  const copyValue = async (field) => {
    if (!field.value || field.type === 'manual') {
      showNotice('There is no value to copy for this field.');
      return;
    }
    try {
      await navigator.clipboard.writeText(field.value);
      showNotice(`${field.label} copied. Paste it into the form when you’re ready.`);
    } catch {
      showNotice('Clipboard access was unavailable. Select and copy the value manually.');
    }
  };

  const startGuide = () => {
    setActiveView('copilot');
    setActiveFieldId(currentGuideField.id);
    speak(`Step ${guideIndex + 1} of ${guidedFields.length}. ${currentGuideField.label}. ${currentGuideField.guidance}`);
    document.getElementById('guided-step')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const selectTemplate = (template) => {
    setFormUrl(template.url);
    setPortal(template.category.toLowerCase());
    setActiveView('copilot');
    showNotice(`${template.title} template selected. Review the URL and start a demo analysis when ready.`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="#home" onClick={(event) => { event.preventDefault(); setActiveView('copilot'); }} aria-label="Form Wingman home">
          <span className="logo-mark" aria-hidden="true">✓</span>
          <span className="brand-copy"><strong>Form Wingman</strong><small>Trust-first copilot</small></span>
        </a>
        <nav className="main-nav" aria-label="Main navigation">
          {navigation.map((item) => (
            <button key={item.id} className={`nav-link ${activeView === item.id ? 'selected' : ''}`} onClick={() => setActiveView(item.id)} aria-current={activeView === item.id ? 'page' : undefined}>
              <span aria-hidden="true">{item.icon}</span>{item.label}
            </button>
          ))}
        </nav>
        <button className={`audio-toggle ${voiceEnabled ? 'is-on' : ''}`} type="button" onClick={() => { setVoiceEnabled((enabled) => !enabled); if (voiceEnabled && 'speechSynthesis' in window) window.speechSynthesis.cancel(); }} aria-pressed={voiceEnabled}>
          <span aria-hidden="true">{voiceEnabled ? '◖' : '◗'}</span><span>{voiceEnabled ? 'Audio on' : 'Audio off'}</span>
        </button>
      </header>

      <div className="safety-banner"><span aria-hidden="true">◆</span><strong>Nothing is submitted automatically.</strong> Passwords, OTPs, and payment details stay manual.</div>
      {notice && <div className="toast" role="status" aria-live="polite">{notice}<button type="button" aria-label="Dismiss message" onClick={() => setNotice('')}>×</button></div>}

      {activeView === 'copilot' ? (
        <main id="home" className="main-content">
          <section className="hero-grid">
            <div className="intro-column">
              <div className="trust-chip"><span aria-hidden="true">✓</span> You stay in control</div>
              <h1>Forms, made easier.<br /><span>One clear step at a time.</span></h1>
              <p className="hero-copy">Wingman can help identify required fields, explain what they’re asking for, and read guidance aloud. Review every suggestion and decide what to enter yourself.</p>

              <form className="start-card" onSubmit={analyze}>
                <div className="card-heading"><div><span className="eyebrow">GET STARTED</span><h2>Start with a form link</h2></div><span className="step-count">01 / 03</span></div>
                <p className="card-description">Demo mode uses sample data only. It does not open or inspect the link.</p>
                <label className="input-label" htmlFor="form-url">Form website address</label>
                <input id="form-url" className="text-input url-input" type="url" inputMode="url" placeholder="https://example.com/form" value={formUrl} onChange={(event) => setFormUrl(event.target.value)} required aria-describedby="url-help" />
                <p id="url-help" className="help-text">Paste the page address you want help with. No page data is sent in this prototype.</p>
                <label className="input-label" htmlFor="portal-type">Form category <span className="optional">Optional</span></label>
                <select id="portal-type" className="text-input" value={portal} onChange={(event) => setPortal(event.target.value)}>
                  <option value="auto">Auto-detect category</option><option value="travel">Travel and booking</option><option value="government">Government services</option><option value="education">Education and admission</option><option value="other">Other form</option>
                </select>
                <label className="consent-control">
                  <input type="checkbox" checked={consent} onChange={(event) => setConsent(event.target.checked)} />
                  <span className="fake-checkbox" aria-hidden="true">✓</span>
                  <span>I understand this is a local demo using sample data, and no form will be submitted.</span>
                </label>
                <button className="primary-button" type="submit"><span aria-hidden="true">⌕</span> Analyse demo form</button>
                <p className="privacy-footnote"><span aria-hidden="true">▣</span> No sign-in. No external page access. No data leaves this demo.</p>
              </form>
            </div>

            <aside className="preview-column" aria-label="Form field review preview">
              <div className="review-card">
                <div className="review-card-header"><div><span className="eyebrow">YOUR REVIEW QUEUE</span><h2>{analyzed ? 'Demo fields detected' : 'Review before you fill'}</h2></div><span className="mock-pill">{analyzed ? 'LOCAL DEMO' : 'SAMPLE PREVIEW'}</span></div>
                <p className="review-intro">{analyzed ? 'These are sample suggestions, not results from the website link.' : 'Suggestions stay editable. Sensitive steps are always yours.'}</p>
                <div className="field-list" aria-label="Suggested fields">
                  {fields.slice(0, 3).map((field) => (
                    <article key={field.id} className={`field-card ${activeFieldId === field.id ? 'field-selected' : ''}`}>
                      <div className="field-top"><div><h3>{field.label} <span className="required-mark" aria-label={field.required ? 'required' : 'optional'}>{field.required ? '*' : ''}</span></h3><span className="field-source">{field.source}</span></div><span className={`confidence ${field.confidence >= 70 ? 'conf-high' : 'conf-low'}`}>{field.confidence === null ? 'Manual' : `${field.confidence}% match`}</span></div>
                      {field.id === activeFieldId ? <input className="suggestion-input" aria-label={`Suggested ${field.label}`} value={field.value} onChange={(event) => updateField(field.id, event.target.value)} /> : <p className="suggestion-value">{field.value || 'Needs your input'}</p>}
                      <div className="field-actions"><button type="button" className="text-button" onClick={() => { setActiveFieldId(field.id); document.getElementById('guided-step')?.scrollIntoView({ behavior: 'smooth', block: 'center' }); }}>Review field</button>{field.value && <button type="button" className="icon-button" onClick={() => copyValue(field)} aria-label={`Copy ${field.label}`}>Copy</button>}</div>
                    </article>
                  ))}
                </div>
                <div className="manual-note"><span className="lock-icon" aria-hidden="true">▣</span><div><strong>Secure steps stay with you</strong><p>Passwords, verification codes, and payment credentials are not handled by Wingman.</p></div></div>
              </div>
              <div className="compat-note"><span aria-hidden="true">ⓘ</span><p>Real detection on other websites requires a browser extension. This web demo never reads another page.</p></div>
            </aside>
          </section>

          <section className="workflow-section" aria-labelledby="workflow-title">
            <div className="section-heading"><div><span className="eyebrow">YOUR WORKFLOW</span><h2 id="workflow-title">Stay in control at every step</h2></div><span className="progress-caption">{completedCount} of {fields.length - 1} sample fields have a value</span></div>
            <div className="workflow-grid">
              <div className="stepper-panel">
                <div className="stepper-toolbar"><div><span className="eyebrow">AUDIO GUIDE</span><h3 id="guided-step">{currentGuideField ? currentGuideField.label : 'Ready when you are'}</h3></div><span className="step-pill">Step {guideIndex + 1} of {guidedFields.length}</span></div>
                <p className="guide-copy">{currentGuideField?.guidance || 'Start a demo analysis to see guided instructions.'}</p>
                <div className="guide-progress" role="progressbar" aria-label="Guidance progress" aria-valuemin="0" aria-valuemax={guidedFields.length} aria-valuenow={guideIndex + 1}><span style={{ width: `${((guideIndex + 1) / guidedFields.length) * 100}%` }} /></div>
                <div className="guide-controls"><button type="button" className="primary-button compact" onClick={startGuide} disabled={!analyzed}>▶ <span>Read this step aloud</span></button><button type="button" className="quiet-button" onClick={() => setGuideIndex((index) => Math.max(0, index - 1))} disabled={guideIndex === 0}>Previous</button><button type="button" className="quiet-button" onClick={() => { const next = Math.min(guidedFields.length - 1, guideIndex + 1); setGuideIndex(next); setActiveFieldId(guidedFields[next].id); speak(`Step ${next + 1}. ${guidedFields[next].label}. ${guidedFields[next].guidance}`); }} disabled={!analyzed || guideIndex >= guidedFields.length - 1}>Next step →</button></div>
              </div>
              <div className="how-panel"><span className="eyebrow">HOW IT WORKS</span><ol><li><span>1</span><div><strong>Review suggestions</strong><p>Correct anything that doesn’t look right.</p></div></li><li><span>2</span><div><strong>Follow audio guidance</strong><p>Listen to plain-language field instructions.</p></div></li><li><span>3</span><div><strong>You decide what to enter</strong><p>Wingman never clicks the final submit button.</p></div></li></ol></div>
            </div>
          </section>

          <section className="safety-footer"><span aria-hidden="true">✓</span><div><strong>Built around your choices</strong><p>This prototype does not store vault data or connect to financial accounts. Never enter real passwords, OTPs, card details, or bank credentials here.</p></div></section>
        </main>
      ) : (
        <main className="main-content secondary-view">
          <button type="button" className="back-link" onClick={() => setActiveView('copilot')}>← Back to Copilot</button>
          {activeView === 'templates' && <><span className="eyebrow">QUICK START</span><h1>Form templates</h1><p className="hero-copy">Choose a demo template to prefill the form address. These are starting points only—always verify a site is official before entering personal information.</p><div className="utility-grid">{templates.map((template) => <article className="utility-card" key={template.title}><span className="template-category">{template.category}</span><h2>{template.title}</h2><p>{template.url}</p><button className="secondary-button" onClick={() => selectTemplate(template)}>Use this template</button></article>)}</div></>}
          {activeView === 'vault' && <><span className="eyebrow">YOUR INFORMATION</span><h1>Saved Vault</h1><p className="hero-copy">The secure vault is not implemented in this prototype. Demo suggestions are temporary sample data and are not saved to an account or browser storage.</p><div className="empty-state"><span aria-hidden="true">◇</span><h2>Your real details are not stored here</h2><p>When a vault is added, it should use user-controlled encryption and keep administrators from viewing private customer data.</p><button className="secondary-button" onClick={() => setActiveView('copilot')}>Try the sample copilot</button></div></>}
          {activeView === 'submissions' && <><span className="eyebrow">ACTIVITY</span><h1>Submissions</h1><p className="hero-copy">Wingman does not submit forms. This demo keeps no submission history.</p><div className="empty-state"><span aria-hidden="true">◷</span><h2>No activity recorded</h2><p>In a future version, this area can show user-authorized draft activity without collecting sensitive field values.</p></div></>}
          {activeView === 'plans' && <><span className="eyebrow">SIMPLE, TRANSPARENT ACCESS</span><h1>Plans</h1><p className="hero-copy">Plan selection is a design preview only. There are no payments or subscriptions in this prototype.</p><div className="utility-grid"><article className="utility-card"><span className="template-category">CURRENT</span><h2>Free demo</h2><p>Sample field suggestions, local audio guidance, and no account required.</p><button className="secondary-button" onClick={() => setActiveView('copilot')}>Continue with demo</button></article><article className="utility-card"><span className="template-category">COMING LATER</span><h2>Personal copilot</h2><p>Secure account and browser extension features are not available yet.</p><button className="secondary-button" disabled>Coming soon</button></article></div></>}
        </main>
      )}
      <footer className="site-footer"><span>Form Wingman · Prototype</span><span>Private by design. You stay in control.</span></footer>
    </div>
  );
}

export default App;
