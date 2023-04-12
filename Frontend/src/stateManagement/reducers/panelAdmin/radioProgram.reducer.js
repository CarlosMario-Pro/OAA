import {
  RADIO_PROGRAM,
  ONE_RADIO_PROGRAM,
  RADIO_PROGRAM_FILTERS,
  CREATE_RADIO_PROGRAM,
  EDIT_RADIO_PROGRAM,
  REMOVE_RADIO_PROGRAM,
  DELETE_RADIO_PROGRAM,
} from "../../types/panelAdmin";

const initialState = {
  allRadioPrograms: [],
  radioProgram: [],
  oneRadioProgram: {},
  filters: {
    status: "active",
    orderDate: "latest",
  },
};

export default function radioProgramReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case RADIO_PROGRAM: // Get
      return {
        ...state,
        allRadioPrograms: [...payload],
        radioProgram: [...payload],
      };
    case ONE_RADIO_PROGRAM: // Get ID
      return { ...state, oneRadioProgram: { ...payload } };
    case RADIO_PROGRAM_FILTERS: // Filters
      const { status, orderTitle, orderDate, search } = payload;
      let filteredRadio = [...state.allRadioPrograms];

      if (status === "active") {
        filteredRadio = filteredRadio.filter((a) => a["isDeleted"] === false);
      } else if (status === "inactive") {
        filteredRadio = filteredRadio.filter((a) => a["isDeleted"] === true);
      }

      if (orderTitle) {
        if (orderTitle === "az") {
          filteredRadio.sort((a, b) => a.title.localeCompare(b.title));
        } else {
          filteredRadio
            .sort((a, b) => a.title.localeCompare(b.title))
            .reverse();
        }
      }

      if (orderDate) {
        if (orderDate === "latest") {
          filteredRadio.sort(
            (a, b) => new Date(a.date).getTime() > new Date(b.date).getTime()
          );
        } else {
          filteredRadio
            .sort(
              (a, b) => new Date(a.date).getTime() > new Date(b.date).getTime()
            )
            .reverse();
        }
      }

      if (search) {
        filteredRadio = filteredRadio.filter((a) => {
          const title = a["title"].toLowerCase();
          return a["id"].includes(search) || title.includes(search);
        });
      }
      return {
        ...state,
        radioProgram: [...filteredRadio],
        filters: { ...payload },
      };
    case CREATE_RADIO_PROGRAM: // Post
      return {
        ...state,
        allRadioPrograms: [payload, state.allRadioPrograms],
        radioProgram: [payload, state.radioProgram],
      };
    case EDIT_RADIO_PROGRAM: // Put
      const updatedAllRadio = state.allRadioPrograms.filter(
        (a) => a._id !== payload._id
      );
      const updatedRadio = state.radioProgram.filter(
        (a) => a._id !== payload._id
      );

      return {
        ...state,
        allRadioPrograms: [payload, ...updatedAllRadio],
        radioProgram: [payload, ...updatedRadio],
      };
    case REMOVE_RADIO_PROGRAM: // Remove
      const removedAllRadio = state.allRadioPrograms.find(
        (admin) => admin._id === payload
      );
      removedAllRadio.isDeleted = true;
      const removedRadio = state.radioProgram.filter(
        (admin) => admin._id !== payload
      );
      return { ...state, radioProgram: [...removedRadio] };
    case DELETE_RADIO_PROGRAM: // Delete
      const deletedAllRadio = state.allRadioPrograms.filter(
        (admin) => admin._id !== payload
      );
      const deletedRadio = state.radioProgram.filter(
        (admin) => admin._id !== payload
      );
      return {
        ...state,
        allRadioPrograms: [...deletedAllRadio],
        radioProgram: [...deletedRadio],
      };
    default:
      return state;
  }
}
