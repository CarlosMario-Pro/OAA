import {
  DONATIONS,
  DONATIONS_FILTERS,
  REMOVE_DONATION,
  DELETE_DONATION,
} from "../../types/panelAdmin";

const initialState = {
  allDonations: [],
  donations: [],
  filters: {
    status: "active",
    money: "all",
    orderDate: "latest",
  },
};

export default function donationsReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case DONATIONS: // Get
      return { ...state, allDonations: [...payload], donations: [...payload] };
    case DONATIONS_FILTERS: // Filters
      const { status, iso, orderAmount, orderDate, search } = payload;
      let filteredDonations = [...state.allDonations];

      if (status === "active") {
        filteredDonations = filteredDonations.filter(
          (a) => a["isDeleted"] === false
        );
      } else if (status === "inactive") {
        filteredDonations = filteredDonations.filter(
          (a) => a["isDeleted"] === true
        );
      }

      if (iso !== "all") {
        if (iso === "ARS") {
          filteredDonations = filteredDonations.filter(
            (a) => a["iso"] === "ARS"
          );
        } else if (iso === "USD") {
          filteredDonations = filteredDonations.filter(
            (a) => a["iso"] === "USD"
          );
        }
      }

      if (orderAmount) {
        if (orderAmount === "lower") {
          filteredDonations.sort((a, b) => a.amount - b.amount);
        } else {
          filteredDonations.sort((a, b) => a.amount - b.amount).reverse();
        }
      }

      if (orderDate) {
        if (orderDate === "latest") {
          filteredDonations.sort(
            (a, b) => new Date(a.date).getTime() > new Date(b.date).getTime()
          );
        } else {
          filteredDonations
            .sort(
              (a, b) => new Date(a.date).getTime() > new Date(b.date).getTime()
            )
            .reverse();
        }
      }

      if (search) {
        filteredDonations = filteredDonations.filter((a) => {
          return a["id"].includes(search) || a["aumount"].includes(search);
        });
      }
      return {
        ...state,
        donations: [...filteredDonations],
        filters: { ...payload },
      };
    case REMOVE_DONATION: // Remove
      const removedAllDonations = state.allDonations.find(
        (admin) => admin._id === payload
      );
      removedAllDonations.isDeleted = true;
      const removedDonations = state.donations.filter(
        (admin) => admin._id !== payload
      );
      return { ...state, donations: [...removedDonations] };
    case DELETE_DONATION: // Delete
      const deletedAllDonations = state.allDonations.filter(
        (admin) => admin._id !== payload
      );
      const deletedDonations = state.donations.filter(
        (admin) => admin._id !== payload
      );
      return {
        ...state,
        allDonations: [...deletedAllDonations],
        donations: [...deletedDonations],
      };
    default:
      return state;
  }
}
