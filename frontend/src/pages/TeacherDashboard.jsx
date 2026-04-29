import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../api/api"
import Navbar from "../components/Navbar"
import "../styles/admin.css" // Reusing admin styles

export default function TeacherDashboard() {
    const navigate = useNavigate();
    const [quizzes, setQuizzes] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get("/quiz").then(res => {
            setQuizzes(res.data);
            setLoading(false);
        }).catch(err => {
            console.error(err);
            setLoading(false);
        });
    }, []);

    const token = localStorage.getItem("token");
    const payload = token ? JSON.parse(atob(token.split(".")[1])) : null;
    const isAdmin = payload?.role === "admin";

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this quiz?")) return;
        try {
            await api.delete(`/quiz/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setQuizzes(quizzes.filter(q => q._id !== id));
        } catch (err) {
            console.error("Failed to delete quiz", err);
            alert("Failed to delete quiz");
        }
    };

    return (
        <div className="admin-page-container">
            <Navbar />
            <div className="admin-content-wrapper">
                <div className="admin-card text-left">
                    <h1 className="admin-title text-center">
                        Your Quizzes
                    </h1>
                    
                    <div className="quiz-list-header">
                        <h2>Manage Quizzes</h2>
                        <button 
                            onClick={() => navigate('/create')}
                            className="admin-btn-primary"
                        >
                            Create a Quiz
                        </button>
                    </div>

                    <div className="quiz-list-container">
                        {quizzes.map((q) => (
                            <div key={q._id} className="quiz-list-item">
                                <div>
                                    <h3 className="quiz-list-item-title">{q.title}</h3>
                                    <p className="quiz-list-item-desc">By: {q.createdBy?.userName || 'Unknown'}</p>
                                </div>
                                <div className="quiz-list-actions">
                                    <button 
                                        onClick={() => navigate(`/teacher/leaderboard/${q._id}`)}
                                        className="admin-btn-secondary"
                                    >
                                        View Leaderboard
                                    </button>
                                    {isAdmin && (
                                        <button 
                                            onClick={() => handleDelete(q._id)}
                                            className="btn-danger"
                                        >
                                            Delete
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                        {loading && <p className="quiz-list-empty">Loading your quizzes...</p>}
                        {!loading && quizzes.length === 0 && <p className="quiz-list-empty">No quizzes found. Start by creating one!</p>}
                    </div>
                </div>
            </div>
        </div>
    )
}
