import React, { useEffect, useState } from "react";
import axios from "axios";
import "./styles/Leaderboard.css";

interface User {
  id: string;
  userId: string;
  name: string;
  avatar: string;
  points: number;
}

export default function Leaderboard() {
  const [users, setUsers] = useState<User[]>([]);
  const loggedInUserId = localStorage.getItem("userId") || "";

  useEffect(() => {
    axios
      .get<User[]>("http://localhost:8080/leaderboard")
      .then(response => {
        const sortedUsers = response.data
          .map(user => ({
            ...user,
            avatar: `https://api.dicebear.com/7.x/thumbs/svg?seed=${user.name}`,
          }))
          .sort((a, b) => b.points - a.points);

        setUsers(sortedUsers);
      })
      .catch(error => console.error("Error fetching leaderboard data:", error));
  }, []);

  const topThree = users.slice(0, 3);
  const others = users.slice(3);

  return (
    <div className="leaderboard-container">
      <div className="top-section">
        <div className="leaderboard-title">
          <h2 className="leaderboard-title">🏆 Leaderboard 🏆</h2>
        </div>
      </div>

      <div className="top-three-container">
        {[topThree[1], topThree[0], topThree[2]].map((user, index) =>
          user ? (
            <div
              key={user.id}
              className={`top-three-card ${["top-two", "top-one", "top-three"][index]}`}
            >
              <p className="user-rank">{["🥈 Top 2", "🥇 Top 1", "🥉 Top 3"][index]}</p>
              <img src={user.avatar} alt={user.name} className="user-avatar" />
              <p className="user-name">{user.name}</p>
              <p className="user-score">{user.points} kWh</p>
            </div>
          ) : null
        )}
      </div>

      <div className="leaderboard-list">
        {others.map((user, index) => (
          <div
            key={user.id}
            className={`leaderboard-row ${user.userId === loggedInUserId ? "logged-in-user" : ""}`}
          >
            <span className="rank-number">{index + 4}</span>
            <div className="user-info">
              <img src={user.avatar} alt={user.name} className="user-avatar" />
              <div className="user-text">
                <p className="user-name">{user.name}</p>
                <p className="user-score">{user.points} kWh</p>
              </div>
            </div>
            <div className="progress-bar-container">
              <div
                className="progress-bar-fill"
                style={{ width: `${(user.points / users[0].points) * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
