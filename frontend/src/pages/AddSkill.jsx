import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Lightbulb } from "lucide-react";
import Layout from "../components/Layout";
import api, { getAuthHeaders } from "../api";

function AddSkill() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: ""
  });
  const [message, setMessage] = useState("");

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
      const response = await api.post("/skills", trimmedFormData, {
        headers: getAuthHeaders()
      });
      setMessage(response.data.message);
      setTimeout(() => navigate("/skills"), 700);
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
        "Unable to create skill"
      );
    }
  };

  return (
    <Layout>
      <div className="form-page">
        <Link to="/skills" className="back-link">← Back to Skills</Link>
        <div className="form-card">
          <div className="form-card-header">
            <div className="form-big-icon"><Lightbulb size={24} strokeWidth={1.8} /></div>
            <div>
              <span className="section-label">SHARE KNOWLEDGE</span>
              <h1>Add a New Skill</h1>
              <p>Share your knowledge and help another student learn.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <label>Skill Title</label>
            <input
              type="text"
              name="title"
              placeholder="Example: Java Programming"
              value={formData.title}
              onChange={handleChange}
              required
            />
            <label>Description</label>
            <textarea
              name="description"
              placeholder="Describe what students can learn from you..."
              value={formData.description}
              onChange={handleChange}
              rows="5"
              required
            />
            <label>Category</label>
            <input
              type="text"
              name="category"
              placeholder="Example: Programming"
              value={formData.category}
              onChange={handleChange}
              required
            />
            {message && <div className="form-info">{message}</div>}
            <div className="form-actions">
              <Link to="/skills" className="btn btn-light">Cancel</Link>
              <button type="submit" className="btn btn-primary">
                Publish Skill →
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default AddSkill;
