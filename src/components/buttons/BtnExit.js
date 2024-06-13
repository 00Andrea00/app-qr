import React, { useState } from "react"
import { navigate } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import "../buttons/buttons.css"
import BtnSecondary from "./BtnSecondary"
import "../modals/modal.css"

function BtnExit() {
  const [isOpen, setIsOpen] = useState(false)

  const handleClose = () => {
    setIsOpen(false)
    navigate("/")
  }

  const handleBtnClick = () => {
    setIsOpen(true)
  }

  return (
    <React.Fragment>
      <button className="btnExit animationFundido" onClick={handleBtnClick}>
        <div className="icon-salir-container">
          <StaticImage
            className="icon-salir"
            src="../../images/icons/icon-salir.png"
            alt="salir"
          />
          <span>Salir</span>
        </div>
      </button>
      {isOpen && (
        <div className="modal-overlay">
          <div class="modal animationFundido">
            <div className="modal-header">
              <h2>Sesión cerrada correctamente</h2>
              <BtnSecondary onClick={handleClose}>SALIR</BtnSecondary>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  )
}

export default BtnExit