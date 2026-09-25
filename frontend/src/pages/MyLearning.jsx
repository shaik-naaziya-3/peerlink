import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { getStudentSessions } from "../api";

function MyLearning() {
  const [sessions, setSessions] = useState([]);
  const [message, setMessage] = useState("Loading learning sessions...");

  useEffect(() => {
    const loadSessions = async () => {
      try {
        const response = await getStudentSessions();
        setSessions(response.data.sessions || []);
        setMessage("");
      } catch (error) {
        setMessage(
          error.response?.data?.message ||
          "Unable to load learning sessions."
        );
      }
    };

    loadSessions();
  }, []);

  return (
    <Layout>
      <div className="dashboard-header">
        <div>
          <span className="section-label">LEARNING</span>
          <h1>My Learning</h1>
          <p>View your scheduled learning sessions.</p>
        </div>
      </div>

      {message && <p>{message}</p>}
      {!message && sessions.length === 0 && (
        <p className="empty-state">
          No learning sessions yet. Accepted requests will appear here after a
          mentor schedules a session.
        </p>
      )}

      <div className="request-grid">
        {sessions.map((session) => (
          <SessionCard key={session._id} session={session} personLabel="Mentor" />
        ))}
      </div>
    </Layout>
  );
}

function SessionCard({ session, personLabel }) {
  return (
    <article className="request-card session-card">
      <div className="request-card-header">
        <h3>{session.skill?.title || "Unavailable skill"}</h3>
        <span className={`status-badge status-${session.status}`}>
          {session.status}
        </span>
      </div>
      <p>{personLabel}: {session.mentor?.name || "Unknown mentor"}</p>
      <p>Date: {session.date}</p>
      <p>Time: {session.time}</p>
      <p>Duration: {session.duration}</p>
    </article>
  );
}

export default MyLearning;
