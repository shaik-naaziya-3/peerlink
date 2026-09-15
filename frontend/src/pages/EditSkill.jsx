import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function EditSkill() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: ""
  });

  const [message, setMessage] = useState("Loading skill...");

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchSkill();
  }, []);

  const fetchSkill = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/skills/${id}`
      );

      const skill = response.data.skill;

      setFormData({
        title: skill.title,
        description: skill.description,
        category: skill.category
      });

      setMessage("");
    } catch (error) {
      setMessage("Unable to load skill");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:5000/api/skills/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setMessage(response.data.message);

      setTimeout(() => {
        navigate("/skills");
      }, 1000);
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
        "Unable to update skill"
      );
    }
  };

  return (
    <div>
      <h1>Edit Skill</h1>

      {message && <p>{message}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Skill Title</label>
          <br />

          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <br />

        <div>
          <label>Description</label>
          <br />

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <br />

        <div>
          <label>Category</label>
          <br />

          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          />
        </div>

        <br />

        <button type="submit">
          Update Skill
        </button>
      </form>
    </div>
  );
}

export default EditSkill;