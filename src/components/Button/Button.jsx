import React from 'react';
import style from './Button.module.css';

export const Button = ({ label, onClick }) => {
  return (
  <button onClick={onClick} className={style.button}>{label}</button>
  );
};