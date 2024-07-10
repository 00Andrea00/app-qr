import React, { useState } from "react"
import { StaticImage } from "gatsby-plugin-image"
import "../buttons/buttons.css"
import BtnClose from "./BtnClose"
import BtnSecondary from "./BtnSecondary"

function BtnUserEdit({ className }) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleModal = () => {
    setIsOpen(!isOpen)
  }
  return (
    <React.Fragment>
      <div className="tooltip-container-configRol">
        <button
          className={`btnUserEdit animationFundido ${className}`}
          onClick={toggleModal}
        >
          <div className="icon-role-container">
            <StaticImage
              className="icon-role"
              src="../../images/icons/editar-usuario.png"
              alt="Icon-Role"
            />
            <span>Editar Usuario</span>
          </div>
        </button>
        <div className="tooltip-configRol">Modificar Usuario</div>
      </div>
      {isOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Modificar datos de Usuario</h2>
              <BtnClose onClick={toggleModal} />
            </div>
            <div className="modal-body">
              <p>Probando Probando</p>
              <BtnSecondary>&#10004;</BtnSecondary>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  )
}

export default BtnUserEdit
