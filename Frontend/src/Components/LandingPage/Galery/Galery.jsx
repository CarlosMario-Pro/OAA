import React from 'react';
import styles from './Galery.module.css';


export default function Galery () {
    
    return (
        <div className={styles.galery}>
            <div className={styles.video}>Uno</div>
            <div className={styles.images}>Dos</div>
        </div>
    );
};