chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ formWingmanFields: [] });
});

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message?.type === 'FORM_WINGMAN_FIELDS') {
    chrome.storage.local.set({ formWingmanFields: message.fields || [] });
    sendResponse({ ok: true });
    return true;
  }

  if (message?.type === 'FORM_WINGMAN_SCAN') {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]?.id) {
        chrome.tabs.sendMessage(tabs[0].id, { type: 'FORM_WINGMAN_SCAN' }, () => {
          sendResponse({ ok: true });
        });
      }
    });
    return true;
  }

  return false;
});
