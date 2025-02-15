import React, { useEffect, useRef } from 'react';

const IFrameWithModification = ({ src }) => {
  const iframeRef = useRef(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    
    const handleLoad = () => {
      try {
        // Access the iframe's content
        const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
        
        // Find and remove the element you want to remove
        // Replace 'elementToRemove' with the actual selector
        const elementToRemove = iframeDocument.querySelector('.elementToRemove');
        if (elementToRemove) {
          elementToRemove.remove();
        }
      } catch (error) {
        // Handle potential cross-origin errors
        console.error('Could not modify iframe content:', error);
      }
    };

    // Add load event listener
    iframe.addEventListener('load', handleLoad);

    // Cleanup
    return () => {
      iframe.removeEventListener('load', handleLoad);
    };
  }, []);

  return (
    <iframe
      ref={iframeRef}
      src={src}
      className="w-full h-screen border-0"
      title="Modified iframe content"
      sandbox="allow-same-origin allow-scripts allow-forms"
    />
  );
};

export default IFrameWithModification;