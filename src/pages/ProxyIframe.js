import React, { useEffect, useRef, useState } from 'react';

const ProxyIframe = ({ proxyUrl, initialUrl }) => {
  const iframeRef = useRef(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const refreshIframe = async (url) => {
    try {
      console.log('Refreshing iframe with URL:', url);
      setLoading(true);
      const proxiedUrl = `${proxyUrl}?url=${url}&selectorToRemove=.kn76TK`;
      console.log('Proxied URL:', proxiedUrl);
      if (iframeRef.current) {
        iframeRef.current.src = proxiedUrl;
      }
    } catch (err) {
      setError('Failed to refresh iframe content');
      console.error('Iframe refresh error:', err);
    }
  };

  useEffect(() => {
    console.log('Setting up event listeners');

    const handleIframeLoad = () => {
      setLoading(false);
      setError(null);
    };

    // Handle messages from the iframe
    const handleMessage = (event) => {
      if (event.data && event.data.type === 'LINK_CLICK') {
        console.log('Link click detected:', event.data.href);
        refreshIframe(event.data.href);
      }
    };
    if (iframeRef.current) {
      iframeRef.current.addEventListener('load', handleIframeLoad);
      window.addEventListener('message', handleMessage);
    }

    // Initial load
    refreshIframe(initialUrl);

    return () => {
      console.log('Cleaning up event listeners');
      if (iframeRef.current) {
        iframeRef.current.removeEventListener('load', handleIframeLoad);
      }
      window.removeEventListener('message', handleMessage);
    };
  }, [proxyUrl, initialUrl]);

  return (
    <div className="w-full h-full relative">
      {error && (
        <div className="p-4 mb-4 text-red-700 bg-red-100 rounded">
          <p>{error}</p>
        </div>
      )}
      
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-75">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      )}
      
      <iframe
        ref={iframeRef}
        className="w-full h-full border-0"
        title="Proxied Content"
        sandbox="allow-scripts allow-same-origin"
      />
    </div>
  );
};

export default ProxyIframe;
