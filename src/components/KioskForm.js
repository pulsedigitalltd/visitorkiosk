// src/components/KioskForm.js
import React, { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";


const KioskForm = () => {
    const [name, setName] = useState('');
    const [company, setCompany] = useState('');
    const [mobile, setMobile] = useState('');
    const [people, setPeople] = useState([]); // State for names
    const [selectedPersonName, setSelectedPersonName] = useState(''); // State for selected person
    const [selectedPersonEmail, setSelectedPersonEmail] = useState(''); // State for selected person
    const [selectedPersonMobile, setSelectedPersonMobile] = useState(''); // State for selected person
    const [successMessage, setSuccessMessage] = useState(''); // State for success message
    const [sendingMessage, setSendingMessage] = useState(false); // State for success message
    
    useEffect(() => {
        // Fetch names from the JSON file
        fetch('/names.json')
            .then((response) => response.json())
            .then((data) => setPeople(data))
            .catch((error) => console.error('Error fetching names:', error));
    }, []);

    function setEmployee(e){
        let obj = people.find(o => o.email === e);
        setSelectedPersonName(obj.name);
        setSelectedPersonEmail(obj.email);
        setSelectedPersonMobile(obj.mobile);
    } 

    const handleSubmit = (e) => {
        setSendingMessage(true);
        e.preventDefault();
        
        const templateParams = {
            visitor_name: name,
            //visitor_company: company,
            //visitor_mobile: mobile,
            to_email: selectedPersonEmail ? selectedPersonEmail : process.env.REACT_APP_EMAILJS_TOEMAIL,
            employee: selectedPersonName
        };

        const options = {
            publicKey: process.env.REACT_APP_EMAILJS_PUBLICKEY
        };

        console.log('sending email to: ', selectedPersonEmail, 'for: ' , selectedPersonName);
        emailjs.send(process.env.REACT_APP_EMAILJS_SERVICEID,process.env.REACT_APP_EMAILJS_TEMPLATEIDID, templateParams, options)
            .then((response) => {
                console.log('Email sent successfully!', response.status, response.text);
                setSuccessMessage(`Thanks, ${selectedPersonName} has been notified. They will be with your shortly.`); // Set success message
                // Clear the form fields
                setName('');
                setCompany('');
                setMobile('');
                setSelectedPersonName('');
                setSelectedPersonEmail('');
                
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

    const handlePrintLabel = () => {
        const labelContent = `
            Visitor Name: ${name}
            Visiting: ${selectedPersonName}
        `;
        
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <html>
                <head>
                    <title>Print Label</title>
                    <style>
                        body { font-family: Arial, sans-serif; }
                        pre { font-size: 20px; }
                    </style>
                </head>
                <body>
                    <pre>${labelContent}</pre>
                </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.print();
    };

    return (
        <>
        <form onSubmit={handleSubmit} className="bg-ynd bg-opacity-70 backdrop-blur-md p-8 rounded-lg">
            {successMessage && (
                <div className="mt-4 p-4 bg-green-100 text-green-800 rounded-lg transition mb-5">
                    {successMessage}
{/*                     <button onClick={handlePrintLabel} className="ml-4 text-blue-500 underline">
                        Print Label
                    </button> */}
                </div>
            )}
            
            {!successMessage && (
            <>
            <h2 className="text-2xl font-bold mb-4">Let us know you are here</h2>
            
            <div className="mb-4">
                <select
                    id="person"
                    value={selectedPersonName}
                    onChange={(e) => setEmployee(e.target.value)}
                    className="w-full p-5 border border-gray-300 rounded-lg drop-shadow shadow-md"
                    required
                >
                    <option value="" disabled>Select the person you are visiting</option>
                    {people.map((person, index) => (
                        <option key={index} value={person.email}>{person.name} - {person.businessType}</option>
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
{/*             <div className="mb-4">
                <input
                    type="tel"
                    placeholder="Your mobile number"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    required
                    className="w-full p-5 border border-gray-300 rounded-lg drop-shadow shadow-md"
                />
            </div> */}
            {!sendingMessage && (
            <>
                <button type="submit" className="w-full bg-blue-500 text-2xl text-white p-6 rounded hover:bg-blue-600 drop-shadow shadow-md flex justify-center"
                >
                Sign In
                </button>
            </>
            )}
            {sendingMessage && (
            <>
                <button type="button" className="w-full cursor-not-allowed text-2xl bg-blue-500 text-white p-6 rounded hover:bg-blue-600 drop-shadow shadow-md flex justify-center" disabled="">
                    <>
                    {  
                    <svg class="animate-spin -ml-1 mr-3 h-10 w-10 text-white " xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg> 
                }
                    Notififying...
                    </>
                </button>
            </>
            )}
            <div className="mt-6">
                    <h2 className="text-xl font-bold mb-2">Guidance</h2>
                    <p className="mb-2">Please fill out the form to register your visit. Select the person you are visiting from the dropdown.</p>
                    
            </div>
            {/* <div className="mt-10">
                <SignedOut>
                    <SignInButton mode='modal'>
                        <a href="#" className="underline text-black-300 hover:text-black-900 visited:text-black-300">Admin Login</a>
                    </SignInButton>
                </SignedOut>
                <SignedIn>
                    <UserButton />
                </SignedIn>
            </div> */}
            </>
            )}
        </form>
        </>
    );
};

export default KioskForm;