import React, { useState } from 'react';
import style from './Utilaje.module.css';

function Tractor({ tractorData, updateTractor }) {
  const [showModal, setShowModal] = useState(false);
  const [kmParcursi, setKmParcursi] = useState(0);
  const [motorinaAdaugata, setMotorinaAdaugata] = useState(0);
  const [logs, setLogs] = useState([]);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const salveazaUtilaje = (event) => {
    event.preventDefault();
    const now = new Date();
    const log = {
      tractorId: tractorData.id,
      km: kmParcursi,
      motorina: motorinaAdaugata,
      date: now.toLocaleDateString(),
      time: now.toLocaleTimeString()
    };
    setLogs([...logs, log]);
    localStorage.setItem('logs', JSON.stringify([...logs, log]));
    setKmParcursi(0);
    setMotorinaAdaugata(0);
    // Actualizează totalul de kilometri ai tractorului
    const newKmTotali = tractorData.kmTotali + parseInt(kmParcursi);
    updateTractor(tractorData.id, newKmTotali);
  };

  return (
    <div className={style.tractorItem}>
      <button onClick={toggleModal} className={style.tractorButton}> {tractorData.model}</button>
      {showModal && (
        <div className={style.modal}>
          <div className={style.modalContent}>
            <div className={style.titleUtilaje}>
              <h2>{tractorData.model}</h2>
              <span className={style.close} onClick={toggleModal}>&times;</span>
            </div>
            <p>Km totali: {tractorData.kmTotali}</p>
            <form onSubmit={salveazaUtilaje} className={style.input}>
              <label htmlFor="kmParcursi">Km parcurși:</label>
              <input
                type="number"
                className={style.inputValue}
                id="kmParcursi"
                value={kmParcursi}
                onChange={(e) => setKmParcursi(e.target.value)}
              />
              <label htmlFor="motorinaAdaugata">Motorină adăugată:</label>
              <input
                type="number"
                className={style.inputValue}
                id="motorinaAdaugata"
                value={motorinaAdaugata}
                onChange={(e) => setMotorinaAdaugata(e.target.value)}
              />
              <button type="submit" className={style.saveButton}>Salvează</button>
            </form>
            <table className={style.utilajeTable}>
              <thead>
                <tr>
                  <th>Tractor ID</th>
                  <th>Kilometri</th>
                  <th>Motorină [l]</th>
                  <th>Data</th>
                  <th>Ora</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log, index) => (
                  <tr key={index}>
                    <td>{log.tractorId}</td>
                    <td>{log.km}</td>
                    <td>{log.motorina}</td>
                    <td>{log.date}</td>
                    <td>{log.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export function Utilaje() {
  const [tractoareData, setTractoareData] = useState([
    { id: 1, kmTotali: 50432, motorina: 0, model: 'John Deere 7290R' },
    { id: 2, kmTotali: 23780, motorina: 0, model: 'John Deere 7R' },
    { id: 3, kmTotali: 10453, motorina: 0, model: 'John Deere 9680 WTS' },
    { id: 4, kmTotali: 2350, motorina: 0, model: 'Class Arion 470' }
  ]);

  // Funcție pentru actualizarea datelor tractorului
  const updateTractor = (tractorId, newKmTotali) => {
    const updatedTractoareData = tractoareData.map(tractor => {
      if (tractor.id === tractorId) {
        return { ...tractor, kmTotali: newKmTotali };
      }
      return tractor;
    });
    setTractoareData(updatedTractoareData);
  };

  return (
    <div className={style.tractorContainer}>
      {tractoareData.map(tractor => (
        <Tractor key={tractor.id} tractorData={tractor} updateTractor={updateTractor} />
      ))}
    </div>
  );
}
