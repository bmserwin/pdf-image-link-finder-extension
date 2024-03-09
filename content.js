chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action == "findPDFsAndLinks") {
    var pdfs = [];
    var links = [];

    // Find PDFs
    var pdfElements = document.querySelectorAll('a[href$=".pdf"]');
    pdfElements.forEach(function(pdfElement) {
      pdfs.push(pdfElement.href);
    });

    // Find links
    var linkElements = document.querySelectorAll('a');
    linkElements.forEach(function(linkElement) {
      links.push(linkElement.href);
    });

    // Send the results back to the extension popup
    sendResponse({pdfs: pdfs, links: links});
  }
});
