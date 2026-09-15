import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Skills() {
  const [skills, setSkills] = useState([]);
  const [message, setMessage] = useState("Loading skills...");

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/skills"
      );

      setSkills(response.data.skills);
      setMessage("");
    } catch (error) {
      setMessage("Unable to load skills");
    }
  };

  const handleDelete = async (skillId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this skill?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await axios.delete(
        `http://localhost:5000/api/skills/${skillId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setMessage("Skill deleted successfully");

      fetchSkills();
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
        "Unable to delete skill"
      );
    }
  };

  return (
    <div>
      <h1>Browse Skills</h1>

      {message && <p>{message}</p>}

      {skills.length === 0 && !message && (
        <p>No skills available yet.</p>
      )}

      {skills.map((skill) => {
        const isOwner =
          user?.id === skill.mentor?._id;

        return (
          <div key={skill._id}>
            <h2>{skill.title}</h2>

            <p>{skill.description}</p>

            <p>
              <strong>Category:</strong>{" "}
              {skill.category}
            </p>

            <p>
              <strong>Mentor:</strong>{" "}
              {skill.mentor?.name || "Unknown"}
            </p>

            {isOwner && (
              <div>
                <Link to={`/skills/edit/${skill._id}`}>
                  <button>Edit</button>
                </Link>

                <button
                  onClick={() => handleDelete(skill._id)}
                >
                  Delete
                </button>
              </div>
            )}

            <hr />
          </div>
        );
      })}
    </div>
  );
}

export default Skills;