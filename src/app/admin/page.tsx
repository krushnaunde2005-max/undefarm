"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Leaf, Eye, EyeOff, Lock } from "lucide-react";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Simple client-side auth (admin credentials are hardcoded here)
    // For production: replace with a proper API call to /api/auth
    await new Promise((r) => setTimeout(r, 500));

    if (username === "undeFarmAdmin" && password === "UndeFarm2024!") {
      sessionStorage.setItem("undeFarm_admin", "authenticated");
      router.push("/admin/dashboard");
    } else {
      setError("Invalid username or password.");
    }
    setLoading(false);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f2d1c, #1a4a2e, #2d6a4f)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        fontFamily: "var(--font-body)",
      }}
    >
      {/* Background decorations */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              borderRadius: "50%",
              background: "rgba(82,183,136,0.05)",
              width: `${200 + i * 80}px`,
              height: `${200 + i * 80}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              transform: "translate(-50%,-50%)",
              animation: `float-${(i % 4) + 1} ${6 + i}s ease-in-out infinite`,
            }}
          />
        ))}
      </div>

      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Card */}
        <div
          className="glass-dark"
          style={{
            borderRadius: "24px",
            padding: "48px 40px",
            boxShadow: "0 30px 80px rgba(0,0,0,0.4)",
          }}
        >
          {/* Logo */}
          <div style={{ textAlign: "center", marginBottom: "36px" }}>
            <div
              style={{
                width: 64,
                height: 64,
                background: "linear-gradient(135deg, #52b788, #1a4a2e)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 16px",
                boxShadow: "0 8px 30px rgba(82,183,136,0.4)",
              }}
            >
              <Leaf size={30} color="white" />
            </div>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.8rem",
                fontWeight: 700,
                color: "white",
                marginBottom: "4px",
              }}
            >
              UNDE FARM
            </h1>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.85rem" }}>Admin Panel</p>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px 16px",
              background: "rgba(244,165,53,0.1)",
              border: "1px solid rgba(244,165,53,0.25)",
              borderRadius: "10px",
              marginBottom: "28px",
            }}
          >
            <Lock size={14} color="#f4a535" />
            <span style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.82rem" }}>
              Secure Admin Access
            </span>
          </div>

          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {/* Username */}
            <div>
              <label style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.85rem", marginBottom: "6px", display: "block" }}>
                Username
              </label>
              <input
                type="text"
                required
                placeholder="Admin username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{
                  width: "100%",
                  padding: "13px 16px",
                  background: "rgba(255,255,255,0.07)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: "12px",
                  color: "white",
                  fontFamily: "var(--font-body)",
                  fontSize: "0.95rem",
                  outline: "none",
                }}
                onFocus={(e) => (e.target.style.borderColor = "rgba(116,198,157,0.5)")}
                onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.12)")}
              />
            </div>

            {/* Password */}
            <div>
              <label style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.85rem", marginBottom: "6px", display: "block" }}>
                Password
              </label>
              <div style={{ position: "relative" }}>
                <input
                  type={showPw ? "text" : "password"}
                  required
                  placeholder="Admin password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "13px 48px 13px 16px",
                    background: "rgba(255,255,255,0.07)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    borderRadius: "12px",
                    color: "white",
                    fontFamily: "var(--font-body)",
                    fontSize: "0.95rem",
                    outline: "none",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "rgba(116,198,157,0.5)")}
                  onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.12)")}
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  style={{
                    position: "absolute",
                    right: "14px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    color: "rgba(255,255,255,0.4)",
                    cursor: "pointer",
                    padding: "0",
                  }}
                >
                  {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && (
              <div
                style={{
                  padding: "10px 14px",
                  background: "rgba(231,76,60,0.15)",
                  border: "1px solid rgba(231,76,60,0.3)",
                  borderRadius: "10px",
                  color: "#e74c3c",
                  fontSize: "0.85rem",
                }}
              >
                ⚠️ {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary"
              style={{ width: "100%", justifyContent: "center", marginTop: "8px" }}
            >
              {loading ? "Logging in..." : "🔓 Login to Admin Panel"}
            </button>
          </form>

          <p style={{ textAlign: "center", marginTop: "24px", color: "rgba(255,255,255,0.4)", fontSize: "0.8rem" }}>
            Default: undeFarmAdmin / UndeFarm2024!
          </p>
        </div>

        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <a href="/" style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.82rem", textDecoration: "none" }}>
            ← Back to Website
          </a>
        </div>
      </div>
    </div>
  );
}
