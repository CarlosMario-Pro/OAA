const mongoose = require("mongoose");
const Donations = require("../models/Donations");

// ---- GET *
//Traer a todas las donaciones
const getDonations = async (req, res) => {
  const session = await mongoose.startSession();

  try {
    await session.withTransaction(async (session) => {
      const donations = await Donations.find({}).session(session);
      return res.status(200).json(donations.reverse());
    });
  } catch (error) {
    const status = error.status || 500;
    const message =
      error.message || "Ocurrió un error al obtener las donaciones";
    return res.status(status).json({ message });
  } finally {
    await session.endSession();
  }
};

//Traer a una donación
const getDonationById = async (req, res) => {
  const { id } = req.params;
  const session = await mongoose.startSession();

  try {
    await session.withTransaction(async (session) => {
      const donation = await Donations.findById(id).session(session);
      if (!donation) {
        return res.status(404).json({ message: "La donación no se encontró" });
      }
      return res.status(200).json(donation);
    });
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message = error.message || "Ocurrió un error al obtener la donación";
    return res.status(status).json({ message });
  } finally {
    await session.endSession();
  }
};

//----POST *
//Crear un nuevo dato en la Donación
const postDonation = async (req, res) => {
  const { iso, amount, extraData } = req.body;

  const session = await mongoose.startSession();
  try {
    await session.withTransaction(async (session) => {
      const [createdDonation] = await Donations.create(
        [{ iso, amount, extraData }],
        { session }
      );
      res.status(200).json(createdDonation);
    });
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message = error.message || "Ocurrió un error al crear la donación";
    return res.status(status).json({ message });
  } finally {
    await session.endSession();
  }
};

// Eliminar un archivo con borrado lógico
const deactivateDonation = async (req, res) => {
  const id = req.params.id;
  const session = await mongoose.startSession();

  try {
    await session.withTransaction(async (session) => {
      const donation = await Donations.findById(id);
      if (!donation) {
        return res.status(404).json({ message: "Donación no encontrada" });
      }
      donation.isDeleted = true;
      await donation.save();
      res.status(200).json({ message: "Donación eliminada exitosamente" });
    });
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message = error.message || "Ocurrió un error al eliminar la donación";
    return res.status(status).json({ message });
  } finally {
    await session.endSession();
  }
};

// Recuperar un archivo con borrado lógico
const activateDonation = async (req, res) => {
  const id = req.params.id;
  const session = await mongoose.startSession();

  try {
    await session.withTransaction(async (session) => {
      const donation = await Donations.findById(id);
      if (!donation) {
        return res
          .status(404)
          .json({ message: `La donación con id ${id} no fue encontrada` });
      }
      donation.isDeleted = false;
      await donation.save();
      res.status(200).json({ message: "Donación reactivada exitosamente" });
    });
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message =
      error.message || "Ocurrió un error al reactivar la donación";
    return res.status(status).json({ message });
  } finally {
    await session.endSession();
  }
};

//----DELETE *
// Borrado real
const deleteDonation = async (req, res) => {
  const { id } = req.params;
  const session = await mongoose.startSession();

  try {
    await session.withTransaction(async () => {
      const deletedDonation = await Donations.findById(id).session(session);
      if (!deletedDonation) {
        const message = `La donación con id ${id} no fue encontrada`;
        return res.status(404).json({ message });
      }
      await deletedDonation.deleteOne();
      return res
        .status(204)
        .json({ message: `Donación eliminada exitosamente` });
    });
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message = error.message || "Ocurrió un error al borrar la donación";
    return res.status(status).json({ message });
  } finally {
    await session.endSession();
  }
};

module.exports = {
  getDonations,
  getDonationById,
  postDonation,
  deactivateDonation,
  activateDonation,
  deleteDonation,
};
