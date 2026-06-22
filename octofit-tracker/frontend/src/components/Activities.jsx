import { useEffect, useState } from 'react';
import { safeApiUrl } from '../utils/api';

// Codespaces API endpoint: https://{CODESPACE_NAME}-8000.app.github.dev/api/activities

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const url = safeApiUrl('/api/activities');

    fetch(url)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data.activities)) {
          setActivities(data.activities);
        } else if (Array.isArray(data)) {
          setActivities(data);
        } else {
          setActivities(data.activities || []);
        }
      })
      .catch(() => setError('Unable to fetch activities'));
  }, []);

  return (
    <section>
      <h2>Activities</h2>
      {error && <p className="error">{error}</p>}
      <ul>
        {activities.map((activity, index) => (
          <li key={activity._id || activity.id || index}>
            {activity.type} – {activity.durationMinutes} min – {activity.calories} kcal
          </li>
        ))}
      </ul>
    </section>
  );
}
