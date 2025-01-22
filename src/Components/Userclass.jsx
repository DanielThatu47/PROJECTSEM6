import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import Homepage from './HomePage';
import { Card, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Userclass = () => {
    const [joinedClassrooms, setJoinedClassrooms] = useState([]);
    const [createdClassrooms, setCreatedClassrooms] = useState([]);
    const { user } = useAuth0();

    const fetchJoinedClassrooms = async () => {
        try {
            const response = await axios.get(`https://aimlbackend.vercel.app/joined/${user.email}`);
            setJoinedClassrooms(response.data.classrooms);
        } catch (error) {
            console.error('Error fetching joined classrooms:', error);
        }
    };

    const fetchCreatedClassrooms = async () => {
        try {
            const response = await axios.get(`https://aimlbackend.vercel.app/created/${user.email}`);
            setCreatedClassrooms(response.data.classrooms);
        } catch (error) {
            console.error('Error fetching created classrooms:', error);
        }
    };

    useEffect(() => {
        fetchJoinedClassrooms();
        fetchCreatedClassrooms();
    }, []);

    const renderClassrooms = (classrooms) => {
        return classrooms.length > 0 ? (
            classrooms.map((classroom) => (
                <div key={classroom._id} className="col">
                    <Card className="bg-white dark:bg-zinc-700 rounded-lg shadow-md overflow-hidden">
                        <Link to={`/class/${classroom.code}`}>
                            <Card.Body className="bg-primary text-white">
                                <Card.Title className="text-lg font-bold">{classroom.title}</Card.Title>
                                <Card.Text>{classroom.description}</Card.Text>
                            </Card.Body>
                        </Link>
                        <div className="p-4 border-t border-zinc-200 dark:border-zinc-600">
                            <div className="flex items-center mb-4" style={{ alignItems: 'center' }}>
                                <Image
                                    style={{ width: 60, height: 60, borderRadius: 50 }}
                                    className="w-16 h-16 rounded-full"
                                    src={classroom.profile}
                                    alt="Teacher Image"
                                />
                                <div className="ml-3" style={{ display: 'inline-block', marginLeft: 20, alignItems: 'center' }}>
                                    <h3 className="font-semibold text-l dark:text-black-300">{classroom.teacher}</h3>
                                </div>
                            </div>
                            <Card.Footer className="bg-light border-top">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="ml-3">
                                        <h3 className="font-semibold">Code: {classroom.code}</h3>
                                    </div>
                                </div>
                            </Card.Footer>
                        </div>
                    </Card>
                </div>
            ))
        ) : (
            <p style={{ color: 'red', fontStyle: 'italic', textAlign: 'center' }}>No classrooms available</p>
        );
    };

    return (
        <div>
            <Homepage showPlusIcon={false} />
            <div className="min-h-screen main p-4">
                <h2 className="text-2xl font-bold mb-4">My Classrooms</h2>
                <div className="mb-8">
                    <h3 className="text-xl font-semibold mb-3">Created Classrooms</h3>
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                        {renderClassrooms(createdClassrooms)}
                    </div>
                </div>
                <div>
                    <h3 className="text-xl font-semibold mb-3">Joined Classrooms</h3>
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                        {renderClassrooms(joinedClassrooms)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Userclass;