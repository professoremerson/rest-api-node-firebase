// realizando as importações
const express = require('express')
const { 
  addAuthor,
  getAllAuthors,
  getAuthor,
  updateAuthor,
  deleteAuthor
} = require('../controllers/authorController')

// inicializando o serviço de roteamento
// do 'Express'
const router = express.Router()

// criando as rotas para o 'resouce' Authors
// rota para listar todos os autores
router.get('/authors', getAllAuthors)
// rota para listar um autor específico
router.get('/authors/:id', getAuthor)
// rota para cadastrar um novo autor
router.post('/authors', addAuthor)
// rota para atualizar um autor específico
router.put('/authors/:id', updateAuthor)
// rota para excluir um autor específico
router.delete('/authors/:id', deleteAuthor)

module.exports = {
  routes : router
}