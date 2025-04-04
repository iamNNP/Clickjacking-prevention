document.addEventListener("DOMContentLoaded", () => {
  const clickjackingToggle = document.getElementById("clickjackingToggle");
  const doubleClickToggle = document.getElementById("doubleClickToggle");
  const timeInput = document.getElementById("timeInput");
  const statusText = document.getElementById("statusText");

  // Load saved settings
  chrome.storage.sync.get(["clickJackingProtection", "doubleClickProtection", "mouseMoveTime"], (data) => {
    clickjackingToggle.checked = data.clickJackingProtection !== false;
    doubleClickToggle.checked = data.doubleClickProtection !== false;
    timeInput.value = data.mouseMoveTime || 777; // Default to 777 seconds
    updateStatusText();
  });

  // Save settings when toggles change
  clickjackingToggle.addEventListener("change", () => {
    chrome.storage.sync.set({ clickJackingProtection: clickjackingToggle.checked });
    sendUpdate();
  });

  doubleClickToggle.addEventListener("change", () => {
    chrome.storage.sync.set({ doubleClickProtection: doubleClickToggle.checked });
    sendUpdate();
  });

  timeInput.addEventListener("change", () => {
    let time = Math.max(1, Math.min(9999, parseInt(timeInput.value, 10) || 777));
    timeInput.value = time;
    chrome.storage.sync.set({ mouseMoveTime: time });
    sendUpdate();
  });

  function updateStatusText() {
    statusText.textContent = "Settings saved!";
    setTimeout(() => (statusText.textContent = ""), 1500);
  }

  function sendUpdate() {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, {
        clickJackingProtection: clickjackingToggle.checked,
        doubleClickProtection: doubleClickToggle.checked,
        mouseMoveTime: parseInt(timeInput.value, 10) || 777
      });
    });
  }
});
