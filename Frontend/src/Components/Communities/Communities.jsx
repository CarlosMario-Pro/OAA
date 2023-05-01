import React from 'react';
import { Link } from 'react-router-dom';
import NewsONG from '../../../assets/NewsONG.jpg';
import styles from './Communities.module.css';


export default function Communities () {
    
    return (
        <div className={styles.communities}>
            <div className={styles.containerCommunities}>
                <div className={styles.major}>
                    <div className={styles.containerImage}>
                        <img src={NewsONG} className={styles.image} alt="Image" />
                    </div>
                    <div className={styles.containerText}>
                        <h2>Título de Noticia</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia dolorum omnis libero laudantium velit enim earum dignissimos minima nisi est.</p>
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
                    <div className={styles.secondaryTop}>
                        <div className={styles.dfdfdfdfdf}>
                            <div className={styles.containerImageSecondary}>
                                <img src={NewsONG} className={styles.imageSecondary} alt="Image" />
                            </div>

                            <div className={styles.aaaaaa}>
                                <div className={styles.bbbbb}>
                                    <h2>Título de Noticia</h2>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia dolorum omnis libero laudantium velit.</p>
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

                    <div className={styles.secondaryTop}>
                        <div className={styles.dfdfdfdfdf}>
                            <div className={styles.containerImageSecondary}>
                                <img src={NewsONG} className={styles.imageSecondary} alt="Image" />
                            </div>

                            <div className={styles.aaaaaa}>
                                <div className={styles.bbbbb}>
                                    <h2>Título de Noticia</h2>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia dolorum omnis libero laudantium velit.</p>
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