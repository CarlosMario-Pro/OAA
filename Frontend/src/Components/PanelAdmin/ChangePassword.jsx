import React from "react";
import { useDispatch, useSelector } from "react-redux";
import useForm from "../../../utils/customHooks/useForm";
import {
  loaderOff,
  loaderOn,
} from "../../stateManagement/actions/loader/loader.actions";
import validationsChangePassword from "../../../utils/helpers/validationsChangePassword";
import styles from "./ChangePassword.module.css";
import { editPassword } from "../../stateManagement/actions/panelAdmin/admin.actions";

const initialForm = {
  password: "",
  repeatPassword: "",
};

export default function ChangePassword({ isOpen, close }) {
  const dispatch = useDispatch(),
    adminState = useSelector((state) => state.admin),
    { admin } = adminState,
    { form, errors, changeHandler, resetHandler, validationsHandler } = useForm(
      initialForm,
      validationsChangePassword
    ),
    { password, repeatPassword } = form;

  const passwordHandler = () => {
    if (Object.keys(errors).length === 0) {
      dispatch(editPassword(admin._id, password));
      resetHandler();
      close();
    }
  };

  return (
    <div
      className={`${styles["container"]} ${isOpen && styles["is-open"]}`}
      onClick={close}
    >
      <form
        className={`${styles["form"]}`}
        onClick={(e) => e.stopPropagation()}
      >
        <label htmlFor='password'>Nueva contraseña</label>
        <input
          className='text-input'
          type='password'
          name='password'
          id='password'
          onBlur={changeHandler}
          onChange={changeHandler}
          value={password}
          required
        />
        {errors.password && <p className='error'>{errors.password}</p>}
        <label htmlFor='repeatPassword'>Repetir contraseña</label>
        <input
          className='text-input'
          type='password'
          name='repeatPassword'
          id='repeatPassword'
          onBlur={changeHandler}
          onChange={changeHandler}
          value={repeatPassword}
          required
        />
        {errors.repeatPassword && (
          <p className='error'>{errors.repeatPassword}</p>
        )}
        <br />
        <button
          className='button green-button'
          onClick={(event) => {
            event.preventDefault();
            validationsHandler();
            passwordHandler();
          }}
        >
          Guardar contraseña
        </button>
      </form>
    </div>
  );
}
