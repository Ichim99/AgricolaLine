import React, { useState } from 'react';
import { Modal } from '../Modal/Modal';

export const Animals = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <div>
      <button onClick={openModal}>Deschide fereastra modală pentru Componenta A</button>
      <Modal isOpen={modalOpen} onClose={closeModal}>
        <p>Acesta este conținutul ferestrei modale pentru Componenta A.</p>
      </Modal>
    </div>
  );
}


