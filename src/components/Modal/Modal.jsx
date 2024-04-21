import React from 'react';
import style from './Modal.module.css';

export const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className={style.modal}>
      <div className={style.modal_content}>
        <span className={style.close} onClick={onClose}>&times;</span>
        {children}
      </div>
    </div>
  );
}