import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/api";
import Navbar from "../components/Navbar";
import "../styles/admin.css";

export default function Result() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [result, setResult] = useState(null);
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchResult() {
      try {
        const res = await api.get(`/result/${id}`);
        setResult(res.data);
        if (res.data.quizId) {
           const quizRes = await api.get(`/quiz/${res.data.quizId}`);
           setQuiz(quizRes.data);
        }
      } catch (err) {
        console.error("Error fetching result", err);
      } finally {
        setLoading(false);
      }
    }

    fetchResult();
  }, [id]);

  if (loading) {
    return <p>Loading result...</p>;
  }

  if (!result) {
    return <p>No result found.</p>;
  }

  return (
    <div className="admin-page-container">
      <Navbar />
      <div className="admin-content-wrapper">
        <div className="admin-card">
          <h1 className="admin-title">Quiz Result</h1>
          <p className="admin-subtitle">{quiz ? quiz.title : "Your Performance"}</p>

          <div className="result-score-block">
            <div className="result-score-text">
              {result.score} <span className="result-score-max">/ {result.totalPoints}</span>
            </div>
            <p className="result-score-label">Total Score</p>
          </div>

          <div className="result-info-block">
            <p className="result-info-text">
              <strong>Date Taken:</strong> {new Date(result.completedAt).toLocaleString()}
            </p>
          </div>

          <button 
            onClick={() => navigate('/')} 
            className="admin-btn-primary w-100 mt-20"
          >
            Return to Home
          </button>
        </div>
      </div>
    </div>
  );
}
