import React, { useState, useEffect } from 'react';
import style from './Animale.module.css';

export function Animale() {
  const [animaleData, setAnimaleData] = useState([]);

  useEffect(() => {
    afiseazaAnimale();
  }, []);

  const afiseazaAnimale = () => {
    let storedData = JSON.parse(localStorage.getItem('animaleData')) || [];
    setAnimaleData(storedData);
  }

  const modificaData = (id, newData) => {
    const updatedData = animaleData.map(item => {
      if (item.id === id) {
        return { ...item, data: newData };
      }
      return item;
    });
    setAnimaleData(updatedData);
    localStorage.setItem('animaleData', JSON.stringify(updatedData));
  }

  const modificaCalduri = (id, newData) => {
    const updatedData = animaleData.map(item => {
      if (item.id === id) {
        return { ...item, calduri: newData };
      }
      return item;
    });
    setAnimaleData(updatedData);
    localStorage.setItem('animaleData', JSON.stringify(updatedData));
  }

  const modificaInsamantare = (id, newData) => {
    const updatedData = animaleData.map(item => {
      if (item.id === id) {
        return { ...item, insamantare: newData };
      }
      return item;
    });
    setAnimaleData(updatedData);
    localStorage.setItem('animaleData', JSON.stringify(updatedData));
  }

  const renderRows = () => {
    return animaleData.map((item, index) => (
      <tr key={index}>
        <td>{item.id}</td>
        <td contentEditable onBlur={(e) => modificaData(item.id, e.target.textContent)}>{item.data}</td>
        <td contentEditable onBlur={(e) => modificaCalduri(item.id, e.target.textContent)}>{item.calduri}</td>
        <td contentEditable onBlur={(e) => modificaInsamantare(item.id, e.target.textContent)}>{item.insamantare}</td>
      </tr>
    ));
  }

  return (
    <>
      <table id="animaleTable" className={style.animaleTable}>
        <thead>
          <tr>
            <th>Id Vaca</th>
            <th>Data Fatare</th>
            <th>Data Caldurilor</th>
            <th>Data Insamantarii</th>
          </tr>
        </thead>
        <tbody>
          {renderRows()}
        </tbody>
      </table>
    </>
  )
}

// Introduceți informațiile despre vaci aici
const initialAnimaleData = [
  {
    id: 1,
    data: '2024-05-01',
    calduri: '2024-04-15',
    insamantare: '2024-05-10'
  },
  {
    id: 2,
    data: '2024-05-03',
    calduri: '2024-04-18',
    insamantare: '2024-05-12'
  },
  {
    id: 3,
    data: '2024-05-01',
    calduri: '2024-04-15',
    insamantare: '2024-05-10'
  },
  {
    id: 4,
    data: '2024-05-01',
    calduri: '2024-04-15',
    insamantare: '2024-05-10'
  },
  {
    id: 5,
    data: '2024-05-01',
    calduri: '2024-04-15',
    insamantare: '2024-05-10'
  },
  {
    id: 6,
    data: '2024-05-01',
    calduri: '2024-04-15',
    insamantare: '2024-05-10'
  },
  {
    id: 7,
    data: '2024-05-01',
    calduri: '2024-04-15',
    insamantare: '2024-05-10'
  },
  // Adăugați informații pentru alte vaci, dacă este necesar
];

localStorage.setItem('animaleData', JSON.stringify(initialAnimaleData));
