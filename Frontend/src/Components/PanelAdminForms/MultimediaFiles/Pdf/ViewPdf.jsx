import { MdDelete } from "react-icons/md";
import styles from "./ViewPdf.module.css";

export default function ViewPdf({ pdf, setPdf }) {
  const deleteHandler = (event, deleted) => {
    event.preventDefault();
    const deletedImage = pdf.filter((file) => file.url !== deleted);
    setPdf([...deletedImage]);
  };
  return (
    <div className={`${styles["container"]}`}>
      {/* {pdf.map((pdf, index) => (
        <div key={`image-${index}`}>
          <div className={`${styles["image-container"]}`}>
            {pdf.url && <img className={`${styles["image"]}`} src={pdf.url} />}
            {pdf.label && <p className={`${styles["caption"]}`}>{pdf.label}</p>}
            <button
              className={`${styles["delete-btn"]}`}
              onClick={(e) => deleteHandler(e, pdf.url)}
            >
              <MdDelete className="blue-icon" size="2rem" />
            </button>
          </div>
        </div>
      ))} */}
    </div>
  );
}
