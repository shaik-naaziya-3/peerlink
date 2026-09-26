import { Link, useNavigate } from "react-router-dom";
import {
  Bell,
  BookOpen,
  CalendarDays,
  Heart,
  LayoutDashboard,
  Link2,
  LogOut,
  Mail,
  MessageCircle,
  Search,
  Settings,
  UserRound,
} from "lucide-react";
import { getStoredUser } from "../api";

function Layout({ children }) {
  const navigate = useNavigate();

  const user = getStoredUser();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/");
  };

  return (
    <div className="app-layout">

      {/* SIDEBAR */}

      <aside className="sidebar">

        <Link to="/" className="sidebar-brand">
          <div className="sidebar-brand-icon">
            <Link2 size={20} strokeWidth={1.8} />
          </div>
          <div>
            <strong>PeerLink</strong>
            <span>Learn • Teach • Grow</span>
          </div>
        </Link>

        <div className="profile-mini">

          <div className="avatar">
            {user?.name?.charAt(0).toUpperCase() || "U"}
          </div>

          <div>
            <strong>{user?.name || "User"}</strong>
            <span>
              {user?.role === "mentor" ? "Mentor" : "Student"}
            </span>
          </div>

        </div>

        <nav className="sidebar-nav">

          <Link to="/dashboard" className="sidebar-link">
            <LayoutDashboard size={16} strokeWidth={1.8} />
            Dashboard
          </Link>

          <Link to="/skills" className="sidebar-link">
            <Search size={16} strokeWidth={1.8} />
            Browse Skills
          </Link>

          <Link to="/skills" className="sidebar-link">
            <Heart size={16} strokeWidth={1.8} />
            My Skills
          </Link>

          <div className="sidebar-section">
            LEARNING
          </div>

          {user?.role === "mentor" ? (
            <>
              <Link to="/incoming-requests" className="sidebar-link">
                <Mail size={16} strokeWidth={1.8} />
                Incoming Requests
              </Link>
              <Link to="/sessions" className="sidebar-link">
                <CalendarDays size={16} strokeWidth={1.8} />
                My Sessions
              </Link>
            </>
          ) : (
            <>
              <Link to="/requests" className="sidebar-link">
                <Mail size={16} strokeWidth={1.8} />
                My Requests
              </Link>
              <Link to="/learning" className="sidebar-link">
                <BookOpen size={16} strokeWidth={1.8} />
                My Learning
              </Link>
            </>
          )}

          <button className="sidebar-link disabled-link">
            <MessageCircle size={16} strokeWidth={1.8} />
            Messages
            <small>Soon</small>
          </button>

          <div className="sidebar-section">
            ACCOUNT
          </div>

          <Link to="/profile" className="sidebar-link">
            <UserRound size={16} strokeWidth={1.8} />
            Profile
          </Link>

          <button className="sidebar-link disabled-link">
            <Settings size={16} strokeWidth={1.8} />
            Settings
            <small>Soon</small>
          </button>

        </nav>

        <button
          className="logout-link"
          onClick={handleLogout}
        >
          <LogOut size={16} strokeWidth={1.8} />
          Logout
        </button>

      </aside>

      {/* MAIN */}

      <main className="main-content">

        <header className="topbar">

          <div>
            <span className="topbar-small">
              PEERLINK COMMUNITY
            </span>

            <h2>
              Welcome back, {user?.name?.split(" ")[0] || "User"}! 👋
            </h2>
          </div>

          <div className="topbar-actions">

            <button className="icon-button" aria-label="Notifications">
              <Bell size={17} strokeWidth={1.8} />
            </button>

            <button className="icon-button" aria-label="Settings">
              <Settings size={17} strokeWidth={1.8} />
            </button>

            <div className="top-avatar">
              {user?.name?.charAt(0).toUpperCase() || "U"}
            </div>

          </div>

        </header>

        <div className="page-content">
          {children}
        </div>

      </main>

    </div>
  );
}

export default Layout;