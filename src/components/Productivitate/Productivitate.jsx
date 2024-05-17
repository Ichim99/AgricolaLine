import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto'; // Importă Chart.js
import style from './Productivitate.module.css';

export function Productivitate() {
  const [productivitateData, setProductivitateData] = useState([]);

  useEffect(() => {
    afiseazaProductivitate();
    // deseneazaGrafic(); // Nu mai desenăm automat graficul la încărcarea inițială
  }, []);

  const salveazaProductivitate = (event) => {
    event.preventDefault();
    const data = event.target.elements.dataProductivitate.value;
    const cantitate = event.target.elements.cantitateProductivitate.value;

    const newProductivitateData = [...productivitateData, { data, cantitate }];
    setProductivitateData(newProductivitateData);
    localStorage.setItem('productivitateData', JSON.stringify(newProductivitateData));

    // deseneazaGrafic(); // Nu mai desenăm automat graficul după salvarea datelor
  }

  const afiseazaProductivitate = () => {
    const storedData = JSON.parse(localStorage.getItem('productivitateData')) || [];
    setProductivitateData(storedData);
  }

  const stergeRand = (index) => {
    const newData = [...productivitateData];
    newData.splice(index, 1);
    setProductivitateData(newData);
    localStorage.setItem('productivitateData', JSON.stringify(newData));

    // deseneazaGrafic(); // Nu mai desenăm automat graficul după ștergerea datelor
  }

  const deseneazaGrafic = () => {
    const ctx = document.getElementById('productivitateChart');
    const labels = productivitateData.map(item => item.data);
    const data = productivitateData.map(item => item.cantitate);

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Cantitate',
          data: data,
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }]
      }
    });
  }

  const generateChart = () => {
    afiseazaProductivitate(); // Asigură-te că datele sunt actualizate
    deseneazaGrafic(); // Generează graficul cu datele actuale
  }

  return (
    <>
      <form onSubmit={salveazaProductivitate} className={style.input}>
        <input type="date" id="dataProductivitate" placeholder="Data" />
        <input type="number" id="cantitateProductivitate" placeholder="Cantitate" />
        <button type="submit">Salvează</button> 
        <button onClick={generateChart}>Generează graficul</button>
      </form>
     
      <table className={style.productivitateTable}>
        <thead>
          <tr>
            <th>Data</th>
            <th>Cantitate [l]</th>
            <th>Acțiuni</th>
          </tr>
        </thead>
        <tbody>
          {productivitateData.sort((a, b) => new Date(a.data) - new Date(b.data)).map((item, index) => (
            <tr key={index}>
              <td>{item.data}</td>
              <td>{item.cantitate}</td>
              <td>
                <button onClick={() => stergeRand(index)}>Șterge</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <canvas id="productivitateChart"></canvas>
    </>
  )
}
