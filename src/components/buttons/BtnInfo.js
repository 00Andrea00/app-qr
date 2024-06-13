import React, { useState } from "react";
import { StaticImage } from "gatsby-plugin-image";
import BtnClose2 from "./BtnClose2"; // importa el componente BtnClose
import "../buttons/buttons.css";
import "../modals/modal.css";


function BtnInfo({ message }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <button
        className="btnInfo animationFundido"
        onClick={handleOpenModal}
      >
        <StaticImage
          className="icon-info"
          src="../../images/icons/icon-info.png"
          alt="info"
        ></StaticImage>
      </button>
      {isOpen && (
        <div className="modalInfo modal-inline">
          <div className="modal-content">
          <BtnClose2 onClick={handleCloseModal} />
            <h2 className="h2">Cómo funciona el Creador de QR</h2>
            <div className="modale">
            <p>
              El Creador de QR es una herramienta interactiva que te permite generar códigos QR personalizados con facilidad. Aquí te explicamos cómo funciona:
              <br />
              <br />
              <span className="hamtaro">1- Introduce el contenido:</span> En el campo de texto, introduce el contenido que deseas que se muestre en el código QR. Puedes elegir entre diferentes tipos de contenido, como URLs, texto explicativo, imágenes o coordenadas geográficas.
              <br />
              <br />
              <span className="hamtaro">2-Personaliza el diseño:</span> Utiliza las opciones de personalización para cambiar el color y el tamaño del código QR. Puedes elegir entre diferentes colores y tamaños para adaptar el código QR a tus necesidades.
              <br />
              <br />
              <span className="hamtaro">3-Visualiza el código QR:</span> Una vez que hayas introducido el contenido y personalizado el diseño, el código QR se generará automáticamente. Puedes visualizarlo en la sección de visualización.
              <br />
              <br />
              <span className="hamtaro">4-Descarga el código QR:</span> Cuando estés satisfecho con el código QR, puedes descargarlo en diferentes formatos, como PNG, JPEG o SVG.
              <br />
              <br />
              El Creador de QR es una herramienta fácil de usar y accesible para todos. ¡Comienza a crear tus códigos QR ahora!
              
            </p>
            </div>

            
          </div>
        </div>
      )}
    </>
  );
}

export default BtnInfo;