import axios from "axios";
import { Navigate, Route, Routes } from "react-router-dom";
import LandingPage from "./Pages/LadingPage/LandingPage";
import Detail from "./Pages/Detail/Detail";
import Error404 from "./Pages/Error404/Error404";
import LoginAdmin from "./Pages/LoginAdmin/LoginAdmin";
import PanelAdmin from "./Pages/PanelAdmin/PanelAdmin";
import GalleryImageForm from "./Components/PanelAdminForms/GalleryImageForm";
import GalleryVideoForm from "./Components/PanelAdminForms/GalleryVideoForm";
import OurProjectsForm from "./Components/PanelAdminForms/OurProjectsForm";
import PublicationsForm from "./Components/PanelAdminForms/PublicationsForm";
import RadioProgramForm from "./Components/PanelAdminForms/RadioProgramForm";
import Loader from "./Components/Loader/Loader";
import AlertWindow from "./Components/Alerts/AlertWindow";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

function App() {
  return (
    <>
      <Loader />
      <AlertWindow />
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/home' element={<Navigate to='/' />} />
        <Route path='/news/:id' element={<Detail />} />
        <Route path='/login' element={<LoginAdmin />} />
        <Route element={<ProtectedRoute />}>
          <Route path='/panel-admin' element={<PanelAdmin />} />
          <Route path='/gallery-image-form' element={<GalleryImageForm />} />
          <Route path='/gallery-video-form' element={<GalleryVideoForm />} />
          <Route path='/our-projects-form' element={<OurProjectsForm />} />
          <Route path='/publications-form' element={<PublicationsForm />} />
          <Route path='/radio-program-form' element={<RadioProgramForm />} />
        </Route>
        <Route path='*' element={<Error404 />} />
      </Routes>
    </>
  );
}

export default App;
