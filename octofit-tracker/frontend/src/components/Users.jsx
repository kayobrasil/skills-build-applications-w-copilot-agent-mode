import { useEffect, useState } from 'react';
import { safeApiUrl } from '../utils/api';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const url = safeApiUrl('/api/users');

    fetch(url)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data.users)) {
          setUsers(data.users);
        } else if (Array.isArray(data)) {
          setUsers(data);
        } else {
          setUsers(data.users || []);
        }
      })
      .catch(() => setError('Unable to fetch users'));
  }, []);

  return (
    <section>
      <h2>Users</h2>
      {error && <p className="error">{error}</p>}
      <ul>
        {users.map(user => (
          <li key={user._id || user.id}>{user.name} ({user.email})</li>
        ))}
      </ul>
    </section>
  );
}
