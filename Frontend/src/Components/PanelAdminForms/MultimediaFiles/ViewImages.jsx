import { MdDelete } from "react-icons/md";
import styles from "./ViewImages.module.css";

export default function ViewImages({ images, setImages }) {
  const deleteHandler = (event, deleted) => {
    event.preventDefault();
    const deletedImage = images.filter((image) => image !== deleted);
    setImages([...deletedImage]);
  };
  return (
    <div className={`${styles["container"]}`}>
      {images.map((image, index) => (
        <div key={`image-${index}`}>
          <div className={`${styles["image-container"]}`}>
            {image && <img className={`${styles["image"]}`} src={image} />}
            <button
              className={`${styles["delete-btn"]}`}
              onClick={(e) => deleteHandler(e, image)}
            >
              <MdDelete className='blue-icon' size='2rem' />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
