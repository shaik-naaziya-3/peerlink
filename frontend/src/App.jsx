import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Skills from "./pages/Skills";
import AddSkill from "./pages/AddSkill";
import EditSkill from "./pages/EditSkill";

function Home() {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "/";
  };

  return (
    <div>
      <h1>PeerLink</h1>
      <p>Learn. Teach. Grow Together.</p>

      {token && user ? (
        <div>
          <h2>Welcome, {user.name}! 👋</h2>

          <p>
            You are logged in as a <strong>{user.role}</strong>.
          </p>

          <button onClick={handleLogout}>
            Logout
          </button>
        </div>
      ) : (
        <div>
          <Link to="/login">
            <button>Login</button>
          </Link>

          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>
      )}
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
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/skills/add" element={<AddSkill />} />
        <Route
  path="/skills/edit/:id"
  element={<EditSkill />}
/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;