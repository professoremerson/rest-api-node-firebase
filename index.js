// definindo as importações
const express = require('express')
const cors = require('cors')
const firebase = require('firebase')

/**
 * inserindo as configurações para conexão
 * com o Firebase
 */
const firebaseConfig = {
  apiKey: '',
  authDomain: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
  appId: ''
}

// inicializando o Firebase
// firebase.initializeApp(firebaseConfig)

/**
 * instânciando o nosso app como sendo
 * pertencente à classe Express
 */
const app = express()

/**
 * habilitando a utilização de JSON no
 * corpo da requisição
 */
app.use(express.json())

/**
 * habilitando o Cors
 */
app.use(cors())

// criando a nossa primeira rota para teste
app.get('/api', (req, res) => {
  // enviando uma resposta para a requisição
  res.status(200).send({
    msg: 'Hello World'
  })
})

/**
 * definindo a porta onde o servidor
 * estará 'ouvindo'
 */
app.listen(3000, () => {
  console.log('REST API rodando em http://localhost:3000')
})
