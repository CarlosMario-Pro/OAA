import axios from "axios";
import {
  ADMINISTRATORS,
  ADMINISTRATORS_FILTERS,
  ONE_ADMINISTRATOR,
  CREATE_ADMINISTRATOR,
  EDIT_ADMINISTRATOR,
  DELETE_ADMINISTRATOR,
} from "../../types/panelAdmin";
import { NEW_MESSAGE } from "../../types/alerts";

export const getAllAdministrators = () => {
  return function (dispatch) {
    axios
      .get("/admin")
      .then((res) => {
        dispatch({ type: ADMINISTRATORS, payload: res.data });
      })
      .catch((error) => {
        console.log("Error en administrators.actions: ", error);
        return {
          type: NEW_MESSAGE,
          payload: {
            message:
              "Ha ocurrido un error al intentar obtener los usuario administradores.",
            state: "error",
          },
        };
      });
  };
};

export const administratorsFilters = (filters) => ({
  type: ADMINISTRATORS_FILTERS,
  payload: filters,
});

export const oneAdministrator = (id) => {
  return function (dispatch) {
    axios
      .get(`/admin/data/${id}`)
      .then((res) => {
        dispatch({ type: ONE_ADMINISTRATOR, payload: res.data });
      })
      .catch((error) => {
        console.log("Error en administrators.actions: ", error);
        return {
          type: NEW_MESSAGE,
          payload: {
            message:
              "Ha ocurrido un error al intentar obtener un usuario administrador.",
            state: "error",
          },
        };
      });
  };
};

export const createAdministrator = (newAdmin) => {
  return function (dispatch) {
    axios
      .post("/admin", newAdmin)
      .then((res) => {
        dispatch({ type: CREATE_ADMINISTRATOR, payload: res.data });
      })
      .then(() => {
        dispatch({
          type: NEW_MESSAGE,
          payload: {
            message: "Nuevo administrador creado exitosamente.",
            state: "success",
          },
        });
      })
      .catch((error) => {
        console.log("Error en administrators.actions: ", error);
        return {
          type: NEW_MESSAGE,
          payload: {
            message:
              "Ha ocurrido un error al intentar crear un nuevo usuario administrador.",
            state: "error",
          },
        };
      });
  };
};

export const editAdministrator = (id, updateAdmin) => {
  return function (dispatch) {
    axios
      .put(`/admin/data/${id}`, updateAdmin)
      .then((res) => {
        dispatch({ type: EDIT_ADMINISTRATOR, payload: res.data });
      })
      .then(() => {
        dispatch({
          type: NEW_MESSAGE,
          payload: {
            message: "Un administrador fue editado exitosamente.",
            state: "success",
          },
        });
      })
      .catch((error) => {
        console.log("Error en administrators.actions: ", error);
        return {
          type: NEW_MESSAGE,
          payload: {
            message:
              "Ha ocurrido un error al intentar editar a un usuario administrador.",
            state: "error",
          },
        };
      });
  };
};

export const deleteAdministrator = (id) => {
  return function (dispatch) {
    axios
      .delete(`/admin/${id}`)
      .then(() => {
        dispatch({ type: DELETE_ADMINISTRATOR, payload: id });
      })
      .then(() => {
        dispatch({
          type: NEW_MESSAGE,
          payload: {
            message: "Un administrador fue removido exitosamente.",
            state: "success",
          },
        });
      })
      .catch((error) => {
        console.log("Error en administrators.actions: ", error);
        return {
          type: NEW_MESSAGE,
          payload: {
            message:
              "Ha ocurrido un error al intentar eliminar a un usuario administrador.",
            state: "error",
          },
        };
      });
  };
};
