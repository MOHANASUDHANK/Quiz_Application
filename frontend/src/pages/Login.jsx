import {useState} from "react";
import {useNavigate, Link} from "react-router-dom"
import api from "../api/api.js"
import "../styles/auth.css"

export default function Login(){
    const [email,setEmail] = useState("");
    const [password,setPassword]  = useState("");
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const res = await api.post(
                `/auth/login`,
                {
                    email,
                    password,
                }
            );
            localStorage.setItem("token" , res.data.token);
            const payload = JSON.parse(atob(res.data.token.split('.')[1]));
            if (payload.role === "admin" || payload.role === "teacher") {
                navigate('/admin');
            } else {
                navigate('/');
            }
        } catch (err) {
            console.error("Login failed:", err);
        }
    }

    return (
        <div className="auth-container"> 
            <div className="auth-card">
                <h2 className="auth-title">Welcome Back</h2>
                <form className="auth-form" onSubmit={handleSubmit}>
                    <input 
                        className="auth-input"
                        type="email"
                        onChange={e=>setEmail(e.target.value)} 
                        placeholder="Email Address"
                        required
                    />
                    <input 
                        className="auth-input"
                        type="password" 
                        onChange={e=>setPassword(e.target.value)} 
                        placeholder="Password"
                        required
                    />
                    <button className="auth-button" type="submit">Log In</button>
                </form>
                <Link to="/register" className="auth-link">
                    Don't have an account? Sign up
                </Link>
            </div>
        </div>
    )
}