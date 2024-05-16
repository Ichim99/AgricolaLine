import React, { useState } from 'react';
import style from './Personal.module.css';

export function Personal() {
  const [oreLucrate, setOreLucrate] = useState({
    "Fermier 1": [],
    "Fermier 2": [],
    "Veterinar": []
  });
  const [totalOreZi, setTotalOreZi] = useState({});
  const [totalOreLucrate, setTotalOreLucrate] = useState(0);

  const toggleStareMunca = (lucrator) => {
    const oraCurenta = new Date().toLocaleTimeString();
    const dataCurenta = new Date().toLocaleDateString();
    const esteLaMunca = oreLucrate[lucrator].length % 2 === 0;
    setOreLucrate(prevState => ({
      ...prevState,
      [lucrator]: esteLaMunca
        ? [...prevState[lucrator], { intrare: oraCurenta, data: dataCurenta }]
        : [...prevState[lucrator], { iesire: oraCurenta }]
    }));
    adaugaTotalOreZi();
  };

  const calculeazaTotalOre = (intrare, iesire) => {
    const oraIntrare = new Date(`01/01/2000 ${intrare}`);
    const oraIesire = new Date(`01/01/2000 ${iesire}`);
    const diferențaOre = (oraIesire - oraIntrare) / 1000 / 60 / 60;
    return diferențaOre.toFixed(2);
  };

  const adaugaTotalOreZi = () => {
    let totalZi = {};
    Object.entries(oreLucrate).forEach(([lucrator, ore]) => {
      let total = 0;
      ore.forEach((item, index) => {
        if (index % 2 === 1) {
          total += parseFloat(calculeazaTotalOre(ore[index - 1].intrare, item.iesire));
        }
      });
      totalZi[lucrator] = total.toFixed(2);
    });
    setTotalOreZi(totalZi);
    calculeazaTotalOreLucrate(totalZi);
  };

  const calculeazaTotalOreLucrate = (totalZi) => {
    let total = 0;
    Object.values(totalZi).forEach(ore => {
      total += parseFloat(ore);
    });
    setTotalOreLucrate(total.toFixed(2));
  };

  return (
    <div>
      <h2>Personal</h2>
      <h3>Ore de lucru înregistrate:</h3>
      <table className={style.personalTable}>
        <thead>
          <tr>
            <th>Lucrător</th>
            <th>Intrare</th>
            <th>Ieșire</th>
            <th>Data</th>
            <th>Total ore zi</th>
            <th>Total ore lucrate</th>
            <th>Simulare</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(oreLucrate).map(([lucrator, ore]) => (
            <tr key={lucrator}>
              <td>{lucrator}</td>
              <td>{ore.filter(inregistrare => inregistrare.intrare).map((inregistrare, index) => (
                <div key={index}>{inregistrare.intrare}</div>
              ))}</td>
              <td>{ore.filter(inregistrare => inregistrare.iesire).map((inregistrare, index) => (
                <div key={index}>{inregistrare.iesire}</div>
              ))}</td>
              <td>{ore.filter(inregistrare => inregistrare.data).map((inregistrare, index) => (
                <div key={index}>{inregistrare.data}</div>
              ))}</td>
              <td>{totalOreZi[lucrator]}</td>
              <td>{totalOreLucrate}</td>
              <td>
                <button onClick={() => toggleStareMunca(lucrator)}>
                  {ore.length % 2 === 0 ? 'Intrare la muncă' : 'Ieșire de la muncă'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
