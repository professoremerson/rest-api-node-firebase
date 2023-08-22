// realizando as importações
const express = require('express')
const { 
  addPublisher,
  getAllPublishers,
  getPublisher,
  updatePublisher,
  deletePublisher
} = require('../controllers/publisherController')

// inicializando o serviço de roteamento
// do 'Express'
const router = express.Router()

// criando as rotas para o 'resouce' Publishers
// rota para listar todas as editoras
router.get('/publishers', getAllPublishers)
// rota para listar uma editora específica
router.get('/publishers/:id', getPublisher)
// rota para cadastrar uma nova editora
router.post('/publishers', addPublisher)
// rota para atualizar uma editora específica
router.put('/publishers/:id', updatePublisher)
// rota para excluir uma editora específica
router.delete('/publishers/:id', deletePublisher)

module.exports = {
  routes : router
}