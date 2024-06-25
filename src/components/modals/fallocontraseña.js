import React, { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#___gatsby'); // Esto es para accesibilidad

const FalloContraseña = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div>
      <a href="#" onClick={openModal}>Abrir Modal</a>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Formulario Modal"
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
          },
        }}
      >
        <h2>Formulario Modal</h2>
        <form>
          <div>
            <label htmlFor="input1">Etiqueta 1:</label>
            <input id="input1" type="text" />
          </div>
          <button type="button" onClick={closeModal}>Cerrar</button>
        </form>
      </Modal>
    </div>
  );
};

export default FalloContraseña;