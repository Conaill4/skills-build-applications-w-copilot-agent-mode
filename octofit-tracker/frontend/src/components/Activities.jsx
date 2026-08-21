import { useEffect, useState } from 'react'

import { fetchCollection } from '../api.js'

function Activities() {
  const [activities, setActivities] = useState([])
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    let isMounted = true

    fetchCollection('activities')
      .then((records) => {
        if (isMounted) {
          setActivities(records)
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
    return <p className="status-copy">Loading activities...</p>
  }

  if (status === 'error') {
    return <p className="status-copy">Unable to load activities.</p>
  }

  return (
    <section className="data-grid" aria-label="Activities">
      {activities.map((activity) => (
        <article className="data-card" key={activity._id}>
          <span className="eyebrow">{activity.user?.displayName || 'Athlete'}</span>
          <h2>{activity.activityType}</h2>
          <p>{activity.durationMinutes} minutes</p>
          <p className="meta">{activity.caloriesBurned} calories burned</p>
        </article>
      ))}
    </section>
  )
}

export default Activities