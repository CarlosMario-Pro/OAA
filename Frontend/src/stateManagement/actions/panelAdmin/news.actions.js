import axios from "axios";
import {
  NEWS,
  NEW_DETAIL,
  NEWS_FILTERS,
  CREATE_NEW,
  EDIT_NEW,
  REMOVE_NEW,
  DELETE_NEW,
} from "../../types/panelAdmin";
import { NEW_MESSAGE } from "../../types/alerts";

export const getAllNews = () => {
  return function (dispatch) {
    axios
      .get("/news")
      .then((res) => {
        dispatch({ type: NEWS, payload: res.data });
      })
      .catch((error) => {
        console.log("Error en news.actions: ", error);
        return {
          type: NEW_MESSAGE,
          payload: {
            message: "Ha ocurrido un error al intentar obtener las noticias.",
            state: "error",
          },
        };
      });
  };
};

export const getNewDetail = (id) => {
  return function (dispatch) {
    axios
      .get(`/news/${id}`)
      .then((res) => {
        dispatch({ type: NEW_DETAIL, payload: res.data });
      })
      .catch((error) => {
        console.log("Error en news.actions: ", error);
        return {
          type: NEW_MESSAGE,
          payload: {
            message: "Esta noticia ya no se encuentra disponible.",
            state: "error",
          },
        };
      });
  };
};

export const newsFilters = (filters) => ({
  type: NEWS_FILTERS,
  payload: filters,
});

export const createNew = (newData) => {
  return function (dispatch) {
    axios
      .post("/news", newData)
      .then((res) => {
        dispatch({ type: CREATE_NEW, payload: res.data });
      })
      .then(() => {
        dispatch({
          type: NEW_MESSAGE,
          payload: {
            message: "Nueva publicación añadida exitosamente.",
            state: "success",
          },
        });
      })
      .catch((error) => {
        console.log("Error en news.actions: ", error);
        return {
          type: NEW_MESSAGE,
          payload: {
            message:
              "Ha ocurrido un error al intentar añadir una nueva publicación.",
            state: "error",
          },
        };
      });
  };
};

export const editNew = (id, updateData) => {
  return function (dispatch) {
    axios
      .put(`/news/${id}`, updateData)
      .then((res) => {
        dispatch({ type: EDIT_NEW, payload: res.data });
      })
      .then(() => {
        dispatch({
          type: NEW_MESSAGE,
          payload: {
            message: "Una publicación fue editado exitosamente.",
            state: "success",
          },
        });
      })
      .catch((error) => {
        console.log("Error en news.actions: ", error);
        return {
          type: NEW_MESSAGE,
          payload: {
            message: "Ha ocurrido un error al intentar editar una publicación.",
            state: "error",
          },
        };
      });
  };
};

//borrado lógico
export const removeNew = (id) => {
  return function (dispatch) {
    axios
      .put(`/news/restoreNews/${id}`)
      .then(() => {
        dispatch({ type: REMOVE_NEW, payload: id });
      })
      .then(() => {
        dispatch({
          type: NEW_MESSAGE,
          payload: {
            message: "Una publicación fue desactivada exitosamente.",
            state: "success",
          },
        });
      })
      .catch((error) => {
        console.log("Error en news.actions: ", error);
        return {
          type: NEW_MESSAGE,
          payload: {
            message:
              "Ha ocurrido un error al intentar desactivar una publicación.",
            state: "error",
          },
        };
      });
  };
};

//borrado real
export const deleteNew = (id) => {
  return function (dispatch) {
    axios
      .delete(`/news/${id}`)
      .then(() => {
        dispatch({ type: DELETE_NEW, payload: id });
      })
      .then(() => {
        dispatch({
          type: NEW_MESSAGE,
          payload: {
            message: "Una publicación fue eliminada exitosamente.",
            state: "success",
          },
        });
      })
      .catch((error) => {
        console.log("Error en news.actions: ", error);
        return {
          type: NEW_MESSAGE,
          payload: {
            message:
              "Ha ocurrido un error al intentar eliminar a una publicación.",
            state: "error",
          },
        };
      });
  };
};
