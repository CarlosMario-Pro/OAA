import React, { useState, useEffect  } from 'react';
import Newsletter from '../Newsletter/Newsletter';
import { Link } from 'react-router-dom';
import { GoLaw } from 'react-icons/go';
import { AiOutlineHeart } from 'react-icons/ai';
import { BiDonateHeart } from 'react-icons/bi';
import { FaNewspaper } from 'react-icons/fa';
import styles from './PresentationIcons.module.css';


export default function PresentationIcons () {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
    setBodyClass('modal-open');
  };

  const closeModal = () => {
    setShowModal(false);
    setBodyClass('');
  };

  const handleWheel = (e) => {
    if (showModal) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  useEffect(() => {
    document.body.addEventListener('wheel', handleWheel, {
      passive: false,
    });
    return () => {
      document.body.removeEventListener('wheel', handleWheel);
    };
  }, [showModal]);

  return (
    <div className={styles.presentationIcons}>
      <div className={styles.container}>
        <div className={styles.containerlinks}>
          <div className={styles.containerIcons}>
            <Link className={styles.we} to={'/#'} target="_blank" rel="noreferrer">
              <GoLaw className={styles.icons}/>
            </Link>
          </div>
          <h3>Casos activos</h3>
        </div>

        <div className={styles.containerlinks}>
          <div className={styles.containerIcons}>
            <AiOutlineHeart className={styles.icons}/>
          </div>
            <h3>Mención honorífica</h3>
        </div>

        <div className={styles.containerlinks}>
          <div className={styles.containerIconsDone}>
            <BiDonateHeart className={styles.icons}/>
          </div>
          <h3>Donar</h3>
        </div>

        {/* Ventana modal */}                
        <div className={styles.containerlinks}>
          <div className={styles.containerIcons}>
            <div className={styles.modal}>
              <button className={styles.modalButton} onClick={openModal}><FaNewspaper className={styles.icons}/></button>
              {showModal ? (
                <Newsletter closeModal={closeModal} />
              ) : null}
            </div>
          </div>
          <h3>Suscríbete</h3>
        </div>
      </div>
    </div>
  );
};