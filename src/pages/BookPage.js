'use server';
//import React, { useState, useEffect, useRef } from 'react';
import NavBar from '../components/NavBar';
import ProxyIframe from './ProxyIframe';

const BookPage = () => {
    return (
        <div style={{ textAlign: 'center', padding: '0', margin: '0', height: '100vh' }}>
            <NavBar/>
            <h1 style={{ display: 'none' }}>Book Page</h1>
            {/* <div dangerouslySetInnerHTML={{__html: modifiedContent}} /> */}
            <ProxyIframe 
                proxyUrl="https://yndproxy.azurewebsites.net/proxy"
                initialUrl="https://www.yournaturaldispensary.com.au/services-9"
            />
        </div>
    );
};

export default BookPage;