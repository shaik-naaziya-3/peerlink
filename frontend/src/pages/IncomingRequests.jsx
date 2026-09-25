import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import {
  createLearningSession,
  getMentorSessions,
  getMentorRequests,
  updateRequestStatus
} from "../api";

function IncomingRequests() {
  const [requests, setRequests] = useState([]);
  const [message, setMessage] = useState("Loading incoming requests...");
  const [updatingId, setUpdatingId] = useState("");
  const [schedulingRequest, setSchedulingRequest] = useState(null);
  const [sessionRequestIds, setSessionRequestIds] = useState([]);
  const [sessionForm, setSessionForm] = useState({
    date: "",
    time: "",
    duration: ""
  });

  useEffect(() => {
    const loadRequests = async () => {
      try {
        const [requestResponse, sessionResponse] = await Promise.all([
          getMentorRequests(),
          getMentorSessions()
        ]);
        setRequests(requestResponse.data.requests || []);
        setSessionRequestIds(
          (sessionResponse.data.sessions || [])
            .filter((session) => session.status === "scheduled")
            .map((session) => session.request?._id || session.request)
        );
        setMessage("");
      } catch (error) {
        setMessage(
          error.response?.data?.message ||
          "Unable to load incoming requests."
        );
      }
    };

    loadRequests();
  }, []);

  const openScheduleForm = (request) => {
    setSchedulingRequest(request);
    setSessionForm({ date: "", time: "", duration: "" });
    setMessage("");
  };

  const handleSchedule = async (event) => {
    event.preventDefault();
    setUpdatingId(schedulingRequest._id);

    try {
      const response = await createLearningSession({
        requestId: schedulingRequest._id,
        ...sessionForm
      });
      setMessage(response.data.message);
      const [requestResponse, sessionResponse] = await Promise.all([
        getMentorRequests(),
        getMentorSessions()
      ]);
      setRequests(requestResponse.data.requests || []);
      setSessionRequestIds(
        (sessionResponse.data.sessions || [])
          .filter((session) => session.status === "scheduled")
          .map((session) => session.request?._id || session.request)
      );
      setSchedulingRequest(null);
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
        "Unable to schedule session."
      );
    } finally {
      setUpdatingId("");
    }
  };

  const handleStatusUpdate = async (requestId, status) => {
    setUpdatingId(requestId);

    try {
      const response = await updateRequestStatus(requestId, status);
      setMessage(response.data.message);
      const refreshedResponse = await getMentorRequests();
      setRequests(refreshedResponse.data.requests || []);
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
        "Unable to update request."
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
          <h1>Incoming Requests</h1>
          <p>Review students who want to learn your skills.</p>
        </div>
      </div>

      {message && <p>{message}</p>}
      {!message && requests.length === 0 && (
        <p className="empty-state">No incoming learning requests yet.</p>
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
            <p>
              Student: {request.student?.name || "Unknown student"}
              {request.student?.email && ` (${request.student.email})`}
            </p>
            <small>Requested {formatDate(request.createdAt)}</small>

            {request.status === "pending" && (
              <div className="request-actions">
                <button
                  className="btn btn-primary"
                  disabled={updatingId === request._id}
                  onClick={() => handleStatusUpdate(request._id, "accepted")}
                >
                  Accept
                </button>
                <button
                  className="btn request-reject-button"
                  disabled={updatingId === request._id}
                  onClick={() => handleStatusUpdate(request._id, "rejected")}
                >
                  Reject
                </button>
              </div>
            )}

            {request.status === "accepted" &&
              !sessionRequestIds.includes(request._id) && (
                <button
                  className="btn btn-primary schedule-session-button"
                  onClick={() => openScheduleForm(request)}
                >
                  Schedule Session
                </button>
              )}

            {request.status === "accepted" &&
              sessionRequestIds.includes(request._id) && (
                <p className="session-scheduled-note">
                  Session scheduled
                </p>
              )}
          </article>
        ))}
      </div>

      {schedulingRequest && (
        <div className="session-form-card">
          <div className="request-card-header">
            <h2>Schedule Session</h2>
            <button
              className="session-close-button"
              type="button"
              onClick={() => setSchedulingRequest(null)}
            >
              Close
            </button>
          </div>
          <p>
            Schedule a session for {schedulingRequest.student?.name || "this student"}.
          </p>
          <form className="session-form" onSubmit={handleSchedule}>
            <label>
              Date
              <input
                type="date"
                value={sessionForm.date}
                onChange={(event) =>
                  setSessionForm({ ...sessionForm, date: event.target.value })
                }
                required
              />
            </label>
            <label>
              Time
              <input
                type="time"
                value={sessionForm.time}
                onChange={(event) =>
                  setSessionForm({ ...sessionForm, time: event.target.value })
                }
                required
              />
            </label>
            <label>
              Duration
              <input
                type="text"
                placeholder="e.g. 60 minutes"
                value={sessionForm.duration}
                onChange={(event) =>
                  setSessionForm({
                    ...sessionForm,
                    duration: event.target.value
                  })
                }
                required
              />
            </label>
            <button
              className="btn btn-primary"
              type="submit"
              disabled={updatingId === schedulingRequest._id}
            >
              {updatingId === schedulingRequest._id
                ? "Scheduling..."
                : "Save Session"}
            </button>
          </form>
        </div>
      )}
    </Layout>
  );
}

function formatDate(value) {
  return new Date(value).toLocaleDateString();
}

export default IncomingRequests;
