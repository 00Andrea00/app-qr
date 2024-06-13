import React, { useState } from "react";
import { StaticImage } from "gatsby-plugin-image";
import "../buttons/buttons.css";
import BtnClose from "./BtnClose";
import "../modals/modal.css";
import "../buttons/buttons.css"

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
              <button onClick={handleDownload} className="btnPrimary">
                Png
              </button>
              <button onClick={handleDownload2} className="btnPrimary">
                Jpeg
              </button>
              <button onClick={handleDownload3} className="btnPrimary">
                Svg
              </button>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}

export default BtnDownload;