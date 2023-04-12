import {
  ADMINISTRATORS,
  ADMINISTRATORS_FILTERS,
  ONE_ADMINISTRATOR,
  CREATE_ADMINISTRATOR,
  EDIT_ADMINISTRATOR,
  DELETE_ADMINISTRATOR,
} from "../../types/panelAdmin";

const initialState = {
  allAdministrators: [],
  administrators: [],
  oneAdministrator: {},
  filters: {
    orderDate: "latest",
  },
};

export default function administratorsReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ADMINISTRATORS: // Get
      return {
        ...state,
        allAdministrators: [...payload],
        administrators: [...payload],
      };
    case ONE_ADMINISTRATOR: // Get ID
      return {
        ...state,
        oneAdministrator: { ...payload },
      };
    case ADMINISTRATORS_FILTERS: //Filter
      const { orderName, orderDate, search } = payload;
      let filteredAdministrators = [...state.allAdministrators];

      if (orderName) {
        if (orderName === "az") {
          filteredAdministrators.sort((a, b) => a.name.localeCompare(b.name));
        } else {
          filteredAdministrators
            .sort((a, b) => a.name.localeCompare(b.name))
            .reverse();
        }
      }
      if (orderDate) {
        if (orderDate === "latest") {
          filteredAdministrators.sort(
            (a, b) => new Date(a.date).getTime() > new Date(b.date).getTime()
          );
        } else {
          filteredAdministrators
            .sort(
              (a, b) => new Date(a.date).getTime() > new Date(b.date).getTime()
            )
            .reverse();
        }
      }
      if (search) {
        filteredAdministrators = filteredAdministrators.filter((a) => {
          const name = a["name"].toLowerCase();
          return (
            a["id"].includes(search) ||
            name.includes(search) ||
            a["email"].includes(search)
          );
        });
      }
      return {
        ...state,
        administrators: [...filteredAdministrators],
        filters: { ...payload },
      };
    case CREATE_ADMINISTRATOR: // Post
      return {
        ...state,
        allAdministrators: [payload, ...state.allAdministrators],
        administrators: [payload, ...state.administrators],
      };
    case EDIT_ADMINISTRATOR: // Put
      const updatedAllAdministrator = state.allAdministrators.filter(
        (admin) => admin._id !== payload._id
      );
      const updatedAdministrator = state.administrators.filter(
        (admin) => admin._id !== payload._id
      );
      return {
        ...state,
        allAdministrators: [payload, ...updatedAllAdministrator],
        administrators: [payload, ...updatedAdministrator],
        oneAdministrator: {},
      };
    case DELETE_ADMINISTRATOR: // Delete
      const deletedAllAdministrator = state.allAdministrators.filter(
        (admin) => admin._id !== payload
      );
      const deletedAdministrator = state.administrators.filter(
        (admin) => admin._id !== payload
      );
      return {
        ...state,
        allAdministrators: [...deletedAllAdministrator],
        administrators: [...deletedAdministrator],
      };
    default:
      return state;
  }
}
