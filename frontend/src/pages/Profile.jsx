import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import api, { getAuthHeaders } from "../api";

function Profile() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    bio: "",
    skills: ""
  });
  const [status, setStatus] = useState({
    type: "loading",
    message: "Loading profile..."
  });

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const response = await api.get("/users/profile", {
          headers: getAuthHeaders()
        });
        const user = response.data.user;

        setFormData({
          name: user.name || "",
          email: user.email || "",
          role: user.role || "",
          bio: user.bio || "",
          skills: (user.skills || []).join(", ")
        });
        setStatus({ type: "", message: "" });
      } catch {
        setStatus({
          type: "error",
          message: "Unable to load your profile."
        });
      }
    };

    loadProfile();
  }, []);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.name.trim()) {
      setStatus({ type: "error", message: "Name cannot be empty." });
      return;
    }

    try {
      const response = await api.put(
        "/users/profile",
        {
          name: formData.name.trim(),
          bio: formData.bio.trim(),
          skills: formData.skills
            .split(",")
            .map((skill) => skill.trim())
            .filter(Boolean)
        },
        { headers: getAuthHeaders() }
      );

      const user = response.data.user;
      localStorage.setItem("user", JSON.stringify({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }));
      setFormData({
        name: user.name,
        email: user.email,
        role: user.role,
        bio: user.bio || "",
        skills: (user.skills || []).join(", ")
      });
      setStatus({ type: "success", message: response.data.message });
    } catch (error) {
      setStatus({
        type: "error",
        message: error.response?.data?.message || "Unable to update your profile."
      });
    }
  };

  return (
    <Layout>
      <div className="dashboard-header">
        <div>
          <span className="section-label">ACCOUNT</span>
          <h1>Your Profile</h1>
          <p>Keep your PeerLink profile information up to date.</p>
        </div>
      </div>

      <div className="form-card profile-card">
        {status.message && (
          <div className={status.type === "error" ? "form-error" : "form-info"}>
            {status.message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <label htmlFor="profile-name">Name</label>
          <input
            id="profile-name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            disabled={status.type === "loading"}
            required
          />

          <label htmlFor="profile-email">Email</label>
          <input id="profile-email" type="email" value={formData.email} readOnly />

          <label htmlFor="profile-role">Role</label>
          <input id="profile-role" type="text" value={formData.role} readOnly />

          <label htmlFor="profile-bio">Bio</label>
          <textarea
            id="profile-bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            rows="5"
            disabled={status.type === "loading"}
          />

          <label htmlFor="profile-skills">Skills</label>
          <input
            id="profile-skills"
            name="skills"
            type="text"
            placeholder="JavaScript, Design, Public Speaking"
            value={formData.skills}
            onChange={handleChange}
            disabled={status.type === "loading"}
          />
          <p className="field-hint">Separate skills with commas.</p>

          <div className="form-actions">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={status.type === "loading"}
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}

export default Profile;
