import { useEffect, useState } from 'react';
import { safeApiUrl } from '../utils/api';

// Codespaces API endpoint: https://{CODESPACE_NAME}-8000.app.github.dev/api/leaderboard

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const url = safeApiUrl('/api/leaderboard');

    fetch(url)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data.leaderboard)) {
          setLeaderboard(data.leaderboard);
        } else if (Array.isArray(data)) {
          setLeaderboard(data);
        } else {
          setLeaderboard(data.leaderboard || []);
        }
      })
      .catch(() => setError('Unable to fetch leaderboard'));
  }, []);

  return (
    <section>
      <h2>Leaderboard</h2>
      {error && <p className="error">{error}</p>}
      <ol>
        {leaderboard.map((entry, index) => (
          <li key={entry._id || entry.id || index}>
            {entry.rank}. {entry.userId?.name || entry.userId || 'Unknown'} — {entry.points} pts
          </li>
        ))}
      </ol>
    </section>
  );
}
