import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Link2 } from "lucide-react";
import { registerUser } from "../api";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (
      !formData.name ||
      !formData.email ||
      !formData.password
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      setLoading(true);

      await registerUser(formData);

      navigate("/login");

    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Unable to create your account. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">

      {/* LEFT SIDE */}
      <div className="auth-brand">

        <Link to="/" className="auth-logo">
          <Link2 size={22} strokeWidth={1.8} />
          PeerLink
        </Link>

        <div className="auth-illustration">

          <div className="auth-orbit orbit-one"></div>
          <div className="auth-orbit orbit-two"></div>

          <div className="auth-person person-one">👩🏻‍💻</div>
          <div className="auth-person person-two">👨🏻‍💻</div>

          <div className="auth-graduation">🎓</div>

        </div>

        <div className="auth-brand-text">

          <h2>Learn. Teach. Grow Together.</h2>

          <p>
            Create your account and start connecting
            with students who share your passion for learning.
          </p>

        </div>

      </div>

      {/* RIGHT SIDE */}
      <div className="auth-form-section">

        <div className="auth-form-container">

          <Link to="/" className="mobile-back">
            ← Back to PeerLink
          </Link>

          <div className="auth-heading">

            <span className="auth-small-title">
              GET STARTED
            </span>

            <h1>Create Your Account</h1>

            <p>
              Start your learning journey today.
            </p>

          </div>

          <form onSubmit={handleSubmit}>

            {error && (
              <div className="form-error">
                {error}
              </div>
            )}

            <div className="form-group">

              <label>Full Name</label>

              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
              />

            </div>

            <div className="form-group">

              <label>Email address</label>

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
              />

            </div>

            <div className="form-group">

              <label>Password</label>

              <input
                type="password"
                name="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
              />

            </div>

            <div className="form-group">

              <label>Role</label>

              <div className="role-options">

                <label className="role-option">
                  <input
                    type="radio"
                    name="role"
                    value="student"
                    checked={formData.role === "student"}
                    onChange={handleChange}
                  />
                  <span>Student</span>
                </label>

                <label className="role-option">
                  <input
                    type="radio"
                    name="role"
                    value="mentor"
                    checked={formData.role === "mentor"}
                    onChange={handleChange}
                  />
                  <span>Mentor</span>
                </label>

              </div>

            </div>

            <button
              type="submit"
              className="auth-submit"
              disabled={loading}
            >
              {loading ? "Creating account..." : "Sign Up"}
            </button>

          </form>

          <p className="auth-bottom-text">
            Already have an account?
            <Link to="/login"> Login</Link>
          </p>

        </div>

      </div>

    </div>
  );
}

export default Register;