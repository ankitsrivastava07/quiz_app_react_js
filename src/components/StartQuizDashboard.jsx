import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';

function LiveQuizPage() {
    const { quizId } = useParams();
    const navigate = useNavigate();

    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState({});
    const [timeLeft, setTimeLeft] = useState(180);
    const [loading, setLoading] = useState(true);
    // New state to track completion
    const [isFinished, setIsFinished] = useState(false);
    const [finalScore, setFinalScore] = useState(0);

    useEffect(() => {
        fetch(`http://localhost:9090/api/v1/quiz/${quizId}/question`)
            .then(res => res.json())
            .then(res => {
                setQuestions(res.data);
                setLoading(false);
            })
            .catch(err => console.error("Fetch error:", err));
    }, [quizId]);

    useEffect(() => {
        if (isFinished) return; // Stop timer if finished
        if (timeLeft <= 0) {
            handleFinish();
            return;
        }
        const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
        return () => clearInterval(timer);
    }, [timeLeft, isFinished]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const handleOptionSelect = (option) => {
        setUserAnswers({ ...userAnswers, [questions[currentIndex].id]: option });
    };

    const handleFinish = () => {
        let score = 0;
        questions.forEach(q => {
            if (userAnswers[q.id]?.correct) score++;
        });
        setFinalScore(score);
        setIsFinished(true);
    };

    if (loading) return <div className="text-center mt-5">Initializing Quiz...</div>;

    // --- Result View ---
    if (isFinished) {
        return (
            <h3>Thanks for Attending!</h3>
        );
    }

    // --- Quiz View ---
    const currentQ = questions[currentIndex];

    return (
        <div className="container-fluid bg-light min-vh-100 p-4">
            <div className="row">
                <div className="col-md-3">
                    <div className="card shadow-sm mb-4">
                        <div className="card-header bg-dark text-white text-center">
                            <h5 className="mb-0">Time Left: {formatTime(timeLeft)}</h5>
                        </div>
                        <div className="card-body">
                            <h6 className="mb-3">Question Navigation</h6>
                            <div className="d-flex flex-wrap gap-2">
                                {questions.map((q, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setCurrentIndex(idx)}
                                        className={`btn btn-sm ${currentIndex === idx ? 'btn-primary' :
                                            userAnswers[q.id] ? 'btn-success' : 'btn-outline-secondary'
                                            }`}
                                        style={{ width: '40px' }}
                                    >
                                        {idx + 1}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-9">
                    <div className="card border-0" style={{ minHeight: '400px' }}>
                        <div className="card-body p-5">
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <span className="text-muted fw-bold">QUESTION {currentIndex + 1} OF {questions.length}</span>
                                <span className="badge bg-info">{currentQ.properties?.key || 'Java Quiz'}</span>
                            </div>

                            <h3 className="mb-5">{currentQ.question}</h3>

                            <div className="row g-3">
                                {currentQ.options.map((option) => (
                                    <div key={option.id} className="col-md-6">
                                        <div
                                            onClick={() => handleOptionSelect(option)}
                                            className={`p-3 border rounded-3 cursor-pointer d-flex align-items-center transition-all ${userAnswers[currentQ.id]?.id === option.id
                                                ? 'bg-primary text-white border-primary shadow'
                                                : 'bg-white hover-light'
                                                }`}
                                            style={{ cursor: 'pointer', transition: '0.2s' }}
                                        >
                                            <div className="me-3 fw-bold">{option.opt}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="card-footer bg-white p-4 d-flex justify-content-between">
                            <button
                                className="btn btn-outline-dark px-4"
                                disabled={currentIndex === 0}
                                onClick={() => setCurrentIndex(prev => prev - 1)}
                            >
                                Previous
                            </button>

                            {currentIndex + 1 === questions.length ? (
                                <button className="btn btn-danger px-5" onClick={handleFinish}>Finish Quiz</button>
                            ) : (
                                <button
                                    className="btn btn-primary px-5"
                                    onClick={() => setCurrentIndex(prev => prev + 1)}
                                >
                                    Next Question
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LiveQuizPage;