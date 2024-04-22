const User = require("../models/UserModel");
const admin = require("../config/firebase"); 
require("dotenv").config();

const UserController = {
    async register(req, res, next) {
        try {
            // Validar los datos de entrada antes de crear un nuevo usuario
            if (!req.body.email || !req.body.password) {
                return res.status(400).send({ message: "Por favor, proporcione un correo electrónico y una contraseña válidos." });
            }

            const user = await User.create({ ...req.body, role: "user" });
            res.status(201).send({ message: "Usuario registrado con éxito", user });
        } catch (error) {
            console.error(error);
            next(error);
        }
    },

    async login(req, res) {
        try {
            const user = await User.findOne({ email: req.body.email });

            // Verificar si el usuario existe y tiene un rol asignado
            if (!user || !user.role) {
                return res.status(401).send({ message: "Credenciales inválidas" });
            }

            const firebaseUser = await admin.auth().getUserByEmail(req.body.email);

            const customToken = await admin.auth().createCustomToken(firebaseUser.uid);
            
            let isAdmin = user.role === 'admin';

            // Guardar el token personalizado en el usuario
            user.firebaseCustomToken = customToken;
            await user.save();

            res.send({ message: "Bienvenido/a " + user.name, firebaseCustomToken: customToken, isAdmin });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "Error al iniciar sesión" });
        }
    },

    async logout(req, res) {
        try {
            // Eliminar el token personalizado de Firebase del usuario
            await User.findByIdAndUpdate(req.user._id, { firebaseCustomToken: null });

            res.send({ message: "Desconectado con éxito" });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "Error al cerrar sesión" });
        }
    },

    async getInfo(req, res) {
        try {
            const user = await User.findById(req.user._id)
                .populate({
                    path: "orderIds",
                    populate: {
                        path: "productIds",
                    },
                })
                .populate("wishList");

            res.send(user);
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "Error al obtener la información del usuario" });
        }
    },
};

module.exports = UserController;
