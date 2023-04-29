import React from 'react'
import logo from '../../assets/forum/natSom.webp'
import { Link } from 'react-router-dom'
import Style from './foro.module.css'


export default function OurWorkCards({ allWorks }) {
  return (
    <div className={Style.cardContainers} >
      <div>
        <h2>Conflictos y causas ambientales:</h2>
      </div>
      {allWorks &&
        allWorks.map((work) => {
          return (
            <div key={work._id} >
              <Link
                to={
                  work.isFinished
                    ? `/nuestro-trabajo/${work._id}`
                    : alert(`${work.title} se encuentra en desarrollo`)
                }
              >
                <h5>{work.titleMain}</h5>
                <div>
                  <img
                    src={logo}
                    alt="imagen"
                    width='50px'
                  />
                  <p> Conoce más acerca de {work?.titleMain} </p>
                </div>
              </Link>
            </div>
          );
        })}
    </div>
  );
}

