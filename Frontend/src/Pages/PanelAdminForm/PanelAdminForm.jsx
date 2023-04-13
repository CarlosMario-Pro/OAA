import React from "react";
import { useParams } from "react-router-dom";
import Error404 from "../Error404/Error404";
import GalleryImageForm from "../../Components/PanelAdminForms/GalleryImageForm";
import GalleryVideoForm from "../../Components/PanelAdminForms/GalleryVideoForm";
import OurProjectsForm from "../../Components/PanelAdminForms/OurProjectsForm";
import PublicationsForm from "../../Components/PanelAdminForms/PublicationsForm";
import RadioProgramForm from "../../Components/PanelAdminForms/RadioProgramForm";
import logo from "../../assets/logo-temporal-2.png";
import styles from "./PanelAdminForm.module.css";

export default function PanelAdminForm() {
  const { form } = useParams();

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
      {form !== "gallery-image-form" &&
        form !== "gallery-video-form" &&
        form !== "our-projects-form" &&
        form !== "publications-form" &&
        form !== "radio-program-form" && <Error404 />}
      {form === "gallery-image-form" && <GalleryImageForm />}
      {form === "gallery-video-form" && <GalleryVideoForm />}
      {form === "our-projects-form" && <OurProjectsForm />}
      {form === "publications-form" && <PublicationsForm />}
      {form === "radio-program-form" && <RadioProgramForm />}
      <footer className={`${styles["footer"]}`}>
        <p>©2023 Organización de Ambientalistas Autoconvocados</p>
        <p>Desarrollado por Henry Project </p>
      </footer>
    </div>
  );
}
