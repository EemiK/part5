const LoginForm = ({ name, password, handlers, submit }) => {
  return (
    <form onSubmit={submit}>
      <div>
        username
        <input
          id='username'
          type="text"
          value={name}
          name="Username"
          onChange={handlers[0]}
        />
      </div>
      <div>
        password
        <input
          id='password'
          type="password"
          value={password}
          name="Password"
          onChange={handlers[1]}
        />
      </div>
      <div>
        <button id="login-button" type="submit">login</button>
      </div>
    </form>
  )
}

export default LoginForm