import { useEffect, useState } from 'react';
import { useParams, Link, useSearchParams } from 'react-router-dom';

const QuizCard = () => {
    const { subjectId } = useParams();
    const [searchParam] = useSearchParams()
    const [quiz, setQuiz] = useState([]);
    useEffect(() => {
        if (subjectId) {
            fetch(`http://localhost:9090/api/v1/quiz/subject/${subjectId}`)
                .then(res => res.json())
                .then(apiResponse => {
                    setQuiz(apiResponse.data);
                })
                .catch(err => console.error("Fetch error:", err));
        }
    }, [subjectId]);

    return (
        <div className="container mt-5">
            <h2 className="mb-4 text-center">Subject Quiz: {searchParam.get('subject')}</h2>
            <div className="row">
                {quiz.map((q) => (
                    <div className="col-md-4 mb-4" key={q.id}>
                        <div className="card h-100 shadow-sm">
                            <div className="card-header bg-primary text-white">
                                <strong>Quiz ID:</strong> {q.id.substring(0, 8)}...
                            </div>
                            <div className="card-body">
                                <h5 className="card-title text-truncate">
                                    <div className="badge bg-light text-dark border">{q.quizName}</div>
                                </h5>
                                <p className="card-text text-muted small">
                                    Difficulty: {q.difficultyLevel.charAt(0).toUpperCase() + q.difficultyLevel.slice(1) || "Easy"}
                                </p>

                                {/* Options Preview */}
                                <div className="mt-3">
                                    <div className="badge bg-light text-dark border">{q.instruction ? q.instruction.duration : ""}</div>
                                </div>
                            </div>
                            <div className="card-footer bg-transparent border-top-0">
                                {/* REDIRECT LINK: This goes to a new detail page */}
                                <Link
                                    to={`/quiz/${q.id}/instruction?subject=${searchParam.get('subject')}`}
                                    className="btn btn-outline-primary w-100"
                                >
                                  Go To Quiz
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default QuizCard;