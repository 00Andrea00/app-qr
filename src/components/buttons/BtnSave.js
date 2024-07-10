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
    </React.Fragment>
  )
}

export default BtnSave