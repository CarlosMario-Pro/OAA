import React from "react";
import styles from "./GalleryImageForm.module.css";
import { useNavigate } from "react-router-dom";

export default function GalleryImageForm() {
  const navigate = useNavigate();

  const backHandler = () => {
    navigate("/panel-admin");
  };
  return (
    <form className={`${styles["container"]}`}>
      <h1 className={`${styles["header"]}`}>Añadir una nueva Imagen</h1>
      <label htmlFor='title'>Título</label>
      <input className='text-input' id='title' type='text' name='title' />
      <label htmlFor='image'>Imagen</label>
      <div className='button-container'>
        <button className='button yellow-button'>
          Añadir archivo multimedia
        </button>
        <button className='button yellow-button'>
          Añadir URL de multimedia
        </button>
      </div>
      <label htmlFor='description'>Introducción</label>
      <textarea name='description' id='description' />
      <div className='button-container'>
        <button className='button blue-button' onClick={backHandler}>
          Volver
        </button>
        <button className='button green-button'>Publicar</button>
      </div>
    </form>
  );
}
