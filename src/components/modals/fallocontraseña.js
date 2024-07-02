import React, { useState } from 'react';
import Modal from 'react-modal';
import "./modal.css";
import BtnClose from '../buttons/BtnClose';
import BtnPrimary from '../buttons/BtnPrimary';

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
      <a href="#" onClick={openModal}>Olvidaste la contraseña</a>
      <Modal
        className="content"
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Introduce el email para enviarte la contraseña"
      >
        <div className="modalHeader">
          <h2>Recuperación de contraseñas</h2>
          <BtnClose onClick={closeModal} className="btnClose" />
        </div>
        <form>
          <div className='textos'>
            <label htmlFor="input1">Email al que enviar la contraseña:</label>
            <input id="input1" type="text" className='inputpass' required placeholder='Introduce tu correo' />
          </div>
          <div className='btnpassenv'>
          <BtnPrimary>Enviar</BtnPrimary>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default FalloContraseña;