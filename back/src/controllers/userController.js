const User = require("../models/UserModel");
const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } = require('firebase/auth');
const app = require('../config/firebase');
const auth = getAuth(app);

const UserController = {
    async register(req, res, next) {
        try {
            // Validar los datos de entrada antes de crear un nuevo usuario
            if (!req.body.email || !req.body.password) {
                return res.status(400).send({ message: "Por favor, proporcione un correo electrónico y una contraseña válidos." });
            }

            // Crear una cuenta con correo electrónico y contraseña en Firebase
            await createUserWithEmailAndPassword(auth, req.body.email, req.body.password);

            // Crear el usuario en tu base de datos local
            const user = await User.create({ ...req.body, role: "user" });
            res.status(201).send({ message: "Usuario registrado con éxito", user });
        } catch (error) {
            console.error(error);
            next(error);
        }
    },

    async login(req, res) {
        try {
            console.log("Iniciando sesión...");

            // Iniciar sesión con correo electrónico y contraseña en Firebase
            const firebaseUserCredential = await signInWithEmailAndPassword(auth, req.body.email, req.body.password);

            // Obtener el usuario localmente
            const user = await User.findOne({ email: req.body.email });

            console.log("Inicio de sesión exitoso");
            

           
            console.log("Usuario de Firebase:", firebaseUserCredential.user);
        } catch (error) {
            console.error("Error al iniciar sesión:", error);
            res.status(500).send({ message: "Error al iniciar sesión" });
        }
    },

    async logout(req, res) {
        try {
            // Cerrar sesión en Firebase
            await signOut(auth);

            console.log("Desconexión exitosa");

            //res.send({ message: "Desconectado con éxito" });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "Error al cerrar sesión" });
        }
    },

    async getInfo(req, res) {
        try {
            // Obtener información del usuario de la base de datos local
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
