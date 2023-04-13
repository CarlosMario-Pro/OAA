import { useDispatch, useSelector } from "react-redux";
import { confirmationClose } from "../../stateManagement/actions/alerts/confirmationWindow.actions";
import styles from "./ConfirmationWindow.module.css";

export default function ConfirmationWindow({ message, handler }) {
  const dispatch = useDispatch(),
    confirmationState = useSelector((state) => state.confirmation),
    { confirmationWindow } = confirmationState;

  const cancelHandler = (event) => {
    event.preventDefault();
    dispatch(confirmationClose());
  };
  const acceptHandler = (event) => {
    event.preventDefault();
    handler();
    dispatch(confirmationClose());
  };
  return (
    <div className={`${styles["container"]} ${styles[confirmationWindow]}`}>
      <p>{message}</p>
      <div className='button-container'>
        <button className='button red-button' onClick={cancelHandler}>
          Cancelar
        </button>
        <button className='button green-button' onClick={acceptHandler}>
          Aceptar
        </button>
      </div>
    </div>
  );
}
