import { useEffect, useState } from "react"
import {useNavigate} from "react-router-dom"
import api from "../api/api"

export default function QuizList(){

        const [quizzes,setQuizze] = useState([]);
        const navigate = useNavigate();

        useEffect(()=>{
                api.get("/quiz").then(res=>setQuizze(res.data));
        },[]);

        return (<div>
           <h2>Quiz</h2>
           {
                quizzes.map((q)=>(
                        <div key={q.id}>
                                <h3>{q.title}</h3>
                                <button onClick={()=>navigate(`/quiz/${q._id}`)}>start</button>
                        </div>
                ))
           }     
        </div>)
}