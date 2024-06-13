import React from "react"
import "../buttons/buttons.css"

function BtnSecondary({ onClick, children }) {
  return (
    <button className="btnSecondary animationFundido" onClick={onClick}>
      <span>{children}</span>
    </button>
  )
}

export default BtnSecondary