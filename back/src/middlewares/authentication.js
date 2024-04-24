const app = require('../config/firebase');
const { getAuth, onAuthStateChanged } = require('firebase/auth');
const auth = getAuth(app)

function checkSession(req,res,next) {
    onAuthStateChanged(auth, (user) => {
        if(user) {
            next();
        } else {
            res.redirect('/login/');
        }
    })
}

module.exports = checkSession;