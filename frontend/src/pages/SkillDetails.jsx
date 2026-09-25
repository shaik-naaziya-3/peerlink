import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import api, { createLearningRequest, getStoredUser } from "../api";

function SkillDetails() {
  const { id } = useParams();
  const user = getStoredUser();
  const [skill, setSkill] = useState(null);
  const [status, setStatus] = useState({
    type: "loading",
    message: "Loading skill..."
  });
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const loadSkill = async () => {
      try {
        const response = await api.get(`/skills/${id}`);
        setSkill(response.data.skill);
        setStatus({ type: "", message: "" });
      } catch (error) {
        setStatus({
          type: "error",
          message: error.response?.data?.message || "Unable to load skill."
        });
      }
    };

    loadSkill();
  }, [id]);

  const handleRequest = async () => {
    setSending(true);
    setStatus({ type: "", message: "" });

    try {
      const response = await createLearningRequest(id);
      setStatus({ type: "success", message: response.data.message });
    } catch (error) {
      setStatus({
        type: "error",
        message: error.response?.data?.message ||
          "Unable to send learning request."
      });
    } finally {
      setSending(false);
    }
  };

  const isStudent = user?.role === "student";
  const isOwner = user?.id === skill?.mentor?._id;

  return (
    <Layout>
      <div className="form-page skill-details-page">
        <Link to="/skills" className="back-link">← Back to Skills</Link>

        {status.type === "loading" && <p>{status.message}</p>}
        {status.type === "error" && !skill && (
          <div className="form-error">{status.message}</div>
        )}

        {skill && (
          <article className="form-card skill-details-card">
            <span className="section-label">SKILL DETAILS</span>
            <h1>{skill.title}</h1>
            <p className="skill-details-description">{skill.description}</p>

            <div className="skill-details-meta">
              <span>Category: {skill.category}</span>
              <span>
                Mentor: {skill.mentor?.name || "Unknown mentor"}
              </span>
              {skill.mentor?.email && <span>{skill.mentor.email}</span>}
            </div>

            {status.message && (
              <div className={status.type === "success" ? "form-success" : "form-error"}>
                {status.message}
              </div>
            )}

            {isStudent && !isOwner && (
              <button
                className="btn btn-primary"
                onClick={handleRequest}
                disabled={sending}
              >
                {sending ? "Sending..." : "Send Learning Request"}
              </button>
            )}
          </article>
        )}
      </div>
    </Layout>
  );
}

export default SkillDetails;
