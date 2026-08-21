import { useEffect, useState } from 'react'

import { fetchCollection } from '../api.js'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    let isMounted = true

    fetchCollection('workouts')
      .then((records) => {
        if (isMounted) {
          setWorkouts(records)
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
    return <p className="status-copy">Loading workouts...</p>
  }

  if (status === 'error') {
    return <p className="status-copy">Unable to load workouts.</p>
  }

  return (
    <section className="data-grid" aria-label="Workouts">
      {workouts.map((workout) => (
        <article className="data-card" key={workout._id || workout.title}>
          <span className="eyebrow">{workout.difficulty}</span>
          <h2>{workout.title}</h2>
          <p>{workout.focusArea}</p>
          <p className="meta">{workout.estimatedMinutes} minutes</p>
        </article>
      ))}
    </section>
  )
}

export default Workouts