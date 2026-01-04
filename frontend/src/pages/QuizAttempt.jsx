import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/api";

export default function QuizAttempt() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);

    useEffect(() => {
        console.log(id);
        api.get(`/question/${id}`).then((r) => {setQuestions(r.data)
      setAnswers(new Array(r.data.length).fill(null));});

    }, [id]);

    async function  submitQuiz(){
        const result = await api.post(`/result/${id}/attempt`,{
            answer : answers
        })
        console.log(result.data);
        navigate(`/result/${result.data._id}`);
    }

    function handleChange( i, j){
        const copy = [...answers];
        copy[i]=j;
        setAnswers(copy);
        console.log(copy);
    }

    return (
        <div>
            <h2>Quiz</h2>
            {questions.map((q, i) => (
                <div key={q._id}>
                    <p>{q.text}</p>
                    {q.option.map((opt, j) => (
                        <label key={j}>
                            <input
                                type="radio"
                                name={`q-${i}`}
                                onChange={() => handleChange(i, opt)}
                            />
                            {opt}
                        </label>
                    ))}
                </div>
            ))}
             <button onClick={submitQuiz}>Submit</button>
        </div>
    );
}
