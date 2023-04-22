import React from 'react';
import { Link } from 'react-router-dom'
import Styles from './noticiasExtra.module.css'


export default function RecentNews({threeRecents}) {


  return (
    <div className={Styles.container} >
        <div><h4>Noticias Recientes</h4></div>
  <div className={Styles['map-container']} >


        { threeRecents?.map((recent)=>{
          return (
            <div key={recent?._id} className={Styles['container-extras']} >
            
                  <Link to={`/news/${recent?._id}`} className={Styles['link']} >
                    <div className={Styles['image-container']}>

                    <img src={recent?.image[0]?.url} alt="Imagen de la Noticia" className={Styles['image-notiextra']} />              
                    </div>
                    <div>
            <p className={Styles['introduction-news']} >{recent?.introduction}</p>
                    </div>
            </Link>
    </div>
            )
        }) }
    </div>
</div>
  )
};