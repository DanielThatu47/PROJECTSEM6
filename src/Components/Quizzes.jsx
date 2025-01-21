import React, { useState, useEffect } from 'react';
import Homepage from './HomePage';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Quizzes = () => {
    const { code } = useParams();
    const [quizzes, setQuizzes] = useState([]);
    const navigate = useNavigate();



    const clickPost = async (e) => {

        try {
            // console.log("hii",e.target.value)
            const heading = e.target.value
            // const heading = quizzes[index].heading
            const response = await axios.get(`https://aimlbackend.vercel.app/post/${code}/${heading}`);
            // setQuizzes(response.data.quizzes);
            console.log(response)
            if (response.data) {
                navigate(`/class/${code}/${heading}`)
                // window.location.href= `/class/${code}`
                // console.log("1", response)
            }
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const response = await axios.get(`https://aimlbackend.onrender.com/quizzes/${code}`);
                setQuizzes(response.data.quizzes);
                console.log(response.data.quiz)
            } catch (error) {
                console.log(error);
            }
        };

        fetchQuizzes();
    }, [code]);

    return (
        <>
            <Homepage showPlusIcon={false} />
            <div>
                {quizzes.length > 0 ? (
                    quizzes.map((quiz, index) => (
                        <div key={index} className="w-full p-4">
                            {/* {console.log("index", index)} */}
                            <div className="bg-white p-4 rounded-lg shadow-lg">
                                <div className="mt-4">
                                    <div className="mb-4">
                                        <div className="flex items-center space-x-3">
                                            <div className="text-orange-500">
                                                &#128196;
                                            </div>
                                            <Link to={`/quiz/${code}/${quiz.heading}`}>

                                                <div>
                                                    <h2 className="font-bold">{quiz.heading}</h2>
                                                </div>
                                            </Link>
                                        </div>
                                        <button className="mt-4 bg-blue-600 text-white rounded py-2 px-4" value={quiz.heading} onClick={(e)=>clickPost(e)}>Post to class</button>

                                    </div>
                                </div>
                            </div>



                        </div>
                    ))
                ) : (
                    <h1>No quizzes available</h1>
                )}
            </div>
        </>
    );
};

export default Quizzes;
