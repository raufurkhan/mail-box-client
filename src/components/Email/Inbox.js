
import React, { Fragment, useEffect, useState } from "react";
import EmailItem from "./EmailItem";

const Inbox = () => {
    const endpoint = localStorage.getItem('endpoint');
    const url = 'https://mail-box-50bc2-default-rtdb.firebaseio.com';

    // Define emailArray as a state variable
    const [emailArray, setEmailArray] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${url}/sent/${endpoint}.json`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const responseData = await response.json(); // Pars e response JSON
                    console.log('Data retrieved successfully:', responseData);
                    const newArray = Object.values(responseData);

                    // Update the emailArray state with the retrieved data
                    setEmailArray(newArray);
                } else {
                    console.error('Failed to retrieve data.');
                }
            } catch (error) {
                console.error('Error retrieving data:', error);
            }
        };

        // Call the fetchData function when needed
        fetchData();
    }, [endpoint]); // Make sure to include endpoint in the dependency array

    return (
        <Fragment>

{emailArray.map((email, index) => (
                <EmailItem key={index} email={email} />
            ))}
             <h1>I am inbox</h1>
        </Fragment>
     );
}


export default Inbox;