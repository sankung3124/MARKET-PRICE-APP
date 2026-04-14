import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BarChart3 } from "lucide-react";

const MOCK_CREDENTIALS = {
  email: "vendor@markettracker.gm",
  password: "Demo@12345",
};

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const normalizedEmail = email.trim().toLowerCase();
    if (
      normalizedEmail === MOCK_CREDENTIALS.email &&
      password === MOCK_CREDENTIALS.password
    ) {
      localStorage.setItem(
        "mockAuthUser",
        JSON.stringify({
          email: MOCK_CREDENTIALS.email,
          name: "Fatou Trading Co.",
          role: "Market Vendor",
        })
      );
      setError("");
      navigate("/markets");
      return;
    }

    setError("Invalid demo credentials. Please use the mock account details.");
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">
          <BarChart3 size={28} />
        </div>
        <h1>Market Price Tracker</h1>
        <p className="auth-subtitle">The Gambia&apos;s Premier Market Price Platform</p>

        <div className="auth-tabs">
          <Link to="/login" className="auth-tab active">Login</Link>
          <Link to="/register" className="auth-tab">Register</Link>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label>Email Address</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error ? <p className="auth-error">{error}</p> : null}

          <button className="primary-btn" type="submit">Login</button>
        </form>

        <p className="auth-footnote">
          Don&apos;t have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
}
