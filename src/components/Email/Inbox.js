
import React, { useEffect, useState } from 'react';
import EmailItem from './EmailItem'; // Assuming you have an EmailItem component
import EmailView from './EmailView'; // Assuming you have an EmailView component
import { useDispatch, useSelector } from 'react-redux';
import { emailActions} from '../store/emailSlice';
import { Fragment } from 'react';

const Inbox = () => {
    const endpoint = localStorage.getItem('endpoint');
    const url = 'https://mail-box-50bc2-default-rtdb.firebaseio.com';
  
    const dispatch = useDispatch();
    const emails = useSelector((state)=>state.email.emails);
    console.log(emails);

    // Define emailArray as a state variable
  
    const [selectedEmail, setSelectedEmail] = useState(null);
    const [showEmailView, setShowEmailView] = useState(false);
    const [unreadCount, setUnreadCount] = useState(0); // State to store the unread email count
  
    const fetchDataAndUpdateStore = async () => {
      try {
        const response = await fetch(`${url}/sent/${endpoint}.json`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (response.ok) {
            const responseData = await response.json();
    
            const newDataWithKeys = {};
            Object.keys(responseData).forEach((key) => {
              newDataWithKeys[key] = responseData[key];
              newDataWithKeys[key].id = key;
            })
        const newArray = Object.values(newDataWithKeys);

        dispatch(emailActions.setEmails(newArray));

        // Calculate the unread email count
        const newUnreadCount = newArray.reduce((count, email) => {
          return !email.read ? count + 1 : count;
        }, 0);

        setUnreadCount(newUnreadCount);
      } else {
        console.error('Failed to retrieve data.');
    }
} catch (error) {
    console.error('Error retrieving data:', error);
  }
};

useEffect(() => {
  fetchDataAndUpdateStore();

  const intervalId = setInterval(() => {
    fetchDataAndUpdateStore();
  }, 2000);
  
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
        <div>Unread: {unreadCount}</div>
      </div>
      {showEmailView && <EmailView email={selectedEmail} onClose={handleCloseEmailView} />}

      {!showEmailView && (
        <Fragment>
          {emails.map((email, index) => (
            <EmailItem key={index} email={email} onClick={() => handleEmailClick(email)} />
          ))}
        </Fragment>
      )}
    </div>
   
    );
  };


export default Inbox;