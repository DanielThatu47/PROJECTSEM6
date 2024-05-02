import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Homepage from './HomePage';

const Results = () => {
    const location = useLocation();
    const { code, heading } = useParams();
    const { questions, correctCount, wrongCount } = location.state;

    return (
        <>
            <Homepage showPlusIcon={false} />
            <div className="max-w-4xl mx-auto p-8">
                <div className="bg-white p-8 rounded-lg shadow-md">
                    <h2 className="font-bold text-2xl mb-6">Quiz Results</h2>
                    <p className='font-bold text-xl text-color-blue'>Classroom Code: {code}</p>
                    <p className='font-bold text-xl text-color-blue'>Heading: {heading}</p>
                    <p className='font-bold text-l' style={{color:'green'}}>Number of Correct Answers: {correctCount}</p>
                <p className='font-bold text-l' style={{color:'red'}}>Number of Wrong Answers: {wrongCount}</p>
                    <div className="mt-4">
                        {questions.map((question, index) => (
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
                                                    disabled
                                                    checked={option === question.selectedOption}
                                                />
                                                <span className={`ml-2 text-zinc-700 ${option === question.answer ? 'text-green-500' : (question.selectedOption === option ? 'text-red-500' : '')}`}>
                                                    {option}
                                                </span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Results;
