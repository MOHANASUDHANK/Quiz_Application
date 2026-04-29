import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../api/api"
import Navbar from "../components/Navbar";
import "../styles/admin.css"

export default function QuizList() {

        const [quizzes, setQuizzes] = useState([]);
        const navigate = useNavigate();

        useEffect(() => {
                api.get("/quiz").then(res => setQuizzes(res.data));
        }, []);

        const token = localStorage.getItem("token");
        const payload = token ? JSON.parse(atob(token.split(".")[1])) : null;

        return (
                <div className="admin-page-container">
                        <Navbar />
                        <div className="admin-content-wrapper">
                                <div className="admin-card text-left">
                                        <h1 className="admin-title text-center">Available Quizzes</h1>
                                        <div className="quiz-list-container">
                                                {quizzes.map((q) => (
                                                        <div key={q._id} className="quiz-list-item">
                                                                <div>
                                                                        <h3 className="quiz-list-item-title">{q.title}</h3>
                                                                        <p className="quiz-list-item-desc">{q.description}</p>
                                                                </div>
                                                                <button 
                                                                        onClick={() => navigate(`/quiz/${q._id}`)}
                                                                        className="admin-btn-primary"
                                                                >
                                                                        Start Quiz
                                                                </button>
                                                        </div>
                                                ))}
                                                {quizzes.length === 0 && <p className="quiz-list-empty">No quizzes available right now.</p>}
                                        </div>
                                </div>
                        </div>
                </div>
        )
}