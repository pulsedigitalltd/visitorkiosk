// src/components/KioskForm.js
import React, { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';

const KioskForm = () => {
    const [name, setName] = useState('');
    const [company, setCompany] = useState('');
    const [mobile, setMobile] = useState('');
    const [people, setPeople] = useState([]); // State for names
    const [selectedPerson, setSelectedPerson] = useState(''); // State for selected person
    const [successMessage, setSuccessMessage] = useState(''); // State for success message
    const [sendingMessage, setSendingMessage] = useState(false); // State for success message
    
    useEffect(() => {
        // Fetch names from the JSON file
        fetch('/names.json')
            .then((response) => response.json())
            .then((data) => setPeople(data))
            .catch((error) => console.error('Error fetching names:', error));
    }, []);


    const handleSubmit = (e) => {
        setSendingMessage(true);
        e.preventDefault();
        
        const templateParams = {
            visitor_name: name,
            visitor_company: company,
            visitor_mobile: mobile,
            to_email: process.env.REACT_APP_EMAILJS_TOEMAIL,
            employee: selectedPerson
        };

        const options = {
            publicKey: process.env.REACT_APP_EMAILJS_PUBLICKEY
        };

        emailjs.send(process.env.REACT_APP_EMAILJS_SERVICEID,process.env.REACT_APP_EMAILJS_TEMPLATEIDID, templateParams, options)
            .then((response) => {
                console.log('Email sent successfully!', response.status, response.text);
                setSuccessMessage(`Thanks, ${selectedPerson} has been notified.`); // Set success message
                // Clear the form fields
                setName('');
                setCompany('');
                setMobile('');
                setSelectedPerson('');
                
                setTimeout(() => {
                    setSendingMessage(false);
                    setSuccessMessage(''); // Reset success message
                }, 10000); // 10 seconds                
            })
            .catch((err) => {
                console.error('Failed to send email. Error: ', err);
                setSuccessMessage('There was an error sending your registration. Please try again.'); // Set error message
            }); 
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white bg-opacity-70 backdrop-blur-lg p-8 rounded-lg w-3/4 md:w-1/2 lg:w-1/3">
            {successMessage && (
                <div className="mt-4 p-4 bg-green-100 text-green-800 rounded-lg transition mb-5">
                    {successMessage}
                </div>
            )}
            
            {!successMessage && (
            <>
            <h2 className="text-2xl font-bold mb-4">Visitor Registration</h2>
            
            <div className="mb-4">
                <select
                    id="person"
                    value={selectedPerson}
                    onChange={(e) => setSelectedPerson(e.target.value)}
                    className="w-full p-5 border border-gray-300 rounded-lg drop-shadow shadow-md"
                    required
                >
                    <option value="" disabled>Select the person you are visiting</option>
                    {people.map((person, index) => (
                        <option key={index} value={person}>{person}</option>
                    ))}
                </select>
            </div>
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full p-5 border border-gray-300 rounded-lg drop-shadow shadow-md"
                />
            </div>
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Company you are from"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    required
                    className="w-full p-5 border border-gray-300 rounded-lg drop-shadow shadow-md"
                />
            </div>
            <div className="mb-4">
                <input
                    type="tel"
                    placeholder="Your mobile number"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    required
                    className="w-full p-5 border border-gray-300 rounded-lg drop-shadow shadow-md"
                />
            </div>
            {!sendingMessage && (
            <>
            <button
                type="submit"
                className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 drop-shadow shadow-md transition"
            >
                Sign In
            </button>
            </>
            )}
            {sendingMessage && (
            <>
            <button type="button" className="w-full inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-blue-500 transition ease-in-out duration-150 cursor-not-allowed" disabled="">
                <div className='w-full '>
{/*                 <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white items-center content-center" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg> */}
                Notififying...
                </div>
                
            </button>
            </>
            )}
            <div className="mt-6">
                    <h2 className="text-xl font-bold mb-2">Guidance</h2>
                    <p className="mb-2">Please fill out the form to register your visit.</p>
                    <p className="mb-2">Select the person you are visiting from the dropdown.</p>
                    <p className="mb-2">Enter your name, company, and mobile number.</p>
                    <p className="mb-2">Click "Sign In" to submit your information.</p>
            </div>
            </>
            )}
        </form>

    );
};

export default KioskForm;