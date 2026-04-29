import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import api from "../api/api"
import Navbar from "../components/Navbar"
import "../styles/admin.css"

export default function Leaderboard() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [results, setResults] = useState([]);
    const [quiz, setQuiz] = useState(null);
    const [loading, setLoading] = useState(true);

    const token = localStorage.getItem("token");

    useEffect(() => {
        setLoading(true);
        // Fetch quiz details
        api.get(`/quiz/${id}`).then(res => setQuiz(res.data)).catch(console.error);

        // Fetch leaderboard results
        api.get(`/result/quiz/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(res => {
            setResults(res.data);
            setLoading(false);
        })
        .catch(err => {
            console.error(err);
            setLoading(false);
        });
    }, [id, token]);

    return (
        <div className="admin-page-container">
            <Navbar />
            <div className="admin-content-wrapper">
                <div className="admin-card text-left">
                    <button 
                        onClick={() => navigate(-1)} 
                        className="btn-back"
                    >
                        Back
                    </button>
                    
                    <h1 className="admin-title text-center">
                        Leaderboard
                    </h1>
                    <p className="admin-subtitle text-center">
                        {quiz ? `Quiz: ${quiz.title}` : "Loading..."}
                    </p>

                    <table className="table-container">
                        <thead>
                            <tr className="table-header-row">
                                <th className="table-th">Rank</th>
                                <th className="table-th">Student</th>
                                <th className="table-th text-center">Score</th>
                                <th className="table-th text-right">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {results.map((r, index) => (
                                <tr key={r._id} className="table-row">
                                    <td className="table-td table-rank">#{index + 1}</td>
                                    <td className="table-td">
                                        {r.userId ? (
                                            <>
                                                <div>{r.userId.userName}</div>
                                                <div className="table-user-email">{r.userId.email}</div>
                                            </>
                                        ) : "Unknown User"}
                                    </td>
                                    <td className="table-td table-score">
                                        {r.score} / {r.totalPoints}
                                    </td>
                                    <td className="table-td table-date">
                                        {new Date(r.completedAt).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    
                    {loading && (
                        <p className="quiz-list-empty mt-40">
                            Loading results...
                        </p>
                    )}
                    {!loading && results.length === 0 && (
                        <p className="quiz-list-empty mt-40">
                            No attempts yet for this quiz.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
