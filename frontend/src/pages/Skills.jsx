import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";
import Layout from "../components/Layout";
import api, { getAuthHeaders, getStoredUser } from "../api";

function Skills() {
  const [skills, setSkills] = useState([]);
  const [message, setMessage] = useState("Loading skills...");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const user = getStoredUser();

  useEffect(() => {
    const loadSkills = async () => {
      try {
        const response = await api.get("/skills");
        setSkills(response.data.skills || []);
        setMessage("");
      } catch {
        setMessage("Unable to load skills.");
      }
    };

    loadSkills();
  }, []);

  const categories = useMemo(
    () => [...new Set(skills.map((skill) => skill.category).filter(Boolean))].sort(),
    [skills]
  );

  const filteredSkills = useMemo(() => {
    const query = search.trim().toLowerCase();

    return skills.filter((skill) => {
      const matchesSearch =
        !query ||
        skill.title.toLowerCase().includes(query) ||
        skill.description.toLowerCase().includes(query);
      const matchesCategory = !category || skill.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [category, search, skills]);

  const handleDelete = async (skillId) => {
    if (!window.confirm("Are you sure you want to delete this skill?")) {
      return;
    }

    try {
      await api.delete(`/skills/${skillId}`, {
        headers: getAuthHeaders()
      });
      setSkills((currentSkills) =>
        currentSkills.filter((skill) => skill._id !== skillId)
      );
      setMessage("Skill deleted successfully.");
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
        "Unable to delete skill."
      );
    }
  };

  const clearFilters = () => {
    setSearch("");
    setCategory("");
  };

  const hasFilters = search.trim() || category;

  return (
    <Layout>
      <div className="dashboard-header">
        <div>
          <span className="section-label">SKILL LIBRARY</span>
          <h1>Browse Skills</h1>
          <p>Discover skills shared by the PeerLink community.</p>
        </div>
        {user?.role === "mentor" && (
          <Link to="/skills/add" className="btn btn-primary">
            Add Skill →
          </Link>
        )}
      </div>

      <div className="skill-filters">
        <input
          type="search"
          aria-label="Search skills"
          placeholder="Search by title or description"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <select
          aria-label="Filter skills by category"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        >
          <option value="">All categories</option>
          {categories.map((item) => (
            <option value={item} key={item}>{item}</option>
          ))}
        </select>
        {hasFilters && (
          <button type="button" className="btn" onClick={clearFilters}>
            Clear Filters
          </button>
        )}
      </div>

      {message && <p>{message}</p>}
      {!message && skills.length === 0 && (
        <p className="empty-state">No skills have been shared yet.</p>
      )}
      {!message && skills.length > 0 && filteredSkills.length === 0 && (
        <p className="empty-state">No skills match your search or category.</p>
      )}

      <div className="skill-grid">
        {filteredSkills.map((skill) => {
          const isOwner = user?.id === skill.mentor?._id;

          return (
            <article className="skill-card" key={skill._id}>
              <div className="skill-card-top">
                <div className="skill-icon"><Sparkles size={22} strokeWidth={1.8} /></div>
                <span className="skill-rating">{skill.category}</span>
              </div>
              <h3>{skill.title}</h3>
              <p>{skill.description}</p>
              <div className="skill-card-footer">
                <div className="mentor-mini">
                  <div className="avatar small">
                    {skill.mentor?.name?.charAt(0).toUpperCase() || "U"}
                  </div>
                  <span>{skill.mentor?.name || "Unknown mentor"}</span>
                </div>
                <div className="skill-actions">
                  <Link to={`/skills/${skill._id}`}>View Skill</Link>
                  {isOwner && (
                    <>
                      <Link to={`/skills/edit/${skill._id}`}>Edit</Link>
                      <button onClick={() => handleDelete(skill._id)}>
                        Delete
                      </button>
                    </>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </Layout>
  );
}

export default Skills;
