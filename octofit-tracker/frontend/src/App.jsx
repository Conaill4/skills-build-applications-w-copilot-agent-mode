import { NavLink, Navigate, Route, Routes } from 'react-router-dom'

import { apiBaseUrl } from './api.js'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import logoUrl from '../../../docs/octofitapp-small.png'
import './App.css'

const navItems = [
  { to: '/users', label: 'Users' },
  { to: '/teams', label: 'Teams' },
  { to: '/activities', label: 'Activities' },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/workouts', label: 'Workouts' },
]

function App() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="brand-lockup">
          <img src={logoUrl} alt="OctoFit Tracker" />
          <div>
            <span className="eyebrow">OctoFit Tracker</span>
            <h1>Team fitness command center</h1>
          </div>
        </div>
        <div className="api-pill">
          <span>{codespaceName ? 'Codespaces API' : 'Local API'}</span>
          <code>{apiBaseUrl}</code>
        </div>
      </header>

      <nav className="section-tabs" aria-label="OctoFit sections">
        {navItems.map((item) => (
          <NavLink key={item.to} to={item.to}>
            {item.label}
          </NavLink>
        ))}
      </nav>

      <main className="content-panel">
        <Routes>
          <Route path="/" element={<Navigate to="/users" replace />} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
