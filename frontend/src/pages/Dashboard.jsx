import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Lightbulb, Search, Sparkles, UserRound } from "lucide-react";
import Layout from "../components/Layout";
import api, { getStoredUser } from "../api";

function Dashboard() {
  const storedUser = getStoredUser();
  const [user] = useState(storedUser);
  const [skills, setSkills] = useState([]);
  const [message, setMessage] = useState("Loading dashboard...");

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const response = await api.get("/skills");
        setSkills(response.data.skills || []);
        setMessage("");
      } catch {
        setMessage("Unable to load dashboard data.");
      }
    };

    loadDashboard();
  }, []);

  const isMentor = user?.role === "mentor";
  const ownSkills = skills.filter(
    (skill) => user?.id === skill.mentor?._id
  );
  const featuredSkills = skills.slice(0, 4);

  return (
    <Layout>
      <div className="dashboard-header">
        <div>
          <span className="section-label">DASHBOARD</span>
          <h1>Your learning journey starts here.</h1>
          <p>
            Welcome back, {user?.name || "User"}. Discover skills,
            connect with peers and grow together.
          </p>
        </div>
        <Link to="/skills" className="btn btn-primary">
          Browse Skills →
        </Link>
      </div>

      {message && <p className="dashboard-message">{message}</p>}

      <div className="stats-grid">
        <StatCard label="Skills Available" value={skills.length} icon={<Heart size={20} strokeWidth={1.8} />} />
        {isMentor && (
          <StatCard label="Your Skills" value={ownSkills.length} icon={<Sparkles size={20} strokeWidth={1.8} />} />
        )}
        <StatCard label="Your Role" value={isMentor ? "Mentor" : "Student"} icon={<UserRound size={20} strokeWidth={1.8} />} />
      </div>

      <div className="section-heading">
        <div>
          <h2>Recent Skills</h2>
          <p>Explore the latest skills shared by the community.</p>
        </div>
        <Link to="/skills">View All →</Link>
      </div>

      {featuredSkills.length === 0 && !message && (
        <p className="empty-state">No skills have been shared yet.</p>
      )}

      <div className="skill-grid">
        {featuredSkills.map((skill) => (
          <SkillCard key={skill._id} skill={skill} />
        ))}
      </div>

      <div className="quick-section">
        <div className="quick-card">
          <div className="quick-card-icon"><Search size={22} strokeWidth={1.8} /></div>
          <div>
            <h3>Find something new to learn</h3>
            <p>Browse skills shared by other students.</p>
          </div>
          <Link to="/skills">Explore →</Link>
        </div>

        {isMentor && (
          <div className="quick-card">
            <div className="quick-card-icon"><Lightbulb size={22} strokeWidth={1.8} /></div>
            <div>
              <h3>Share your knowledge</h3>
              <p>Add a skill and help another student.</p>
            </div>
            <Link to="/skills/add">Add Skill →</Link>
          </div>
        )}
      </div>
    </Layout>
  );
}

function StatCard({ label, value, icon }) {
  return (
    <div className="stat-card">
      <div className="stat-icon purple">{icon}</div>
      <div>
        <span>{label}</span>
        <strong>{value}</strong>
      </div>
    </div>
  );
}

function SkillCard({ skill }) {
  return (
    <div className="skill-card">
      <div className="skill-card-top">
        <div className="skill-icon"><Sparkles size={22} strokeWidth={1.8} /></div>
        <span className="skill-rating">{skill.category}</span>
      </div>
      <h3>{skill.title}</h3>
      <p>{skill.description}</p>
      <div className="skill-card-footer">
        <div className="mentor-mini">
          <div className="avatar small">
            {skill.mentor?.name?.charAt(0).toUpperCase() || "U"}
          </div>
          <span>{skill.mentor?.name || "Unknown mentor"}</span>
        </div>
        <Link to="/skills">View</Link>
      </div>
    </div>
  );
}

export default Dashboard;
