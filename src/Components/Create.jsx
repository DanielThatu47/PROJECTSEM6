import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import axios from "axios";
import { nanoid } from 'nanoid'; // Import nanoid library
import { useAuth0 } from '@auth0/auth0-react';
import Homepage from './HomePage';
import { useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory



const Create = () => {
    const [className, setClassName] = useState('');
    const [classDescription, setClassDescription] = useState('');
    const [error, setError] = useState('');
    const { user } = useAuth0();
    const navigate = useNavigate(); // Use useNavigate hook for navigation



    
    const handleCreateClassroom = async () => {
        try {
            const classroomCode = nanoid(8); // Generate unique code
            const response = await axios.post('https://aimlbackend.onrender.com/classrooms', {
                title: className,
                description: classDescription,
                code: classroomCode, // Save code in database
                teacher: user.email ,
                name: user.name,
                profile : user.picture // Pass user's profile image URL
            });
            if (response.status === 200) {
                console.log("Classroom created successfully");
                navigate('/classroom');
                // Optionally, you can redirect the user to another page or display a success message
            } else {
                // Classroom creation failed
                setError('Failed to create classroom');
            }
            // Use navigate instead of history.push
            navigate('/classroom');
            
        } catch (error) {
            console.error('Error creating classroom:', error);
            setError('Failed to create classroom');
        }
    };

    return (
        <>
        <Homepage showPlusIcon={false} />
        <div className="container bg-white" style={{ backgroundColor: 'antiquewhite' }}>
            <h2 className='text-xl font-bold'>Create a New Classroom</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="form-group">
                <label htmlFor="className">Class Name</label>
                <input type="text" className="form-control" id="className" value={className} onChange={(e) => setClassName(e.target.value)} />
            </div>
            <div className="form-group">
                <label htmlFor="classDescription">Class Description</label>
                <textarea className="form-control" id="classDescription" value={classDescription} onChange={(e) => setClassDescription(e.target.value)}></textarea>
            </div>
            <Button onClick={handleCreateClassroom}>Create Classroom</Button>
        </div>
        </>
    );
}

export default Create;

const styles = `
        .container {
            margin: 20px;
            padding: 20px;
            border: 1px solid #ccc;
            border-radius: 5px;
            background-color: #f9f9f9;
            width:70%;
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
        
        textarea {
            resize: vertical;
            height: 100px;
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

