import { Link } from 'react-router-dom'
import LogoutButton from './LogoutButton'

const Menu = ({ user, submit }) => {
  const padding = {
    paddingRight: 5,
  }
  return (
    <div>
      <Link style={padding} to="/">
        blogs
      </Link>
      <Link style={padding} to="/users">
        users
      </Link>
      <div>{user.name} logged in <LogoutButton submit={submit}>log out</LogoutButton></div>
      <h2>blog app</h2>
    </div>
  )
}

export default Menu
