import { combineReducers } from "redux";
import adminReducer from "./panelAdmin/admin.reducer";
import administratorsReducer from "./panelAdmin/administrators.reducer";
import alertReducer from "./alerts/alertWindow.reducer";
import confirmationReducer from "./alerts/confirmationWindow.reducer";
import donationsReducer from "./panelAdmin/donations.reducer";
import galleryReducer from "./panelAdmin/gallery.reducer";
import loaderReducer from "./loader/loader";
import newsReducer from "./panelAdmin/news.reducer";
import ourProjectsReducer from "./panelAdmin/ourProjects.reducer";
import radioProgramReducer from "./panelAdmin/radioProgram.reducer";
import subscriptionsReducer from "./panelAdmin/subscriptions.reducer";
import threeCategoriesReducer    from "../reducers/newsDetail/newsDetailReducer"

const reducer = combineReducers({
  admin: adminReducer,
  administrators: administratorsReducer,
  alert: alertReducer,
  confirmation: confirmationReducer,
  donations: donationsReducer,
  gallery: galleryReducer,
  ourProjects: ourProjectsReducer,
  loader: loaderReducer,
  news: newsReducer,
  radioProgram: radioProgramReducer,
  subscriptions: subscriptionsReducer,
  UserIncription: newsReducer,
  threeCategories: threeCategoriesReducer
});

export default reducer;
