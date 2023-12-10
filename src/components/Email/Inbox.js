
import React, { useEffect, useState } from 'react';
import EmailItem from './EmailItem'; // Assuming you have an EmailItem component
import EmailView from './EmailView'; // Assuming you have an EmailView component
import { useSelector } from 'react-redux';
import useMailAPI from '../utils/useMail';
import { Fragment } from 'react';

const Inbox = () => {
   
    const emails = useSelector((state)=>state.email.emails);
    const emailItems = useMailAPI();
    console.log(emails);

    // Define emailArray as a state variable
  
    const [selectedEmail, setSelectedEmail] = useState(null);
    const [showEmailView, setShowEmailView] = useState(false);
    

useEffect(() => {
  

  const intervalId = setInterval(() => {
    emailItems.fetchDataAndUpdateStore();
}, 3000);
  
      // Call the fetchData function when needed
      return () => {
        clearInterval(intervalId);
      };
    }, []); // Make sure to include endpoint in the dependency array
  
    // Function to handle clicking on an email item
    const handleEmailClick = (email) => {
      setSelectedEmail(email);
      setShowEmailView(true); // Show the EmailView modal
   
    };
  
    // Function to close the EmailView modal
    const handleCloseEmailView = () => {
      setShowEmailView(false);
      setSelectedEmail(null);
      console.log('emailClose clikc');
    };
    console.log('i am inbox');
    return (
        <div className='mx-1 my-1 p-1' style={{ overflowX: 'auto', whiteSpace: 'nowrap' }}>
        <div className="d-flex justify-content-between">
        <h3>Inbox</h3>
       
      </div>
      {showEmailView && <EmailView email={selectedEmail} onClose={handleCloseEmailView} />}

      {!showEmailView && (
        <Fragment>
         {emailItems.mailData.map((email, index) => (
            <EmailItem key={index} email={email} onClick={() => handleEmailClick(email)} />
          ))}
        </Fragment>
      )}
    </div>
   
    );
  };


export default Inbox;