import {useState} from 'react'
import {useNavigate, Link} from 'react-router-dom'
import api from "../api/api"
import "../styles/auth.css"

export default function Register(){
    const [form,setForm] = useState({
            userName : "",
            email : "",
            password : ""
    })
    const Navigate = useNavigate();

    function handleChange(e){
            setForm({...form,[e.target.name] : e.target.value})
    }

    async function handleSubmit(e){
            try {
                e.preventDefault();
                const res = await api.post(`/auth/register`,form);
                Navigate(`/login`)
            } catch (err) {
                console.log(err)
            }
    }

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2 className="auth-title">Create Account</h2>
                <form className="auth-form" onSubmit={handleSubmit}>
                    <input
                        className="auth-input"
                        type="text"
                        placeholder="Username"
                        name="userName"
                        value={form.userName}
                        onChange={handleChange}
                        required
                    />
                    <input
                        className="auth-input"
                        type="email"
                        placeholder="Email Address"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />
                    <input
                        className="auth-input"
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        required
                    />
                    <button className="auth-button" type="submit">
                        Sign Up
                    </button>
                </form>
                <Link to="/login" className="auth-link">
                    Already have an account? Log in
                </Link>
            </div>
        </div>
    )
}