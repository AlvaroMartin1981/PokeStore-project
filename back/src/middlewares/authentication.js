const { getAuth, onAuthStateChanged } = require('firebase/auth');
const app = require('../config/firebase');

const auth = getAuth(app);

const authentication = (req, res, next) => {
    try {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                req.user = user; 
                console.log("Usuario autenticado:", user.uid);
                next(); 
                res.status(401).json({ message: 'Acceso no autorizado. Debes iniciar sesión.' });
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al verificar la autenticación" });
    }
};

module.exports = authentication;