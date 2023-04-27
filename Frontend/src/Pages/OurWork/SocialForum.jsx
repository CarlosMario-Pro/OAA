import React from "react";
import image1 from "../../assets/forum/multimedia.foro.webp";
import image2 from "../../assets/forum/multimedia.foro2.webp";
import image3 from "../../assets/forum/multimedia.foro3.webp";

export default function SocialForum() {
  return (
    <div>
      <h2>FORO SOCIAL Y AMBIENTAL “NATURALEZA SOMOS”</h2>
      <div>
        <p>
          Nuestra Asociación organizó el Primer foro ambiental “Naturaleza
          somos” que se llevó a cabo en Villa Rosa, Pilar, el 5 de octubre de
          2019, con la concurrencia de más de 100 personas, tanto representantes
          de organizaciones como público en general interesado en la temática.
        </p>
        <img src={image1} alt="imagen1" />
      </div>
      <div>
        <p>
          El encuentro se desarrolló con diversas actividades de formación y
          debate: Se realizaron mesas de trabajo sobre áreas protegidas,
          termoeléctricas e industrias peligrosas, acceso al agua segura,
          humedales, residuos y basurales. La jornada incluyó números
          artísticos, presentaciones de libros y actividades de concientización.
          El balance de la jornada fue ampliamente satisfactorio y permitió
          profundizar vínculos y redes de trabajo con diversas organizaciones.
        </p>
        <img src={image2} alt="" />
      </div>
      <div>
        <p>
          Entre las organizaciones que apoyaron y concurrieron a la actividad se
          encuentran: Servicio de Paz y Justicia (SerPaJ) Asamblea Permanente
          por los Derechos Humanos (APDH) Defensoría del Pueblo de Pilar
          Observatorio de políticas públicas Red de áreas protegidas urbanas
          (RAPU) 1810 Vecinos Unidos por Pilar Junta Vecinal de Villa Rosa
          (JuVeViR) Patrimonio Natural Grupo de educación y conservación
          ambiental Somos el movimiento Un árbol para mi vereda Patitas de Pilar
          Comisión de Vecinos contra las termoeléctricas
        </p>
        <img src={image3} alt="" />
      </div>
    </div>
  );
}
