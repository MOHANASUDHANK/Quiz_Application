import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";

export default function Result() {
  const { id } = useParams();
  const [result, setResult] = useState(null);


  useEffect(() => {
    async function fetchResult() {
      try {
        const res = await api.get(`/result/${id}`);
        setResult(res.data);
      } catch (err) {
        console.error("Error fetching result", err);
      } finally {
        setLoading(false);
      }
    }

    fetchResult();
  }, [id]);

  if (loading) {
    return <div>Loading result...</div>;
  }

  if (!result) {
    return <div>No result found</div>;
  }

  return (
    <div>
      <h2>Quiz Result</h2>

      <p>
        <strong>Score:</strong> {result.score} / {result.totalPoints}
      </p>

      <p>
        <strong>Quiz ID:</strong> {result.quizId}
      </p>

      <p>
        <strong>User ID:</strong> {result.userId}
      </p>

      <p>
        <strong>Completed At:</strong>{" "}
        {new Date(result.completedAt).toLocaleString()}
      </p>
    </div>
  );
}
