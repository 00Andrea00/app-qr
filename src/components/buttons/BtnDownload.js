import React, { useState } from "react";
import { StaticImage } from "gatsby-plugin-image";
import "../buttons/buttons.css";
import BtnClose from "./BtnClose";
import "../modals/modal.css";
import "../buttons/buttons.css"
import "../buttons/BtnPrimary"
import BtnPrimary from "../buttons/BtnPrimary";

function BtnDownload({ handleDownload, handleDownload2, handleDownload3 }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <React.Fragment>
      <button className="btnDownload animationFundido" onClick={toggleModal}>
        <StaticImage
          className="icon-download"
          src="../../images/icons/icon-download.png"
          alt="Download"
        />
        <span>Descargar</span>
      </button>
      {isOpen && (
        <div className="modal-overlay">
          <div className="modal animationFundido">
            <div className="modal-header">
              <h2>Descargar QR</h2>
              <BtnClose onClick={toggleModal} />
            </div>
            <div className="modal-body">
              <p>Seleccione el formato de descarga:</p>
              <BtnPrimary onClick={handleDownload}>
                Png
              </BtnPrimary>
              <BtnPrimary onClick={handleDownload2}>
                Jpeg
              </BtnPrimary>
              <BtnPrimary onClick={handleDownload3}>
                Svg
              </BtnPrimary>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}

export default BtnDownload;