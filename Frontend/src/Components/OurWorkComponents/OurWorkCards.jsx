import React from 'react'
import logo from '../../assets/forum/natSom.webp'
import { Link } from 'react-router-dom'


export default function OurWorkCards({ allWorks }) {
  return (
    <div>
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
                <h5>{work.title}</h5>
                <div>
                  <img
                    src={work.image[0] ? work.image[0] : logo}
                    alt="imagen"
                  />
                </div>
              </Link>
            </div>
          );
        })}
    </div>
  );
}

