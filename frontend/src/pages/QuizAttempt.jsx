import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/api";
import Navbar from "../components/Navbar";
import "../styles/admin.css";

export default function QuizAttempt() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [timeLeft, setTimeLeft] = useState(null);
    const [quizTitle, setQuizTitle] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isStarted, setIsStarted] = useState(false);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    useEffect(() => {
        console.log(id);
        api.get(`/question/${id}`).then((r) => {
            setQuestions(r.data);
            setAnswers(new Array(r.data.length).fill(null));
        });

        // Fetch quiz details for time limit
        api.get(`/quiz/${id}`).then((r) => {
            setQuizTitle(r.data.title);
            if (r.data.timeLimit && r.data.timeLimit > 0) {
                setTimeLeft(r.data.timeLimit * 60); // convert minutes to seconds
            }
        });
    }, [id]);

    useEffect(() => {
        if (!isStarted || timeLeft === null || isSubmitting) return;

        if (timeLeft <= 0) {
            submitQuiz();
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft, isSubmitting, isStarted]);

    // Handle Fullscreen exit
    useEffect(() => {
        const handleFullscreenChange = () => {
            if (!document.fullscreenElement && isStarted && !hasSubmitted) {
                // User exited fullscreen, force submit
                alert("You exited fullscreen mode. Your quiz has been automatically submitted.");
                submitQuiz();
            }
        };

        document.addEventListener("fullscreenchange", handleFullscreenChange);
        return () => {
            document.removeEventListener("fullscreenchange", handleFullscreenChange);
        };
    }, [isStarted, hasSubmitted]);

    const handleStartQuiz = async () => {
        try {
            await document.documentElement.requestFullscreen();
            setIsStarted(true);
        } catch (err) {
            console.error("Error attempting to enable full-screen mode:", err);
            alert("Unable to enter fullscreen mode. Please ensure your browser supports it.");
        }
    };

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    async function submitQuiz() {
        if (isSubmitting || hasSubmitted) return;
        setIsSubmitting(true);
        setHasSubmitted(true);
        
        try {
            const result = await api.post(`/result/${id}/attempt`, {
                answer: answers,
            });
            console.log(result.data);
            
            if (document.fullscreenElement) {
                await document.exitFullscreen().catch(err => console.log(err));
            }
            
            navigate(`/result/${result.data._id}`);
        } catch (err) {
            console.error("Failed to submit quiz", err);
            setIsSubmitting(false);
            setHasSubmitted(false);
        }
    }

    function handleChange(i, j) {
        const copy = [...answers];
        copy[i] = j;
        setAnswers(copy);
        console.log(copy);
    }

   
    return (
        <div className="admin-page-container">
            {!isStarted && <Navbar />}
            <div className="admin-content-wrapper">
                {!isStarted ? (
                    <div className="admin-card text-center relative-container" style={{ maxWidth: '600px', margin: '40px auto' }}>
                        <h1 className="admin-title mb-20">{quizTitle || "Ready to begin?"}</h1>
                        <div style={{ backgroundColor: '#fff3cd', padding: '20px', borderRadius: '8px', border: '1px solid #ffeeba', color: '#856404', marginBottom: '30px' }}>
                            <p style={{ margin: '0 0 10px 0', fontWeight: 'bold' }}>⚠️ Important Security Rules</p>
                            <p style={{ margin: 0, fontSize: '15px' }}>
                                This quiz requires <strong>Full Screen mode</strong>. If you exit full screen or switch tabs at any point while taking the quiz, your current answers will be <strong>automatically submitted instantly</strong>.
                            </p>
                        </div>
                        <button 
                            onClick={handleStartQuiz} 
                            className="admin-btn-primary"
                            style={{ padding: '15px 40px', fontSize: '18px' }}
                        >
                            Start Quiz
                        </button>
                    </div>
                ) : (
                    <div className="admin-card text-left relative-container">
                    <div className="quiz-attempt-header">
                        <h1 className="admin-title m-0">{quizTitle || "Quiz Attempt"}</h1>
                        {timeLeft !== null && (
                            <div className={`quiz-timer ${timeLeft < 60 ? 'timer-warning' : ''}`}>
                                ⏱️ {formatTime(timeLeft)}
                            </div>
                        )}
                    </div>
                    <div className="question-list">
                        {questions.map((q, i) => (
                            <div key={q._id} className="question-card">
                                <p className="question-text">
                                    <span className="question-number">{i + 1}.</span> 
                                    {q.text}
                                </p>
                                <div className="question-options-container">
                                    {q.option.map((opt, j) => (
                                        <label key={j} className="question-option-label">
                                            <input
                                                type="radio"
                                                name={`q-${i}`}
                                                onChange={() => handleChange(i, opt)}
                                                className="radio-input"
                                            />
                                            {opt}
                                        </label>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    <div className="text-center mt-40">
                        <button 
                            onClick={submitQuiz}
                            className="admin-btn-primary"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Submitting..." : "Submit Quiz"}
                        </button>
                    </div>
                </div>
                )}
            </div>
        </div>
    );
}
