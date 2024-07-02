// src/components/ContactLink.js
import React, { useState } from 'react';
import ModalRegistro from './modalregistro';

const ContactLink = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      <a href="#!" onClick={(e) => { e.preventDefault(); openModal(); }}>
        ¿Tienes problemas para registrarte?
      </a>
      <ModalRegistro isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default ContactLink;
