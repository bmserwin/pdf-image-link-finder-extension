// Listen for messages from the popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "saveName") {
    // Save the name to chrome.storage.local
    chrome.storage.local.set({ "name": message.name }, () => {
      if (chrome.runtime.lastError) {
        console.error("Error saving name:", chrome.runtime.lastError);
      } else {
        console.log("Name saved successfully:", message.name);
      }
    });
  }
});
