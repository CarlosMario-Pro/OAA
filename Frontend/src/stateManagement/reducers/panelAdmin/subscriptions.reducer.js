import {
  SUBSCRIPTIONS,
  SUBSCRIPTIONS_FILTERS,
  DELETE_SUBSCRIPTION,
} from "../../types/panelAdmin";

const initialState = {
  allSubscriptions: [],
  subscriptions: [],
  filters: {
    orderDate: "latest",
  },
};

export default function subscriptionsReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SUBSCRIPTIONS: // Get
      return {
        ...state,
        allSubscriptions: [...payload],
        subscriptions: [...payload],
      };
    case SUBSCRIPTIONS_FILTERS: // Filters
      const { status, orderName, orderDate, search } = payload;
      let filteredSubscriptions = [...state.allSubscriptions];

      if (status === "active") {
        filteredSubscriptions = filteredSubscriptions.filter(
          (a) => a["isDeleted"] === false
        );
      } else if (status === "inactive") {
        filteredSubscriptions = filteredSubscriptions.filter(
          (a) => a["isDeleted"] === true
        );
      }

      if (orderName) {
        if (orderName === "az") {
          filteredSubscriptions.sort((a, b) => a.name.localeCompare(b.name));
        } else {
          filteredSubscriptions
            .sort((a, b) => a.name.localeCompare(b.name))
            .reverse();
        }
      }

      if (orderDate) {
        if (orderDate === "latest") {
          filteredSubscriptions.sort(
            (a, b) => new Date(a.date).getTime() > new Date(b.date).getTime()
          );
        } else {
          filteredSubscriptions
            .sort(
              (a, b) => new Date(a.date).getTime() > new Date(b.date).getTime()
            )
            .reverse();
        }
      }

      if (search) {
        filteredSubscriptions = filteredSubscriptions.filter((a) => {
          const name = a["name"].toLowerCase();
          const email = a["email"].toLowerCase();
          return (
            a["id"].includes(search) ||
            name.includes(search) ||
            email.includes(search)
          );
        });
      }
      return {
        ...state,
        subscriptions: [...filteredSubscriptions],
        filters: [...payload],
      };
    case DELETE_SUBSCRIPTION: // Delete
      const deletedAllSubscriptions = state.allSubscriptions.filter(
        (admin) => admin._id !== payload
      );
      const deletedSubscriptions = state.subscriptions.filter(
        (admin) => admin._id !== payload
      );
      return {
        ...state,
        allSubscriptions: [...deletedAllSubscriptions],
        subscriptions: [...deletedSubscriptions],
      };
    default:
      return state;
  }
}
