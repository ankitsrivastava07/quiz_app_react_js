import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom'
function InstructionDashboard() {
    const [quizData, setQuizData] = useState(null);
    const [loading, setLoading] = useState(true);
    const { quizId } = useParams();

    useEffect(() => {
        // 1. Added missing dependency array [quizId] to stop infinite loop
        // 2. Fixed 'localhost' typo
        fetch(`http://localhost:9090/api/v1/quiz/${quizId}`)
            .then((res) => res.json())
            .then((res) => {
                setQuizData(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Fetch error:", err);
                setLoading(false);
            });
    }, [quizId]);

    if (loading) return <div className="p-5 text-center">Loading Quiz Details...</div>;

    return (
        <div className="container mt-4">
            <div className="card shadow">
                
                <div className="card-body">
                    <div className="row mb-4">
                        <div className="col-md-6">
                            <h5>General Info</h5>
                            <ul className="list-group">
                                <li className="list-group-item"><strong>Difficulty:</strong>
                                    {quizData.difficultyLevel.charAt(0).toUpperCase() + quizData.difficultyLevel.slice(1)}</li>
                                <li className="list-group-item"><strong>Created By:</strong>
                                    {quizData.createdBy}</li>
                                <li className="list-group-item"><strong>Created At:</strong>
                                    {new Date(quizData.createdAt).toLocaleDateString()}</li>
                            </ul>
                        </div>
                        <div className="col-md-6">
                            <h5>Instructions</h5>
                            {quizData.instruction ? (
                                <div className="alert alert-info">
                                    <p>{quizData.instruction.description}</p>
                                    <hr />
                                    <small>{quizData.instruction.duration}</small>
                                </div>
                            ) : (
                                <p className="text-muted">No specific instructions provided.</p>
                            )}
                        </div>
                    </div>

                </div>
                <div className="card-footer text-end">
                    <Link className="btn btn-success px-4"
                        to={"/quiz/" + quizId + "/live"}>Start Quiz Now</Link>
                </div>
            </div>
        </div>
    );
}

export default InstructionDashboard;