import { useState } from "react";
import {  useNavigate, useParams } from "react-router-dom";
import api from "../api/api";
import Navbar from "../components/Navbar";
import "../styles/admin.css";

export default function AddQuestions() {
  const { id } = useParams();
  const [question, setQuestion] = useState({
    text: "",
    option: ["", "", "", ""],
    correctAnswer: "",
    point: 1
  });
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();

  function updateOption(index, value) {
    const copy = [...question.option];
    copy[index] = value;
    setQuestion({ ...question, option: copy });
  }

  function addQuestionToList() {
    if (!question.text.trim()) return;

    setQuestions([...questions, {...question}]);


    setQuestion({
      text: "",
      option: ["", "", "", ""],
      correctAnswer: "",
      point: 1
    });
  }

  function deleteQuestion(index) {
    setQuestions(questions.filter((_, i) => i !== index));
  }

  async function saveAllQuestions() {
    await api.post("/question/add", {
      quizId : id,
      questions
    });

    alert("All questions saved!");
    navigate('/')
  }

  return (
    <div className="admin-page-container">
      <Navbar />
      <div className="admin-content-wrapper">
        <div className="admin-card text-left">
          <h1 className="admin-title text-center">Add Questions</h1>
          <p className="admin-subtitle text-center">Add questions to your newly created quiz.</p>

          <div className="form-container">
            <div className="form-group">
              <label className="form-label">Question Text</label>
              <input
                placeholder="What is React?"
                value={question.text}
                onChange={(e) =>
                  setQuestion({ ...question, text: e.target.value })
                }
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Options</label>
              <div className="question-options-container">
                {question.option.map((opt, i) => (
                  <input
                    key={i}
                    placeholder={`Option ${i + 1}`}
                    value={opt}
                    onChange={(e) => updateOption(i, e.target.value)}
                    className="form-input"
                  />
                ))}
              </div>
            </div>

            <div className="radio-group">
              <div className="flex-1">
                <label className="form-label">Correct Answer</label>
                <input
                  placeholder="Exact text of correct option"
                  value={question.correctAnswer}
                  onChange={(e) =>
                    setQuestion({ ...question, correctAnswer: e.target.value })
                  }
                  className="form-input"
                />
              </div>

              <div className="width-150">
                <label className="form-label">Points</label>
                <input
                  type="number"
                  placeholder="Points"
                  value={question.point}
                  onChange={(e) =>
                    setQuestion({ ...question, point: Number(e.target.value) })
                  }
                  className="form-input"
                />
              </div>
            </div>

            <button onClick={addQuestionToList} className="admin-btn-secondary">
              Add to List
            </button>
          </div>

          {questions.length > 0 && (
            <div className="mt-40 questions-added-section">
              <div className="quiz-list-header">
                <h3>Questions Added ({questions.length})</h3>
                <button onClick={saveAllQuestions} className="admin-btn-primary">
                  Save & Finish
                </button>
              </div>

              <div className="question-list">
                {questions.map((q, i) => (
                  <div key={i} className="question-card">
                    <button
                      className="question-delete-btn"
                      onClick={() => deleteQuestion(i)}
                      title="Delete Question"
                    >
                      Delete
                    </button>

                    <p className="question-text">
                      <span className="question-number">Q{i + 1}:</span> {q.text}
                    </p>
                    <ul className="question-options-list">
                      {q.option.map((o, j) => (
                        <li key={j} className={o === q.correctAnswer ? 'question-option-correct' : ''}>
                          {o} {o === q.correctAnswer && "(Correct)"}
                        </li>
                      ))}
                    </ul>
                    <p className="question-points">Points: {q.point}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
