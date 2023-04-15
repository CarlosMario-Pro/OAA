import axios from "axios";
import {
  RADIO_PROGRAM,
  ONE_RADIO_PROGRAM,
  RADIO_PROGRAM_FILTERS,
  CREATE_RADIO_PROGRAM,
  EDIT_RADIO_PROGRAM,
  REMOVE_RADIO_PROGRAM,
  DELETE_RADIO_PROGRAM,
} from "../../types/panelAdmin";
import { NEW_MESSAGE } from "../../types/alerts";

export const getRadioProgram = () => {
  return function (dispatch) {
    axios
      .get("/radio-program")
      .then((res) => {
        dispatch({ type: RADIO_PROGRAM, payload: res.data });
      })
      .catch((error) => {
        console.log("Error en radioProgram.actions: ", error);
        return {
          type: NEW_MESSAGE,
          payload: {
            message:
              "Ha ocurrido un error al intentar obtener programas de radio.",
            state: "error",
          },
        };
      });
  };
};

export const oneRadioProgram = (id) => {
  return function (dispatch) {
    axios
      .get(`/radio-program/${id}`)
      .then((res) => {
        dispatch({ type: ONE_RADIO_PROGRAM, payload: res.data });
      })
      .catch((error) => {
        console.log("Error en radioProgram.actions: ", error);
        return {
          type: NEW_MESSAGE,
          payload: {
            message:
              "Ha ocurrido un error al intentar obtener un programa de radio.",
            state: "error",
          },
        };
      });
  };
};

export const radioProgramFilters = (filters) => ({
  type: RADIO_PROGRAM_FILTERS,
  payload: filters,
});

export const createRadioProgram = (newData) => {
  return function (dispatch) {
    axios
      .post("/radio-program", newData)
      .then((res) => {
        dispatch({ type: CREATE_RADIO_PROGRAM, payload: res.data });
      })
      .then(() => {
        dispatch({
          type: NEW_MESSAGE,
          payload: {
            message: "Nueva transmisión de radio agregada exitosamente.",
            state: "success",
          },
        });
      })
      .catch((error) => {
        console.log("Error en radioProgram.actions: ", error);
        return {
          type: NEW_MESSAGE,
          payload: {
            message:
              "Ha ocurrido un error al intentar añadir una nueva transmisión de radio.",
            state: "error",
          },
        };
      });
  };
};

export const editRadioProgram = (id, updateData) => {
  return function (dispatch) {
    axios
      .put(`/radio-program/update/${id}`, updateData)
      .then((res) => {
        dispatch({ type: EDIT_RADIO_PROGRAM, payload: res.data });
      })
      .then(() => {
        dispatch({
          type: NEW_MESSAGE,
          payload: {
            message: "Una transmisión de radio fue editado exitosamente.",
            state: "success",
          },
        });
      })
      .catch((error) => {
        console.log("Error en radioProgram.actions: ", error);
        return {
          type: NEW_MESSAGE,
          payload: {
            message:
              "Ha ocurrido un error al intentar editar una transmisión de radio.",
            state: "error",
          },
        };
      });
  };
};

// Borrado lógico
export const removeRadioProgram = (id) => {
  return function (dispatch) {
    axios
      .put(`/radio-program/delete/${id}`)
      .then(() => {
        dispatch({ type: REMOVE_RADIO_PROGRAM, payload: id });
      })
      .then(() => {
        dispatch({
          type: NEW_MESSAGE,
          payload: {
            message: "Una transmisión de radio fue desactivada exitosamente.",
            state: "success",
          },
        });
      })
      .catch((error) => {
        console.log("Error en radioProgram.actions: ", error);
        return {
          type: NEW_MESSAGE,
          payload: {
            message:
              "Ha ocurrido un error al intentar desactivar una transmisión de radio.",
            state: "error",
          },
        };
      });
  };
};

// Borrado real
export const deleteRadioProgram = (id) => {
  return function (dispatch) {
    axios
      .delete(`/radio-program/${id}`)
      .then(() => {
        dispatch({ type: DELETE_RADIO_PROGRAM, payload: id });
      })
      .then(() => {
        dispatch({
          type: NEW_MESSAGE,
          payload: {
            message: "Una transmisión de radio fue eliminada exitosamente.",
            state: "success",
          },
        });
      })
      .catch((error) => {
        console.log("Error en radioProgram.actions: ", error);
        return {
          type: NEW_MESSAGE,
          payload: {
            message:
              "Ha ocurrido un error al intentar eliminar una transmisión de radio.",
            state: "error",
          },
        };
      });
  };
};
