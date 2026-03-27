const STORAGE_KEY = "pranksterEnabled";

const toggle = document.getElementById("toggle");
const statusText = document.getElementById("status");

function updateStatus(enabled) {
  statusText.textContent = enabled
    ? "Prank mode is on for open Facebook tabs."
    : "Prank mode is off. Refresh a Facebook tab to fully clear anything already injected.";
}

chrome.storage.local.get({ [STORAGE_KEY]: false }, (result) => {
  const enabled = Boolean(result[STORAGE_KEY]);
  toggle.checked = enabled;
  updateStatus(enabled);
});

toggle.addEventListener("change", () => {
  const enabled = toggle.checked;
  chrome.storage.local.set({ [STORAGE_KEY]: enabled }, () => {
    updateStatus(enabled);
  });
});
