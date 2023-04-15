import {
  OUR_PROJECTS,
  ONE_PROJECT,
  OUR_PROJECTS_FILTERS,
  CREATE_NEW_PROJECT,
  EDIT_PROJECT,
  REMOVE_PROJECT,
  DELETE_PROJECT,
} from "../../types/panelAdmin";

const initialState = {
  allProjects: [],
  projects: [],
  oneProject: {},
  filters: {
    status: "active",
    orderDate: "latest",
    progress: "all",
  },
};

export default function ourProjectsReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case OUR_PROJECTS: // Get
      return { ...state, allProjects: [...payload], projects: [...payload] };
    case ONE_PROJECT: // Get ID
      return { ...state, oneProject: { ...payload } };
    case OUR_PROJECTS_FILTERS: // filters
      const { status, orderTitle, orderDate, progress, search } = payload;
      let filteredProjects = [...state.allProjects];

      if (status === "active") {
        filteredProjects = filteredProjects.filter(
          (a) => a["isDeleted"] === false
        );
      } else if (status === "inactive") {
        filteredProjects = filteredProjects.filter(
          (a) => a["isDeleted"] === true
        );
      }

      if (orderTitle) {
        if (orderTitle === "az") {
          filteredProjects.sort((a, b) => a.title.localeCompare(b.title));
        } else {
          filteredProjects
            .sort((a, b) => a.title.localeCompare(b.title))
            .reverse();
        }
      }

      if (orderDate) {
        if (orderDate === "latest") {
          filteredProjects.sort(
            (a, b) => new Date(a.date).getTime() > new Date(b.date).getTime()
          );
        } else {
          filteredProjects
            .sort(
              (a, b) => new Date(a.date).getTime() > new Date(b.date).getTime()
            )
            .reverse();
        }
      }

      if (progress !== "all") {
        if (progress === "completed") {
          filteredProjects = filteredProjects.filter(
            (a) => a.progress === "completed"
          );
        } else if (progress === "in progress") {
          filteredProjects = filteredProjects.filter(
            (a) => a.progress === "in progress"
          );
        }
      }

      if (search) {
        filteredProjects = filteredProjects.filter((a) => {
          const title = a["title"].toLowerCase();
          return a["id"].includes(search) || title.includes(search);
        });
      }
      return {
        ...state,
        projects: [...filteredProjects],
        filters: { ...payload },
      };
    case CREATE_NEW_PROJECT: // Post
      return {
        ...state,
        allProjects: [payload, ...state.allProjects],
        projects: [payload, ...state.projects],
      };
    case EDIT_PROJECT: // Put
      const updatedAllProjects = state.allProjects.filter(
        (a) => a._id !== payload._id
      );
      const updatedProjects = state.projects.filter(
        (a) => a._id !== payload._id
      );

      return {
        ...state,
        allProjects: [payload, ...updatedAllProjects],
        projects: [payload, ...updatedProjects],
      };
    case REMOVE_PROJECT:
      const removedAllProjects = state.allProjects.find(
        (admin) => admin._id === payload
      );
      removedAllProjects.isDeleted = true;
      const removedProjects = state.projects.filter(
        (admin) => admin._id !== payload
      );
      return { ...state, projects: [...removedProjects] };
    case DELETE_PROJECT:
      const deletedAllProjects = state.allProjects.filter(
        (admin) => admin._id !== payload
      );
      const deletedProjects = state.projects.filter(
        (admin) => admin._id !== payload
      );
      return {
        ...state,
        allProjects: [deletedAllProjects, ...state.allProjects],
        projects: [deletedProjects, ...state.projects],
      };
    default:
      return state;
  }
}
