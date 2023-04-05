const express = require("express");
const postUsers = express.Router();
const User = require("../../models/User");
const mongoose = require("mongoose");
const mailSettings = require("../../additional/Nodemailer");


postUsers.post("/postUsers", async(req,res)=>{       //tener cuidado, si en el index creo la ruta 'postUsers' no la puedo pasar de nuevo aquí
    const { name, phone, email } = req.body;
    console.log(req.body)
    const session = await mongoose.startSession();
    try {
        await session.withTransaction(async (session) => {
            let existUser = await User.findOne({ email }).session(session);
            if (existUser) {
                return res.status(409).json({ message: `El usuario con correo ${email} ya existe` });
            }
            const [createdUser] = await User.create(
                [ { name, phone, email } ],
                { session }
            );
            res.status(200).json({
                id: createdUser._id,
                name: createdUser.name,
                email: createdUser.email,
                phone: createdUser.phone,
            });
        });

        const transporter = mailSettings.transporter;
        const mailDetails = mailSettings.mailDetails(email);
        transporter.sendMail(mailDetails, (error, info) => {
            if (error) {
                console.log(error);
                return res.status(500).send("Error al enviar email de confirmación");
            } else {
                return res.status(200).send("Correo enviado con éxito.");
            }
        });
    } catch (error) {
        console.error(error);
        const status = error.status || 500;
        const message = error.message || "Ocurrió un error al crear al usuario";
        return res.status(status).json({ message });
    } finally {
        await session.endSession();
    }
});


module.exports = postUsers;
//POST http://localhost:3001/postUsers/postUsers con { "name": "Mario", "phone": "3102224050", "email": "carlosmario@gmail.com" }
/*
Cuál es la lógica en este tipo de rutas?
1- Todo debe de estar dentro de un try/catch
2- Se crea la constante que recibe del body, la información que se guardará en las propiedades del modelo de la DB en cuestión
3- Hay que preveer que la información ya puede existir en la DB, por lo que debemos buscarla primero y ejecutar un condicional antes de crear la información
4- Si no existe, entonces procedemos a crear la información con el método '.create' de MongoDB
5- Declaramos el catch
*/

