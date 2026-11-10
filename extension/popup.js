<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Form Wingman</title>
    <style>
      :root {
        --bg: #07131e;
        --panel: #0d1b2a;
        --panel-2: #122437;
        --line: #273a4f;
        --text: #edf3ff;
        --muted: #a8b5cb;
        --accent: #66e0d3;
        --accent-2: #58baf6;
        --warning: #f3d278;
      }
      * { box-sizing: border-box; }
      body {
        margin: 0;
        width: 350px;
        min-height: 480px;
        background: linear-gradient(180deg, var(--bg), #0b1726 100%);
        color: var(--text);
        font-family: Arial, Helvetica, sans-serif;
      }
      .popup-shell {
        padding: 16px;
      }
      .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 12px;
        margin-bottom: 14px;
      }
      .brand {
        display: flex;
        align-items: center;
        gap: 10px;
        font-weight: 700;
      }
      .logo {
        width: 22px;
        height: 22px;
        border-radius: 8px;
        background: linear-gradient(135deg, var(--accent), var(--accent-2));
        display: grid;
        place-items: center;
        color: #04141d;
        font-size: 14px;
        font-weight: 800;
      }
      .status-pill {
        font-size: 10px;
        border: 1px solid #355e52;
        color: #96ecdf;
        background: rgba(102, 224, 211, 0.08);
        border-radius: 999px;
        padding: 5px 8px;
        font-weight: 700;
      }
      button {
        cursor: pointer;
        font: inherit;
      }
      .primary, .secondary {
        width: 100%;
        border-radius: 10px;
        padding: 10px 12px;
        font-weight: 700;
      }
      .primary {
        border: none;
        background: linear-gradient(90deg, var(--accent), var(--accent-2));
        color: #061923;
      }
      .secondary {
        border: 1px solid var(--line);
        background: var(--panel-2);
        color: var(--text);
      }
      .toolbar {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 8px;
        margin-bottom: 14px;
      }
      .section-title {
        color: var(--muted);
        font-size: 10px;
        letter-spacing: 0.14em;
        text-transform: uppercase;
        font-weight: 800;
        margin: 0 0 8px;
      }
      .field-list {
        display: grid;
        gap: 8px;
        max-height: 240px;
        overflow: auto;
        padding-right: 4px;
      }
      .field-item {
        background: var(--panel);
        border: 1px solid var(--line);
        border-radius: 10px;
        padding: 10px 10px 8px;
      }
      .field-item strong {
        display: block;
        font-size: 12px;
        line-height: 1.4;
      }
      .field-meta {
        display: flex;
        justify-content: space-between;
        gap: 10px;
        margin-top: 6px;
        font-size: 10px;
        color: var(--muted);
      }
      .tag {
        border-radius: 999px;
        padding: 4px 7px;
        font-size: 9px;
        font-weight: 700;
        background: rgba(243, 210, 120, 0.12);
        color: var(--warning);
        border: 1px solid rgba(243, 210, 120, 0.2);
      }
      .tag.required {
        background: rgba(102, 224, 211, 0.08);
        color: var(--accent);
        border-color: rgba(102, 224, 211, 0.2);
      }
      .empty {
        color: var(--muted);
        font-size: 12px;
        line-height: 1.5;
        background: var(--panel);
        border: 1px solid var(--line);
        border-radius: 10px;
        padding: 12px;
      }
      .footer-note {
        color: var(--muted);
        font-size: 10px;
        line-height: 1.5;
        margin-top: 12px;
      }
    </style>
  </head>
  <body>
    <div class="popup-shell">
      <div class="header">
        <div class="brand">
          <span class="logo">✓</span>
          <span>Form Wingman</span>
        </div>
        <span class="status-pill">Demo</span>
      </div>

      <div class="toolbar">
        <button id="scanButton" class="primary" type="button">Scan page</button>
        <button id="audioButton" class="secondary" type="button">Audio guide</button>
      </div>

      <p class="section-title">Detected fields</p>
      <div id="fieldList" class="field-list"></div>

      <p class="footer-note">This prototype scans the active page and highlights likely form fields. It does not submit forms or save passwords.</p>
    </div>

    <script src="popup.js"></script>
  </body>
</html>
