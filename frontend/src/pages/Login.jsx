import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../api";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
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

    if (!formData.email || !formData.password) {
      setError("Please enter email and password.");
      return;
    }

    try {
      setLoading(true);

      const response = await loginUser(formData);
      const data = response.data;

      localStorage.setItem("token", data.token);

      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Unable to log in. Please try again."
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
          <span>♣</span> PeerLink
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
            Join a community of learners and mentors.
            Share your skills, learn new ones, and grow together.
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
            <span className="auth-small-title">WELCOME BACK</span>

            <h1>Welcome Back!</h1>

            <p>
              Log in to continue your learning journey.
            </p>
          </div>

          <form onSubmit={handleSubmit}>

            {error && (
              <div className="form-error">
                {error}
              </div>
            )}

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
              <div className="password-label">
                <label>Password</label>
                <button type="button">
                  Forgot password?
                </button>
              </div>

              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <label className="remember">
              <input type="checkbox" />
              <span>Remember me</span>
            </label>

            <button
              type="submit"
              className="auth-submit"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>

          </form>

          <div className="auth-divider">
            <span>or continue with</span>
          </div>

          <div className="social-buttons">
            <button type="button">
              <span>G</span>
              Google
            </button>

            <button type="button">
              <span>◉</span>
              GitHub
            </button>
          </div>

          <p className="auth-bottom-text">
            Don't have an account?
            <Link to="/register"> Sign Up</Link>
          </p>

        </div>

      </div>

    </div>
  );
}

export default Login;