import React from 'react';
import { Link } from 'react-router-dom';
import Styles from './noticiasExtra.module.css'


export default function SameCategories({threeCategories}) {

  
  return (
    <div className={Styles.container} >
      <div>
        <h4>Te puede interesar</h4>
        <div className={Styles['map-container']} >
        {
          threeCategories?.map((category)=>{
          return ( 
          <div key={category?._id} className={Styles['container-extras']} >
            <Link to={`/news/${category?._id}`} className={Styles['link']} >
            <div className={Styles['image-container']}>
              <img src={category?.image[0]?.url} alt="Noticia" className={Styles['image-notiextra']}/>
              </div>
              <p className={Styles['introduction-news']} >{category.introduction}</p>
              </Link>
            </div>
            )})
        }
        </div>
      </div>
    </div>
  )
};
