import React, { useState } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Homepage from './HomePage';



function QuizGenerator() {
    const [inputText, setInputText] = useState('');
    const [questions, setQuestions] = useState([]);
    const [showWidget, setShowWidget] = useState(false);
    const { code } = useParams(); // Get the classroom code from the URL
    const [heading, setHeading] = useState('');

    const handleHeadingChange = (event) => {
        setHeading(event.target.value);
    };


    const handleCreateQuiz = async () => {
        try {
            // const response = await axios.post('http://localhost:5000/generate_questions', { input_text: inputText });
            // setShowWidget(true);
            const response = await axios.post('https://aimlbackend.onrender.com/generate', { input_text: inputText, code: code, heading: heading })
            console.log(response)
            // setQuestions(response.data.questions.map(question => ({ ...question, selectedOption: '', isCorrect: null })));
            setQuestions(response.data.quiz.quiz[response.data.quiz.quiz.length - 1].questions.map(question => ({ ...question, selectedOption: '', isCorrect: null })));
            setShowWidget(true);
        } catch (error) {
            console.error('Error generating quiz:', error);
        }
    };

    const handleInputChange = (event) => {
        setInputText(event.target.value);
    };

    const handleOptionClick = (questionIndex, option) => {
        const updatedQuestions = [...questions];
        const question = updatedQuestions[questionIndex];
        if (question.selectedOption === '') {
            question.selectedOption = option;
            question.isCorrect = option === question.answer;
        }
        setQuestions(updatedQuestions);
    };

    // Function to filter out questions with less than 4 options
    const filteredQuestions = questions.filter(question => question.options.length >= 1);

    return (

        <>
            <Homepage showPlusIcon={false} />
            <div className="bg-zinc-100 min-h-screen">
                <div className="max-w-4xl mx-auto p-8">
                    <div className="bg-white p-8 rounded-lg shadow-md">
                        <h2 className="font-bold text-2xl mb-6">Quiz Generator</h2>
                        <input
                            className="form-control w-full mt-4 mb-6"
                            type="text"
                            value={heading}
                            onChange={handleHeadingChange}
                            placeholder="Enter heading for the quiz..."
                        />
                        <textarea
                            className="form-control w-full mt-4 mb-6"
                            rows="4"
                            value={inputText}
                            onChange={handleInputChange}
                            placeholder="Enter text for generating questions..."

                        ></textarea>
                        <Button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-full mb-4"
                            onClick={handleCreateQuiz}
                        >
                            Create Quiz
                        </Button>
                        {showWidget && (
                            <div className="mt-4">
                                {filteredQuestions.map((question, index) => (
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
                                                            onChange={() => handleOptionClick(index, option)}
                                                        />
                                                        <span className="ml-2 text-zinc-700">{option}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default QuizGenerator;
