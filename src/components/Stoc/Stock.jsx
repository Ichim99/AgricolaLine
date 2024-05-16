import React, { useState, useEffect } from 'react';
import style from './Stock.module.css';

export function Stock() {
  const [stockData, setStockData] = useState([
    { furaj: 'Ovăz', cantitate: 0 },
    { furaj: 'Orz', cantitate: 0 },
    { furaj: 'Grâu', cantitate: 0 },
    { furaj: 'Porumb', cantitate: 0 }
  ]);

  useEffect(() => {
    afiseazaStock();
  }, []);

  const salveazaStock = (furaj, cantitateModificare) => {
    let updatedData = [...stockData];
    const existingIndex = updatedData.findIndex(item => item.furaj === furaj);
    if (existingIndex !== -1) {
      updatedData[existingIndex].cantitate += cantitateModificare;
    }
    setStockData(updatedData);
    localStorage.setItem('stockData', JSON.stringify(updatedData));

    afiseazaStock();
  };

  const afiseazaStock = () => {
    const tableBody = document.getElementById('stockTableBody');
    tableBody.innerHTML = '';

    stockData.forEach(item => {
      const row = tableBody.insertRow();
      const cellFuraj = row.insertCell(0);
      const cellCantitate = row.insertCell(1);
      const cellActions = row.insertCell(2);

      cellFuraj.textContent = item.furaj;
      cellCantitate.textContent = item.cantitate;

      const inputCantitate = document.createElement('input');
      inputCantitate.type = 'number';
      inputCantitate.className = 'input-cantitate';
      cellActions.appendChild(inputCantitate);

      const buttonAdauga = document.createElement('button');
      buttonAdauga.textContent = 'Adaugă';
      buttonAdauga.onclick = () => {
        const cantitateModificare = parseInt(inputCantitate.value);
        if (!isNaN(cantitateModificare)) {
          salveazaStock(item.furaj, cantitateModificare);
        }
      };
      cellActions.appendChild(buttonAdauga);

      const buttonScade = document.createElement('button');
      buttonScade.textContent = 'Scade';
      buttonScade.onclick = () => {
        const cantitateModificare = parseInt(inputCantitate.value);
        if (!isNaN(cantitateModificare)) {
          salveazaStock(item.furaj, -cantitateModificare); // Scade cantitatea
        }
      };
      cellActions.appendChild(buttonScade);
    });
  };

  return (
    <>
      <table id="stockTable" className={style.stockTable}>
        <thead>
          <tr>
            <th>Furaj</th>
            <th>Cantitate [Kg]</th>
            <th></th>
          </tr>
        </thead>
        <tbody id="stockTableBody"></tbody>
      </table>
    </>
  );
}