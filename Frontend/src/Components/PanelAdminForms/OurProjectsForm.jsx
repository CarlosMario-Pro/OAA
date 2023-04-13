import React from "react";
import styles from "./OurProjectsForm.module.css";
import { useNavigate } from "react-router-dom";

export default function OurProjectsForm() {
  const navigate = useNavigate();

  const backHandler = () => {
    navigate("/panel-admin");
  };
  return (
    <form className={`${styles["container"]}`}>
      <h1 className={`${styles["header"]}`}>Añadir un nuevo Caso</h1>

      <label htmlFor='title'>Título</label>
      <input className='text-input' id='title' type='text' name='title' />

      <label htmlFor='status'>Estado actual</label>
      <select className={`${styles["select"]}`} name='status' id='status'>
        <option value='finished'>Finalizado</option>
        <option value='in progress'>En desarrollo</option>
      </select>

      <label htmlFor='location'>Locación</label>
      <input className='text-input' id='location' type='text' name='location' />

      <label htmlFor='introductionn'>Introducción</label>
      <textarea
        className='introduction-textarea'
        name='introductionn'
        id='introductionn'
      />
      <label htmlFor='image'>Imágenes</label>
      <div className='button-container'>
        <button className='button yellow-button'>
          Añadir archivo multimedia
        </button>
        <button className='button yellow-button'>
          Añadir URL de multimedia
        </button>
      </div>

      <label htmlFor='description'>Contenido</label>
      <textarea
        className='description-textarea'
        name='description'
        id='description'
      />
      <div className='button-container'>
        <button className='button blue-button' onClick={backHandler}>
          Volver
        </button>
        <button className='button green-button'>Publicar</button>
      </div>
    </form>
  );
}
