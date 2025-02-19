'use server';
import NavBar from '../components/NavBar';
import ProxyIframe from './ProxyIframe';

const BookPage = () => {
    return (
        <>
        <div style={{ textAlign: 'center', padding: '0', margin: '0', height: '100vh' }}>
            <NavBar/>
            <h1 style={{ display: 'none' }}>Book Page</h1>
            <ProxyIframe 
                proxyUrl="https://yndproxy.azurewebsites.net/proxy"
                //proxyUrl="http://localhost:3002/proxy"
                initialUrl="https://www.yournaturaldispensary.com.au/services-9"
                />
        </div>
        </>
    );
};

export default BookPage;