import { useEffect, useState } from "react";
import axios from "axios";
import "./styles/Leaderboard.css";
import { useOutletContext } from 'react-router-dom';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface ProfileContext {
  userData: {
    id: string;
    userId: string;
    firstName: string;
    name: string;
    avatar: string;
    points: number;
  }
}

interface User {
  id: string;
  userId: string;
  name: string;
  avatar: string;
  points: number;
}

export default function Leaderboard() {
  const { userData } = useOutletContext<ProfileContext>();
  const loggedInUserId = localStorage.getItem("userId") || "";
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    axios
      .get<User[]>(`${API_BASE_URL}/leaderboard`)
      .then(response => {
        let sortedUsers = response.data
          .map(user => ({
            ...user,
            name: user.name, 
            avatar: `https://api.dicebear.com/7.x/thumbs/svg?seed=${user.name}`,
          }));

        // Add logged-in user with 1200 points if not in leaderboard

        if (!sortedUsers.some(user => user.userId === loggedInUserId)) {
          sortedUsers.push({
            id: userData.id,
            userId: userData.userId,
            name: userData.firstName, // Assign firstName to name
            avatar: `https://api.dicebear.com/7.x/thumbs/svg?seed=${userData.avatar}`,
            points: 1200,
          });
        }
        sortedUsers = sortedUsers.sort((a, b) => b.points - a.points);
        setUsers(sortedUsers);
      })
      .catch(error => console.error("Error fetching leaderboard data:", error));
  }, [userData, loggedInUserId]);

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
              <p className="user-score">{user.points} ⭐</p>
            </div>
          ) : null
        )}
      </div>

      <div className="leaderboard-list">
        {others.map((user, index) => (
          <div
            key={user.id}
            className={`leaderboard-row`}
            //${user.id === userData.id ? "logged-in-user" : ""}
          >
            <span className="rank-number">{index + 4}</span>
            <div className="user-info">
              <img src={user.avatar} alt={user.name} className="user-avatar" />
              <div className="user-text">
                <p className="user-name">{user.name}</p>
                <p className="user-score">{user.points} ⭐</p>
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
