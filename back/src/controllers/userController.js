const User = require("../models/UserModel");
const firebaseapp = require('../config/firebase')
const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } = require('firebase/auth')
const { getFirestore, collection, doc, setDoc, getDoc, Timestamp } = require('firebase/firestore')

const auth = getAuth(firebaseapp)
const fireDb = getFirestore(firebaseapp)

const UserController = {async register(req, res, next) {
  const { email, password, role, name, username } = req.body;
  try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;
      const userRef = doc(fireDb, 'usuario', uid);
      
      await setDoc(userRef, {
          uid,
          name,
          username,
          registrationDate: Timestamp.fromDate(new Date()),
          role,
          email,
          wishList:[]
      });
      const newuser = new User({
        name,
        username,
        registrationDate: Timestamp.fromDate(new Date()),
        role,
        email,
        wishList:[]
    });
    await User.create(newuser);

      const loginCredential = await signInWithEmailAndPassword(auth, email, password)
      req.session.uid = uid
            req.session.token = await loginCredential.user.getIdToken()
            req.session.role = role
             await User.create({ email:email, password: password, name: name, role: role,username:username, tokens:req.session.token  });

            res.status(201).json({ uid, token: req.session.token, role })
  } catch (error) {
      console.error("Error al registrar usuario:", error);
      let errorMessage = "Error al registrar usuario";
      if (error.code === 'auth/weak-password') {
          errorMessage = 'Contraseña insegura, genera una nueva contraseña';
      } else if (error.code === 'auth/email-already-in-use') {
          errorMessage = 'Email ya registrado';
      }
      res.status(400).json({ error: errorMessage });
  }
},

    async login(req, res) {
        try {
            const { email, password } = req.body;

            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const uid = userCredential.user.uid;

            const userDoc = await getDoc(doc(fireDb, 'usuario', uid));
            const userData = userDoc.data();

            req.session.uid = uid;
            req.session.role = userData.role;

            res.status(200).json({ message: "Inicio de sesión exitoso", user: userData });
        } catch (error) {
            console.error("Error al iniciar sesión:", error);
            res.status(500).json({ message: "Error al iniciar sesión" });
        }
    },

    async getUserProfile (req, res){
        try {
          const userDoc = await getDoc(doc(fireDb, 'usuario', req.user.uid));
          if (!userDoc.exists) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
          }
          const userData = userDoc.data();
          res.json({ user: userData });
        } catch (error) {
          res.status(500).json({ message: 'Error del servidor', error });
        }
    }
};

module.exports = UserController;
