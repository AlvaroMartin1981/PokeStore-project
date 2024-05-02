const { getAuth, verifyIdToken, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } = require('firebase/auth');
const User = require("../models/UserModel");
const app = require('../config/firebase');

const auth = getAuth(app);

const UserController = {
    async register(req, res, next) {
        try {
            if (!req.body.email || !req.body.password || !req.body.name) {
                return res.status(400).json({ message: "Por favor, proporcione un correo electrónico, una contraseña y un nombre válidos." });
            }

            await createUserWithEmailAndPassword(auth, req.body.email, req.body.password);

            const user = await User.create({ email: req.body.email, password: req.body.password, name: req.body.name, role: "user" });
            res.status(201).json({ message: "Usuario registrado con éxito", user });
        } catch (error) {
            console.error(error);
            next(error);
        }
    },

    async login(req, res) {
        try {
            const { email, password } = req.body;

            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            res.status(200).json({ message: "Inicio de sesión exitoso", user });
        } catch (error) {
            console.error("Error al iniciar sesión:", error);
            res.status(500).json({ message: "Error al iniciar sesión" });
        }
    },

    async logout(req, res) {
        try {
            const idToken = req.headers.authorization; // Token enviado desde el frontend

            // Verificar y validar el token
            const decodedToken = await verifyIdToken(auth, idToken);

            // Cerrar sesión utilizando Firebase Auth
            await signOut(auth);
            console.log('Cuerpo de la solicitud recibida:', req.body);

            res.json({ message: "Desconectado con éxito" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error al cerrar sesión" });
        }
    },

    async getInfo(req, res) {
        try {
            const user = await User.findById(req.user._id);

            if (!user) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }

            const username = user.email.split('@')[0];

            res.status(200).json({
                user: {
                    id: user._id,
                    username: username,
                    email: user.email,
                    orderIds: user.orderIds,
                    wishList: user.wishList,
                    role: user.role, 
                },
                message: 'Información del usuario obtenida exitosamente',
                authenticated: true
            });
        } catch (error) {
            console.error('Error al obtener la información del usuario:', error);
            res.status(500).json({ message: 'Error al obtener la información del usuario' });
        }
    }
};

module.exports = UserController;