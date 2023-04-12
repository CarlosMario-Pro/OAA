import axios from "axios";
import {
  DONATIONS,
  DONATIONS_FILTERS,
  REMOVE_DONATION,
  DELETE_DONATION,
} from "../../types/panelAdmin";

export const getDonations = () => {
  return function (dispatch) {
    axios
      .get("/donations")
      .then((res) => {
        dispatch({ type: DONATIONS, payload: res.data });
      })
      .catch((error) => {
        console.log("Error en donations.actions: ", error);
        return {
          type: NEW_MESSAGE,
          payload: {
            message: "Ha ocurrido un error al intentar obtener las donaciones.",
            state: "error",
          },
        };
      });
  };
};

export const donationsFilter = (filters) => ({
  type: DONATIONS_FILTERS,
  payload: filters,
});

//borrado lógico
export const removeDonation = (id) => {
  return function (dispatch) {
    axios
      .put(`/donations/${id}`)
      .then(() => {
        dispatch({ type: REMOVE_DONATION, payload: id });
      })
      .then(() => {
        dispatch({
          type: NEW_MESSAGE,
          payload: {
            message: "Una donación suspendida exitosamente.",
            state: "success",
          },
        });
      })
      .catch((error) => {
        console.log("Error en donations.actions: ", error);
        return {
          type: NEW_MESSAGE,
          payload: {
            message: "Ha ocurrido un error al intentar suspender una donación.",
            state: "error",
          },
        };
      });
  };
};

//borrado real
export const deleteDonations = (id) => {
  return function (dispatch) {
    axios
      .delete(`/donations/${id}`)
      .then(() => {
        dispatch({ type: DELETE_DONATION, payload: id });
      })
      .then(() => {
        dispatch({
          type: NEW_MESSAGE,
          payload: {
            message:
              "Una donación fue eliminada exitosamente de la base de datos.",
            state: "success",
          },
        });
      })
      .catch((error) => {
        console.log("Error en donations.actions: ", error);
        return {
          type: NEW_MESSAGE,
          payload: {
            message:
              "Ha ocurrido un error al intentar eliminar a una donación de la base de datos.",
            state: "error",
          },
        };
      });
  };
};
