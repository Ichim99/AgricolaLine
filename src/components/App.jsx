// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {Animals} from './Animals/Animals';
import {Productivity} from './Productivity/Productivity';
import {Stock} from './Stock/Stock';
import {Button} from './Button/Button';
import { Modal } from './Modal/Modal';

export const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // Starea pentru controlul ferestrei modale

  const openModal = () => setIsModalOpen(true); // Funcția pentru deschiderea ferestrei modale
  const closeModal = () => setIsModalOpen(false); // Funcția pentru închiderea ferestrei modale

  return (
    <Router>
      <div>
        <Button label="Animals" onClick={() => window.location.href = '/animals'} />
        <Button label="Productivity" onClick={() => window.location.href = '/productivity'} />
        <Button label="Stock" onClick={() => window.location.href = '/stock'} /> {/* Apelăm funcția openModal când se dă clic pe butonul Stock */}
        
        <Routes>
          <Route path="/animals" element={<Animals />} />
          <Route path="/productivity" element={<Productivity />} />
          <Route path="/stock" element={<Stock />} />
        </Routes>

        <Modal isOpen={isModalOpen} onClose={closeModal} /> {/* Afisăm fereastra modală */}
      </div>
    </Router>
  );
}
