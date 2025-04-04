document.addEventListener("DOMContentLoaded", () => {
  const clickjackingToggle = document.getElementById("clickjackingToggle");
  const doubleClickToggle = document.getElementById("doubleClickToggle");
  const mouseDelay = document.getElementById("mouseDelay");
  const statusText = document.getElementById("statusText");
  const colorInput = document.getElementById("colorInput");
  const opacityInput = document.getElementById("opacityInput");

  // Load saved settings
  chrome.storage.sync.get(["clickJackingProtection", "doubleClickProtection", "mouseDelay", "colorInput", "opacityInput"], (data) => {
    clickjackingToggle.checked = data.clickJackingProtection !== false;
    doubleClickToggle.checked = data.doubleClickProtection !== false;
    mouseDelay.value = data.mouseDelay || 777; // Default to 777 seconds
    colorInput.value = data.colorInput || "#ffffff";
    opacityInput.value = data.opacityInput || 50;
    updateStatusText();
  });

  clickjackingToggle.addEventListener("change", () => {
    chrome.storage.sync.set({ clickJackingProtection: clickjackingToggle.checked });
    sendUpdate();
  });

  doubleClickToggle.addEventListener("change", () => {
    chrome.storage.sync.set({ doubleClickProtection: doubleClickToggle.checked });
    sendUpdate();
  });

  mouseDelay.addEventListener("change", () => {
    let time = Math.max(1, Math.min(9999, parseInt(mouseDelay.value, 10) || 777));
    mouseDelay.value = time;
    chrome.storage.sync.set({ mouseDelay: time });
    sendUpdate();
  });

  colorInput.addEventListener("change", () => {
    const color = colorInput.value;
    chrome.storage.sync.set({ colorInput: color });
    sendUpdate();
  });

  opacityInput.addEventListener("change", () => {
    let opacity = opacityInput.value;
    opacityInput.value = opacity;
    chrome.storage.sync.set({ opacityInput: opacity });
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
        mouseDelay: parseInt(mouseDelay.value, 10) || 777, 
        colorInput: colorInput.value, 
        opacityInput: opacityInput.value || 50
      });
    });
  }
});