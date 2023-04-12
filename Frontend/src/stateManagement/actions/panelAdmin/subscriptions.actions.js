import axios from "axios";
import {
  SUBSCRIPTIONS,
  SUBSCRIPTIONS_FILTERS,
  DELETE_SUBSCRIPTION,
} from "../../types/panelAdmin";

export const getSubscriptions = () => {
  return function (dispatch) {
    axios
      .get("/newsletter")
      .then((res) => {
        dispatch({ type: SUBSCRIPTIONS, payload: res.data });
      })
      .catch((error) => {
        console.log("Error en subscriptions.actions: ", error);
        return {
          type: NEW_MESSAGE,
          payload: {
            message:
              "Ha ocurrido un error al intentar obtener los suscriptores de la newsletter.",
            state: "error",
          },
        };
      });
  };
};

export const subscriptionsFilters = (filters) => ({
  type: SUBSCRIPTIONS_FILTERS,
  payload: filters,
});

export const deleteSubscription = (id) => {
  return function (dispatch) {
    axios
      .delete(`/newsletter/${id}`)
      .then(() => {
        dispatch({ type: DELETE_SUBSCRIPTION, payload: id });
      })
      .then(() => {
        dispatch({
          type: NEW_MESSAGE,
          payload: {
            message:
              "Un suscriptor de la newsletter fue eliminado exitosamente.",
            state: "success",
          },
        });
      })
      .catch((error) => {
        console.log("Error en subscriptions.actions: ", error);
        return {
          type: NEW_MESSAGE,
          payload: {
            message:
              "Ha ocurrido un error al intentar eliminar a un suscriptor de la newsletter.",
            state: "error",
          },
        };
      });
  };
};
