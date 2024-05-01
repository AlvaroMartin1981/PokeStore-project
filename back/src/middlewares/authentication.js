const { getAuth, onAuthStateChanged } = require('firebase/auth');
const app = require('../config/firebase');

// Inicializar la autenticación de Firebase
const auth = getAuth(app);

// Middleware para verificar si el usuario es administrador
const isAdmin = (req, res, next) => {
    // Verifica si hay un usuario autenticado y si su rol es administrador
    if (req.user && req.user.role === 'admin') {
        next(); // Continúa con la siguiente función de middleware
    } else {
        res.status(403).json({ message: 'Acceso denegado. Debes ser administrador.' });
    }
};

// Middleware de autenticación
const authentication = async (req, res, next) => {
    try {
        // Crear una promesa alrededor de onAuthStateChanged
        const user = await new Promise((resolve, reject) => {
            onAuthStateChanged(auth, (user) => {
                resolve(user);
            }, (error) => {
                reject(error);
            });
        });

        // Verificar si hay un usuario autenticado
        if (user) {
            req.user = user; // Almacenar el usuario en el objeto de solicitud
            next(); // Continuar con el siguiente middleware
        } else {
            res.status(401).json({ message: 'Acceso no autorizado. Debes iniciar sesión.' });
        }
    } catch (error) {
        console.error('Error en middleware de autenticación:', error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
};

module.exports = {authentication, isAdmin};