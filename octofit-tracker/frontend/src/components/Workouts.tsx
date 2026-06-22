import { useEffect, useState } from 'react';
import { safeApiUrl } from '../utils/api';

export default function Workouts() {
  const [workouts, setWorkouts] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const url = safeApiUrl('/api/workouts');

    fetch(url)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data.workouts)) {
          setWorkouts(data.workouts);
        } else if (Array.isArray(data)) {
          setWorkouts(data);
        } else {
          setWorkouts(data.workouts || []);
        }
      })
      .catch(() => setError('Unable to fetch workouts'));
  }, []);

  return (
    <section>
      <h2>Workouts</h2>
      {error && <p className="error">{error}</p>}
      <ul>
        {workouts.map((workout, index) => (
          <li key={workout._id || workout.id || index}>
            <strong>{workout.name}</strong> — {workout.durationMinutes} min — {workout.difficulty}
          </li>
        ))}
      </ul>
    </section>
  );
}
