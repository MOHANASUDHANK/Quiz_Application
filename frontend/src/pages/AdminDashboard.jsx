import { useNavigate, Link } from "react-router-dom"
import Navbar from "../components/Navbar"
import "../styles/admin.css"

export default function AdminDashboard(){
    const navigate = useNavigate();

    return (
        <div className="admin-page-container">
            <Navbar />
            <div className="admin-content-wrapper">
                <div className="admin-card">
                    <h1 className="admin-title">
                        Admin Dashboard
                    </h1>
                    <p className="admin-subtitle">
                        Welcome to your control panel. Manage staff accounts and overall quiz content.
                    </p>
                    
                    <div className="admin-button-group">
                        <button 
                            onClick={() => navigate('/teacher')}
                            className="admin-btn-primary"
                        >
                            Manage Quizzes & Leaderboards
                        </button>
                        
                        <button 
                            onClick={() => navigate('/admin/staff')}
                            className="admin-btn-secondary"
                        >
                            Manage Your Team
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}