import React from 'react';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
    const navigate = useNavigate();

    return (
        <div className="relative flex items-center p-4 bg-white" style={{ backgroundColor: 'rgb(240, 235, 230)' }}>
            <button 
                onClick={() => navigate('/')} 
                className="bg-white border border-gray-300 rounded px-6 py-4 text-2xl mr-4 flex items-center"
            >
                <span className="mr-2">&larr;</span>
                Back
            </button>
            <div className="absolute left-1/2 transform -translate-x-1/2">
                <img 
                    src="https://static.wixstatic.com/media/e7edf3_d69a92cd5cd84b58801e1e2829cfb52c~mv2.png/v1/crop/x_0,y_984,w_3375,h_1415/fill/w_199,h_83,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Your%20Natural%20Dispensary%20Graphics-7.png" 
                    alt="Your Natural Dispensary" 
                    className="h-15"
                    fetchpriority="high" 
                />
            </div>
        </div>
    );
};

export default NavBar;
