import React, { useState } from "react";

interface LoginFormProps {
  onLogin: (token: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null); // Define the type of error state
  const [activeColor, setActiveColor] = useState("");

  const handleColorChange = (color: string) => {
    setActiveColor(color);
  };

  const handleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error("Invalid username or password");
      }

      const data = await response.json();

      const token = data.token;

      onLogin(token);
    } catch (err: any) {
      // Use (?.) to handle potential null or undefined values
      setError(err?.message ?? "An error occurred while logging in");
    } finally {
      setLoading(false);
    }
  };

  const colors = [
    { color: "#68a6e8" },
    { color: "#ff3636" },
    { color: "#466b53" },
    { color: "#fa8eb2" },
    { color: "#faad5a" },
  ];

  return (
    <div
      className="login-container"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: activeColor ? activeColor : "#68a6e8",
      }}
    >
      <div
        className="login"
        style={{
          position: "relative",
          padding: "50px",
          background: "#fff",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          boxShadow: "0 25px 50px rgba(0,0,0,0.1)",
          width: "400px",
        }}
      >
        <h2
          style={{
            fontSize: 30,
            fontWeight: 800,
            borderLeft: "15px solid #68a6e8",
            lineHeight: "1em",
            padding: "10px",
            transition: "0.5s",
            color: "#333",
            borderColor: activeColor,
          }}
        >
          Login
        </h2>
        <div className="inputBox" style={{ position: "relative" }}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{
              position: "relative",
              width: "100%",
              padding: "10px 15px",
              outline: "none",
              border: "2px solid #555",
              fontSize: "1em",
              color: "#333",
            }}
          />
        </div>
        <div className="inputBox" style={{ position: "relative" }}>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              position: "relative",
              width: "100%",
              padding: "10px 15px",
              outline: "none",
              border: "2px solid #555",
              fontSize: "1em",
              color: "#333",
            }}
          />
        </div>
        <button
          type="button"
          onClick={handleLogin}
          disabled={loading}
          style={{
            fontSize: 15,
            background: activeColor ? activeColor : "#68a6e8",
            color: "#fff",
            transition: "0.5s",
            fontWeight: 500,
            cursor: loading ? "not-allowed" : "pointer",
            padding: "5px 130px",
            border: "none",
          }}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        {error && <div style={{ color: "red" }}>{error}</div>}
      </div>
      <div
        className="colors"
        style={{
          position: "absolute",
          right: 0,
          transform: "translateY(-50%)",
          top: "50%",
          padding: "10px",
          background: "#fff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        {colors.map(({ color }) => (
          <span
            key={color}
            className={activeColor === color ? "active" : ""}
            style={{
              position: "relative",
              width: "20px",
              height: "20px",
              backgroundColor: color,
              margin: "10px",
              borderRadius: "50%",
              cursor: "pointer",
            }}
            onClick={() => handleColorChange(color)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default LoginForm;
