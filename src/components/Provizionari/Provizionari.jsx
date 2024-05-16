import React, { useState } from 'react';
import style from './Provizionari.module.css'

export function Provizionari() {
  const [facturi, setFacturi] = useState([]);
  const [comentariu, setComentariu] = useState('');
  const [facturiSalvate, setFacturiSalvate] = useState([]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFacturi(files);
  };

  const handleComentariuChange = (e) => {
    setComentariu(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const facturiNoi = facturi.map(factura => ({
      nume: factura.name,
      comentariu: comentariu
    }));
    setFacturiSalvate([...facturiSalvate, ...facturiNoi]);
    setFacturi([]); // Resetează lista de facturi după salvare
    setComentariu(''); // Resetează comentariul după salvare
  };

  const handleDownload = (factura) => {
    const url = URL.createObjectURL(factura);
    const link = document.createElement('a');
    link.href = url;
    link.download = factura.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <h2>Încarcă facturile</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" multiple onChange={handleFileChange} />
        <textarea
          placeholder="Adaugă un comentariu"
          value={comentariu}
          onChange={handleComentariuChange}
        />
        <button type="submit">Salvează facturile</button>
      </form>
      <div>
        <h3>Facturile salvate:</h3>
        <table className={style.provizionariTable}>
          <thead>
            <tr>
              <th>Factura</th>
              <th>Comentariu</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {facturiSalvate.map((factura, index) => (
              <tr key={index}>
                <td>{factura.nume}</td>
                <td>{factura.comentariu}</td>
                <td><button onClick={() => handleDownload(factura)}>Descarcă</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


