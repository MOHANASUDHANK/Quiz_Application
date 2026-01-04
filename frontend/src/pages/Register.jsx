import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import api from "../api/api"

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
                console.log(form)
                
                const res = await api.post(`/auth/register`,form);
                console.log(res);
                Navigate(`/`)
                } catch (err) {
                        console.log(err)
                }
                
        }

        return (
        <div>
                <form>
                        <input
                        type = "text"
                        placeholder = "USERNAME"
                        name = "userName"
                        value = {form.userName}
                        onChange = {handleChange}
                        required
                        />
                        <input
                        type = "email"
                        placeholder = "EMAIL:"
                        name = "email"
                        value = {form.email}
                        onChange = {handleChange}
                        required
                        />
                        <input
                        type = "password"
                        placeholder = "PASSWORD"
                        name = "password"
                        value = {form.password}
                        onChange = {handleChange}
                        required
                        />
                        <button
                                onClick = {handleSubmit}
                        >Submit</button>
                </form>
               
        </div>
        )
}