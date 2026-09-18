import { useState } from "react";
import axios from "axios";
import DisconnectButton from "../components/DisconnectButton";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(null);
  const [message, setMessage] = useState("");

  const handleRegister = async () => {
    try {
      await axios.post("http://localhost:5000/api/register", { username, password });
      setMessage(" Registered! Now login.");
    } catch (err) {
      setMessage("error " + (err.response?.data?.message || "Registration failed"));
    }
  };

  async function handleLogin(e) {
    if (e) e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        setToken(data.token);
        window.location.href = "/";
      } else {
        setMessage("error " + (data.error || "Login failed"));
      }
    } catch (err) {
      setMessage(" Network error");
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <span style={styles.logo}></span>
          <h2 style={styles.title}>Welcome Customer</h2>
          <p style={styles.subtitle}>Sign in to your account or register to start</p>
        </div>

        <form onSubmit={handleLogin} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.buttonGroup}>
            <button type="submit" style={styles.primaryBtn}>
              Log In
            </button>
            <button type="button" onClick={handleRegister} style={styles.secondaryBtn}>
              Register
            </button>
          </div>
        </form>


        {message && (
          <div style={message.startsWith("error") ? styles.errorBadge : styles.successBadge}>
            {message}
          </div>
        )}

        <div style={styles.footer}>
          <DisconnectButton />
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    padding: "20px",
    boxSizing: "border-box",
  },
  card: {
    width: "100%",
    maxWidth: "420px",
    height: "auto",
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    padding: "32px",
    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.01)",
    border: "1px solid #e2e8f0",
    boxSizing: "border-box",
  },
  header: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center", 
    justifyContent: "center",
    textAlign: "center",
    marginBottom: "24px",
  },
  logo: {
    backgroundImage: "url('yoyo.png')",
    fontSize: "36px",
    display: "block",
    marginBottom: "15px",
    width: "160px",
    height: "120px",
    backgroundSize: "contain",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  },
  title: {
    margin: "0 0 6px 0",
    fontSize: "24px",
    fontWeight: "700",
    color: "#0f172a",
  },
  subtitle: {
    margin: 0,
    fontSize: "15px",
    color: "#ffb3c1",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    textAlign: "left",
  },
  label: {
    fontSize: "13px",
    fontWeight: "600",
    color: "#334155",
  },
  input: {
    padding: "10px 14px",
    borderRadius: "8px",
    fontSize: "15px",
    outline: "none",
    transition: "border-color 0.2s",
    boxSizing: "border-box",
    width: "100%",
    height: "44px",
  },
  buttonGroup: {
    display: "flex",
    gap: "10px",
    marginTop: "8px",
  },
  primaryBtn: {
    flex: 1,
    padding: "10px 16px",
    backgroundColor: "#ffe6e6ff",
    color: "#ffffff",
    border: "none",
    borderRadius: "8px",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
  },
  secondaryBtn: {
    flex: 1,
    padding: "10px 16px",
    backgroundColor: "#f8fafc",
    color: "#ffb3c1",
    border: "1px solid #ffb3c1",
    borderRadius: "8px",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
  },

  successBadge: {
    marginTop: "16px",
    padding: "10px 12px",
    backgroundColor: "#f0fdf4",
    color: "#ffb3c1",
    borderRadius: "8px",
    fontSize: "13px",
    border: "1px solid #ffb3c1",
    textAlign: "center",
  },
  errorBadge: {
    marginTop: "16px",
    padding: "10px 12px",
    backgroundColor: "#fef2f2",
    color: "#991b1b",
    borderRadius: "8px",
    fontSize: "13px",
    border: "1px solid #fecaca",
    textAlign: "center",
  },
  footer: {
    marginTop: "30px",
    padding: "10px 16px",
    paddingTop: "16px",
    borderTop: "4px solid #f1f5f9",
    textAlign: "center",
  },
};
