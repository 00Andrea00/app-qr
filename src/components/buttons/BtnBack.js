import React from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import "../buttons/buttons.css"

function BtnBack() {
  return (
<button className="btnBack animationFundido" onClick={onClick}>
      <StaticImage
        className="profile-2"
        src="../../images/icons/icon-back.png"
        alt="profile-2"
      ></StaticImage>
      <span>Atrás</span>
    </button>
  )
}

export default BtnBack