import React, { useEffect } from "react";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import Styles from "./detailNews.module.css"

export default function DetailNew({ newDetail }) {
  const { quill, quillRef } = useQuill({
    readOnly: true,
    modules: { toolbar: false },
  });

  useEffect(() => {
    try {
      const parsedDescription = JSON.parse(newDetail.description);
      quill && quill.setContents(parsedDescription);
    } catch (error) {
      {
        error;
      }
    }
  }, [newDetail]);

  console.log(newDetail, 'detaaillll');

  return (
    <div className={Styles['container-detail']} >
      <div className={Styles['sec-container']} >
        <h1 className={Styles['h1-title']} >{newDetail.titleMain}</h1>
      <div className={Styles['introduction-div']} >
        <span  >{newDetail.introduction}</span>
      </div>
      <div className={Styles['span-div']} >
        <span>{newDetail.category}</span>
        <span> {newDetail.date}</span>
        <a href={newDetail.urlAuthor ? newDetail.urlAuthor : ""}>
            Por: {newDetail.author}
          </a>
      </div>
      <div className={Styles.divImageDetail}  >
        {newDetail.image && newDetail.image.map((image) => (
          <img src={image.url} alt="image" className={Styles.imageDetail} />
        ))}
            <div>
          
          <p>{newDetail.location ? newDetail.location : ""}</p>
        </div>
      </div>
      {newDetail?.description && newDetail.description.charAt(0) === "{" ? (
        <article ref={quillRef}></article>
      ) : (
        <p className={Styles['p-content']} >{newDetail?.description}</p>
      )}
      <div>
        {newDetail.multimedia
          ? newDetail.multimedia.map((deta) => (
              <div key={deta.label}>
                <label>{deta.label}</label> <a href={deta.url}>Visita aquí</a>
              </div>
            ))
            : ""}
      </div>
      {newDetail.labels ? <p className={Styles['labels-container']} > TEMAS: {newDetail.labels.join(", ")}</p> : ""}
            </div>
    </div>
  );
}
