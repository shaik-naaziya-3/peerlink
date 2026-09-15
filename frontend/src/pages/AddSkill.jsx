import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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

    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/skills",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setMessage(response.data.message);

      setFormData({
        title: "",
        description: "",
        category: ""
      });

      setTimeout(() => {
        navigate("/skills");
      }, 1000);
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
        "Unable to create skill"
      );
    }
  };

  return (
    <div>
      <h1>Add New Skill</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Skill Title</label>
          <br />

          <input
            type="text"
            name="title"
            placeholder="Example: Java Programming"
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
            placeholder="Describe what students can learn"
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
            placeholder="Example: Programming"
            value={formData.category}
            onChange={handleChange}
            required
          />
        </div>

        <br />

        <button type="submit">
          Add Skill
        </button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}

export default AddSkill;