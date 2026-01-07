import { useState } from "react";
import {  useNavigate, useParams } from "react-router-dom";
import api from "../api/api";

export default function AddQuestions() {
  const { id } = useParams();
  const [question, setQuestion] = useState({
    text: "",
    options: ["", "", "", ""],
    correctAnswer: "",
    point: 1
  });
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();

  function updateOption(index, value) {
    const copy = [...question.options];
    copy[index] = value;
    setQuestion({ ...question, options: copy });
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
    <div>
      <h2>Add Questions</h2>

      <input
        placeholder="Question text"
        value={question.text}
        onChange={(e) =>
          setQuestion({ ...question, text: e.target.value })
        }
      />

      {question.options.map((opt, i) => (
        <input
          key={i}
          placeholder={`Option ${i + 1}`}
          value={opt}
          onChange={(e) => updateOption(i, e.target.value)}
        />
      ))}

      <input
        placeholder="Correct answer"
        value={question.correctAnswer}
        onChange={(e) =>
          setQuestion({ ...question, correctAnswer: e.target.value })
        }
      />

      <input
        type="number"
        placeholder="Points"
        value={question.point}
        onChange={(e) =>
          setQuestion({ ...question, point: Number(e.target.value) })
        }
      />

      <button onClick={addQuestionToList}>
        Add Question
      </button>

      <hr />

      <h3>Questions Added</h3>
        {questions.length > 0 && (
        <button onClick={saveAllQuestions}>
          Save All Questions
        </button>
      )}
      {questions.map((q, i) => (
        <div
          key={i}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "10px",
            position: "relative"
          }}
        >
          <button
            style={{
              position: "absolute",
              top: 5,
              right: 5
            }}
            onClick={() => deleteQuestion(i)}
          >
            ❌
          </button>

          <p><b>Q:</b> {q.text}</p>
          <ul>
            {q.options.map((o, j) => (
              <li key={j}>{o}</li>
            ))}
          </ul>
          <p><b>Correct:</b> {q.correctAnswer}</p>
          <p><b>Points:</b> {q.point}</p>
        </div>
      ))}

      
    </div>
  );
}
