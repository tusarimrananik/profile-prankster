const STORAGE_KEY = "pranksterEnabled";
const BUTTON_MODE_KEY = "pranksterButtonMode";

const toggle = document.getElementById("toggle");
const buttonMode = document.getElementById("buttonMode");
const statusText = document.getElementById("status");

function updateStatus(enabled, mode) {
  const modeLabel =
    mode === "professional"
      ? "Professional"
      : mode === "normal"
        ? "Normal"
        : "Auto";

  statusText.textContent = enabled
    ? `Prank mode is on for open Facebook tabs. Button mode: ${modeLabel}.`
    : "Prank mode is off. Refresh a Facebook tab to fully clear anything already injected.";
}

chrome.storage.local.get({ [STORAGE_KEY]: false, [BUTTON_MODE_KEY]: "auto" }, (result) => {
  const enabled = Boolean(result[STORAGE_KEY]);
  const mode = result[BUTTON_MODE_KEY] || "auto";
  toggle.checked = enabled;
  buttonMode.value = mode;
  updateStatus(enabled, mode);
});

toggle.addEventListener("change", () => {
  const enabled = toggle.checked;
  chrome.storage.local.set({ [STORAGE_KEY]: enabled }, () => {
    updateStatus(enabled, buttonMode.value);
  });
});

buttonMode.addEventListener("change", () => {
  const mode = buttonMode.value;
  chrome.storage.local.set({ [BUTTON_MODE_KEY]: mode }, () => {
    updateStatus(toggle.checked, mode);
  });
});
