import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useQuill } from "react-quilljs";
import useForm from "../../utils/customHooks/useForm";
import {
  clearNewDetail,
  createNew,
  editNew,
  reactiveNew,
} from "../../stateManagement/actions/panelAdmin/news.actions";
import ImageUrl from "./MultimediaFiles/Images/ImageUrl";
import ViewImages from "./MultimediaFiles/Images/ViewImages";
import "quill/dist/quill.snow.css";
import validationsPublications from "../../utils/helpers/validationsPublications";
import ImageCloudinary from "./MultimediaFiles/Images/ImageCloudinary";
import useSessionStorage from "../../utils/customHooks/useLocalStorage";
import styles from "./PublicationsForm.module.css";
import ViewAudio from "./MultimediaFiles/Audio/ViewAudio";
import AudioCloudinary from "./MultimediaFiles/Audio/AudioCloudinary";
import AudioUrl from "./MultimediaFiles/Audio/AudioUrl";
import ViewPdf from "./MultimediaFiles/Pdf/ViewPdf";
import PdfCloudinary from "./MultimediaFiles/Pdf/PdfCloudinary";
import PdfUrl from "./MultimediaFiles/Pdf/PdfUrl";

const toolbar = [
  ["bold", "italic", "underline", "strike"],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ header: [2, 3, false] }],
  ["link", "image", "video"],
  ["clean"],
];

const initialForm = {
  titleMain: "",
  category: "Novedades",
  date: "",
  author: "OAA",
  urlAuthor: "https://ambientalistas.org.ar/contenido/83/nosotrxs",
  location: "",
  introduction: "",
  label: "",
};

export default function PublicationsForm() {
  //variables de estados y formularios
  const navigate = useNavigate(),
    dispatch = useDispatch(),
    [labels, setLabels] = useSessionStorage("labelsPublications", []),
    [image, setImage] = useSessionStorage("imagesPublications", []),
    [pdf, setPdf] = useSessionStorage("pdfPublicationd", []),
    [audio, setAudio] = useSessionStorage("audioPublicationd", []),
    [urlImageOpen, setUrlImageOpen] = useState(false),
    [urlPdfOpen, setUrlPdfOpen] = useState(false),
    [urlAudioOpen, setUrlAudioOpen] = useState(false),
    [cloudinaryImageOpen, setCloudinaryImageOpen] = useState(false),
    [cloudinaryPdfOpen, setCloudinaryPdfOpen] = useState(false),
    [cloudinaryAudioOpen, setCloudinaryAudioOpen] = useState(false),
    { quill, quillRef } = useQuill({ modules: { toolbar } }),
    { newDetail, idNewDetail, edit } = useSelector((state) => state.news),
    { form, errors, setForm, setErrors, changeHandler, resetHandler } = useForm(
      "publicationsForm",
      initialForm,
      validationsPublications
    ),
    {
      titleMain,
      category,
      date,
      author,
      urlAuthor,
      location,
      introduction,
      label,
    } = form;

  //Se ejecuta cuando newDetail cambia
  useEffect(() => {
    if (Object.keys(newDetail).length > 0 && edit) {
      const pdfDetail = newDetail.multimedia.filter(
        (file) => file.type === "PDF"
      );
      const audioDetail = newDetail.multimedia.filter(
        (file) => file.type === "Audio"
      );
      setForm({
        titleMain: newDetail.titleMain,
        category: newDetail.category,
        date: newDetail.date,
        author: newDetail.author,
        urlAuthor: newDetail.urlAuthor,
        location: newDetail.location,
        introduction: newDetail.introduction,
      });
      setLabels(newDetail.labels);
      setImage(newDetail.image);
      setPdf(pdfDetail);
      setAudio(audioDetail);
      quill && quill.setContents(JSON.parse(newDetail.description));
    } else {
      setForm(initialForm);
      setLabels([]);
      setImage([]);
      setPdf([]);
      setAudio([]);
    }
  }, [newDetail, edit]);

  // Función para regresar a la pantalla anterior
  const backHandler = (event) => {
    event.preventDefault();
    resetHandler();
    setImage([]);
    setLabels([]);
    dispatch(clearNewDetail());
    navigate("/panel-admin");
  };

  // Función para agregar etiquetas
  const addLabelsHandler = (event) => {
    event.preventDefault();
    label && setLabels([...labels, label]);
    setForm({ ...form, label: "" });
  };
  // Función para eliminar etiquetas
  const deleteLabelsHandler = (event, oneLabel) => {
    event.preventDefault();
    const deletedLabel = labels.filter((l) => l !== oneLabel);
    setLabels([...deletedLabel]);
  };

  // Función para publicar un nuevo elemento:
  const createHandler = () => {
    if (Object.keys(errors).length === 0) {
      dispatch(
        createNew({
          ...form,
          labels,
          image,
          multimedia: [...audio, ...pdf],
          description: JSON.stringify(quill.getContents()),
        })
      );
      resetHandler();
      setImage([]);
      setLabels([]);
      navigate("/panel-admin");
    }
  };

  // Función para editar un elemento:
  const editHandler = () => {
    if (Object.keys(errors).length === 0) {
      if (newDetail.isDeleted) {
        dispatch(reactiveNew(idNewDetail));
      }
      dispatch(
        editNew(idNewDetail, {
          ...form,
          labels,
          image,
          multimedia: [...audio, ...pdf],
          description: JSON.stringify(quill.getContents()),
        })
      );
      dispatch(clearNewDetail());
      resetHandler();
      setImage([]);
      setLabels([]);
      navigate("/panel-admin");
    }
  };

  //Función para abrir el selector de imagen Cloudinary
  const openImageCloudinary = (event) => {
    event.preventDefault();
    setCloudinaryImageOpen(true);
  };

  //Función para abrir el selector de imagen URL
  const openImageUrl = (event) => {
    event.preventDefault();
    setUrlImageOpen(true);
  };

  //Función para abrir el selector de audio Cloudinary
  const openAudioCloudinary = (event) => {
    event.preventDefault();
    setCloudinaryAudioOpen(true);
  };

  //Función para abrir el selector de audio URL
  const openAudioUrl = (event) => {
    event.preventDefault();
    setUrlAudioOpen(true);
  };

  //Función para abrir el selector de pdf Cloudinary
  const openPdfCloudinary = (event) => {
    event.preventDefault();
    setCloudinaryPdfOpen(true);
  };

  //Función para abrir el selector de pdf URL
  const openPdfUrl = (event) => {
    event.preventDefault();
    setUrlPdfOpen(true);
  };
  return (
    <form className={`${styles["container"]}`}>
      <h1 className={`${styles["header"]}`}>
        {edit ? "Editar Publicación" : "Añadir una nueva Publicación"}
      </h1>

      <label htmlFor="titleMain">Título *</label>
      <input
        className="text-input"
        id="titleMain"
        type="text"
        name="titleMain"
        onBlur={changeHandler}
        onChange={changeHandler}
        value={titleMain}
        required
        autoComplete="off"
      />
      {errors.titleMain && <p className="error">{errors.titleMain}</p>}
      <label htmlFor="date">Fecha del acontecimiento *</label>
      <input
        className="text-input"
        id="date"
        type="text"
        name="date"
        onBlur={changeHandler}
        onChange={changeHandler}
        value={date}
        placeholder="Ej: 22 de Abril del 2023"
        required
        autoComplete="off"
      />
      {errors.date && <p className="error">{errors.date}</p>}
      <label htmlFor="category">Categoría *</label>
      <select
        className={`${styles["select"]}`}
        name="category"
        id="category"
        defaultValue={category}
        onChange={changeHandler}
      >
        <option value="Novedades">Novedades</option>
        <option value="Comunidades">Comunidades</option>
        <option value="Agroecología">Agroecología</option>
      </select>
      {errors.category && <p className="error">{errors.category}</p>}
      <label htmlFor="author">Autor *</label>
      <input
        className="text-input"
        id="author"
        type="text"
        name="author"
        onBlur={changeHandler}
        onChange={changeHandler}
        value={author}
        required
        autoComplete="off"
      />
      {errors.author && <p className="error">{errors.author}</p>}
      <label htmlFor="urlAuthor">Autor URL</label>
      <input
        className="text-input"
        id="urlAuthor"
        type="text"
        name="urlAuthor"
        onBlur={changeHandler}
        onChange={changeHandler}
        value={urlAuthor}
        required
        autoComplete="off"
      />

      <label htmlFor="location">Locación</label>
      <input
        className="text-input"
        id="location"
        type="text"
        name="location"
        onBlur={changeHandler}
        onChange={changeHandler}
        value={location}
        placeholder="Lugar en donde ocurrió el evento"
        autoComplete="off"
      />

      <label htmlFor="introduction">Introducción *</label>
      <textarea
        className="introduction-textarea"
        id="introduction"
        name="introduction"
        onBlur={changeHandler}
        onChange={changeHandler}
        value={introduction}
      />
      {errors.introduction && <p className="error">{errors.introduction}</p>}

      <label htmlFor="image">Imágenes *</label>
      {errors.image && <p className="error">{errors.image}</p>}
      <ViewImages images={image} setImages={setImage} />
      <ImageCloudinary
        open={cloudinaryImageOpen}
        setOpen={setCloudinaryImageOpen}
        image={image}
        setImage={setImage}
        setError={setErrors}
      />
      <ImageUrl
        open={urlImageOpen}
        setOpen={setUrlImageOpen}
        image={image}
        setImage={setImage}
        setError={setErrors}
      />
      <div className="button-container">
        <button className="button yellow-button" onClick={openImageCloudinary}>
          Añadir archivo multimedia
        </button>
        <button className="button yellow-button" onClick={openImageUrl}>
          Añadir URL de multimedia
        </button>
      </div>

      <label htmlFor="description">Contenido *</label>
      <div ref={quillRef}></div>
      <label>Información extra:</label>
      <label htmlFor="image">Audios</label>
      <ViewAudio audio={audio} setAudio={setAudio} />
      <AudioCloudinary
        open={cloudinaryAudioOpen}
        setOpen={setCloudinaryAudioOpen}
        audio={audio}
        setAudio={setAudio}
        setError={setErrors}
      />
      <AudioUrl
        open={urlAudioOpen}
        setOpen={setUrlAudioOpen}
        audio={audio}
        setAudio={setAudio}
        setError={setErrors}
      />
      <div className="button-container">
        <button className="button yellow-button" onClick={openAudioCloudinary}>
          Añadir archivo multimedia
        </button>
        <button className="button yellow-button" onClick={openAudioUrl}>
          Añadir URL de multimedia
        </button>
      </div>
      <label htmlFor="image">PDF</label>
      <ViewPdf pdf={pdf} setPdf={setPdf} />
      <PdfCloudinary
        open={cloudinaryPdfOpen}
        setOpen={setCloudinaryPdfOpen}
        pdf={pdf}
        setPdf={setPdf}
        setError={setErrors}
      />
      <PdfUrl
        open={urlPdfOpen}
        setOpen={setUrlPdfOpen}
        pdf={pdf}
        setPdf={setPdf}
        setError={setErrors}
      />
      <div className="button-container">
        <button className="button yellow-button" onClick={openPdfCloudinary}>
          Añadir archivo multimedia
        </button>
        <button className="button yellow-button" onClick={openPdfUrl}>
          Añadir URL de multimedia
        </button>
      </div>

      <label htmlFor="label">Etiquetas</label>
      {labels && labels.length > 0 && (
        <div className={`${styles["labels-list"]}`}>
          {labels.map((oneLabel, index) => (
            <button
              className="blue-button"
              key={`label-${index}`}
              title="Eliminar etiqueta"
              onClick={(event) => deleteLabelsHandler(event, oneLabel)}
            >
              {oneLabel}
            </button>
          ))}
        </div>
      )}
      <div className={`${styles["labels-input"]}`}>
        <input
          className="text-input"
          id="label"
          type="text"
          name="label"
          onBlur={changeHandler}
          onChange={changeHandler}
          value={label}
          autoComplete="off"
        />
        <button className="button yellow-button" onClick={addLabelsHandler}>
          Agregar
        </button>
      </div>
      <div className="button-container">
        <button className="button blue-button" onClick={backHandler}>
          Volver
        </button>
        <button
          className="button green-button"
          onClick={(event) => {
            event.preventDefault();
            validationsPublications(form);
            if (image.length === 0) {
              setErrors({
                ...errors,
                image: "Por favor, introduce al menos una imagen.",
              });
            } else {
              edit ? editHandler() : createHandler();
            }
          }}
        >
          Publicar
        </button>
      </div>
    </form>
  );
}
