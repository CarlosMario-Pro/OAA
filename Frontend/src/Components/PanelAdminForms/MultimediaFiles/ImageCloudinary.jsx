import { MdDelete, MdCheckCircle } from "react-icons/md";
import { useState } from "react";
import styles from "./ImageCloudinary.module.css";

export default function ImageCloudinary({
  open,
  setOpen,
  images,
  setImages,
  setError,
}) {
  const [image, setImage] = useState("");
  const [file, setFile] = useState(null);
  const [loader, setLoader] = useState(false);
  const [errors, setErrors] = useState({});

  const changeHandler = (event) => {
    event.preventDefault();
    const newFile = event.target.files[0];
    setFile(event.target.files[0]);
    setImage(URL.createObjectURL(newFile));
  };

  const checkHandler = async (event) => {
    event.preventDefault();
    try {
      setError({});
      setErrors({});
      if (file) {
        setLoader(true);
        const body = new FormData();
        body.append("file", file);
        body.append("upload_preset", "images");
        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${
            import.meta.env.VITE_CLOUDINARY_NAME
          }/image/upload`,
          {
            method: "POST",
            body,
          }
        );
        const img_url = await res.json();
        setImages([...images, img_url.secure_url]);
        setImage("");
        setLoader(false);
        setOpen(false);
      }
    } catch (error) {
      console.log(error);
      setLoader(false);
      setErrors({
        ...errors,
        update: "Ocurrió un error. Abra la consola para más información.",
      });
    }
  };

  const deleteHandler = (event) => {
    event.preventDefault();
    setImage("");
    setFile(null);
    setOpen(false);
  };

  return (
    <div className={`${!open && "invisible"} ${styles["container"]}`}>
      <div className={`${styles["image-container"]}`}>
        {image && (
          <img
            className={`${styles["image"]}`}
            src={image}
            alt='Previsualización'
          />
        )}
      </div>
      <div className={`${styles["form-container"]}`}>
        <ol>
          <li>Seleccione la imagen que desea subir.</li>
          <li>
            Si está conforme con la vista previa presione el "
            <MdCheckCircle size='1rem' />
            ". En caso contrario, seleccione otra imagen.
          </li>
          <li>
            Si no desea agregar una imagen presione "<MdDelete size='1rem' />
            ".
          </li>
        </ol>
        <div>
          <div className={`${styles["buttons-container"]}`}>
            <label htmlFor='image'>Archivo .PNG, .JPG ó .WEBP</label>
            {loader ? (
              <p>Cargando...</p>
            ) : (
              <>
                {" "}
                <button onClick={checkHandler}>
                  <MdCheckCircle className='blue-icon' size='1.5rem' />
                </button>
                <button onClick={deleteHandler}>
                  <MdDelete className='blue-icon' size='1.5rem' />
                </button>
              </>
            )}
          </div>
          <input
            className='file-input'
            id='image'
            type='file'
            name='image'
            onChange={changeHandler}
            accept='image/*'
          />
          {errors.update && <p className='error'>{errors.update}</p>}
        </div>
      </div>
    </div>
  );
}
