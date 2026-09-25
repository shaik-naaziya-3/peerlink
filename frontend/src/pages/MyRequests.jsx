import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { getStudentRequests } from "../api";

function MyRequests() {
  const [requests, setRequests] = useState([]);
  const [message, setMessage] = useState("Loading learning requests...");

  useEffect(() => {
    const loadRequests = async () => {
      try {
        const response = await getStudentRequests();
        setRequests(response.data.requests || []);
        setMessage("");
      } catch (error) {
        setMessage(
          error.response?.data?.message ||
          "Unable to load learning requests."
        );
      }
    };

    loadRequests();
  }, []);

  return (
    <Layout>
      <div className="dashboard-header">
        <div>
          <span className="section-label">LEARNING</span>
          <h1>My Requests</h1>
          <p>Track the status of your learning requests.</p>
        </div>
      </div>

      {message && <p>{message}</p>}
      {!message && requests.length === 0 && (
        <p className="empty-state">No learning requests yet.</p>
      )}

      <div className="request-grid">
        {requests.map((request) => (
          <article className="request-card" key={request._id}>
            <div className="request-card-header">
              <h3>{request.skill?.title || "Unavailable skill"}</h3>
              <span className={`status-badge status-${request.status}`}>
                {request.status}
              </span>
            </div>
            <p>Mentor: {request.mentor?.name || "Unknown mentor"}</p>
            <small>Requested {formatDate(request.createdAt)}</small>
          </article>
        ))}
      </div>
    </Layout>
  );
}

function formatDate(value) {
  return new Date(value).toLocaleDateString();
}

export default MyRequests;
