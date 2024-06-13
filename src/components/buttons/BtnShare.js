import React, { useState } from "react"
import { StaticImage } from "gatsby-plugin-image"
import "../buttons/buttons.css"
import BtnClose from "./BtnClose"
import BtnsSocialMedia from "./BtnsSocialMedia"
import "../modals/modal.css"

function BtnShare() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleModal = () => {
    setIsOpen(!isOpen)
  }
  return (
    <React.Fragment>
      <button className="btnShare animationFundido" onClick={toggleModal}>
        <StaticImage
          className="icon-share"
          src="../../images/icons/icon-Share.png"
          alt="Share"
        ></StaticImage>
      </button>
      {isOpen && (
        <div className="modal-overlay">
          <div className="modal animationFundido">
            <div className="modal-header">
              <h2>Compartir en redes sociales</h2>
              <BtnClose onClick={toggleModal}></BtnClose>
            </div>
            <div className="modal-body">
              <p>Seleccione la red social donde desea compartir esta App</p>
              <BtnsSocialMedia></BtnsSocialMedia>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  )
}

export default BtnShare
