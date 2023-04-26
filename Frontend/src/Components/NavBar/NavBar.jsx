import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NavBar.module.css';


export default function NavBar () {
    
    return (
        <div className={`${styles.navBar} `}>
            <div className={`${styles.container} `}>
                <div className={`${styles.container__logo} `}>Logo</div>
                <div className={`${styles.container__items} `}>
                    <Link className={`${styles.item} `} to={'#'}>NOSOTROS</Link>
                    <Link className={`${styles.item} `} to={'#'}>NOVEDADES</Link>
                    <Link className={`${styles.item} `} to={'#'}>COMUNIDADES</Link>
                    <Link className={`${styles.item} `} to={'#'}>GALERIA</Link>
                    <Link className={`${styles.item} `} to={'#'}>NATURALEZA SOMOS</Link>
                    <Link className={`${styles.donate} `} to={'#'}>DONA</Link>
                </div>
            </div>
        </div>
    );
};