const LoginForm = (props) => {
  return (
    <form onSubmit={props.handleLogin}>
      <div>
        <label>
          username
          <input
            type="text"
            value={props.username}
            onChange={props.handleUsername} />
        </label>
      </div>
      <div>
        <label>
          password
          <input
            type="password"
            value={props.password}
            onChange={props.handlePassword} />
        </label>
      </div>
      <button type="submit">login</button>
    </form>
  )
}

export default LoginForm