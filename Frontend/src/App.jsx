import axios from "axios";
import { Navigate, Route, Routes } from "react-router-dom";
import AlertWindow from "./Components/Alerts/AlertWindow";
import LandingPage from "./Pages/LadingPage/LandingPage";
import We from "./Pages/We/We";
import NavBar from "./Components/NavBar/NavBar";
import Detail from "./Pages/Detail/Detail";
import Error404 from "./Pages/Error404/Error404";
import Loader from "./Components/Loader/Loader";
import LoginAdmin from "./Pages/LoginAdmin/LoginAdmin";
import PanelAdmin from "./Pages/PanelAdmin/PanelAdmin";
import PanelAdminForm from "./Pages/PanelAdminForm/PanelAdminForm";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import OurWork from "./Pages/OurWork/OurWork";
import SocialForum from "./Pages/OurWork/SocialForum";
import WorkDetail from "./Pages/OurWork/WorkDetail";

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

function App() {
  return (
    <>
      <Loader />
      <NavBar />
      <AlertWindow />
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/home' element={<Navigate to='/' />} />
        <Route path='/we' element={<We />} />
        <Route path='/news/:id' element={<Detail />} />
        <Route path='/nuestro-trabajo' element={ <OurWork />} />
        <Route path='/nuestro-trabajo/:id' element={<WorkDetail />} />
        <Route path='/login' element={<LoginAdmin />} />
        <Route path='/foro/primer-foro-social' element={<SocialForum /> } />
        <Route element={<ProtectedRoute />}>
          <Route path='/panel-admin' element={<PanelAdmin />} />
          <Route path='/panel-admin/:form' element={<PanelAdminForm />} />
        </Route>
        <Route path='/login' element={<LoginAdmin />} />
        <Route path='*' element={<Error404 />} />
      </Routes>
    </>
  );
}

export default App;
