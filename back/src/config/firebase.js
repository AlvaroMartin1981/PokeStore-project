/*require ('dotenv').config()

const { initializeApp, applicationDefault} = require('firebase-admin/app')
require('firebase-admin/auth')
initializeApp({
  credential: applicationDefault()
})*/



const firebase = require('firebase/app');

const firebaseConfig = {
  apiKey: process.env.FB_APIKEY,
  authDomain: process.env.FB_DOMAIN,
  projectId: process.env.FB_PROJECTID,
  storageBucket: process.env.FB_STORAGEBUCKET,
  messagingSenderId: process.env.FB_SENDERID,
  appId: process.env.FB_APPID
};

const app = firebase.initializeApp(firebaseConfig);

module.exports = app