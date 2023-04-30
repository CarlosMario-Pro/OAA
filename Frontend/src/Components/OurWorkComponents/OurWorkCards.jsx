import React, { useState } from "react";
import logo from "../../assets/forum/natSom.webp";
import { Link, useNavigate } from "react-router-dom";
import Style from "./foro.module.css";
import Alert from "../Alerts/AlertDevelopment";

export default function OurWorkCards({ allWorks }) {
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handleClick = (work) => {
    if (work?.isFinished) {
      navigate(`/nuestro-trabajo/${work._id}`);
    } else {
      setAlertMessage(` Esta informacion se encuentra en desarrollo...`);
      setShowAlert(true);
    }
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  return (
    <div className={Style.cardContainers}>
      <div>
        <h2>Conflictos y causas ambientales:</h2>
      </div>
      {allWorks &&
        allWorks.map((work) => {
          return (
            <>
              <div key={work?._id}>
                <button onClick={() => handleClick(work)}>
                  <h5>{work?.titleMain}</h5>
                  <div>
                    <img src={logo} alt="imagen" width="50px" />
                    <p> Conoce más acerca de {work?.titleMain} </p>
                  </div>
                </button>
              </div>
              {showAlert && (
                <Alert message={alertMessage} onClose={handleCloseAlert} />
              )}
            </>
          );
        })}
    </div>
  );
}
