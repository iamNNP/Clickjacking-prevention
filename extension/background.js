// Modify headers to include X-Frame-Options and CSP
chrome.webRequest.onHeadersReceived.addListener(
    (details) => {
      const responseHeaders = details.responseHeaders;
      
      // Add X-Frame-Options if not present
      if (!responseHeaders.some(h => h.name.toLowerCase() === 'x-frame-options')) {
        responseHeaders.push({
          name: 'X-Frame-Options',
          value: 'DENY'
        });
      }
      
      // Add Content-Security-Policy frame-ancestors if not present
      const cspHeader = responseHeaders.find(h => h.name.toLowerCase() === 'content-security-policy');
      if (!cspHeader || !cspHeader.value.includes('frame-ancestors')) {
        responseHeaders.push({
          name: 'Content-Security-Policy',
          value: "frame-ancestors 'none'"
        });
      }
      
      return { responseHeaders };
    },
    { urls: ["<all_urls>"] },
    ["blocking", "responseHeaders"]
  );