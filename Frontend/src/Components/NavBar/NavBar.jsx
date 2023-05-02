import React from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./NavBar.module.css";

export default function NavBar() {
  const { pathname } = useLocation();
  let visible = "visible";

  if (pathname === "/login" || pathname === "/panel-admin") {
    visible = "invisible";
  }
  return (
    <div className={`${styles[visible]} ${styles.navBar} `}>
      <div className={`${styles.container} `}>
        <div className={`${styles.container__logo} `}>Logo</div>
        <div className={`${styles.container__items} `}>
          <Link className={`${styles.item} `} to={"/aboutUs"}>
            NOSOTROS
          </Link>
          <Link className={`${styles.item} `} to={"/novelties"}>
            NOVEDADES
          </Link>
          <Link className={`${styles.item} `} to={"/communities"}>
            COMUNIDADES
          </Link>
          <Link className={`${styles.item} `} to={"/galery"}>
            GALERIA
          </Link>
          <Link className={`${styles.item} `} to={"/naturalezaSomos"}>
            NATURALEZA SOMOS
          </Link>
          <Link className={`${styles.donate} `} to={"/done"}>
            DONA
          </Link>
        </div>
      </div>
    </div>
  );
}
