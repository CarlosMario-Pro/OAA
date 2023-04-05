const express = require("express");
const user = express.Router(); 
const User = require("../../models/User");
const mongoose = require("mongoose");


user.get("/user",async(req,res)=>{
    const session = await mongoose.startSession();
    try {
        await session.withTransaction(async (session) => {
            const users = await User.find({}).session(session);
            return res.status(200).json(users);
        });
    } catch (error) {
        console.error(error);
        const status = error.status || 500;
        const message = error.message || "Ocurrió un error al obtener los usuarios";
        return res.status(status).json({ message });
    } finally {
        await session.endSession();
    }
});


module.exports = user;