import {useState} from "react";
import {useNavigate} from "react-router-dom"
import api from "../api/api.js"


export default function Login(){

        const [email,setEmail] = useState("");
        const [password,setPassword]  = useState("");
        const navigate = useNavigate();

        async function handleSubmit() {
                console.log(email,password);
                
                const res = await api.post(
                        `/auth/login`,
                        {
                        email,
                        password,
                });

                localStorage.setItem("token" , res.data.token);
                navigate('/');

        }

        return (
                <div> 
                        <input onChange={e=>setEmail(e.target.value)} placeholder = "email"/>
                        <input type= "password" onChange={e=>setPassword(e.target.value)} placeholder="password"/>
                        <button onClick ={handleSubmit}>Login</button>

                </div>
        )
}