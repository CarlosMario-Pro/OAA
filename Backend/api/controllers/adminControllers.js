require("dotenv").config();
const User = require("../models/User");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { sendEmail } = require("../utils/email.utils");

const getAdmin = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    await session.withTransaction(async (session) => {
      const admins = await User.find({}).session(session);
      return res.status(200).json(admins);
    });
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message =
      error.message || "Ocurrió un error al obtener a los administradores.";
    return res.status(status).json({ message });
  } finally {
    await session.endSession();
  }
};

const getAdminsById = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    await session.withTransaction(async (session) => {
      const admin = await User.findById(req.params.id).session(session);
      return res.status(200).json(admin);
    });
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message =
      error.message || "Ocurrió un error al obtener al administrador";
    return res.status(status).json({ message });
  } finally {
    await session.endSession();
  }
};

const generateRandomNumber = () => {
  return `${Math.floor(Math.random() * 1000000)}`;
};

const postAdmin = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    const { name, email } = req.body;
    const password = generateRandomNumber();
    const passwordHash = bcrypt.hashSync(password, 8);

    await session.withTransaction(async (session) => {
      const existAdmin = await User.findOne({ email }).session(session);
      if (existAdmin) {
        return res.status(409).json({
          message: `Ya existe una cuenta de administrador con el email: ${email}`,
        });
      }
      const [createdAdmin] = await User.create(
        [{ name, email, password: passwordHash }],
        {
          session,
        }
      );
      await sendEmail(
        email,
        "Bienvenido a OAA",
        "¡Hola! Estás recibiendo este correo porque ahora eres administrador de OAA.",
        `<h2 style="text-align: center">Bienvenido a OAA</h2>
        <p>
          ¡Hola, ${name}! Es de nuestro agrado informarte que ahora formas parte del equipo
          de administradores de OAA. Por favor realice los siguientes pasos:
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
          "><span style="
            padding-right: 0.5rem
            ">${password.substring(0, 3)}</span
          ><span>${password.substring(3, 6)}</span></b
          >
        </p>
        <p>
          Saludos cordiales de parte del equipo de Organización de Ambientalistas
          Autoconvocados.
        </p>
        <p style="font-weight: 600">
          ** Recuerde que por su seguridad este correo es confidencial y no debe
          ser compartido ni reenviado. No responda esta correo.**
        </p>`
      );
      res.status(200).json({
        id: createdAdmin._id,
        name: createdAdmin.name,
        email: createdAdmin.email,
        password: createdAdmin.password,
      });
    });
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message =
      error.message ||
      "Ocurrió un error al crear una nueva cuenta de administrador";
    return res.status(status).json({ message });
  } finally {
    await session.endSession();
  }
};

const deleteAdmin = async (req, res) => {
  const session = await mongoose.startSession();

  try {
    await session.withTransaction(async (session) => {
      const deletedAdmin = await User.findByIdAndRemove(req.params.id).session(
        session
      );
      if (!deletedAdmin) {
        return res.status(404).send({ message: "No se encontró al usuario" });
      }
      res.send({ message: "El administrador fue eliminado exitosamente" });
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error al eliminar al administrador" });
  } finally {
    await session.endSession();
  }
};

const logAdmin = async (req, res) => {
  const session = await mongoose.startSession();
  const { email, password } = req.body;
  try {
    await session.withTransaction(async (session) => {
      const admin = await User.findOne({ email }).session(session);
      if (!admin) {
        return res.status(404).json({
          message: `Email incorrecto.`,
        });
      }
      const match = await bcrypt.compare(password, admin.password);
      if (!match) {
        return res.status(404).json({ message: `Contraseña incorrecta.` });
      }
      return res.status(200).json(admin);
    });
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message = error.message || "Ocurrió un error al iniciar sesión.";
    return res.status(status).json({ message });
  } finally {
    await session.endSession();
  }
};

const putAdmin = async (req, res) => {
  const session = await mongoose.startSession();

  try {
    const { id } = req.params;
    const { name, email } = req.body;

    await session.withTransaction(async (session) => {
      const existAdmin = await User.findOne({ email }).session(session);
      if (existAdmin && existAdmin.id !== id) {
        return res.status(409).json({
          message: `Ya existe una cuenta de administrador con el email: ${email}`,
        });
      }

      const updatedAdmin = await User.findByIdAndUpdate(
        id,
        {
          name,
          email,
        },
        { session }
      );

      if (!updatedAdmin) {
        return res.status(404).json({
          message: `El administrador con ID ${id} no fue encontrado`,
        });
      }

      res.status(200).json({
        id: updatedAdmin._id,
        name: name ? name : updatedAdmin.name,
        email: email ? email : updatedAdmin.email,
        password: updatedAdmin.password,
      });
    });
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message =
      error.message || "Ocurrió un error al actualizar al administrador";
    return res.status(status).json({ message });
  } finally {
    await session.endSession();
  }
};

const resetPassword = async (req, res) => {
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
          message: `El administrador con el email ${email} no fue encontrado.`,
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
};

const editPassword = async (req, res) => {
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
          message: `El administrador con el ID ${id} no fue encontrado.`,
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
};

module.exports = {
  getAdmin,
  getAdminsById,
  postAdmin,
  deleteAdmin,
  logAdmin,
  putAdmin,
  resetPassword,
  editPassword,
};
