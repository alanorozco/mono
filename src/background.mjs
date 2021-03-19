chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason == "install") {
    window.open(chrome.runtime.getURL("ui/on-install.html"));
  }
});
