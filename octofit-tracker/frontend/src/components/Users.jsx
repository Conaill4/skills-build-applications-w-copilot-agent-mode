import { useEffect, useState } from 'react'

import { fetchCollection } from '../api.js'

const usersEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/`
  : 'http://localhost:8000/api/users/'

function Users() {
  const [users, setUsers] = useState([])
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    let isMounted = true

    fetchCollection(usersEndpoint, 'users')
      .then((records) => {
        if (isMounted) {
          setUsers(records)
          setStatus('ready')
        }
      })
      .catch(() => {
        if (isMounted) {
          setStatus('error')
        }
      })

    return () => {
      isMounted = false
    }
  }, [])

  if (status === 'loading') {
    return <p className="status-copy">Loading users...</p>
  }

  if (status === 'error') {
    return <p className="status-copy">Unable to load users.</p>
  }

  return (
    <section className="data-grid" aria-label="Users">
      {users.map((user) => (
        <article className="data-card" key={user._id || user.username}>
          <span className="eyebrow">{user.username}</span>
          <h2>{user.displayName}</h2>
          <p>{user.fitnessGoal}</p>
          <p className="meta">Team: {user.team?.name || 'Independent'}</p>
        </article>
      ))}
    </section>
  )
}

export default Users