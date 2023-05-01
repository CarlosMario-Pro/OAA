import React from 'react';
import { Link } from 'react-router-dom';
import NewsONG from '../../../assets/NewsONG.jpg';
import styles from './Communities.module.css';


export default function Communities () {
    
    return (
        <div className={styles.communities}>
            <div className={styles.containerCommunities}>
                <div>
                    <div className={styles.containerImage}>
                        <img src={NewsONG} className={styles.image} alt="Image" />
                    </div>
                    <div className={styles.containerText}>
                        <h2>Título de Noticia</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia dolorum omnis libero laudantium velit enim earum dignissimos minima nisi est.</p>
                        <h4>Mayo 20 de 2023</h4>
                        <div className={styles.labels}>
                            <Link className={styles.linkText} to={'/#'} target="_blank" rel="noreferrer">
                                Etiqueta
                            </Link>
                            <Link className={styles.linkText} to={'/#'} target="_blank" rel="noreferrer">
                                Etiqueta
                            </Link>
                            <Link className={styles.linkText} to={'/#'} target="_blank" rel="noreferrer">
                                Etiqueta
                            </Link>
                        </div>
                    </div>
                </div>

                <div className={styles.secondary}>
                    <div>
                        <div className={styles.containerSecondary}>
                            <div className={styles.containerImageSecondary}>
                                <img src={NewsONG} className={styles.imageSecondary} alt="Image" />
                            </div>

                            <div className={styles.textSecundary}>
                                <div className={styles.textNews}>
                                    <h2>Título de Noticia</h2>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia dolorum omnis libero laudantium velit.</p>
                                    <h4>Mayo 20 de 2023</h4>
                                </div>
                                <div className={styles.labels}>
                                    <Link className={styles.linkText} to={'/#'} target="_blank" rel="noreferrer">
                                        Etiqueta
                                    </Link>
                                    <Link className={styles.linkText} to={'/#'} target="_blank" rel="noreferrer">
                                        Etiqueta
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className={styles.containerSecondary}>
                            <div className={styles.containerImageSecondary}>
                                <img src={NewsONG} className={styles.imageSecondary} alt="Image" />
                            </div>

                            <div className={styles.textSecundary}>
                                <div className={styles.textNews}>
                                    <h2>Título de Noticia</h2>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia dolorum omnis libero laudantium velit.</p>
                                    <h4>Mayo 20 de 2023</h4>
                                </div>
                                <div className={styles.labels}>
                                    <Link className={styles.linkText} to={'/#'} target="_blank" rel="noreferrer">
                                        Etiqueta
                                    </Link>
                                    <Link className={styles.linkText} to={'/#'} target="_blank" rel="noreferrer">
                                        Etiqueta
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>                    
                </div>
            </div>
        </div>
    );
};