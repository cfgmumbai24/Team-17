import React, { useEffect, useState } from 'react';
import './Leaderboard.css';

interface Reward {
  username: string;
  points: number;
  status: string;
}

const Leaderboard: React.FC = () => {
  const [leaderboard, setLeaderboard] = useState<Reward[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch('http://localhost:3001/rewards/leaderboard', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch leaderboard data');
        }

        const data: Reward[] = await response.json();
        setLeaderboard(data);
      } catch (error) {
        setError((error as Error).message);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <div className="leaderboard-container">
      <h1>Leaderboard</h1>
      {error && <p className="error">{error}</p>}
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Username</th>
            <th>Points</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((reward, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{reward.username}</td>
              <td>{reward.points}</td>
              <td>{reward.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
