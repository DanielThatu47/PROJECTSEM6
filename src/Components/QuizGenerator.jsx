import React, { useState } from 'react';
import axios from 'axios';
import { Button, Spinner, Container, Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Homepage from './HomePage';

function QuizGenerator() {
    const [inputText, setInputText] = useState('');
    const [questions, setQuestions] = useState([]);
    const [showWidget, setShowWidget] = useState(false);
    const [heading, setHeading] = useState('');
    const [loading, setLoading] = useState(false); // NEW
    const { code } = useParams();

    const handleCreateQuiz = async () => {
        try {
            setLoading(true);
            setShowWidget(false);

            const response = await axios.post(
                'https://aimlbackend.onrender.com/generate',
                { input_text: inputText, code, heading }
            );

            const quizQuestions =
                response.data.quiz.quiz[
                    response.data.quiz.quiz.length - 1
                ].questions;

            setQuestions(
                quizQuestions.map(q => ({
                    ...q,
                    selectedOption: '',
                    isCorrect: null
                }))
            );

            setShowWidget(true);
        } catch (error) {
            console.error('Error generating quiz:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleOptionClick = (questionIndex, option) => {
        const updatedQuestions = [...questions];
        const question = updatedQuestions[questionIndex];

        if (!question.selectedOption) {
            question.selectedOption = option;
            question.isCorrect = option === question.answer;
            setQuestions(updatedQuestions);
        }
    };

    const filteredQuestions = questions.filter(
        q => q.options && q.options.length >= 1
    );

    return (
        <>
            <Homepage showPlusIcon={false} />

            <Container fluid className="bg-zinc-100 min-vh-100 py-4">
                <Container>
                    <Card className="shadow-sm p-4">
                        <h2 className="fw-bold mb-4 text-center">
                            Quiz Generator
                        </h2>

                        <input
                            className="form-control mb-3"
                            type="text"
                            placeholder="Enter heading for the quiz..."
                            value={heading}
                            onChange={e => setHeading(e.target.value)}
                            disabled={loading}
                        />

                        <textarea
                            className="form-control mb-3"
                            rows="4"
                            placeholder="Enter text for generating questions..."
                            value={inputText}
                            onChange={e => setInputText(e.target.value)}
                            disabled={loading}
                        />

                        <Button
                            variant="primary"
                            className="w-100 mb-3"
                            onClick={handleCreateQuiz}
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <Spinner
                                        animation="border"
                                        size="sm"
                                        className="me-2"
                                    />
                                    Generating Quiz...
                                </>
                            ) : (
                                'Create Quiz'
                            )}
                        </Button>

                        {loading && (
                            <div className="text-center mt-4">
                                <Spinner animation="grow" />
                                <p className="mt-2 text-muted">
                                    AI is thinking hard. Brewing questions ☕
                                </p>
                            </div>
                        )}

                        {showWidget && !loading && (
                            <div className="mt-4">
                                {filteredQuestions.map((q, i) => (
                                    <Card key={i} className="mb-3 p-3">
                                        <h5 className="fw-bold">
                                            {q.question_statement}
                                        </h5>

                                        {q.options.map((option, idx) => (
                                            <div
                                                key={idx}
                                                className="form-check mt-2"
                                            >
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    name={`question-${i}`}
                                                    onChange={() =>
                                                        handleOptionClick(
                                                            i,
                                                            option
                                                        )
                                                    }
                                                />
                                                <label className="form-check-label">
                                                    {option}
                                                </label>
                                            </div>
                                        ))}
                                    </Card>
                                ))}
                            </div>
                        )}
                    </Card>
                </Container>
            </Container>
        </>
    );
}

export default QuizGenerator;