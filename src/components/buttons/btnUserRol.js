import React, { useState } from "react"
import { StaticImage } from "gatsby-plugin-image"
import "../buttons/buttons.css"
import BtnClose from "./BtnClose"
import SelectRol from "../selects/select-rol"
import BtnSecondary from "./BtnSecondary"

function BtnRolUser({ className }) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleModal = () => {
    setIsOpen(!isOpen)
  }

  return (
    <React.Fragment>
      <div className="tooltip-container-configRol">
        <button
          className={`btnRolUser animationFundido ${className}`}
          onClick={toggleModal}
        >
          <div className="icon-role-container">
            <StaticImage
              className="icon-role"
              src="../../images/icons/config-rol.png"
              alt="Icon-Role"
            />
            <span>Editar Rol</span>
          </div>
        </button>
        <div className="tooltip-configRol">Editar Rol del Usuario</div>
      </div>
      {isOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Cambiar Rol de usuario</h2>
              <BtnClose onClick={toggleModal} />
            </div>
            <div className="modal-body">
              <p>Seleccione el Rol del usuario. Se guardará automáticamente:</p>
              <SelectRol></SelectRol>
              <BtnSecondary>&#10004;</BtnSecondary>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  )
}

export default BtnRolUser
