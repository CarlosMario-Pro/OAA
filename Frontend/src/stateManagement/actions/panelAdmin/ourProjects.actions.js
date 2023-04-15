import axios from "axios";
import {
  OUR_PROJECTS,
  ONE_PROJECT,
  OUR_PROJECTS_FILTERS,
  CREATE_NEW_PROJECT,
  EDIT_PROJECT,
  REMOVE_PROJECT,
  DELETE_PROJECT,
} from "../../types/panelAdmin";
import { NEW_MESSAGE } from "../../types/alerts";

export const getOurProjects = () => {
  return function (dispatch) {
    axios
      .get("/our-projects")
      .then((res) => {
        dispatch({ type: OUR_PROJECTS, payload: res.data });
      })
      .catch((error) => {
        console.log("Error en ourProjects.actions: ", error);
        return {
          type: NEW_MESSAGE,
          payload: {
            message:
              "Ha ocurrido un error al intentar obtener los datos de la nuestros proyectos.",
            state: "error",
          },
        };
      });
  };
};

export const oneProjects = (id) => {
  return function (dispatch) {
    axios
      .get(`/our-projects/${id}`)
      .then((res) => {
        dispatch({ type: ONE_PROJECT, payload: res.data });
      })
      .catch((error) => {
        console.log("Error en ourProjects.actions: ", error);
        return {
          type: NEW_MESSAGE,
          payload: {
            message:
              "Ha ocurrido un error al intentar obtener los datos de un proyecto.",
            state: "error",
          },
        };
      });
  };
};

export const OurProjectsFilters = (filters) => ({
  type: OUR_PROJECTS_FILTERS,
  payload: filters,
});

export const createNewProject = (newData) => {
  return function (dispatch) {
    axios
      .post("/our-projects", newData)
      .then((res) => {
        dispatch({ type: CREATE_NEW_PROJECT, payload: res.data });
      })
      .then(() => {
        dispatch({
          type: NEW_MESSAGE,
          payload: {
            message: "Nuevo proyecto creado exitosamente.",
            state: "success",
          },
        });
      })
      .catch((error) => {
        console.log("Error en ourProjects.actions: ", error);
        return {
          type: NEW_MESSAGE,
          payload: {
            message:
              "Ha ocurrido un error al intentar crear un nuevo proyecto.",
            state: "error",
          },
        };
      });
  };
};

export const editProject = (id, updateData) => {
  return function (dispatch) {
    axios
      .put(`/our-projects/update/${id}`, updateData)
      .then((res) => {
        dispatch({ type: EDIT_PROJECT, payload: res.data });
      })
      .then(() => {
        dispatch({
          type: NEW_MESSAGE,
          payload: {
            message: "Un proyecto fue editado exitosamente.",
            state: "success",
          },
        });
      })
      .catch((error) => {
        console.log("Error en ourProjects.actions: ", error);
        return {
          type: NEW_MESSAGE,
          payload: {
            message: "Ha ocurrido un error al intentar editar un proyecto.",
            state: "error",
          },
        };
      });
  };
};

//borrado lógico
export const removeProject = (id) => {
  return function (dispatch) {
    axios
      .put(`/our-projects/delete/${id}`)
      .then(() => {
        dispatch({ type: REMOVE_PROJECT, payload: id });
      })
      .then(() => {
        dispatch({
          type: NEW_MESSAGE,
          payload: {
            message: "Un proyecto fue desactivado exitosamente.",
            state: "success",
          },
        });
      })
      .catch((error) => {
        console.log("Error en ourProjects.actions: ", error);
        return {
          type: NEW_MESSAGE,
          payload: {
            message: "Ha ocurrido un error al intentar desactivar un proyecto.",
            state: "error",
          },
        };
      });
  };
};

//borrado real
export const deleteProject = (id) => {
  return function (dispatch) {
    axios
      .delete(`/our-projects/${id}`)
      .then(() => {
        dispatch({ type: DELETE_PROJECT, payload: id });
      })
      .then(() => {
        dispatch({
          type: NEW_MESSAGE,
          payload: {
            message: "Un proyecto fue eliminado exitosamente.",
            state: "success",
          },
        });
      })
      .catch((error) => {
        console.log("Error en ourProjects.actions: ", error);
        return {
          type: NEW_MESSAGE,
          payload: {
            message: "Ha ocurrido un error al intentar eliminar un proyecto.",
            state: "error",
          },
        };
      });
  };
};
