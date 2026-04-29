import { useEffect, useState } from "react"
import api from "../api/api"
import Navbar from "../components/Navbar"
import "../styles/admin.css"

export default function StaffManagement() {
    const [staff, setStaff] = useState([]);
    const [form, setForm] = useState({
        userName: "",
        email: "",
        password: "",
        role: "teacher"
    });
    
    const token = localStorage.getItem("token");

    const [loading, setLoading] = useState(true);

    const fetchStaff = () => {
        setLoading(true);
        api.get("/user/staff", {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(res => {
            setStaff(res.data);
            setLoading(false);
        })
        .catch(err => {
            console.error(err);
            setLoading(false);
        });
    };

    useEffect(() => {
        fetchStaff();
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleAddStaff = async (e) => {
        e.preventDefault();
        try {
            await api.post("/auth/add-staff", form, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setForm({ userName: "", email: "", password: "", role: "teacher" });
            fetchStaff(); // Refresh list
            alert("Staff added successfully!");
        } catch (err) {
            console.error("Failed to add staff", err);
            alert("Failed to add staff");
        }
    };

    const handleDeleteStaff = async (id) => {
        if (!window.confirm("Are you sure you want to delete this user?")) return;
        try {
            await api.delete(`/user/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setStaff(staff.filter(s => s._id !== id));
        } catch (err) {
            console.error("Failed to delete staff", err);
            alert("Failed to delete staff");
        }
    };

    return (
        <div className="admin-page-container">
            <Navbar />
            <div className="admin-content-wrapper">
                <div className="admin-card text-left">
                    <h1 className="admin-title text-center">
                        Team Management
                    </h1>
                    
                    <div className="mb-30 staff-form-wrapper">
                        <h3>Add New Staff</h3>
                        <form onSubmit={handleAddStaff} className="form-container">
                            <input 
                                placeholder="Username" name="userName" required 
                                value={form.userName} onChange={handleChange} 
                                className="form-input"
                            />
                            <input 
                                placeholder="Email" name="email" type="email" required 
                                value={form.email} onChange={handleChange} 
                                className="form-input"
                            />
                            <input 
                                placeholder="Password" name="password" type="password" required 
                                value={form.password} onChange={handleChange} 
                                className="form-input"
                            />
                            <select 
                                name="role" value={form.role} onChange={handleChange}
                                className="form-select"
                            >
                                <option value="teacher">Teacher</option>
                                <option value="admin">Admin</option>
                            </select>
                            <button type="submit" className="admin-btn-primary mt-20">Add Staff</button>
                        </form>
                    </div>

                    <div>
                        <h3>Current Staff</h3>
                        <div className="quiz-list-container">
                            {staff.map(s => (
                                <div key={s._id} className="quiz-list-item">
                                    <div>
                                        <strong>{s.userName}</strong> ({s.role}) - {s.email}
                                    </div>
                                    <button 
                                        onClick={() => handleDeleteStaff(s._id)}
                                        className="btn-danger"
                                    >
                                        Delete
                                    </button>
                                </div>
                            ))}
                            {loading && <p className="quiz-list-empty">Loading...</p>}
                            {!loading && staff.length === 0 && <p className="quiz-list-empty">No staff found.</p>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
