import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import { getApiHelpText } from './utils/api';

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <header>
          <h1>OctoFit Tracker</h1>
          <p>{getApiHelpText()}</p>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/users">Users</Link>
            <Link to="/teams">Teams</Link>
            <Link to="/activities">Activities</Link>
            <Link to="/leaderboard">Leaderboard</Link>
            <Link to="/workouts">Workouts</Link>
          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<Users />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/workouts" element={<Workouts />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

function Home() {
  return (
    <section>
      <h2>Welcome to the OctoFit Tracker</h2>
      <p>Use the navigation above to browse users, teams, activities, leaderboard, and workouts.</p>
    </section>
  );
}
