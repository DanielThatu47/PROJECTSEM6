import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Homepage from './HomePage';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card} from 'react-bootstrap';
import { Link } from 'react-router-dom';

// import { useAuth0 } from '@auth0/auth0-react';

const Classroom = () => {
    // Define state to store fetched data
    const [classrooms, setClassrooms] = useState([]);
    // const { user } = useAuth0();

    // Function to fetch data from the server
    const fetchClassrooms = async () => {
        try {
            const response = await axios.get('https://aimlbackend.onrender.com/classrooms');
            console.log(response.data.classrooms)
            // Set the fetched data in the state
            setClassrooms(response.data.classrooms);
            console.log("d :: ", classrooms)
        } catch (error) {
            console.error('Error fetching classrooms:', error);
        }
    };

    // Fetch data when the component mounts
    useEffect(() => {
        fetchClassrooms();
    }, []);

    // Log the fetched data for debugging
    // console.log('Classrooms:', classrooms);

    return (
        <>
            <body>


                {/* Render the homepage or navigation component */}
                <Homepage showPlusIcon={true} />
                {/* Render the fetched data */}
                <div className="min-h-screen main p-0" >
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4">
                        {classrooms.length > 0 ? (
                            classrooms.map(classroom => (
                                <div key={classroom._id}>
                                    <Card className="bg-white dark:bg-zinc-700 rounded-lg shadow-md overflow-hidden">
                                    <Link to={`/class/${classroom.code}`}>

                                        <Card.Body className="bg-primary text-white">
                                            <Card.Title className="text-lg font-bold">{classroom.title}</Card.Title>
                                            <Card.Text>{classroom.description}</Card.Text>
                                        </Card.Body>
                                        </Link>
                                        <div className="p-4 border-t border-zinc-200 dark:border-zinc-600">
                                            <div className="flex items-center mb-4" style={{alignItems:'center'}}>
                                                <img style={{width:60 ,height:60, borderRadius:50}} class="w-16 h-16 rounded-full" src={classroom.profile} alt="Teacher Image"/>
                                                    <div className="ml-3" style={{display:'inline-block', marginLeft:20, alignItems:'center'}}>
                                                        <h3 className="font-semibold text-s dark:text-black-300">{classroom.name}</h3>
                                                    </div>
                                            </div>
                                            <Card.Footer className="bg-light border-top">
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <div className="ml-3">
                                                        <h3 className="font-semibold">{classroom.teacher}</h3>
                                                        <h2 className='font-semibold '>code : {classroom.code}</h2>
                                                    </div>
                                                </div>
                                            </Card.Footer>
                                            </div>
                                    </Card>
                                </div>
                            ))
                        ) : (
                            <p style={{ color: 'red', fontStyle: 'italic', textAlign: 'center' }}>No classrooms available</p>
                        )}
                    </div>
                </div>
            </body>
        </>
    );
};

export default Classroom;

const styles = `
body{
    background-color: antiquewhite;
}

.main{
margin: 10px;
}
`

const styleElement = document.createElement('style');
styleElement.appendChild(document.createTextNode(styles));
document.head.appendChild(styleElement);