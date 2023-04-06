require("dotenv").config();
const express = require("express");
const passwordAdmin = express.Router();
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const User = require("../../models/User");
const { sendEmail } = require("../../utils/email.utils");

const generateRandomNumber = () => {
  return `${Math.floor(Math.random() * 1000000)}`;
};

passwordAdmin
  .put("/", async (req, res) => {
    const session = await mongoose.startSession();
    const { email } = req.body;

    try {
      const passwordReset = generateRandomNumber();
      const passwordHash = bcrypt.hashSync(passwordReset, 8);

      await session.withTransaction(async (session) => {
        const updatedAdmin = await User.findOneAndUpdate(
          { email },
          {
            password: passwordHash,
          },
          { session }
        );

        if (!updatedAdmin) {
          return res.status(404).json({
            message: `El administrador con el email ${email} no fue encontrado`,
          });
        }
        await sendEmail(
          email,
          "Reestablece tu contraseña",
          "¡Hola! Estás recibiendo este correo porque hiciste una solicitud de reestablecimiento de contraseña.",
          `<h2 style="text-align: center">Reestablecimiento de contraseña</h2>
      <p>
        ¡Hola! Estás recibiendo este correo porque hiciste una solicitud de
        reestablecimiento de contraseña. Por favor realice los siguientes pasos:
      </p>
      <ol>
        <li>
          <p>
            El código que aparece a continuación es su nueva contraseña para
            poder iniciar sesión.
          </p>
        </li>

        <li>
          <p>
            Una vez que hayas iniciado sesión dirigete a la sección de
            "modificar contraseña" y establece una nueva.
          </p>
        </li>
      </ol>
      <p style="text-align: center; font-size: 2rem; color: white">
        <b
          style="
            padding: 0.5rem 1.5rem;
            border-radius: 0.5rem;
            background-color: #528f43;
          "
          ><span style="
          padding-right: 0.5rem
          ">${passwordReset.substring(0, 3)}</span
          ><span>${passwordReset.substring(3, 6)}</span></b
        >
      </p>
      <p>
        Si usted no realizó esta solicitud. Inicie sesión con el código que
        aparece en este correo y modifique inmediatamente su contraseña.
      </p>
      <p style="font-weight: 600">
        ** Recuerde que por su seguridad este correo es confidencial y no debe
        ser compartido ni reenviado. **
      </p>`
        );
        res.status(200).json({
          id: updatedAdmin._id,
          name: updatedAdmin.name,
          email: updatedAdmin.email,
          password: updatedAdmin.password,
        });
      });
    } catch (error) {
      console.error(error);
      const status = error.status || 500;
      const message =
        error.message || "Ocurrió un error al reestablecer contraseña";
      return res.status(status).json({ message });
    } finally {
      await session.endSession();
    }
  })
  .put("/:id", async (req, res) => {
    const session = await mongoose.startSession();
    const { id } = req.params;
    const { password } = req.body;

    try {
      const passwordHash = bcrypt.hashSync(password, 8);

      await session.withTransaction(async (session) => {
        const updatedAdmin = await User.findByIdAndUpdate(
          id,
          {
            password: passwordHash,
          },
          { session }
        );

        if (!updatedAdmin) {
          return res.status(404).json({
            message: `El administrador con el email ${email} no fue encontrado`,
          });
        }
        await sendEmail(
          updatedAdmin.email,
          "Contraseña actualizada con éxito",
          "¡Hola! Estás recibiendo este correo porque tu contraseña ha sido actualizada con éxito.",
          `<h2>¡Hola, ${updatedAdmin.name}!</h2>
          <p>
            Queremos informarte que su contraseña ha sido actualizada exitosamente.
          </p>
          <p>Si usted realizó esta acción, puede ignorar este correo.</p>
          <p>
            En caso de que desconozca el origen de esta acción, dirijase
            inmediatamente a la página de
            <a href="https://www.google.com.ar/"
              >incio de sesión para administradores</a
            >, introduzca su correo y haga click en "He olvidado mi contraseña".
          </p>
          <p>
            Una vez que realice esto, le llegará por correo su nueva
            contraseña junto con los siguientes pasos que debe seguir.
          </p>
          <p>Saludos, equipo de OAA.</p>
          <p style="font-weight: 600">** Por favor no responda este correo. **</p>`
        );
        res.status(200).json({
          id: updatedAdmin._id,
          name: updatedAdmin.name,
          email: updatedAdmin.email,
          password: updatedAdmin.password,
        });
      });
    } catch (error) {
      console.error(error);
      const status = error.status || 500;
      const message =
        error.message || "Ocurrió un error al reestablecer contraseña";
      return res.status(status).json({ message });
    } finally {
      await session.endSession();
    }
  });

/*
- Para reestablecer una contraseña sin iniciar sesión (porque se le olvidó cual era)
PUT http://localhost:3001/passwordAdmin

{
    "email": "",
}

- Para reestablecer una contraseña con la sesión iniciada
PUT http://localhost:3001/passwordAdmin/:id

{
    "password": "",
}
*/

module.exports = passwordAdmin;
