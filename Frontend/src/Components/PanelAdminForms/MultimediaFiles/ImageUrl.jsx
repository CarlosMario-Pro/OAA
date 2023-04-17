import { MdDelete, MdCheckCircle, MdCached } from "react-icons/md";
import styles from "./ImageUrl.module.css";
import { useState } from "react";
import { validationsUrl } from "../../../utils/helpers/validationsPublications";

export default function ImageUrl({
  open,
  setOpen,
  images,
  setImages,
  setError,
}) {
  const [image, setImage] = useState("");
  const [errors, setErrors] = useState("");

  const changeHandler = (event) => {
    event.preventDefault();
    const { value } = event.target;
    setImage(value);
    setErrors(validationsUrl(image));
  };

  const clearHandler = (event) => {
    event.preventDefault();
    setImage("");
  };

  const checkHandler = (event) => {
    event.preventDefault();
    setError({});
    setErrors(validationsUrl(image));
    if (Object.keys(errors).length === 0) {
      setImages([...images, image]);
      setImage("");
      setOpen(false);
    }
  };

  const deleteHandler = (event) => {
    event.preventDefault();
    setImage("");
    setOpen(false);
  };
  return (
    <div className={`${!open && "invisible"} ${styles["container"]}`}>
      <div className={`${styles["image-container"]}`}>
        {image && <img className={`${styles["image"]}`} src={image} />}
      </div>
      <div className={`${styles["form-container"]}`}>
        <ol>
          <li>Introduzca el URL de la imagen.</li>
          <li>
            Si está conforme con la vista previa presione el "
            <MdCheckCircle size='1rem' />
            ". En caso contrario, presione "<MdCached size='1rem' />" e
            introduzca otro URL.
          </li>
          <li>
            Si no desea agregar una imagen presione "<MdDelete size='1rem' />
            ".
          </li>
        </ol>
        <div>
          <div className={`${styles["buttons-container"]}`}>
            <label htmlFor='image'>URL</label>
            {image && (
              <button onClick={clearHandler}>
                <MdCached className='blue-icon' size='1.5rem' />
              </button>
            )}
            <button onClick={checkHandler}>
              <MdCheckCircle className='blue-icon' size='1.5rem' />
            </button>
            <button onClick={deleteHandler}>
              <MdDelete className='blue-icon' size='1.5rem' />
            </button>
          </div>
          <input
            className='text-input'
            id='image'
            type='url'
            name='image'
            onBlur={changeHandler}
            onChange={changeHandler}
            value={image}
            autoComplete='off'
          />
          {errors.url && <p className='error'>{errors.url}</p>}
        </div>
      </div>
    </div>
  );
}
