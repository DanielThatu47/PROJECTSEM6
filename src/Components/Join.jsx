import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import axios from "axios";
import { useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory
import { useAuth0 } from '@auth0/auth0-react'; // Import useAuth0
import Homepage from './HomePage';


const Join = () => {
    const [classCode, setClassCode] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Use useNavigate hook for navigation
    const { user } = useAuth0(); // Get user information from Auth0


    const handleJoinClassroom = async () => {
        try {
            const response = await axios.post('https://aimlbackend.onrender.com/classrooms/join',
             { 
                code: classCode,
                userEmail: user.email // Pass user's email to the backend
             });
             console.log(response)
            if (response.status === 200) {
                console.log("Successfully joined the classroom");
                // Redirect the user to Userclass component after joining a classroom
                navigate('/userclass'); // Use navigate instead of history.push
            } else {
                setError('Failed to join classroom');
            }
        } catch (error) {
            console.error('Error joining classroom:', error);
            setError('Failed to join classroom');
        }
    };

    return (
        <>
        <Homepage showPlusIcon={false} />
        <div className="container">
            <h2 className='text-xl font-bold pb-4'>Join Classroom Via Code</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="form-group">
                <label htmlFor="classCode" style={{marginBottom:23}}>Enter the Code to Join</label>
                <input type="text" className="form-control" id="classCode" value={classCode} onChange={(e) => setClassCode(e.target.value)} />
            </div>
            <Button onClick={handleJoinClassroom}>Join Classroom</Button>
        </div>
        </>
    );
}

export default Join;



const styles = `
        .container {
            margin: 20px;
            padding: 20px;
            border: 1px solid #ccc;
            border-radius: 5px;
            background-color: #f9f9f9;
            width: 97%;
        }
        
        .form-group {
            margin-bottom: 15px;
        }
        
        label {
            font-weight: bold;
        }
        
        .form-control {
            width: 100%;
            padding: 8px;
            border: 1px solid #ccc;
            border-radius: 4px;
            box-sizing: border-box;
        }
        
        
        .alert {
            margin-bottom: 15px;
            padding: 15px;
            border: 1px solid transparent;
            border-radius: 4px;
        }
        
        .alert-danger {
            color: #721c24;
            background-color: #f8d7da;
            border-color: #f5c6cb;
        }
        button{

            flex-direction: row;
            padding: 18px;
            border: 1px solid black;
          }
    `;

    const styleElement = document.createElement('style');
    styleElement.appendChild(document.createTextNode(styles));
    document.head.appendChild(styleElement);

