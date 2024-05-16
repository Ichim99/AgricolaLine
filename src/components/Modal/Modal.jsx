import React from 'react';
import style from './Modal.module.css'

const Modal = ({ id, title, isOpen, onClose, children }) => {
  return (
    <div id={`${id}Modal`} className={style.modal} style={{ display: isOpen ? 'block' : 'none' }}>
      <div className={style.modal_content}>
        <div className={style.title}>
         <h2 >{title}</h2> 
         <span className={style.close} onClick={onClose}>&times;</span>
        
        </div>
        
        {children}
      </div>
    </div>
  );
}

export default Modal;