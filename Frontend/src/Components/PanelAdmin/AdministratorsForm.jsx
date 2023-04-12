import React from "react";
import styles from "./AdministratorsForm.module.css";

export default function AdministratorsForm() {
  return (
    <form className={`${styles["form"]}`}>
      <input
        className='text-input'
        type='text'
        name='name'
        placeholder='Nombre completo'
        autoComplete='off'
      />
      <input
        className='text-input'
        type='email'
        name='email'
        placeholder='Correo electrónico'
        autoComplete='off'
      />
      <button
        className={`button yellow-button ${styles["button"]}`}
        type='submit'
      >
        Agregar nuevo administrador
      </button>
    </form>
  );
}
