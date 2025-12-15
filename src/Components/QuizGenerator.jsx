import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function QuizGenerator() {
    const [inputText, setInputText] = useState('');
    const [questions, setQuestions] = useState([]);
    const [showWidget, setShowWidget] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { code } = useParams();
    const [heading, setHeading] = useState('');

    const handleHeadingChange = (event) => {
        setHeading(event.target.value);
    };

    const handleCreateQuiz = async () => {
        if (!inputText.trim() || !heading.trim()) {
            alert('Please enter both heading and text for the quiz');
            return;
        }

        setIsLoading(true);
        setShowWidget(false);
        
        try {
            const response = await axios.post('https://aimlbackend.onrender.com/generate', { 
                input_text: inputText, 
                code: code, 
                heading: heading 
            });
            
            setQuestions(
                response.data.quiz.quiz[response.data.quiz.quiz.length - 1].questions.map(question => ({ 
                    ...question, 
                    selectedOption: '', 
                    isCorrect: null 
                }))
            );
            setShowWidget(true);
        } catch (error) {
            console.error('Error generating quiz:', error);
            alert('Failed to generate quiz. Please try again.');
        } finally {
            setIsLoading(false);
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

    const filteredQuestions = questions.filter(question => question.options.length >= 1);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                {/* Header */}
                <div className="text-center mb-8 sm:mb-12">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-3">
                        AI Quiz Generator
                    </h1>
                    <p className="text-gray-600 text-sm sm:text-base">
                        Create engaging quizzes powered by artificial intelligence
                    </p>
                </div>

                {/* Main Card */}
                <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 lg:p-10 mb-8">
                    <div className="space-y-6">
                        {/* Heading Input */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Quiz Title
                            </label>
                            <input
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none text-sm sm:text-base"
                                type="text"
                                value={heading}
                                onChange={handleHeadingChange}
                                placeholder="e.g., Introduction to Machine Learning"
                                disabled={isLoading}
                            />
                        </div>

                        {/* Text Input */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Source Content
                            </label>
                            <textarea
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none resize-none text-sm sm:text-base"
                                rows="6"
                                value={inputText}
                                onChange={handleInputChange}
                                placeholder="Paste your text content here. The AI will generate quiz questions based on this material..."
                                disabled={isLoading}
                            ></textarea>
                        </div>

                        {/* Generate Button */}
                        <button
                            className={`w-full py-4 rounded-xl font-semibold text-white text-sm sm:text-base transition-all transform ${
                                isLoading 
                                    ? 'bg-gray-400 cursor-not-allowed' 
                                    : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:shadow-lg active:scale-[0.98]'
                            }`}
                            onClick={handleCreateQuiz}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Generating Quiz...' : 'Generate Quiz'}
                        </button>
                    </div>
                </div>

                {/* Loading Animation */}
                {isLoading && (
                    <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-12">
                        <div className="flex flex-col items-center justify-center space-y-6">
                            {/* Spinner */}
                            <div className="relative">
                                <div className="w-20 h-20 border-4 border-blue-200 rounded-full"></div>
                                <div className="w-20 h-20 border-4 border-blue-600 rounded-full animate-spin border-t-transparent absolute top-0 left-0"></div>
                            </div>
                            
                            {/* Loading Text */}
                            <div className="text-center">
                                <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
                                    Creating Your Quiz
                                </h3>
                                <p className="text-gray-600 text-sm sm:text-base">
                                    AI is analyzing your content and generating questions...
                                </p>
                            </div>

                            {/* Progress Dots */}
                            <div className="flex space-x-2">
                                <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce"></div>
                                <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Quiz Questions */}
                {showWidget && !isLoading && (
                    <div className="space-y-6">
                        <div className="text-center mb-6">
                            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
                                {heading}
                            </h2>
                            <p className="text-gray-600 text-sm sm:text-base">
                                {filteredQuestions.length} questions generated
                            </p>
                        </div>

                        {filteredQuestions.map((question, index) => (
                            <div key={index} className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 hover:shadow-xl transition-shadow">
                                {/* Question Number & Statement */}
                                <div className="flex items-start gap-4 mb-6">
                                    <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                                        <span className="text-white font-bold text-sm sm:text-base">
                                            {index + 1}
                                        </span>
                                    </div>
                                    <h3 className="text-lg sm:text-xl font-semibold text-gray-800 flex-1">
                                        {question.question_statement}
                                    </h3>
                                </div>

                                {/* Options */}
                                <div className="space-y-3 pl-0 sm:pl-14">
                                    {question.options.map((option, optionIndex) => {
                                        const isSelected = question.selectedOption === option;
                                        const isCorrect = question.isCorrect !== null && option === question.answer;
                                        const isWrong = isSelected && !question.isCorrect;

                                        return (
                                            <label
                                                key={optionIndex}
                                                className={`flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all ${
                                                    isCorrect
                                                        ? 'bg-green-50 border-green-500'
                                                        : isWrong
                                                        ? 'bg-red-50 border-red-500'
                                                        : isSelected
                                                        ? 'bg-blue-50 border-blue-500'
                                                        : 'bg-gray-50 border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                                                }`}
                                            >
                                                <input
                                                    type="radio"
                                                    className="w-5 h-5 text-blue-600 focus:ring-2 focus:ring-blue-500"
                                                    name={`question-${index}-option`}
                                                    value={option}
                                                    checked={isSelected}
                                                    onChange={() => handleOptionClick(index, option)}
                                                    disabled={question.selectedOption !== ''}
                                                />
                                                <span className={`ml-3 flex-1 text-sm sm:text-base ${
                                                    isCorrect ? 'text-green-800 font-semibold' : 
                                                    isWrong ? 'text-red-800' : 'text-gray-700'
                                                }`}>
                                                    {option}
                                                </span>
                                                {isCorrect && (
                                                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                )}
                                                {isWrong && (
                                                    <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                )}
                                            </label>
                                        );
                                    })}
                                </div>

                                {/* Feedback */}
                                {question.selectedOption !== '' && (
                                    <div className={`mt-4 p-4 rounded-xl ${
                                        question.isCorrect ? 'bg-green-50 border-l-4 border-green-500' : 'bg-red-50 border-l-4 border-red-500'
                                    }`}>
                                        <p className={`text-sm sm:text-base font-semibold ${
                                            question.isCorrect ? 'text-green-800' : 'text-red-800'
                                        }`}>
                                            {question.isCorrect ? '✓ Correct!' : `✗ Incorrect. The correct answer is: ${question.answer}`}
                                        </p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default QuizGenerator;