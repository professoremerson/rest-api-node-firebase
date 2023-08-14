// definindo o 'strict mode' do JS
'use strict'

// definindo as importações
const dotenv = require('dotenv')
const assert = require('assert')

// inicializando o 'dotenv'
dotenv.config()

// criando um objeto que irá conter as
// variáveis de ambiente
const {
  PORT,
  HOST,
  HOST_URL,
  API_KEY,
  AUTH_DOMAIN,
  PROJECT_ID,
  STORAGE_BUCKET,
  MESSAGING_SENDER_ID,
  APP_ID
} = process.env

// definindo a obrigatoriedade de alguns
// parâmetros
assert(PORT, 'PORT is required!')
assert(HOST, 'HOST is required!')

// exportando o módulo
module.exports = {
  port: PORT,
  host: HOST,
  url: HOST_URL,
  firebaseConfig: {
    apiKey: API_KEY,
    authDomain: AUTH_DOMAIN,
    projectId: PROJECT_ID,
    storageBucket: STORAGE_BUCKET,
    messagingSenderId: MESSAGING_SENDER_ID,
    appId: APP_ID
  }
}
