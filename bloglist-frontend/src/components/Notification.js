import NotificationContext from '../NotificationContext'
import { useContext } from 'react'

const Notification = () => {
  const [notification] = useContext(NotificationContext)
  if (notification === null) {
    return null
  }

  return <div className="message">{notification}</div>
}

export default Notification
