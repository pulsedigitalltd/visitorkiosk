import express from 'express';
import JSDOM from 'jsdom';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
const port = 3002;

app.use(cors());
app.use(express.json());

// Insert helper function into the sourec website conteent to override a and button clicks in the iframe, 
// this forces the proxy to be used to remove the header from each page loaded.
function rewriteContent(html, baseUrl, selectorToRemove) {
  const dom = new JSDOM.JSDOM(html);
  const document = dom.window.document;
  const clickHandler = `<script>(function() {
    document.addEventListener('click', function(e) {
      let target = e.target;
      while (target && !['A', 'BUTTON'].includes(target.tagName)) {
        target = target.parentElement;
      }
      //let target = e.target.parentElement.parentElement;
    if (target) {
      e.preventDefault();
      
      // Try multiple ways to send the message
      try {
        // Method 1: Direct postMessage to parent
        window.parent.postMessage({
          type: 'LINK_CLICK',
          href: target.href
        }, '*');

        
      } catch (err) {
        alert(err);
      }
    }
  });
  
})();
</script>`
        
const bodyEl = document.body;
bodyEl.insertAdjacentHTML('beforeend',clickHandler);
  
// Remove specified element 
const elementToRemove = document.querySelector(selectorToRemove);
if (elementToRemove) {
  elementToRemove.remove();
}

// set the fliid repeater grid to shop (WIX oddity)
const elementToRemove2 = document.querySelector('.GPmm8Z');
if (elementToRemove2) {
  elementToRemove2.setAttribute('style', 'visibility:display');
}

// Add base tag to handle relative paths
const baseElement = document.createElement('base');
baseElement.href = baseUrl;
document.head.insertBefore(baseElement, document.head.firstChild);

return dom.serialize();
}

// Main proxy endpoint for HTML content
app.get('/proxy', async (req, res) => {
  try {
    // read url and dom element to remove from querystring
    const { url, selectorToRemove } = req.query;

    // call source website from url
    let decodedUrl = decodeURIComponent(url);
    console.log(decodedUrl);
    const response = await fetch(decodedUrl);
    const html = await response.text();
    // call the rewriteContent function with the web site content to remove the dom element requested in query string   
    const modifiedHtml = rewriteContent(html, url, selectorToRemove);
    
    res.setHeader('Content-Type', 'text/html');
    //res.setHeader('Access-Control-Allow-Origin', '*')
    // return the new modified content of the source website
    res.send(modifiedHtml);
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ message: 'Error processing request' });
  }
});


app.listen(port, () => {
  console.log(`Proxy server running at http://localhost:${port}`);
});