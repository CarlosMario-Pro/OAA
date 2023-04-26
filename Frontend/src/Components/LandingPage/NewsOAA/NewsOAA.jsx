import React from 'react';
import { Link } from 'react-router-dom';
import NewsONG from '../../../assets/NewsONG.jpg';
import styles from './NewsOAA.module.css';


export default function NewsOAA () {
    
  return (
    <div className={styles.newsOAA}>
      <div className={styles.container}>
        <Link className={styles.link} to={'/#'} target="_blank" rel="noreferrer">
          Recursos
        </Link>
        <Link className={styles.link} to={'/#'} target="_blank" rel="noreferrer">
          Nuestro trabajo
        </Link>
        <Link className={styles.link} to={'/#'} target="_blank" rel="noreferrer">
          Natuzaleza Somos
        </Link>
      </div>

      <div className={styles.containerNews}>
        <div className={styles.containerImage}>
          <img src={NewsONG} className={styles.image} alt="Image" />
        </div>
        <div className={styles.containerText}>
          <h2>Título de imagen</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia dolorum omnis libero laudantium velit enim earum dignissimos minima nisi est.</p>
          <Link className={styles.linkText} to={'/#'} target="_blank" rel="noreferrer">
            Saber más
        </Link>
        </div>
      </div>
    </div>
  );
};