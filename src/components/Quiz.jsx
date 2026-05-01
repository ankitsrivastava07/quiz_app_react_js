import { useState, useEffect } from 'react'; // Added useEffect
import './Quiz.css';
import { useParams } from 'react-router-dom';

const QuizPage = () => { // Removed 'async'
    const [questions, setQuestions] = useState([]); // Initialized as empty array
    const [selectedOption, setSelectedOption] = useState(null);
    const [loading, setLoading] = useState(true);

    // useEffect with empty dependency array [] runs ONLY ONCE on mount
    useEffect(() => {
        fetch(`http://localhost:9090/api/v1/quiz`)
            .then(response => response.json())
            .then(data => {
                setQuestions(data.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching quiz:", err);
                setLoading(false);
            });
    }, []); // Empty array is the key to stopping the infinite loop

    if (loading) return <div>Loading...</div>;
    if (questions.length === 0) return <div>No questions found.</div>;

    // For now, let's look at the first question in the array
    const currentQuestion = questions[0];

    return (
        <div className="quiz-page-container">
            {/* Left Panel */}
            <div className="problem-panel">
                <div className="panel-header">
                    <h2>{currentQuestion.questionTitle}</h2>
                </div>
                <div className="content">
                    <p className="statement-text">Select the correct answer below:</p>
                </div>
            </div>

            {/* Right Panel */}
            <div className="options-panel">
                <div className="options-list">
                    {/* Map through the options from your API */}
                    {[currentQuestion.option1, currentQuestion.option2, currentQuestion.option3, currentQuestion.option4].map((option, index) => (
                        <label key={index} className={`option-card ${selectedOption === option ? 'selected' : ''}`}>
                            <input
                                type="radio"
                                name="quiz-option"
                                value={option}
                                onChange={() => setSelectedOption(option)}
                            />
                            {option}
                        </label>
                    ))}
                </div>
                <div className="options-footer">
                    <button className="submit-btn" disabled={!selectedOption}>
                        Submit Answer
                    </button>
                </div>
            </div>
        </div>
    );
};

export default QuizPage;