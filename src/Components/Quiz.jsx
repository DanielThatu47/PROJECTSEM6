import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Homepage from './HomePage';

const Quiz = () => {
    const navigate = useNavigate();
    const { code, heading } = useParams();
    const [quizzes, setQuizzes] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState({}); // State to store selected options

    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const response = await axios.get(`https://aimlbackend.onrender.com/quiz/${code}/${heading}`);
                const generatedQuestions = response.data.quizzes.map(quiz => ({
                    ...quiz,
                    selectedOption: '',
                    isCorrect: null,
                    correctOption: quiz.answer // Add correct option to the question object
                }));
                setQuizzes(generatedQuestions);
                setQuestions(generatedQuestions);
            } catch (error) {
                console.log(error);
            }
        };
        fetchQuizzes();
    }, [code, heading]);

    const handleOptionClick = (questionIndex, option) => {
        const updatedQuestions = [...questions];
        updatedQuestions[questionIndex].selectedOption = option; // Update selected option
        updatedQuestions[questionIndex].isCorrect = option === quizzes[questionIndex].answer; // Determine correctness
        setQuestions(updatedQuestions);
        setSelectedOptions({...selectedOptions, [questionIndex]: option}); // Store selected option
    };

    // Calculate correct and wrong counts
    const correctCount = Object.values(selectedOptions).filter(option => option === quizzes[Object.keys(selectedOptions)[0]].answer).length; // Count correct options
    const wrongCount = Object.values(selectedOptions).filter(option => option !== quizzes[Object.keys(selectedOptions)[0]].answer).length ; // Count wrong options

    const redirectToResults = () => {
        navigate(`/results/${code}/${heading}`, { state: { questions, correctCount, wrongCount } });
    };

    return (
        <>
            <Homepage showPlusIcon={false} />
            <div>
                <div className="max-w-4xl mx-auto p-8">
                    <div className="bg-white p-8 rounded-lg shadow-md">
                        <div className="mt-4">
                            {quizzes.map((question, index) => (
                                <div key={index} className="bg-white p-4 rounded-lg shadow-md mb-4">
                                    <h3 className="font-bold text-lg mb-2">{question.question_statement}</h3>
                                    <div className="mt-4">
                                        <p>The options are:</p>
                                        <div className="flex flex-col">
                                            {question.options.map((option, optionIndex) => (
                                                <label key={optionIndex} className="inline-flex items-center mt-3">
                                                    <input
                                                        type="radio"
                                                        className="form-radio h-5 w-5 text-zinc-600"
                                                        name={`question-${index}-option`}
                                                        value={option}
                                                        checked={selectedOptions[index] === option}
                                                        onChange={() => handleOptionClick(index, option)}
                                                    />
                                                    <span className={`ml-2 text-zinc-700 ${selectedOptions[index] === option ? (quizzes[index].answer === option ? 'text-green-500' : 'text-red-500') : ''}`}>
                                                        {option}
                                                    </span>
                                                </label>
                                            ))}
                                            {/* Include correct option */}
                                            <label key="correct" className="inline-flex items-center mt-3">
                                                <input
                                                    type="radio"
                                                    className="form-radio h-5 w-5 text-zinc-600"
                                                    name={`question-${index}-option`}
                                                    value={question.correctOption}
                                                    checked={selectedOptions[index] === question.correctOption}
                                                    onChange={() => handleOptionClick(index, question.correctOption)}
                                                />
                                                <span className={`ml-2 text-zinc-700 ${selectedOptions[index] === question.correctOption ? 'text-green-500' : ''}`}>
                                                    {question.correctOption}
                                                </span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div>
                            <button onClick={redirectToResults} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-full mb-4">
                                Show Results
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Quiz;
