import axios from "axios";
import { ADMIN_LOGIN, ADMIN_LOGOUT } from "../../types/panelAdmin";
import { NEW_MESSAGE } from "../../types/alerts";

export const loginAdmin = (data) => {
  return function (dispatch) {
    axios
      .get("/admin/log", { data })
      .then((res) => {
        dispatch({ type: ADMIN_LOGIN, payload: res.data });
      })
      .catch((error) => {
        console.log("Error en admin.actions: ", error);
        return {
          type: NEW_MESSAGE,
          payload: {
            message: "El correo o la contraseña no son válidos.",
            state: "error",
          },
        };
      });
  };
};

export const logoutAdmin = () => ({ type: ADMIN_LOGOUT });

export const resetPassword = (email) => {
  return function (dispatch) {
    axios
      .put(`/admin/password`, email)
      .then(() => {
        dispatch({
          type: NEW_MESSAGE,
          payload: {
            message: "Nueva contraseña enviada al correo.",
            state: "success",
          },
        });
      })
      .catch((error) => {
        console.log("Error en admin.actions: ", error);
        return {
          type: NEW_MESSAGE,
          payload: {
            message: "Ha ocurrido un error al intentar resetear la contraseña.",
            state: "error",
          },
        };
      });
  };
};

export const editPassword = (id, password) => {
  return function (dispatch) {
    axios
      .put(`/admin/password/${id}`, password)
      .then(() => {
        dispatch({
          type: NEW_MESSAGE,
          payload: {
            message: "Su contraseña fue actualizada exitosamente.",
            state: "success",
          },
        });
      })
      .catch((error) => {
        console.log("Error en admin.actions: ", error);
        return {
          type: NEW_MESSAGE,
          payload: {
            message:
              "Ha ocurrido un error al intentar actualizar la contraseña.",
            state: "error",
          },
        };
      });
  };
};
