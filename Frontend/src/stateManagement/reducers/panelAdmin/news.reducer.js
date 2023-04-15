import {
  NEWS,
  NEW_DETAIL,
  NEWS_FILTERS,
  CREATE_NEW,
  EDIT_NEW,
  REMOVE_NEW,
  DELETE_NEW,
} from "../../types/panelAdmin";

const initialState = {
  allNews: [],
  news: [],
  newDetail: {},
  filters: {},
};

export default function newsReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case NEWS: // Get
      return { ...state, allNews: [...payload], news: [...payload] };
    case NEW_DETAIL: // Get ID
      return { ...state, newDetail: { ...payload } };
    case NEWS_FILTERS: // Filters
      const { status, orderTitle, orderDate, search } = payload;
      let filteredNews = [...state.allNews];

      if (status === "active") {
        filteredNews = filteredNews.filter((a) => a["isDeleted"] === false);
      } else if (status === "inactive") {
        filteredNews = filteredNews.filter((a) => a["isDeleted"] === true);
      }

      if (orderTitle) {
        if (orderTitle === "az") {
          filteredNews.sort((a, b) => a.title.localeCompare(b.title));
        } else {
          filteredNews.sort((a, b) => a.title.localeCompare(b.title)).reverse();
        }
      }

      if (orderDate) {
        if (orderDate === "latest") {
          filteredNews.sort(
            (a, b) => new Date(a.date).getTime() > new Date(b.date).getTime()
          );
        } else {
          filteredNews
            .sort(
              (a, b) => new Date(a.date).getTime() > new Date(b.date).getTime()
            )
            .reverse();
        }
      }

      if (search) {
        filteredNews = filteredNews.filter((a) => {
          const title = a["title"].toLowerCase();
          return a["id"].includes(search) || title.includes(search);
        });
      }
      return { ...state, news: [...filteredNews], filters: { ...payload } };
    case CREATE_NEW: // Post
      return {
        ...state,
        allNews: [payload, ...state.allNews],
        news: [payload, state.news],
      };
    case EDIT_NEW: // Put
      const updatedAllNews = state.allNews.filter((a) => a._id !== payload._id);
      const updatedNews = state.news.filter((a) => a._id !== payload._id);
      return {
        ...state,
        allNews: [payload, ...updatedAllNews],
        news: [payload, ...updatedNews],
      };
    case REMOVE_NEW: // Remove
      const removedAllNews = state.allNews.find(
        (admin) => admin._id === payload
      );
      removedAllNews.isDeleted = true;
      const removedNews = state.news.filter((admin) => admin._id !== payload);
      return { ...state, news: [...removedNews] };
    case DELETE_NEW: // Delete
      const deletedAllNews = state.allNews.filter(
        (admin) => admin._id !== payload
      );
      const deletedNews = state.news.filter((admin) => admin._id !== payload);
      return { ...state, allNews: [...deletedAllNews], news: [...deletedNews] };
    default:
      return state;
  }
}
