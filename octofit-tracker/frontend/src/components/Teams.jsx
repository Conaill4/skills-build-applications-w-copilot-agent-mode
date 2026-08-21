import { useEffect, useState } from 'react'

import { fetchCollection } from '../api.js'

const teamsEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams/`
  : 'http://localhost:8000/api/teams/'

function Teams() {
  const [teams, setTeams] = useState([])
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    let isMounted = true

    fetchCollection(teamsEndpoint, 'teams')
      .then((records) => {
        if (isMounted) {
          setTeams(records)
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
    return <p className="status-copy">Loading teams...</p>
  }

  if (status === 'error') {
    return <p className="status-copy">Unable to load teams.</p>
  }

  return (
    <section className="data-grid" aria-label="Teams">
      {teams.map((team) => (
        <article className="data-card" key={team._id || team.name}>
          <span className="eyebrow">{team.members?.length || 0} members</span>
          <h2>{team.name}</h2>
          <p>{team.motto}</p>
          <p className="meta">
            {team.members?.map((member) => member.displayName).join(', ') || 'Recruiting'}
          </p>
        </article>
      ))}
    </section>
  )
}

export default Teams