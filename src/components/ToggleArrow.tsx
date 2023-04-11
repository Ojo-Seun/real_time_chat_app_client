import { useState } from "react"
import DownArrow from "../icons/DownArrow.png"
import UpArrow from "../icons/UpArrow.png"

interface Props {
  handleClick: (e: boolean) => void
  status: boolean
}

function ToggleArrow({ handleClick, status }: Props) {
  const [downArrow, setDownArrow] = useState(false)

  const _handleClick = () => {
    setDownArrow(!downArrow)
    handleClick(!status)
  }
  return (
    <button style={style} onClick={_handleClick} type="button">
      <img style={{ objectFit: "cover" }} width={10} height={10} src={downArrow ? DownArrow : UpArrow} alt="arrow" />
    </button>
  )
}

const style = {
  outline: "none",
  border: "none",
  backgroundColor: "transparent",
  cursor: "pointer",
  marginLeft: ".5rem",
}

export default ToggleArrow
