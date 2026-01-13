import { useEffect, useState } from "react"
import {useNavigate} from "react-router-dom"
import api from "../api/api"
import Navbar from "../components/NavBar";

export default function QuizList(){

        const [quizzes,setQuizzes] = useState([]);
        const navigate = useNavigate();

        useEffect(()=>{
                api.get("/quiz").then(res=>setQuizzes(res.data));
        },[]);

const token = localStorage.getItem("token");

const payload = JSON.parse(atob(token.split(".")[1]));

console.log(payload);

const isAdmin = payload!==null && payload.role !=null && payload.role == "admin";

console.log(isAdmin);

        return (<div>
                <Navbar/>
           <h2>Quiz</h2>
           <div>
           {
                isAdmin && (
                        <button
                        onClick={()=>navigate('/create')}
                        >Create Quiz</button>
                )
           }
           </div>
           {
                quizzes.map((q)=>(
                        <div key={q._id}>
                                <h3>{q.title}</h3>
                                <button onClick={()=>navigate(`/quiz/${q._id}`)}>start</button>
                        </div>
                ))
           }     
        </div>)
}