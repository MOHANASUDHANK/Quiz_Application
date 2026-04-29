import { Link, useNavigate } from "react-router-dom";
import "../styles/navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  
  let userRole = null;
  if (token) {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      userRole = payload.role;
    } catch (err) {
      console.error("Invalid token payload", err);
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar-container">
      <div className="navbar-logo">
        <Link to="/" className="navbar-brand">QuizApp</Link>
      </div>
      
      <div className="navbar-links">
        {token ? (
          <>
            <Link to="/" className="nav-link">Home</Link>
            
            {userRole === "teacher" && (
              <Link to="/teacher" className="nav-link">Teacher Dashboard</Link>
            )}
            
            {userRole === "admin" && (
              <>
                <Link to="/teacher" className="nav-link">Teacher Dashboard</Link>
                <Link to="/admin/staff" className="nav-link">Staff Management</Link>
              </>
            )}
            
            <button onClick={handleLogout} className="nav-logout-btn">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/register" className="nav-link nav-link-primary">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
