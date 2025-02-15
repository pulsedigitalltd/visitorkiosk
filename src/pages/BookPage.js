'use server';
//import React, { useState, useEffect, useRef } from 'react';
import NavBar from '../components/NavBar';
import ProxyIframe from './ProxyIframe';

const BookPage = () => {
    
/*     const [modifiedContent, setModifiedContent] = useState();
    const startFrame = IFrameWithModification("http://localhost:3002/proxy?url=https://www.yournaturaldispensary.com.au/services-9&selectorToRemove=.kn76TK");
    if(startFrame.type !== 'div'){
        console.log('startFrame', startFrame);
        //setModifiedContent(startFrame);
    }
    
    useEffect(() => {
        
        document.addEventListener('click', e => {
            e.preventDefault();
            const target = e.target;
            const parent = target.parentElement.parentElement;
            const newIframeURL = 'http://localhost:3002/proxy?url=' + parent.href + '&selectorToRemove=.kn76TK';
            console.log('clicked', newIframeURL);
            //setModifiedContent(IFrameWithModification(newIframeURL));
          });
    }, []); */

    return (
        <div style={{ textAlign: 'center', padding: '0', margin: '0', height: '100vh' }}>
            <NavBar/>
            <h1 style={{ display: 'none' }}>Book Page</h1>
            {/* <div dangerouslySetInnerHTML={{__html: modifiedContent}} /> */}
            <ProxyIframe 
                proxyUrl="http://localhost:3002/proxy"
                initialUrl="https://www.yournaturaldispensary.com.au/services-9"
            />
        </div>
    );
};

export default BookPage;