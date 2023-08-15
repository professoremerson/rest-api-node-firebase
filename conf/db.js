// definindo os 'imports'
const firebase = require('firebase')
const config = require('./config')

// inicializando o 'Firebase'
const db = firebase.initializeApp(config.firebaseConfig)

// exportando o módulo
module.exports = db
