import { useState } from "react"

const Togglable = (props) => {
  const [visible, setVisible] = useState(false)

  const show = {display : visible ? '' : 'none'}
  const hide = {display: visible ? 'none' : ''}

  const changeVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div>
      <div style={hide}>
        <button onClick={changeVisibility}>{props.labelName}</button>
      </div>
      <div style={show}>
        {props.children}
        <button onClick={changeVisibility}>cancel</button>
      </div>
    </div>
  )
}

export default Togglable