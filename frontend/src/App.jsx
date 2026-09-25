import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Skills from "./pages/Skills";
import AddSkill from "./pages/AddSkill";
import EditSkill from "./pages/EditSkill";
import Profile from "./pages/Profile";
import SkillDetails from "./pages/SkillDetails";
import MyRequests from "./pages/MyRequests";
import IncomingRequests from "./pages/IncomingRequests";
import MyLearning from "./pages/MyLearning";
import MySessions from "./pages/MySessions";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";

function Home() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="home-page">

      {/* NAVBAR */}
      <nav className="navbar">
        <Link to="/" className="logo">
          <span className="logo-icon">♣</span>
          Peer<span>Link</span>
        </Link>

        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/skills">Browse Skills</Link>
          <a href="#how">How It Works</a>
          <a href="#about">About Us</a>
        </div>

        <div className="nav-actions">
          {token ? (
            <>
              <Link to="/dashboard" className="nav-login">
                Dashboard
              </Link>
              <button onClick={handleLogout} className="nav-signup">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-login">
                Login
              </Link>
              <Link to="/register" className="nav-signup">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">

        <div className="hero-content">

          <div className="hero-badge">
            ✦ Learn from peers • Share your skills
          </div>

          <h1>
            Learn. Teach.
            <br />
            <span>Grow Together.</span>
          </h1>

          <p>
            PeerLink is a student-to-student skill exchange platform
            where you can learn new skills, share your expertise,
            and build a stronger community.
          </p>

          <div className="hero-buttons">
            {token ? (
              <Link to="/dashboard" className="primary-btn">
                Go to Dashboard →
              </Link>
            ) : (
              <Link to="/register" className="primary-btn">
                Get Started →
              </Link>
            )}

            <Link to="/skills" className="secondary-btn">
              Browse Skills
            </Link>
          </div>

          {/* STATS */}
          <div className="stats">

            <div className="stat">
              <strong>500+</strong>
              <span>Active Students</span>
            </div>

            <div className="stat">
              <strong>1200+</strong>
              <span>Skills Available</span>
            </div>

            <div className="stat">
              <strong>300+</strong>
              <span>Mentors</span>
            </div>

            <div className="stat">
              <strong>1000+</strong>
              <span>Connections Made</span>
            </div>

          </div>

        </div>

        {/* HERO VISUAL */}
        <div className="hero-visual">

          <div className="floating-card card-one">
            <span>💡</span>
            Learn
          </div>

          <div className="floating-card card-two">
            <span>💻</span>
            Teach
          </div>

          <div className="floating-card card-three">
            <span>🚀</span>
            Grow
          </div>

          <div className="people-card">

            <div className="circle circle-one">👩🏻‍💻</div>
            <div className="circle circle-two">👨🏻‍💻</div>

            <div className="connection-line">↔</div>

            <div className="skill-bubble bubble-one">
              Java
            </div>

            <div className="skill-bubble bubble-two">
              Python
            </div>

            <div className="skill-bubble bubble-three">
              Web Dev
            </div>

            <div className="people-text">
              <h3>Share Knowledge</h3>
              <p>Connect with students who want to learn from you.</p>
            </div>

          </div>

        </div>

      </section>

      {/* HOW IT WORKS */}
      <section className="how-section" id="how">

        <div className="section-heading">
          <span>HOW IT WORKS</span>
          <h2>Learn. Share. Connect.</h2>
          <p>
            PeerLink makes it simple to exchange knowledge with fellow students.
          </p>
        </div>

        <div className="steps">

          <div className="step-card">
            <div className="step-icon">🔎</div>
            <h3>Find a Skill</h3>
            <p>
              Browse skills offered by students and find something
              you want to learn.
            </p>
          </div>

          <div className="step-card">
            <div className="step-icon">🤝</div>
            <h3>Send a Request</h3>
            <p>
              Connect with a mentor and send a learning request.
            </p>
          </div>

          <div className="step-card">
            <div className="step-icon">🎓</div>
            <h3>Start Learning</h3>
            <p>
              Schedule a session and learn directly from your peer.
            </p>
          </div>

        </div>

      </section>

      {/* ABOUT */}
      <section className="about-section" id="about">

        <div>
          <span className="section-label">ABOUT PEERLINK</span>

          <h2>
            Knowledge becomes
            <span> powerful </span>
            when shared.
          </h2>

          <p>
            PeerLink creates a simple environment where students can
            teach what they know and learn what they don't.
          </p>

          <Link to="/skills" className="primary-btn">
            Explore Skills →
          </Link>
        </div>

        <div className="about-box">
          <div className="about-icon">👥</div>
          <h3>Student Community</h3>
          <p>
            Learn from peers, exchange knowledge and grow together.
          </p>
        </div>

      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-logo">
          <span>♣</span> PeerLink
        </div>

        <p>
          Learn. Teach. Grow Together.
        </p>

        <span className="copyright">
          © 2026 PeerLink. All rights reserved.
        </span>
      </footer>

    </div>
  );
}


function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/skills" element={<Skills />} />
        <Route path="/skills/:id" element={<SkillDetails />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/skills/add" element={<AddSkill />} />
          <Route path="/skills/edit/:id" element={<EditSkill />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/requests" element={<MyRequests />} />
          <Route path="/incoming-requests" element={<IncomingRequests />} />
          <Route path="/learning" element={<MyLearning />} />
          <Route path="/sessions" element={<MySessions />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;