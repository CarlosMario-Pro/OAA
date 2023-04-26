import React from 'react';
import styles from './Newsletter.module.css';


export default function Newsletter ({ closeModal }) {

  return (
    <div className={`${styles.modal} `} >
      <div className={`${styles.modalContent} center`}>
        <span  className={`${styles.close} `} onClick={closeModal}>&times;</span>
        <p>Contenido de la ventana modal</p>
      </div>
    </div>
  );
};