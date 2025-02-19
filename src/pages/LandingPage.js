import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
    const navigate = useNavigate();

    const navigateToApp = () => {
        navigate('/app'); // Adjust the path to your current app page
    };

    const navigateToBook = () => {
        navigate('/book'); // Path to the new Book page
    };

    return (
        <div className="flex flex-col items-center justify-center relative w-full h-screen overflow-hidden" >
            <video
                className="object-cover w-full h-full"
                autoPlay
                loop
                muted
                playsInline
            >
                <source src="/videos/bg10_70speed_crop.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            {/*<div className="bg-ynd bg-opacity-80 backdrop-blur-md border-gray-500 rounded-t-full shadow-lg p-8 z-10 mt-20 py-80">*/}
            <div>

                <div className="flex space-x-16 p-20 text-center">
                    <div 
                        className="shadow-[0px_0px_45px_5px_rgba(249,249,236,1)] bg-gradient-to-b from-gray-50 to-orange-50 text-white rounded-lg shadow-md p-32 cursor-pointer hover:shadow-lg transition-shadow duration-200"
                        onClick={navigateToApp}
                    >
                        <h2 className=" text-black text-center text-4xl font-semibold">Check In</h2>
                        <p className="mt-10  text-black">Let us know you are here!</p>
                    </div>
                    <div 
                        className="shadow-[0px_0px_45px_5px_rgba(249,249,236,1)] bg-gradient-to-b from-gray-50 to-orange-50 text-white rounded-lg shadow-md p-32 cursor-pointer hover:shadow-lg transition-shadow duration-200"
                        onClick={navigateToBook}
                    >
                        <h2 className="text-black text-center text-4xl font-semibold">Book Appointment</h2>
                        <p className="mt-10  text-black">Find booking information and options.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandingPage; 