import { JSDOM } from 'jsdom';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { url, selectorToRemove } = req.body;

    // Fetch the original content
    const response = await fetch(url);
    const html = await response.text();

    // Parse the HTML
    const dom = new JSDOM(html);
    const document = dom.window.document;

    // Find and remove the specified element
    const elementToRemove = document.querySelector(selectorToRemove);
    if (elementToRemove) {
      elementToRemove.remove();
    }

    // Get the modified HTML
    const modifiedHtml = dom.serialize();

    // Send the modified content
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(modifiedHtml);
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ message: 'Error processing request' });
  }
}
