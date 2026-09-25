import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import api, { getAuthHeaders } from "../api";

function EditSkill() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: ""
  });
  const [message, setMessage] = useState("Loading skill...");

  useEffect(() => {
    const fetchSkill = async () => {
      try {
        const response = await api.get(`/skills/${id}`);
        const skill = response.data.skill;
        setFormData({
          title: skill.title,
          description: skill.description,
          category: skill.category
        });
        setMessage("");
      } catch (error) {
        setMessage(
          error.response?.data?.message ||
          "Unable to load skill"
        );
      }
    };

    fetchSkill();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedFormData = {
      title: formData.title.trim(),
      description: formData.description.trim(),
      category: formData.category.trim()
    };

    if (Object.values(trimmedFormData).some((value) => !value)) {
      setMessage("Title, description and category cannot be empty.");
      return;
    }

    try {
      const response = await api.put(`/skills/${id}`, trimmedFormData, {
        headers: getAuthHeaders()
      });
      setMessage(response.data.message);
      setTimeout(() => navigate("/skills"), 700);
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
        "Unable to update skill"
      );
    }
  };

  return (
    <Layout>
      <div className="form-page">
        <Link to="/skills" className="back-link">← Back to Skills</Link>
        <div className="form-card">
          <div className="form-card-header">
            <div className="form-big-icon">✦</div>
            <div>
              <span className="section-label">MANAGE SKILL</span>
              <h1>Edit Skill</h1>
              <p>Update the information about your skill.</p>
            </div>
          </div>

          {message && (
            <div className={message.includes("success") ? "form-success" : "form-info"}>
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <label>Skill Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="5"
              required
            />
            <label>Category</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            />
            <div className="form-actions">
              <Link to="/skills" className="btn btn-light">Cancel</Link>
              <button type="submit" className="btn btn-primary">
                Save Changes →
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default EditSkill;
