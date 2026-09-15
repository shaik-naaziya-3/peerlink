import { Link } from "react-router-dom";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div>
      <h1>PeerLink Dashboard</h1>

      <h2>Welcome, {user?.name}! 👋</h2>

      <p>
        Role: <strong>{user?.role}</strong>
      </p>

      <hr />

      <h3>What would you like to do?</h3>

      <div>
        <Link to="/skills">
          <button>Browse Skills</button>
        </Link>

        {user?.role === "mentor" && (
          <Link to="/skills/add">
            <button>Add Skill</button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Dashboard;