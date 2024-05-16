// App.js
import React, { useState} from 'react';
import style from './App.module.css'
import Modal from './Modal/Modal';
import { Stock } from './Stoc/Stock';
import { Animale } from './Animale/Animale';
import { Productivitate } from './Productivitate/Productivitate';
import { Utilaje } from './Utilaje/Utilaje';
import { Personal } from './Personal/Personal';
import { Provizionari } from './Provizionari/Provizionari';



function App() {
  const [modalState, setModalState] = useState({
    productivitate: false,
    animale: false,
    stock: false,
    utilaje: false,
    personal: false,
    provizionari: false,
    meteo: false
  });

  const openModal = (modalId) => {
    setModalState(prevState => ({ ...prevState, [modalId]: true }));
  }

  const closeModal = (modalId) => {
    setModalState(prevState => ({ ...prevState, [modalId]: false }));
  }

  

  

  
  

  return (
    <div className={style.App}>
      <div className={style.button_container}>
        <button onClick={() => openModal('productivitate')} className={style.button}>Productivitate</button>
        <button onClick={() => openModal('animale')} className={style.button}>Animale</button>
        <button onClick={() => openModal('stock')} className={style.button}>Stoc Furaje</button>
        <button onClick={() => openModal('utilaje')} className={style.button}>Utilaje</button>
        <button onClick={() => openModal('personal')} className={style.button}>Personal</button>
        <button onClick={() => openModal('provizionari')} className={style.button}>Provizionări</button>
      </div>
      <div className={style.modalContainer}>
        <Modal id="productivitate" title="Productivitate Lapte" isOpen={modalState.productivitate} onClose={() => closeModal('productivitate')}>
        <Productivitate />
      </Modal>
      <Modal id="animale" title="Animale" isOpen={modalState.animale} onClose={() => closeModal('animale')}>
        <Animale />
      </Modal>
      <Modal id="stock" title="Stoc Furaje" isOpen={modalState.stock} onClose={() => closeModal('stock')}>
        <Stock />
      </Modal>
      <Modal id="utilaje" title="Utilaje" isOpen={modalState.utilaje} onClose={() => closeModal('utilaje')}>
        <Utilaje />
      </Modal>
      <Modal id="personal" title="Personal" isOpen={modalState.personal} onClose={() => closeModal('personal')}>
        <Personal />
      </Modal>
      <Modal id="provizionari" title="Provizionari" isOpen={modalState.provizionari} onClose={() => closeModal('provizionari')}>
        <Provizionari />
      </Modal>
      
      </div>
      
    </div>
  );
}

export default App;

