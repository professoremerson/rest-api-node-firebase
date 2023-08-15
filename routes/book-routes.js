// realizando as importações
const express = require('express')
const { 
  addBook,
  getAllBooks,
  getBook,
  updateBook,
  deleteBook
} = require('../controllers/bookController')

// inicializando o serviço de roteamento
// do 'Express'
const router = express.Router()

// criando as rotas para o 'resouce' Books
// rota para listar todos os livros
router.get('/books', getAllBooks)
// rota para listar um livro específico
router.get('/books/:id', getBook)
// rota para cadastrar um novo livro
router.post('/books', addBook)
// rota para atualizar um livro específico
router.put('/books/:id', updateBook)
// rota para excluir um livro específico
router.delete('/books/:id', deleteBook)

module.exports = {
  routes : router
}