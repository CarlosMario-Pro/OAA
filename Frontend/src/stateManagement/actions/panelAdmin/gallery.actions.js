import axios from "axios";
import {
  GALLERY,
  ONE_GALLERY,
  GALLERY_FILTERS,
  CREATE_GALLERY,
  EDIT_GALLERY,
  REMOVE_GALLERY,
  DELETE_GALLERY,
} from "../../types/panelAdmin";
import { NEW_MESSAGE } from "../../types/alerts";

export const getGallery = () => {
  return function (dispatch) {
    axios
      .get("/gallery")
      .then((res) => {
        dispatch({ type: GALLERY, payload: res.data });
      })
      .catch((error) => {
        console.log("Error en gallery.actions: ", error);
        return {
          type: NEW_MESSAGE,
          payload: {
            message:
              "Ha ocurrido un error al intentar obtener los datos de la galería.",
            state: "error",
          },
        };
      });
  };
};

export const oneGallery = (id) => {
  return function (dispatch) {
    axios
      .get(`/gallery/${id}`)
      .then((res) => {
        dispatch({ type: ONE_GALLERY, payload: res.data });
      })
      .catch((error) => {
        console.log("Error en gallery.actions: ", error);
        return {
          type: NEW_MESSAGE,
          payload: {
            message:
              "Ha ocurrido un error al intentar obtener un archivo de la galería.",
            state: "error",
          },
        };
      });
  };
};

export const galleryFilters = (filters) => ({
  type: GALLERY_FILTERS,
  payload: filters,
});

export const createGallery = (newData) => {
  return function (dispatch) {
    axios
      .post("/gallery", newData)
      .then((res) => {
        dispatch({ type: CREATE_GALLERY, payload: res.data });
      })
      .then(() => {
        dispatch({
          type: NEW_MESSAGE,
          payload: {
            message: "Nuevo archivo añadido exitosamente a la galería.",
            state: "success",
          },
        });
      })
      .catch((error) => {
        console.log("Error en gallery.actions: ", error);
        return {
          type: NEW_MESSAGE,
          payload: {
            message:
              "Ha ocurrido un error al intentar añadir un nuevo archivo a la galería.",
            state: "error",
          },
        };
      });
  };
};

export const editGallery = (id, updateData) => {
  return function (dispatch) {
    axios
      .put(`/gallery/update/${id}`, updateData)
      .then((res) => {
        dispatch({ type: EDIT_GALLERY, payload: res.data });
      })
      .then(() => {
        dispatch({
          type: NEW_MESSAGE,
          payload: {
            message: "Un archivo de la galería fue editado exitosamente.",
            state: "success",
          },
        });
      })
      .catch((error) => {
        console.log("Error en gallery.actions: ", error);
        return {
          type: NEW_MESSAGE,
          payload: {
            message:
              "Ha ocurrido un error al intentar editar un archivo de la galería.",
            state: "error",
          },
        };
      });
  };
};

// borrado lógico
export const removeGallery = (id) => {
  return function (dispatch) {
    axios
      .put(`/gallery/delete/${id}`)
      .then(() => {
        dispatch({ type: REMOVE_GALLERY, payload: id });
      })
      .then(() => {
        dispatch({
          type: NEW_MESSAGE,
          payload: {
            message: "Un archivo  de la galería fue desactivado exitosamente.",
            state: "success",
          },
        });
      })
      .catch((error) => {
        console.log("Error en gallery.actions: ", error);
        return {
          type: NEW_MESSAGE,
          payload: {
            message:
              "Ha ocurrido un error al intentar desactivar a un archivo de la galería.",
            state: "error",
          },
        };
      });
  };
};

//borrado real
export const deleteGallery = (id) => {
  return function (dispatch) {
    axios
      .delete(`/gallery/${id}`)
      .then(() => {
        dispatch({ type: DELETE_GALLERY, payload: id });
      })
      .then(() => {
        dispatch({
          type: NEW_MESSAGE,
          payload: {
            message: "Un archivo fue eliminado de la galería exitosamente.",
            state: "success",
          },
        });
      })
      .catch((error) => {
        console.log("Error en gallery.actions: ", error);
        return {
          type: NEW_MESSAGE,
          payload: {
            message:
              "Ha ocurrido un error al intentar eliminar a un archivo de la galería.",
            state: "error",
          },
        };
      });
  };
};
