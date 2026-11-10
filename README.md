# Form Wingman

A responsive React + Vite prototype for a trust-first form copilot. The app demonstrates field review, required-field guidance, and browser speech audio without accessing an external webpage.

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (usually http://localhost:5173).

## What works in this prototype

- Responsive Copilot, Templates, Saved Vault, Submissions, and Plans views.
- Local demo form analysis after explicit consent. The URL is validated, but the page is not fetched, opened, or inspected.
- Editable sample field suggestions, required-field markers, review filters, and copy controls.
- Step-by-step written and speech-synthesis guidance (browser support required).
- Sensitive payment steps are manual; the prototype never submits a form.
- Keyboard-friendly controls, visible focus states, and reduced-motion support.

## Important limitations

This is a front-end demonstration, not a production form detector. A normal website cannot inspect another website's page. Real cross-site detection and user-approved filling would require a separately designed browser extension and careful permission boundaries. No accounts, admin tools, secure vault, external AI, payment integrations, or persistence are implemented. Do not enter real credentials, OTPs, card details, or financial information.

For production, keep admins unable to access customer secrets, use established password-manager/payment-provider integrations rather than storing raw credentials, and obtain security and privacy review before handling personal data.
