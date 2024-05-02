import React, { useState, useEffect } from 'react';

import 'tailwindcss/tailwind.css';
import Homepage from './HomePage';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';



const ClassroomInterface = () => {

  const [classroom, setClassrooms] = useState([null])
  const { user } = useAuth0();
  const { code, heading , email} = useParams(); // Get the classroom code from the URL
  const navigate = useNavigate();
  const [postedQuiz, setPostedQuiz] = useState([]);



  const fetchclassroomDetails = async () => {

    try {
      const response = await axios.get(`https://aimlbackend.onrender.com/classrooms/bycode/${code}`)
      console.log(response)
      setClassrooms(response.data.classroom)
    }
    catch (error) {
      console.error('Error fetching classroom details:', error);
    }

  }


  useEffect(() => {
    fetchclassroomDetails();
  }, [code]); // Fetch data when the component mounts



  useEffect(() => {
    const fetchPostedQuiz = async () => {
      try {
        const response = await axios.get(`https://aimlbackend.onrender.com/post/${code}/${heading}`);
        if (response.data.Assigned) {
          setPostedQuiz(response.data.Assigned.quiz);
          console.log(response)
        }
      } catch (error) {
        console.error('Error fetching posted quiz:', error);
      }
    };

    fetchPostedQuiz();
  }, []);



  useEffect(() => {
    const fetchPostedQuiz = async () => {
      try {
        const response = await axios.get(`https://aimlbackend.onrender.com/post/${code}/${heading}/${email}`);
        if (response.data.Assigned) {
          setPostedQuiz(response.data.Assigned.quiz);
          console.log(response)
        }
      } catch (error) {
        console.error('Error fetching posted quiz:', error);
      }
    };

    fetchPostedQuiz();
  }, []);

  return (
    <>
      {classroom ?

        <body>
          <Homepage showPlusIcon={false} />
          <div className="container mx-auto px-4">
            <div className="bg-blue-500 text-white p-4 rounded-lg shadow-md">
              <h1 className="text-3xl font-bold">{classroom.title}</h1>
              <p className="text-xl">{classroom.description}</p>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-4">
              {user.email === classroom.teacher ? (
                <div className="col-span-1 bg-zinc-100 p-4 rounded-lg shadow-md">
                  <p>Asisigned quizzes here</p>
                  <button className="mt-4 bg-blue-600 text-white rounded py-2 px-4" onClick={() => {
                    window.location.href = `/quizzes/${classroom.code}`
                  }}>Assign Here</button>
                </div>

              ) : (
                <div className="col-span-1 bg-zinc-100 p-4 rounded-lg shadow-md">
                  <h2 className="font-semibold text-lg mb-2">Upcoming</h2>
                  <p>Woohoo, no work due soon!</p>
                  <button className="mt-4 bg-blue-600 text-white rounded py-2 px-4" >View all</button>
                </div>


              )}

              <div className="col-span-2">
                {
                  user.email === classroom.teacher ?
                    <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
                      <div className="flex items-center justify-between">

                        <button className="mt-4 bg-blue-600 text-white rounded py-2 px-4" onClick={() => {
                          navigate(`/generate/${classroom.code}`)
                        }}>Create Quiz</button>

                      </div>
                    </div> :

                    <></>

                }

                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-lg">Teacher : {classroom.teacher}</h3>
                  </div>

                  
                  {postedQuiz.length > 0 ?
                    postedQuiz.map(pq => (
                      pq.assigned ?
                        <>
                        
                          <div className="bg-white p-4 rounded-lg shadow-sm">
                            <Link to = {`/quiz/${code}/${pq.heading}`}>

                            <div className="flex items-center justify-between">
                              <h3 className="font-semibold text-lg">{pq.heading}</h3>
                            </div>
                            </Link>
                            {/* Display other details of the posted quiz as needed */}
                          </div>

                        </> :
                        <></>
                    ))
                    : <></>
                  }




                </div>
              </div>
            </div>
          </div>
        </body> : <></>
      }
    </>
  );
}

export default ClassroomInterface;
