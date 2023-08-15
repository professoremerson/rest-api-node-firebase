// definindo o 'strict mode'
'use strict'

// realizando as importações
const express = require('express')
const cors = require('cors')
const config = require('./conf/config')
const bookRoutes = require('./routes/book-routes')

// inicializano o 'Express'
const app = express()

// definindo a utilização de JSON no corpo
// da rquisição
app.use(express.json())

// definindo a utilização do 'cors'
app.use(cors())

// definindo a utilização do roteador
// para o recurso 'books'
app.use('/api', bookRoutes.routes)

// definindo a porta da aplicação
app.listen(config.port, () => {
  console.log('API está rodando em: ' + config.url)
})