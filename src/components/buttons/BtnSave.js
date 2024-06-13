import React, { useState } from "react"
import { StaticImage } from "gatsby-plugin-image"
import "../buttons/buttons.css"
import BtnClose from './BtnClose';
import "../modals/modal.css"

function BtnSave() {
  const [isOpen, setIsOpen] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    // código para guardar el archivo
    setSaved(true)
  }

  const toggleModal = () => {
    setIsOpen(!isOpen)
  }

  return (
    <React.Fragment>
      <button className="btnSave animationFundido" onClick={toggleModal}>
        <StaticImage
          className="icon-save"
          src="../../images/icons/icon-save.png"
          alt="Save"
        />
        <span>Guardar</span>
      </button>
      {isOpen && (
        <div className="modal-overlay">
          <div className="modal animationFundido">
            <div className="modal-header">
              <h2>Guardar archivo</h2>
              <BtnClose onClick={toggleModal}>
              </BtnClose>
            </div>
            <div className="modal-body">
              {saved ? (
                <p>Archivo guardado correctamente!</p>
              ) : (
                <p>Su código Qr ha guardado correctamente en la base de datos.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  )
}

export default BtnSave