import React from 'react';
import { Link } from 'react-router-dom';
import styles from "./Logo.module.css";


export default function Logo () {

    return (
        <div className={styles.logo}>
            <Link className={styles.links} to='http://127.0.0.1:5173/'>
                <div className={styles.logo__container} >
                    <div className={styles.logoFirts}>
                        <p>ORGANIZACION de</p>
                        <p>AMBIENTALISTAS</p>
                    </div>
                    <div className={styles.logoSecond}>
                        <p>AUTOCONVOCADOS</p>
                    </div>
                </div>
            </Link>
        </div>
    );
};