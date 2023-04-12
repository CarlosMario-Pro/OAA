import React, { useState } from "react";
import logo from "../../assets/logo-temporal-2.png";
import styles from "./PanelAdmin.module.css";
import Subscriptions from "../../Components/PanelAdmin/Subscriptions";
import Donations from "../../Components/PanelAdmin/Donations";
import Publications from "../../Components/PanelAdmin/Publications";
import OurProjects from "../../Components/PanelAdmin/OurProjects";
import RadioProgram from "../../Components/PanelAdmin/RadioProgram";
import Gallery from "../../Components/PanelAdmin/Gallery";
import Administrators from "../../Components/PanelAdmin/Administrators";

export default function PanelAdmin() {
  const [currentSection, setCurrentSection] = useState("donations");
  return (
    <div className={`${styles["container"]}`}>
      <header className={`${styles["header"]}`}>
        <div>
          <img
            src={logo}
            alt='Logo Organización de Ambientalistas Autoconvocados'
          />
          <h1>Panel de Administrador</h1>
        </div>
        <h3>Hola, Nombre</h3>
      </header>
      <nav className={`${styles["navbar"]}`}>
        <ul className={`${styles["ul-sections"]}`}>
          <li
            className={
              currentSection === "donations" ? styles["active"] : "undefined"
            }
            onClick={() => setCurrentSection("donations")}
          >
            Donaciones
          </li>
          <li
            className={
              currentSection === "subscriptions"
                ? styles["active"]
                : "undefined"
            }
            onClick={() => setCurrentSection("subscriptions")}
          >
            Suscripciones
          </li>
          <li
            className={
              currentSection === "publications" ? styles["active"] : "undefined"
            }
            onClick={() => setCurrentSection("publications")}
          >
            Publicaciones
          </li>
          <li
            className={
              currentSection === "our-projects" ? styles["active"] : "undefined"
            }
            onClick={() => setCurrentSection("our-projects")}
          >
            Nuestro trabajo
          </li>
          <li
            className={
              currentSection === "radio-program"
                ? styles["active"]
                : "undefined"
            }
            onClick={() => setCurrentSection("radio-program")}
          >
            Programa de Radio
          </li>
          <li
            className={
              currentSection === "gallery" ? styles["active"] : "undefined"
            }
            onClick={() => setCurrentSection("gallery")}
          >
            Galería
          </li>
          <li
            className={
              currentSection === "administrators"
                ? `${styles["active"]}`
                : "undefined"
            }
            onClick={() => setCurrentSection("administrators")}
          >
            Administradores
          </li>
        </ul>
        <ul className={`${styles["ul-actions"]}`}>
          <li>
            <button>Cambiar contraseña</button>
          </li>
          <li>
            <button>Cerrar Sesión</button>
          </li>
        </ul>
      </nav>
      <main className={`${styles["main"]}`}>
        {currentSection === "donations" && <Donations />}
        {currentSection === "subscriptions" && <Subscriptions />}
        {currentSection === "publications" && <Publications />}
        {currentSection === "our-projects" && <OurProjects />}
        {currentSection === "radio-program" && <RadioProgram />}
        {currentSection === "gallery" && <Gallery />}
        {currentSection === "administrators" && <Administrators />}
      </main>
      <footer className={`${styles["footer"]}`}>
        <p>©2023 Organización de Ambientalistas Autoconvocados</p>
        <p>Desarrollado por Henry Project </p>
      </footer>
    </div>
  );
}
