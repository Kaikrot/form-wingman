const fieldList = document.getElementById('fieldList');
const scanButton = document.getElementById('scanButton');
const audioButton = document.getElementById('audioButton');

function renderFields(fields) {
  if (!fields || fields.length === 0) {
    fieldList.innerHTML = '<div class="empty">No form fields were detected on this page yet.</div>';
    return;
  }

  fieldList.innerHTML = fields.map((field) => `
    <div class="field-item" tabindex="0">
      <strong>${field.label}</strong>
      <div class="field-meta">
        <span>${field.type || 'field'}</span>
        <span class="tag ${field.required ? 'required' : ''}">${field.required ? 'required' : 'optional'}</span>
      </div>
    </div>
  `).join('');
}

async function scanPage() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab?.id) return;

  chrome.tabs.sendMessage(tab.id, { type: 'FORM_WINGMAN_SCAN' }, () => {
    chrome.storage.local.get(['formWingmanFields'], (result) => {
      renderFields(result.formWingmanFields || []);
    });
  });
}

function speakFirstField() {
  const firstField = fieldList.querySelector('.field-item strong');
  if (!firstField) return;

  if ('speechSynthesis' in window) {
    const label = firstField.textContent.trim();
    const message = `This field needs attention: ${label}. Review it and decide what to enter before you continue.`;
    const utterance = new SpeechSynthesisUtterance(message);
    utterance.rate = 0.96;
    speechSynthesis.cancel();
    speechSynthesis.speak(utterance);
    return;
  }

  window.alert('Audio guidance is not supported in this browser.');
}

scanButton.addEventListener('click', scanPage);
audioButton.addEventListener('click', speakFirstField);

chrome.storage.local.get(['formWingmanFields'], (result) => renderFields(result.formWingmanFields || []));
chrome.runtime.onMessage.addListener((message) => {
  if (message?.type === 'FORM_WINGMAN_FIELDS') {
    renderFields(message.fields || []);
  }
});
