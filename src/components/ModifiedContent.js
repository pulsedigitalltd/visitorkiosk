import React, { useState, useEffect, useRef } from 'react';

const ModifiedIframe = ({ src, selectorToRemove }) => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const iframeRef = useRef(null);

  useEffect(() => {
    const fetchModifiedContent = async () => {
      try {
        const response = await fetch(src, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch content');
        }
        
        const modifiedContent = await response.text();
        setContent(modifiedContent);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        console.error('Error fetching content:', err);
      }
    };

    fetchModifiedContent();
  }, [src, selectorToRemove]);

  useEffect(() => {
    if (!loading && content && iframeRef.current) {
      const doc = iframeRef.current.contentDocument;
      doc.open();
      doc.write(content);
      doc.close();
    }
       

  }, [content, loading]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }


  return (
    JSON.stringify(content)
/*     <>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </> */
    /* {<iframe
      ref={content}
      className="w-full h-screen border-0"
      title="Modified content"
      sandbox="allow-same-origin allow-scripts allow-forms"
    /> }*/
  );
};

export default ModifiedIframe;

// Usage:
// <ModifiedIframe 
//   src="https://example.com" 
//   selectorToRemove=".element-to-hide" 
// />