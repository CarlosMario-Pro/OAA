import {
  GALLERY,
  GALLERY_FILTERS,
  CREATE_GALLERY,
  EDIT_GALLERY,
  REMOVE_GALLERY,
  DELETE_GALLERY,
  ONE_GALLERY,
} from "../../types/panelAdmin";

const initialState = {
  allGallery: [],
  gallery: [],
  oneGallery: {},
  filters: {
    status: "active",
    format: "all",
    orderDate: "latest",
  },
};

export default function galleryReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GALLERY: // Get
      return { ...state, allGallery: [...payload], gallery: [...payload] };
    case ONE_GALLERY: // Get ID
      return { ...state, oneGallery: { ...payload } };
    case GALLERY_FILTERS: // Filters
      const { status, format, orderTitle, orderDate, search } = payload;
      let filteredGallery = [...state.allGallery];

      if (status === "active") {
        filteredGallery = filteredGallery.filter(
          (a) => a["isDeleted"] === false
        );
      } else if (status === "inactive") {
        filteredGallery = filteredGallery.filter(
          (a) => a["isDeleted"] === true
        );
      }

      if (format !== "all") {
        if (format === "image") {
          filteredGallery = filteredGallery.filter(
            (a) => a["format"] === "image"
          );
        } else if (format === "video") {
          filteredGallery = filteredGallery.filter(
            (a) => a["format"] === "video"
          );
        }
      }

      if (orderTitle) {
        if (orderTitle === "az") {
          filteredGallery.sort((a, b) => a.title.localeCompare(b.title));
        } else {
          filteredGallery
            .sort((a, b) => a.title.localeCompare(b.title))
            .reverse();
        }
      }

      if (orderDate) {
        if (orderDate === "latest") {
          filteredGallery.sort(
            (a, b) => new Date(a.date).getTime() > new Date(b.date).getTime()
          );
        } else {
          filteredGallery
            .sort(
              (a, b) => new Date(a.date).getTime() > new Date(b.date).getTime()
            )
            .reverse();
        }
      }

      if (search) {
        filteredGallery = filteredGallery.filter((a) => {
          const title = a["title"].toLowerCase();
          return a["id"].includes(search) || title.includes(search);
        });
      }
      return {
        ...state,
        gallery: [...filteredGallery],
        filters: { ...payload },
      };
    case CREATE_GALLERY: // Post
      return {
        ...state,
        allGallery: [payload, state.allGallery],
        gallery: [payload, state.gallery],
      };
    case EDIT_GALLERY: // Put
      const updatedAllGallery = state.allGallery.filter(
        (a) => a._id !== payload._id
      );
      const updatedGallery = state.gallery.filter((a) => a._id !== payload._id);
      return {
        ...state,
        allGallery: [payload, ...updatedAllGallery],
        gallery: [payload, ...updatedGallery],
        oneGallery: {},
      };
    case REMOVE_GALLERY: // Remove
      const removedAllGallery = state.allGallery.find(
        (admin) => admin._id === payload
      );
      removedAllGallery.isDeleted = true;
      const removedGallery = state.gallery.filter(
        (admin) => admin._id !== payload
      );
      return { ...state, gallery: [...removedGallery] };
    case DELETE_GALLERY: // Delete
      const deletedAllGallery = state.allGallery.filter(
        (admin) => admin._id !== payload
      );
      const deletedGallery = state.gallery.filter(
        (admin) => admin._id !== payload
      );
      return {
        ...state,
        allGallery: [...deletedAllGallery],
        gallery: [...deletedGallery],
      };
    default:
      return state;
  }
}
