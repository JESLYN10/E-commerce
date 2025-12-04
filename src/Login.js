import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ setIsLoggedIn }) => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    loginType: "user"
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (loginData.email === "admin@gmail.com") {
      setLoginData((prev) => ({ ...prev, loginType: "admin" }));
    } else {
      setLoginData((prev) => ({ ...prev, loginType: "user" }));
    }
  }, [loginData.email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData)
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token || "");
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("isLoggedIn", "true");
        setIsLoggedIn(true);

        if (data.user.role === "admin") {
          navigate("/admin");
        } else {
          const redirectPath = sessionStorage.getItem("redirectAfterLogin") || "/";
          sessionStorage.removeItem("redirectAfterLogin");
          navigate(redirectPath);
        }
      } else {
        setError(data.message || "Login failed");
      }
    } catch (error) {
      setError("Server error");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Login</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="email"
          name="email"
          value={loginData.email}
          onChange={handleChange}
          placeholder="Email"
          required
          style={styles.input}
        />
        <input
          type="password"
          name="password"
          value={loginData.password}
          onChange={handleChange}
          placeholder="Password"
          required
          style={styles.input}
        />
        <select
          name="loginType"
          value={loginData.loginType}
          onChange={handleChange}
          style={styles.select}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        {error && <p style={styles.error}>{error}</p>}
        <button type="submit" style={styles.button}>
          Login
        </button>
      </form>
      <p style={styles.footerText}>
        Don't have an account?{" "}
        <span style={styles.signupLink} onClick={() => navigate("/signup")}>
          Sign Up
        </span>
      </p>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    padding: "20px",
    backgroundColor: "#f4f4f9"
  },
  title: {
    fontSize: "24px",
    marginBottom: "20px",
    color: "#333"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    maxWidth: "400px",
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
  },
  input: {
    marginBottom: "15px",
    padding: "10px",
    fontSize: "14px",
    border: "1px solid #ddd",
    borderRadius: "5px"
  },
  select: {
    marginBottom: "15px",
    padding: "10px",
    fontSize: "14px",
    border: "1px solid #ddd",
    borderRadius: "5px"
  },
  button: {
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "10px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    textAlign: "center"
  },
  error: {
    color: "red",
    marginBottom: "10px",
    textAlign: "center"
  },
  footerText: {
    marginTop: "15px",
    color: "#333"
  },
  signupLink: {
    color: "#4CAF50",
    cursor: "pointer",
    textDecoration: "underline"
  }
};

export default Login;
