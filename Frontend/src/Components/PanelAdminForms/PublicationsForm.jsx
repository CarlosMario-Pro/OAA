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
import styles from "./PublicationsForm.module.css";
import "quill/dist/quill.snow.css";

const toolbar = [
  ["bold", "italic", "underline", "strike"],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ header: [2, 3, false] }],
  ["link"],
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
  image: [],
  label: "",
};

export default function PublicationsForm() {
  //variables de estados y formularios
  const navigate = useNavigate(),
    dispatch = useDispatch(),
    [labels, setLabels] = useState([]),
    { quill, quillRef } = useQuill({ modules: { toolbar } }),
    { newDetail, idNewDetail, edit } = useSelector((state) => state.news),
    { form, setForm, changeHandler, resetHandler } = useForm(
      "searchPublications",
      initialForm,
      () => {}
    ),
    {
      titleMain,
      category,
      date,
      author,
      urlAuthor,
      location,
      introduction,
      image,
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
  const createHandler = (event) => {
    event.preventDefault();
    dispatch(
      createNew({
        ...form,
        labels,
        description: JSON.stringify(quill.getContents()),
      })
    );
    navigate("/panel-admin");
  };

  // Función para editar un elemento:
  const editHandler = (event) => {
    event.preventDefault();
    if (!newDetail.isDeleted) {
      dispatch(reactiveNew(idNewDetail));
    }
    dispatch(
      editNew(idNewDetail, {
        ...form,
        labels,
        description: JSON.stringify(quill.getContents()),
      })
    );
    dispatch(clearNewDetail());
    navigate("/panel-admin");
  };

  return (
    <form className={`${styles["container"]}`}>
      <h1 className={`${styles["header"]}`}>
        {edit ? "Editar Publicación" : "Añadir una nueva Publicación"}
      </h1>

      <label htmlFor='titleMain'>Título</label>
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

      <label htmlFor='date'>Fecha del acontecimiento</label>
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

      <label htmlFor='status'>Categoría</label>
      <select
        className={`${styles["select"]}`}
        name='status'
        id='status'
        defaultValue={category}
        onChange={changeHandler}
      >
        <option value='Novedades'>Novedades</option>
        <option value='Comunidades'>Comunidades</option>
        <option value='Agroecología'>Agroecología</option>
      </select>

      <label htmlFor='author'>Autor</label>
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

      <label htmlFor='urlAuthor'>Autor URL (opcional)</label>
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

      <label htmlFor='introduction'>Introducción</label>
      <textarea
        className='introduction-textarea'
        id='introduction'
        name='introduction'
        onBlur={changeHandler}
        onChange={changeHandler}
        value={introduction}
      />
      <label htmlFor='image'>Imágenes</label>
      <div className='button-container'>
        <button className='button yellow-button'>
          Añadir archivo multimedia
        </button>
        <button className='button yellow-button'>
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
          onClick={edit ? editHandler : createHandler}
        >
          Publicar
        </button>
      </div>
    </form>
  );
}
