import React from "react";
import styles from "./LoginAdmin.module.css";
import logo from "../../assets/logo-temporal.png";
export default function LoginAdmin() {
  return (
    <div className={`${styles["container"]}`}>
      <div className={`${styles["login-container"]}`}>
        <img
          className={`${styles["logo"]}`}
          src={logo}
          alt='Logo Organización de Ambientalistas Autoconvocados'
        />
        <form className={`${styles["form"]}`}>
          <label htmlFor='email'>Correo electrónico</label>
          <input className='text-input' id='email' type='text' name='email' />

          <label htmlFor='password'>Contraseña</label>
          <input
            className='text-input'
            id='password'
            type='password'
            name='password'
          />
          <button className={`${styles["password"]}`}>
            He olvidado mi contraseña
          </button>
          <button className='button green-button'>Iniciar Sesión</button>
        </form>
      </div>
    </div>
  );
}
