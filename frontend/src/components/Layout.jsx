import { Link, useNavigate } from "react-router-dom";
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
          <div className="sidebar-brand-icon">♣</div>
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
            <span>▦</span>
            Dashboard
          </Link>

          <Link to="/skills" className="sidebar-link">
            <span>⌕</span>
            Browse Skills
          </Link>

          <Link to="/skills" className="sidebar-link">
            <span>♡</span>
            My Skills
          </Link>

          <div className="sidebar-section">
            LEARNING
          </div>

          {user?.role === "mentor" ? (
            <>
              <Link to="/incoming-requests" className="sidebar-link">
                <span>✉</span>
                Incoming Requests
              </Link>
              <Link to="/sessions" className="sidebar-link">
                <span>▣</span>
                My Sessions
              </Link>
            </>
          ) : (
            <>
              <Link to="/requests" className="sidebar-link">
                <span>✉</span>
                My Requests
              </Link>
              <Link to="/learning" className="sidebar-link">
                <span>▣</span>
                My Learning
              </Link>
            </>
          )}

          <button className="sidebar-link disabled-link">
            <span>◉</span>
            Messages
            <small>Soon</small>
          </button>

          <div className="sidebar-section">
            ACCOUNT
          </div>

          <Link to="/profile" className="sidebar-link">
            <span>◎</span>
            Profile
          </Link>

          <button className="sidebar-link disabled-link">
            <span>⚙</span>
            Settings
            <small>Soon</small>
          </button>

        </nav>

        <button
          className="logout-link"
          onClick={handleLogout}
        >
          <span>↪</span>
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

            <button className="icon-button">
              ♧
            </button>

            <button className="icon-button">
              ♢
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