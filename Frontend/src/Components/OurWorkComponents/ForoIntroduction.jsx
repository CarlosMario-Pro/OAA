import React from "react";
import { Link } from "react-router-dom";

export default function ForoIntroduction() {
  return (
    <div>
      <Link to='/foro/primer-foro-social' >
      <h2>
        REALIZACIÓN DEL PRIMER FORO SOCIAL Y AMBIENTAL “NATURALEZA SOMOS”:
      </h2>
      </Link>
      <p>
        Nuestra Asociación organizó el Primer foro ambiental “Naturaleza somos”
        que se llevó a cabo en Villa Rosa, Pilar, el 5 de octubre de 2019, con
        la concurrencia de más de 100 personas, tanto representantes de
        organizaciones como público en general interesado en la temática.
      </p>
      <h3>Conflictos y Litigios socioambientales</h3>
      <p>
        Ya sea como Entidad actora o representando a otras personas y
        colectivos, llevamos adelante juicios ambientales y reclamos
        administrativos para prevenir o lograr el cese de actividades lesivas
        para el ambiente, o para asegurar el acceso de las poblaciones a
        derechos básicos asociados al ambiente: agua segura, aire limpio,
        alimentos sanos.
      </p>
    </div>
  );
}
