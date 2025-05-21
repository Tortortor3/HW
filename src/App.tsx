import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

interface User {
  id: number;
  email: string;
  name: string;
  role: string;
  avatar: string;
  creationAt: string;
  updatedAt: string;
}

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedRole, setSelectedRole] = useState<string>("");

  useEffect(() => {
    axios
      .get("https://api.escuelajs.co/api/v1/users")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRole(event.target.value);
  };

  const filteredUsers = selectedRole
    ? users.filter((user) => user.role === selectedRole)
    : users;

  const uniqueRoles = Array.from(new Set(users.map((user) => user.role)));

  return (
    <div
      style={{
        backgroundColor: "#064e3b",
        color: "#ffffff",
        minHeight: "100vh",
        padding: "20px",
        fontFamily: "sans-serif",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "16px" }}>Matcha Dating 🌿</h1>

<div style={{ textAlign: "center", marginBottom: "16px" }}>
  <a href="/src/assets/index.html" target="_blank" rel="noopener noreferrer">
    <button
      style={{
        padding: "10px 20px",
        fontSize: "1rem",
        borderRadius: "8px",
        backgroundColor: "#40916c",
        color: "#ffffff",
        border: "none",
        cursor: "pointer",
        boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
      }}
    >
      Insight Data
    </button>
  </a>
</div>

      <div style={{ textAlign: "center", marginBottom: "24px" }}>
        <p style={{ fontWeight: "bold" }}>Filter by Role</p>
        <select
          onChange={handleFilterChange}
          value={selectedRole}
          style={{
            padding: "8px 12px",
            borderRadius: "8px",
            border: "none",
            boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
            fontSize: "1rem",
            backgroundColor: "#1b4332",
            color: "#ffffff",
          }}
        >
          <option value="">All Roles</option>
          {uniqueRoles.map((role, index) => (
            <option key={index} value={role}>
              {role}
            </option>
          ))}
        </select>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "20px",
          maxWidth: "960px",
          margin: "0 auto",
        }}
      >
        {filteredUsers.map((user) => (
          <div
            key={user.id}
            style={{
              backgroundColor: "#1b4332",
              padding: "20px",
              borderRadius: "16px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
              textAlign: "center",
              transition: "transform 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLDivElement).style.transform = "scale(1.03)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.transform = "scale(1)";
            }}
          >
            <img
              src={user.avatar}
              alt={user.name}
              style={{
                width: "100px",
                height: "100px",
                borderRadius: "50%",
                objectFit: "cover",
                marginBottom: "12px",
                border: "3px solid #95d5b2",
              }}
            />
            <h2 style={{ margin: "8px 0", fontSize: "1.2rem", color: "#d8f3dc" }}>{user.name}</h2>
            <p style={{ fontSize: "0.9rem", color: "#b7e4c7" }}>{user.email}</p>
            <p style={{ fontSize: "0.8rem", marginBottom: "12px", color: "#a3d9a5" }}>
              Role: {user.role}
            </p>
            <button
              style={{
                padding: "8px 16px",
                borderRadius: "999px",
                backgroundColor: "#52b788",
                color: "#fff",
                border: "none",
                cursor: "pointer",
              }}
              onClick={() => alert(`Viewing ${user.name}'s profile...`)}
            >
              View Profile
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
