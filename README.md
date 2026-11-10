* {
  box-sizing: border-box;
}

:root {
  --bg: #040d1d;
  --bg-strong: #071725;
  --panel: rgba(18, 31, 49, 0.9);
  --panel-strong: rgba(26, 37, 56, 0.96);
  --line: rgba(138, 165, 201, 0.18);
  --line-strong: rgba(138, 165, 201, 0.34);
  --text: #edf3ff;
  --muted: #a7b8d7;
  --muted-2: #7c93b5;
  --blue: #4ec5ff;
  --cyan: #73f2d2;
  --purple: #8e75ff;
  --yellow: #f5d56d;
  --green: #8af0bf;
  --shadow: rgba(0, 0, 0, 0.45);
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  min-height: 100vh;
  font-family: Inter, 'Segoe UI', sans-serif;
  background:
    radial-gradient(circle at top, rgba(79, 118, 184, 0.18), transparent 30%),
    linear-gradient(180deg, #040b16 0%, #050f1d 100%);
  color: var(--text);
}

button,
input,
select {
  font: inherit;
}

button {
  cursor: pointer;
}

#root {
  min-height: 100vh;
}

.page-shell {
  min-height: 100vh;
}

.topbar {
  height: 78px;
  border-bottom: 1px solid var(--line);
  background: rgba(4, 12, 24, 0.82);
  backdrop-filter: blur(10px);
  position: sticky;
  top: 0;
  z-index: 10;
}

.topbar-inner {
  max-width: 1280px;
  margin: 0 auto;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
}

.brand {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo-mark {
  width: 24px;
  height: 24px;
  border-radius: 8px;
  background: linear-gradient(135deg, #63d4ff, #3b74ff);
  position: relative;
  box-shadow: 0 0 0 2px rgba(74, 148, 255, 0.22);
}

.logo-mark::before {
  content: '';
  position: absolute;
  inset: 6px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.9);
  border-left-color: transparent;
  transform: rotate(25deg);
}

.brand-wrap {
  display: flex;
  align-items: baseline;
  gap: 8px;
}

.brand-name {
  font-weight: 800;
  letter-spacing: -0.04em;
  font-size: 1.08rem;
}

.brand-tag {
  color: var(--muted-2);
  font-size: 0.72rem;
  letter-spacing: 0.02em;
}

.topnav {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.nav-item {
  background: transparent;
  border: 1px solid transparent;
  color: var(--muted);
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 10px;
  font-size: 0.84rem;
  font-weight: 600;
}

.nav-item.active {
  background: rgba(255, 255, 255, 0.02);
  border-color: var(--line);
  color: var(--text);
}

.nav-dot {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.15);
}

.nav-item.active .nav-dot {
  background: var(--cyan);
  box-shadow: 0 0 10px rgba(115, 242, 210, 0.8);
}

.content-wrap {
  max-width: 1280px;
  margin: 0 auto;
  padding: 18px 24px 40px;
}

.notice-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  width: 100%;
  margin: 0 auto 20px;
  border: 1px solid var(--line-strong);
  background: rgba(8, 18, 30, 0.96);
  border-radius: 10px;
  color: var(--text);
  font-size: 0.95rem;
  line-height: 1.5;
  padding: 12px 18px;
  font-weight: 500;
}

.notice-shield {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 1px solid rgba(138, 240, 191, 0.8);
  background: rgba(138, 240, 191, 0.08);
  position: relative;
}

.notice-shield::before {
  content: '✓';
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--green);
  font-size: 12px;
  font-weight: 900;
}

.hero-grid {
  display: grid;
  grid-template-columns: 1.15fr 0.9fr;
  gap: 34px;
}

.left-panel {
  padding-top: 12px;
}

.trust-pill {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  border-radius: 999px;
  padding: 8px 12px 7px;
  background: rgba(18, 33, 49, 0.8);
  border: 1px solid rgba(107, 198, 255, 0.26);
  color: #d1f0ff;
  font-weight: 700;
  font-size: 0.9rem;
}

.trust-badge {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: rgba(115, 242, 210, 0.12);
  border: 1px solid rgba(115, 242, 210, 0.7);
  display: inline-block;
  position: relative;
}

.trust-badge::before {
  content: '✓';
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--cyan);
  font-size: 12px;
  font-weight: 900;
}

h1 {
  margin: 18px 0 0;
  font-size: clamp(3.15rem, 5vw, 5.3rem);
  line-height: 0.96;
  letter-spacing: -0.07em;
  font-weight: 900;
  max-width: 760px;
}

.line-break {
  display: block;
}

.lead-copy {
  margin-top: 24px;
  color: rgba(222, 233, 255, 0.8);
  font-size: 1.1rem;
  line-height: 1.56;
  max-width: 740px;
  letter-spacing: -0.02em;
}

.analysis-card {
  margin-top: 34px;
  max-width: 760px;
  border: 1px solid var(--line);
  background: rgba(9, 20, 33, 0.6);
  border-radius: 18px;
  padding: 22px 20px 18px;
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.15);
}

.analysis-card h2 {
  margin: 0 0 18px;
  font-size: 1.05rem;
  letter-spacing: -0.03em;
}

.field-label {
  display: block;
  font-size: 0.94rem;
  font-weight: 700;
  color: var(--muted);
  margin: 14px 0 8px;
}

.url-box {
  width: 100%;
  display: flex;
  align-items: center;
  min-height: 55px;
  border-radius: 12px;
  border: 1px solid rgba(132, 155, 195, 0.25);
  background: rgba(16, 25, 39, 0.9);
  color: rgba(228, 238, 255, 0.95);
  padding: 14px 16px;
  font-size: 1.1rem;
  letter-spacing: -0.02em;
}

.select-wrap {
  position: relative;
}

.select-wrap select {
  width: 100%;
  appearance: none;
  background: rgba(16, 24, 38, 0.9);
  color: var(--text);
  border: 1px solid rgba(132, 155, 195, 0.25);
  border-radius: 12px;
  padding: 16px 50px 16px 18px;
  font-size: 1.08rem;
  font-weight: 500;
}

.select-wrap::after {
  content: '▾';
  position: absolute;
  right: 18px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--muted);
  pointer-events: none;
}

.consent-row {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-top: 18px;
  padding: 12px 14px;
  border-radius: 12px;
  border: 1px solid rgba(115, 242, 210, 0.24);
  background: rgba(8, 19, 29, 0.8);
  color: var(--muted);
  font-size: 1rem;
  line-height: 1.5;
}

.custom-check {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  margin-top: 2px;
}

.custom-check input {
  opacity: 0;
  width: 20px;
  height: 20px;
  position: absolute;
  inset: 0;
  margin: 0;
}

.checkmark {
  width: 20px;
  height: 20px;
  border-radius: 6px;
  border: 1px solid rgba(115, 242, 210, 0.9);
  background: rgba(115, 242, 210, 0.08);
  color: var(--cyan);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: 900;
}

.custom-check input:checked + .checkmark {
  background: rgba(115, 242, 210, 0.2);
}

.primary-button,
.secondary-button,
.ghost-button {
  border: none;
  border-radius: 12px;
  font-weight: 800;
  transition: transform 0.18s ease, opacity 0.18s ease;
}

.primary-button {
  width: 100%;
  margin-top: 18px;
  background: linear-gradient(90deg, #2dc5ff, #0fa7e6);
  color: #061621;
  padding: 16px 18px;
  font-size: 1.08rem;
  box-shadow: 0 10px 18px rgba(27, 154, 209, 0.25);
}

.primary-button:hover,
.secondary-button:hover,
.ghost-button:hover {
  transform: translateY(-1px);
}

.right-panel {
  padding-top: 30px;
}

.review-card {
  background: rgba(18, 29, 45, 0.92);
  border: 1px solid var(--line);
  border-radius: 16px;
  padding: 18px 18px 10px;
}

.review-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  color: var(--muted);
  font-weight: 700;
  font-size: 0.92rem;
  margin-bottom: 10px;
}

.mini-tag {
  background: rgba(126, 236, 255, 0.08);
  border: 1px solid rgba(126, 236, 255, 0.22);
  padding: 5px 8px;
  border-radius: 999px;
  color: #edf3ff;
  font-size: 0.7rem;
}

.review-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.field-review {
  background: rgba(18, 29, 45, 0.7);
  border: 1px solid rgba(136, 160, 193, 0.14);
  border-radius: 12px;
  padding: 14px 14px 12px;
  cursor: pointer;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}

.field-review.active {
  border-color: rgba(115, 242, 210, 0.42);
  box-shadow: inset 0 0 0 1px rgba(115, 242, 210, 0.12);
}

.review-topline,
.review-bottomline {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.review-topline {
  color: var(--muted);
  font-size: 0.92rem;
  font-weight: 700;
}

.review-bottomline {
  padding-top: 12px;
  color: var(--text);
  font-weight: 700;
  font-size: 1.04rem;
}

.status {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border-radius: 999px;
  padding: 5px 8px;
  font-size: 0.72rem;
  font-weight: 700;
}

.status.valid {
  color: #f3da74;
  background: rgba(245, 213, 109, 0.08);
}

.status.type {
  color: #f7d67a;
  background: rgba(247, 214, 122, 0.08);
}

.status.manual {
  color: #d1b9ff;
  background: rgba(168, 121, 255, 0.08);
}

.status::before {
  content: '•';
  font-size: 1rem;
  line-height: 1;
}

.edit-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  border-radius: 6px;
  border: 1px solid rgba(160, 180, 216, 0.3);
  color: var(--muted);
  font-size: 0.78rem;
}

.manual-card {
  margin-top: 12px;
  border-radius: 12px;
  background: rgba(63, 47, 88, 0.4);
  border: 1px solid rgba(155, 127, 255, 0.28);
  padding: 16px;
}

.manual-title {
  font-size: 1rem;
  font-weight: 800;
  color: #e9d8ff;
}

.manual-card p {
  margin: 8px 0 0;
  color: rgba(233, 216, 255, 0.8);
  font-size: 0.94rem;
  line-height: 1.5;
}

.feature-strip {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
  margin-top: 30px;
}

.feature-box {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  padding: 20px 18px;
  border-radius: 14px;
  background: rgba(12, 22, 35, 0.66);
  border: 1px solid var(--line);
}

.feature-icon {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(78, 197, 255, 0.08);
  border: 1px solid rgba(78, 197, 255, 0.14);
  font-size: 1.2rem;
}

.feature-box h3 {
  margin: 0 0 8px;
  font-size: 1.02rem;
}

.feature-box p {
  margin: 0;
  color: var(--muted);
  line-height: 1.55;
  font-size: 0.94rem;
}

.ops-panel {
  margin-top: 28px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  padding: 20px;
  border-radius: 18px;
  background: rgba(10, 18, 30, 0.68);
  border: 1px solid var(--line);
}

.tiny-header {
  color: var(--muted-2);
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  margin-bottom: 12px;
  font-weight: 800;
}

.ops-left h3,
.ops-right h3 {
  margin: 0;
  font-size: clamp(1.4rem, 2vw, 2rem);
  letter-spacing: -0.05em;
}

.ops-left p,
.ops-right li {
  color: var(--muted);
  font-size: 0.98rem;
  line-height: 1.6;
  margin: 10px 0 0;
}

.audio-controls {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: 18px;
}

.secondary-button,
.ghost-button {
  padding: 12px 16px;
  font-size: 0.94rem;
}

.secondary-button {
  background: linear-gradient(90deg, rgba(98, 196, 255, 0.16), rgba(70, 124, 255, 0.12));
  color: var(--text);
  border: 1px solid rgba(105, 176, 255, 0.26);
}

.ghost-button {
  background: transparent;
  color: var(--muted);
  border: 1px solid var(--line);
}

.ops-right ul {
  margin: 0;
  padding-left: 18px;
}

@media (max-width: 980px) {
  .hero-grid,
  .feature-strip,
  .ops-panel {
    grid-template-columns: 1fr;
  }

  .right-panel {
    padding-top: 0;
  }
}

@media (max-width: 720px) {
  .topbar-inner {
    padding: 0 12px;
  }

  .brand-tag {
    display: none;
  }

  .topnav {
    display: none;
  }

  .content-wrap {
    padding: 18px 14px 32px;
  }

  .lead-copy {
    font-size: 1rem;
  }
}
