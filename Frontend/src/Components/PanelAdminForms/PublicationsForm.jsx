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
import ImageUrl from "./MultimediaFiles/ImageUrl";
import ViewImages from "./MultimediaFiles/ViewImages";
import styles from "./PublicationsForm.module.css";
import "quill/dist/quill.snow.css";
import validationsPublications from "../../utils/helpers/validationsPublications";
import ImageCloudinary from "./MultimediaFiles/ImageCloudinary";
import useSessionStorage from "../../utils/customHooks/useLocalStorage";

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
    [urlOpen, setUrlOpen] = useState(false),
    [cloudinaryOpen, setCloudinaryOpen] = useState(false),
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
      setForm({
        titleMain: newDetail.titleMain,
        category: newDetail.category,
        date: newDetail.date,
        author: newDetail.author,
        urlAuthor: newDetail.urlAuthor,
        location: newDetail.location,
        introduction: newDetail.introduction,
        description: newDetail.description,
        image: newDetail.image,
      });
      setLabels(newDetail.labels);
      quill && quill.setContents(JSON.parse(newDetail.description));
    } else {
      setForm(initialForm);
      setLabels([]);
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
  const openCludinary = (event) => {
    event.preventDefault();
    setCloudinaryOpen(true);
  };

  //Función para abrir el selector de imagen URL
  const openUrl = (event) => {
    event.preventDefault();
    setUrlOpen(true);
  };
  return (
    <form className={`${styles["container"]}`}>
      <h1 className={`${styles["header"]}`}>
        {edit ? "Editar Publicación" : "Añadir una nueva Publicación"}
      </h1>

      <label htmlFor='titleMain'>Título *</label>
      <input
        className='text-input'
        id='titleMain'
        type='text'
        name='titleMain'
        onBlur={changeHandler}
        onChange={changeHandler}
        value={titleMain}
        required
        autoComplete='off'
      />
      {errors.titleMain && <p className='error'>{errors.titleMain}</p>}
      <label htmlFor='date'>Fecha del acontecimiento *</label>
      <input
        className='text-input'
        id='date'
        type='text'
        name='date'
        onBlur={changeHandler}
        onChange={changeHandler}
        value={date}
        placeholder='Ej: 22 de Abril del 2023'
        required
        autoComplete='off'
      />
      {errors.date && <p className='error'>{errors.date}</p>}
      <label htmlFor='category'>Categoría *</label>
      <select
        className={`${styles["select"]}`}
        name='category'
        id='category'
        defaultValue={category}
        onChange={changeHandler}
      >
        <option value='Novedades'>Novedades</option>
        <option value='Comunidades'>Comunidades</option>
        <option value='Agroecología'>Agroecología</option>
      </select>
      {errors.category && <p className='error'>{errors.category}</p>}
      <label htmlFor='author'>Autor *</label>
      <input
        className='text-input'
        id='author'
        type='text'
        name='author'
        onBlur={changeHandler}
        onChange={changeHandler}
        value={author}
        required
        autoComplete='off'
      />
      {errors.author && <p className='error'>{errors.author}</p>}
      <label htmlFor='urlAuthor'>Autor URL</label>
      <input
        className='text-input'
        id='urlAuthor'
        type='text'
        name='urlAuthor'
        onBlur={changeHandler}
        onChange={changeHandler}
        value={urlAuthor}
        required
        autoComplete='off'
      />

      <label htmlFor='location'>Locación</label>
      <input
        className='text-input'
        id='location'
        type='text'
        name='location'
        onBlur={changeHandler}
        onChange={changeHandler}
        value={location}
        placeholder='Lugar en donde ocurrió el evento'
        autoComplete='off'
      />

      <label htmlFor='introduction'>Introducción *</label>
      <textarea
        className='introduction-textarea'
        id='introduction'
        name='introduction'
        onBlur={changeHandler}
        onChange={changeHandler}
        value={introduction}
      />
      {errors.introduction && <p className='error'>{errors.introduction}</p>}

      <label htmlFor='image'>Imágenes *</label>
      {errors.image && <p className='error'>{errors.image}</p>}
      <ViewImages images={image} setImages={setImage} />
      <ImageCloudinary
        open={cloudinaryOpen}
        setOpen={setCloudinaryOpen}
        images={image}
        setImages={setImage}
        setError={setErrors}
      />
      <ImageUrl
        open={urlOpen}
        setOpen={setUrlOpen}
        images={image}
        setImages={setImage}
        setError={setErrors}
      />
      <div className='button-container'>
        <button className='button yellow-button' onClick={openCludinary}>
          Añadir archivo multimedia
        </button>
        <button className='button yellow-button' onClick={openUrl}>
          Añadir URL de multimedia
        </button>
      </div>

      <label htmlFor='description'>Contenido</label>
      <div ref={quillRef}></div>

      <label htmlFor='label'>Etiquetas</label>
      {labels && labels.length > 0 && (
        <div className={`${styles["labels-list"]}`}>
          {labels.map((oneLabel, index) => (
            <button
              className='blue-button'
              key={`label-${index}`}
              title='Eliminar etiqueta'
              onClick={(event) => deleteLabelsHandler(event, oneLabel)}
            >
              {oneLabel}
            </button>
          ))}
        </div>
      )}
      <div className={`${styles["labels-input"]}`}>
        <input
          className='text-input'
          id='label'
          type='text'
          name='label'
          onBlur={changeHandler}
          onChange={changeHandler}
          value={label}
          autoComplete='off'
        />
        <button className='button yellow-button' onClick={addLabelsHandler}>
          Agregar
        </button>
      </div>
      <div className='button-container'>
        <button className='button blue-button' onClick={backHandler}>
          Volver
        </button>
        <button
          className='button green-button'
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
