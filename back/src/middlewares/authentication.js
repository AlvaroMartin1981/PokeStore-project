const admin = require("../config/firebase");

const authentication = async (req, res, next) => {
    try {
        // Obtener el token de autorización del encabezado de la solicitud
        const idToken = req.headers.authorization;
        
        // Verificar si se proporcionó un token
        if (!idToken) {
            return res.status(401).json({ error: "Acceso no autorizado. Token de autorización no proporcionado." });
        }

        // Verificar el token con Firebase Authentication
        const decodedToken = await admin.auth().verifyIdToken(idToken);

        // Adjuntar el UID del usuario decodificado a la solicitud
        req.user = { uid: decodedToken.uid };

        // Pasar al siguiente middleware o controlador
        next();
    } catch (error) {
        console.error("Error de autenticación:", error);
        return res.status(403).json({ error: "Acceso no autorizado. Token de autorización inválido." });
    }
};

module.exports = authentication;
