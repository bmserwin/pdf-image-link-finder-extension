document.addEventListener('DOMContentLoaded', function() {
  var findBtn = document.getElementById('findBtn');
  findBtn.addEventListener('click', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      try {
        if (tabs && tabs.length > 0) {
          var tabId = tabs[0].id;
          chrome.tabs.sendMessage(tabId, {action: 'findPDFsAndLinks'}, function(response) {
            if (chrome.runtime.lastError) {
              console.error('Error: ' + chrome.runtime.lastError.message);
            } else {
              console.log('Message sent successfully');
              console.log('Response:', response);
              // Update popup HTML with PDFs and links
              displayContent(response.pdfs, response.links);
            }
          });
        } else {
          console.error('No active tabs found');
        }
      } catch (error) {
        console.error('Error: ' + error.message);
      }
    });
  });

  function displayContent(pdfs, links) {
    var pdfList = document.getElementById('pdfList');
    var linkList = document.getElementById('linkList');
    pdfList.innerHTML = ''; // Clear previous PDFs
    linkList.innerHTML = ''; // Clear previous links

    if (pdfs && pdfs.length > 0) {
      pdfs.forEach(function(pdf) {
        var pdfItem = document.createElement('li');
        var pdfLink = document.createElement('a');
        pdfLink.href = pdf;
        pdfLink.textContent = pdf;
        pdfItem.appendChild(pdfLink);
        pdfList.appendChild(pdfItem);
      });
    } else {
      var noPDFsItem = document.createElement('li');
      noPDFsItem.textContent = 'No PDFs found';
      pdfList.appendChild(noPDFsItem);
    }

    if (links && links.length > 0) {
      links.forEach(function(link) {
        var linkItem = document.createElement('li');
        var anchor = document.createElement('a');
        anchor.href = link;
        anchor.textContent = link;
        linkItem.appendChild(anchor);
        linkList.appendChild(linkItem);
      });
    } else {
      var noLinksItem = document.createElement('li');
      noLinksItem.textContent = 'No links found';
      linkList.appendChild(noLinksItem);
    }
  }
});
