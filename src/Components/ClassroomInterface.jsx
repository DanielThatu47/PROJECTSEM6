import React, { useState, useEffect } from 'react';
import 'tailwindcss/tailwind.css';
import Homepage from './HomePage';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';

const ClassroomInterface = () => {
  const [classroom, setClassrooms] = useState(null);
  const { user } = useAuth0();
  const { code, heading, email } = useParams(); // Get the classroom code from the URL
  const navigate = useNavigate();
  const [postedQuiz, setPostedQuiz] = useState([]);

  const fetchclassroomDetails = async () => {
    try {
      const response = await axios.get(`https://aimlbackend.onrender.com/classrooms/bycode/${code}`);
      console.log(response);
      setClassrooms(response.data.classroom);
    } catch (error) {
      console.error('Error fetching classroom details:', error);
    }
  };

  useEffect(() => {
    fetchclassroomDetails();
  }, [code]); // Fetch data when the component mounts

  useEffect(() => {
    const fetchPostedQuiz = async () => {
      try {
        const response = await axios.get(`https://aimlbackend.onrender.com/post/${code}/${heading}/${email}`);
        if (response.data.Assigned) {
          setPostedQuiz(response.data.Assigned.quiz);
          console.log(response);
        }
      } catch (error) {
        console.error('Error fetching posted quiz:', error);
      }
    };

    fetchPostedQuiz();
  }, []);

  return (
    <>
      {classroom ? (
        <div className="bg-gray-100 min-h-screen">
          <Homepage showPlusIcon={false} />
          <div className="container mx-auto px-4">
            <div className="bg-blue-500 text-white p-4 rounded-lg shadow-md">
              <h1 className="text-3xl font-bold">{classroom.title}</h1>
              <p className="text-xl">{classroom.description}</p>
            </div>
            <div className="mt-4">
              {user.email === classroom.teacher ? (
                <div className="bg-zinc-100 p-4 rounded-lg shadow-md mb-4">
                  <p>Assigned quizzes here</p>
                  <button
                    className="mt-4 bg-blue-600 text-white rounded py-2 px-4"
                    onClick={() => {
                      window.location.href = `/quizzes/${classroom.code}`;
                    }}
                  >
                    Assign Here
                  </button>
                </div>
              ) : (
                <div className="bg-zinc-100 p-4 rounded-lg shadow-md mb-4">
                  <h2 className="font-semibold text-lg mb-2">Upcoming</h2>
                  <p>Woohoo, no work due soon!</p>
                  <button className="mt-4 bg-blue-600 text-white rounded py-2 px-4">View all</button>
                </div>
              )}

              {user.email === classroom.teacher && (
                <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
                  <button
                    className="bg-blue-600 text-white rounded py-2 px-4"
                    onClick={() => {
                      navigate(`/generate/${classroom.code}`);
                    }}
                  >
                    Create Quiz
                  </button>
                </div>
              )}

              {postedQuiz.length > 0 &&
                postedQuiz.map((pq) => (
                  pq.assigned && (
                    <div className="bg-white p-4 rounded-lg shadow-sm mb-4" key={pq.id}>
                      <Link to={`/quiz/${code}/${pq.heading}`}>
                        <h3 className="font-semibold text-lg">{pq.heading}</h3>
                      </Link>
                    </div>
                  )
                ))}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default ClassroomInterface;