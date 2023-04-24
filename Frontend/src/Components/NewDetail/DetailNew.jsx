import React, { useEffect } from "react";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";

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

  return (
    <div>
      <div>
        <h1>{newDetail.titleMain}</h1>
      </div>
      <div>
        <span>{newDetail.introduction}</span>
      </div>
      <div>
        <span>{newDetail.category}</span>
        <span>{newDetail.date}</span>
      </div>
      <div>
        <img src={newDetail.image} alt="Imagen de Noticia" />
        <div>
          <a href={newDetail.urlAuthor ? newDetail.urlAuthor : ""}>
            {newDetail.author}
          </a>
          <p>{newDetail.location ? newDetail.location : ""}</p>
        </div>
      </div>
      {newDetail?.description && newDetail.description.charAt(0) === "{" ? (
        <article ref={quillRef}></article>
      ) : (
        <p>{newDetail?.description}</p>
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
      {newDetail.labels ? <p>{newDetail.labels.join(", ")}</p> : ""}
    </div>
  );
}
