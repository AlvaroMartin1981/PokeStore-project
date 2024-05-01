const User = require("../models/UserModel");
const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } = require('firebase/auth');
const app = require('../config/firebase');
const { onAuthStateChanged } = require('firebase/auth');

const auth = getAuth(app);

// Función para guardar el usuario en la base de datos local
const saveUserToDatabase = async (firebaseUser) => {
    try {
        // Verifica si el usuario ya existe en la base de datos local
        const existingUser = await User.findOne({ email: firebaseUser.email });
        if (!existingUser) {
            // Si no existe, crea un nuevo usuario en la base de datos local
            await User.create({ email: firebaseUser.email, role: "user" });
        }
    } catch (error) {
        console.error('Error al guardar el usuario en la base de datos:', error);
    }
};

// Observa el cambio de estado de la autenticación
onAuthStateChanged(auth, async (firebaseUser) => {
    if (firebaseUser) {
        // Guarda el usuario en la base de datos local
        await saveUserToDatabase(firebaseUser);
    }
});
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
    
            // Enviar una respuesta exitosa junto con los datos del usuario
            res.status(200).send({
                message: "Inicio de sesión exitoso",
                user: user // Aquí puedes enviar cualquier dato adicional del usuario que necesites en el frontend
            });
        } catch (error) {
            console.error("Error al iniciar sesión:", error);
            // Enviar una respuesta de error al frontend
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

    async checkAdminExistence(req, res, next) {
        try {
          // Buscar usuarios con el rol de administrador
          const admins = await User.findAdmins();
            next()
          // Verificar si existen administradores
          if (admins.length > 0) {
            // Ya hay al menos un administrador en la base de datos
            res.status(200).json({ message: 'Ya hay administradores en la base de datos' });
          } else {
            // No hay administradores en la base de datos
            res.status(404).send({ message: 'No se encontraron administradores en la base de datos' });
          }
        } catch (error) {
          console.error(error);
          res.status(500).send({ message: 'Error al buscar administradores en la base de datos' });
        }
      },

    async createAdmin(req, res) {
        try {
            // Validar si el usuario autenticado es un administrador
            if (req.user.role !== 'admin') {
                return res.status(403).json({ message: 'No tienes permisos para crear administradores.' });
            }
    
            // Crear un nuevo administrador en la base de datos
            const admin = await User.create({ email: req.body.email, password: req.body.password, role: 'admin' });
    
            res.status(201).json({ message: 'Administrador creado exitosamente', admin });
        } catch (error) {
            console.error('Error al crear administrador:', error);
            res.status(500).json({ message: 'Error al crear administrador' });
        }
    },
  
    async getInfo(req, res) {
        try {
            // Obtener información del usuario de la base de datos local
            const user = await User.findById(req.user._id);
    
            if (!user) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }
    
            // Obtener el nombre de usuario del correo electrónico
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
                authenticated: true // Indica que el usuario está autenticado
            });
        } catch (error) {
            console.error('Error al obtener la información del usuario:', error);
            res.status(500).json({ message: 'Error al obtener la información del usuario' });
        }
    }

};

module.exports = UserController;