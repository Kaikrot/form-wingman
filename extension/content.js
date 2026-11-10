const SAFE_TYPES = new Set(['text', 'email', 'tel', 'number', 'date', 'password', 'search', 'url']);
const MAX_FIELDS = 20;

function getFieldLabel(element) {
  if (!element) return 'Unnamed field';

  const byId = element.id && document.querySelector(`label[for="${CSS.escape(element.id)}"]`);
  if (byId && byId.textContent) return byId.textContent.trim().replace(/\s+/g, ' ');

  const closestLabel = element.closest('label');
  if (closestLabel && closestLabel.textContent) return closestLabel.textContent.trim().replace(/\s+/g, ' ');

  const ariaLabel = element.getAttribute('aria-label');
  if (ariaLabel) return ariaLabel.trim();

  const placeholder = element.getAttribute('placeholder');
  if (placeholder) return placeholder.trim();

  const name = element.getAttribute('name');
  if (name) return name.replace(/[_-]+/g, ' ').replace(/\b\w/g, (ch) => ch.toUpperCase());

  return 'Unnamed field';
}

function isRequiredField(element) {
  if (element.hasAttribute('required') || element.getAttribute('aria-required') === 'true') return true;

  const role = (element.getAttribute('role') || '').toLowerCase();
  if (role === 'textbox' || role === 'combobox') return true;

  const type = (element.type || '').toLowerCase();
  if (SAFE_TYPES.has(type) || type === 'month' || type === 'datetime-local' || type === 'time') return true;

  return false;
}

function getFieldType(element) {
  const type = (element.type || '').toLowerCase();
  if (type) return type;
  const tag = (element.tagName || '').toLowerCase();
  return tag === 'select' ? 'select' : tag === 'textarea' ? 'textarea' : 'text';
}

function extractFields() {
  const seen = new Set();
  const results = [];

  const candidates = Array.from(document.querySelectorAll('input, select, textarea'));

  for (const element of candidates) {
    const type = getFieldType(element);
    if (element.type === 'hidden' || element.disabled || element.readOnly) continue;
    if (element.closest('[aria-hidden="true"')) continue;

    const label = getFieldLabel(element).trim();
    if (!label || label === 'Unnamed field') continue;

    const marker = `${label}|${type}|${element.name || element.id || ''}`;
    if (seen.has(marker)) continue;
    seen.add(marker);

    results.push({
      id: `field-${results.length + 1}`,
      label,
      type,
      required: isRequiredField(element),
      placeholder: element.getAttribute('placeholder') || '',
      value: element.value || '',
      name: element.getAttribute('name') || '',
      tag: element.tagName.toLowerCase(),
    });

    if (results.length >= MAX_FIELDS) break;
  }

  return results;
}

function highlightFields(fields) {
  document.querySelectorAll('.form-wingman-highlight').forEach((el) => {
    el.classList.remove('form-wingman-highlight');
    el.style.outline = '';
    el.style.boxShadow = '';
    el.style.borderRadius = '';
  });

  for (const field of fields) {
    const target = field.name
      ? document.querySelector(`[name="${CSS.escape(field.name)}"]`)
      : null;

    const byId = field.id && document.getElementById(field.id);
    const el = target || byId;
    if (!el) continue;

    el.classList.add('form-wingman-highlight');
    el.style.outline = '2px solid rgba(91, 227, 204, 0.95)';
    el.style.boxShadow = '0 0 0 4px rgba(91, 227, 204, 0.16)';
    el.style.borderRadius = '8px';
  }
}

function scanForms() {
  const fields = extractFields();
  highlightFields(fields);

  chrome.runtime.sendMessage({
    type: 'FORM_WINGMAN_FIELDS',
    fields,
  });
}

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message?.type === 'FORM_WINGMAN_SCAN') {
    scanForms();
    sendResponse({ ok: true });
    return true;
  }
  return false;
});

const observer = new MutationObserver(() => {
  scanForms();
});

observer.observe(document.body || document.documentElement, {
  childList: true,
  subtree: true,
  attributes: true,
  attributeFilter: ['value', 'placeholder', 'required', 'aria-required', 'type'],
});

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', scanForms, { once: true });
} else {
  scanForms();
}
