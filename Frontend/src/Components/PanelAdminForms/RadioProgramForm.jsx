import React from "react";
import styles from "./RadioProgramForm.module.css";
import { useNavigate } from "react-router-dom";

export default function RadioProgramForm() {
  const navigate = useNavigate();

  const backHandler = () => {
    navigate("/panel-admin");
  };
  return (
    <form className={`${styles["container"]}`}>
      <h1 className={`${styles["header"]}`}>Añadir una nueva Transmisión</h1>

      <label htmlFor='title'>Título</label>
      <input className='text-input' id='title' type='text' name='title' />
      <label htmlFor='image'>Imagen de Portada</label>
      <div className='button-container'>
        <button className='button yellow-button'>
          Añadir archivo multimedia
        </button>
        <button className='button yellow-button'>
          Añadir URL de multimedia
        </button>
      </div>
      <label htmlFor='introductionn'>Introducción</label>
      <textarea
        className='introduction-textarea'
        name='introductionn'
        id='introductionn'
      />
      <label htmlFor='image'>Audio</label>
      <div className='button-container'>
        <button className='button yellow-button'>
          Añadir archivo multimedia
        </button>
        <button className='button yellow-button'>
          Añadir URL de multimedia
        </button>
      </div>
      <div className='button-container'>
        <button className='button blue-button' onClick={backHandler}>
          Volver
        </button>
        <button className='button green-button'>Publicar</button>
      </div>
    </form>
  );
}
