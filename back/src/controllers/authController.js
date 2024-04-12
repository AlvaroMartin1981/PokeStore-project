
/*const app = require('../config/firebase');
const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} = require('firebase/auth');
const { getNavBar } = require('../productController');
const auth = getAuth(app);



const authController = {
    //Formulario de regitro de usuario
    createUser(req,res) {
        const path = req.path;
        res.send(
            `${getNavBar(path)}
                    <div class ="register">
                        <form action="/register" id="register" method="post" class="form-register">
                            <h1>Registrarse</h1>
                            <label for="email">Email:</label>
                            <input type="email" id="email" name="email" required>
                            <label for="password">Contraseña:</label>
                            <input type="password" id="password" name="password" required>
                            <button type="submit" form="register" class="buttons">Crear</button>
                        </form> 
                        <div>
                            <a href="/login"><button class="buttons">Volver</button></a>
                        </div>
                    </div>  
            `)  
    },
    loginUserform(req,res) {
        const path = req.path;
            res.send(`
                ${getNavBar(path)}
                <div class="container-register">
                    <div class ="form-login">
                        <form action="/login" id="login" method="post">
                            <h1>Identificarse</h1>
                            <label for="email">Email:</label>
                            <input type="email" id="email" name="email" required>
                            <label for="password">Contraseña:<label>
                            <input type="password" id="password" name="password" required>   
                        </form> 
                    </div>
                    <div class="buttons-register">
                        <button type="submit" form="login" class="buttons">Acceder</button>
                        <a href="/register"><button class="buttons">Registrarse</button></a>
                        <a href="/products"><button class="buttons">Volver</button></a>
                    </div>
                </div>
            `)
    },
    // Funcion para guardar el usuario registrado
    saveUser(req,res) {
        const { email, password} = req.body;
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            res.redirect('/dashboard/');
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            res.redirect('/register/');
            return;
        })
    },

    loginUser(req,res) {
        const {email, password} = req.body;
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            const uid = user.uid;
            res.redirect('/dashboard/')
        })
        .catch((error) => {
            let errorCode = error.code;
            let errorMessage = error.message;
            res.redirect('/login/');
            return;
        });     
    },
    async logout(req, res) {
        signOut(auth)
            .then(() => {
                res.redirect('/products/');
            })
            .catch((error) => {
                console.error('Error durante el logout:', error);
                res.redirect('/products/');
            });
    }
}

module.exports = authController;*/
