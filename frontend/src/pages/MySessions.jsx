import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { getMentorSessions, updateSessionStatus } from "../api";

function MySessions() {
  const [sessions, setSessions] = useState([]);
  const [message, setMessage] = useState("Loading mentor sessions...");
  const [updatingId, setUpdatingId] = useState("");

  useEffect(() => {
    const loadSessions = async () => {
      try {
        const response = await getMentorSessions();
        setSessions(response.data.sessions || []);
        setMessage("");
      } catch (error) {
        setMessage(
          error.response?.data?.message ||
          "Unable to load mentor sessions."
        );
      }
    };

    loadSessions();
  }, []);

  const handleStatusUpdate = async (sessionId, status) => {
    setUpdatingId(sessionId);
    try {
      const response = await updateSessionStatus(sessionId, status);
      setMessage(response.data.message);
      const refreshedResponse = await getMentorSessions();
      setSessions(refreshedResponse.data.sessions || []);
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
        "Unable to update session."
      );
    } finally {
      setUpdatingId("");
    }
  };

  return (
    <Layout>
      <div className="dashboard-header">
        <div>
          <span className="section-label">LEARNING</span>
          <h1>My Sessions</h1>
          <p>Manage sessions scheduled with your students.</p>
        </div>
      </div>

      {message && <p>{message}</p>}
      {!message && sessions.length === 0 && (
        <p className="empty-state">
          No sessions yet. Schedule one from an accepted learning request.
        </p>
      )}

      <div className="request-grid">
        {sessions.map((session) => (
          <article className="request-card session-card" key={session._id}>
            <div className="request-card-header">
              <h3>{session.skill?.title || "Unavailable skill"}</h3>
              <span className={`status-badge status-${session.status}`}>
                {session.status}
              </span>
            </div>
            <p>Student: {session.student?.name || "Unknown student"}</p>
            <p>Date: {session.date}</p>
            <p>Time: {session.time}</p>
            <p>Duration: {session.duration}</p>

            {session.status === "scheduled" && (
              <div className="request-actions">
                <button
                  className="btn btn-primary"
                  disabled={updatingId === session._id}
                  onClick={() => handleStatusUpdate(session._id, "completed")}
                >
                  Mark Completed
                </button>
                <button
                  className="btn request-reject-button"
                  disabled={updatingId === session._id}
                  onClick={() => handleStatusUpdate(session._id, "cancelled")}
                >
                  Cancel Session
                </button>
              </div>
            )}
          </article>
        ))}
      </div>
    </Layout>
  );
}

export default MySessions;
