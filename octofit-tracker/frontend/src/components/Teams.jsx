import { useEffect, useState } from 'react';
import { safeApiUrl } from '../utils/api';

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const url = safeApiUrl('/api/teams');

    fetch(url)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data.teams)) {
          setTeams(data.teams);
        } else if (Array.isArray(data)) {
          setTeams(data);
        } else {
          setTeams(data.teams || []);
        }
      })
      .catch(() => setError('Unable to fetch teams'));
  }, []);

  return (
    <section>
      <h2>Teams</h2>
      {error && <p className="error">{error}</p>}
      <ul>
        {teams.map((team, index) => (
          <li key={team._id || team.id || index}>
            {team.name} — {team.description}
          </li>
        ))}
      </ul>
    </section>
  );
}
