import { useEffect, useState } from 'react'

import { fetchCollection } from '../api.js'

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([])
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    let isMounted = true

    fetchCollection('leaderboard')
      .then((records) => {
        if (isMounted) {
          setLeaderboard(records)
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
    return <p className="status-copy">Loading leaderboard...</p>
  }

  if (status === 'error') {
    return <p className="status-copy">Unable to load leaderboard.</p>
  }

  return (
    <section className="ranking-list" aria-label="Leaderboard">
      {leaderboard.map((entry) => (
        <article className="ranking-row" key={entry._id}>
          <strong>#{entry.rank}</strong>
          <div>
            <h2>{entry.user?.displayName || 'Athlete'}</h2>
            <p>{entry.team?.name || 'No team'}</p>
          </div>
          <span>{entry.points} pts</span>
        </article>
      ))}
    </section>
  )
}

export default Leaderboard