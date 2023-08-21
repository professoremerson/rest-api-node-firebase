// definindo o 'strict mode'
'use strict'

// definindo os imports
const firebase = require('../conf/db')
const Publisher = require('../models/publisher')

// fazendo a chamada para inicializar o
// Firebase
const firestore = firebase.firestore()

// criando o método para adicionar uma nova
// editora (POST)
const addPublisher = async (req, res, next) => {
  try {
    // criando uma constante para receber
    // o conteúdo do corpo da requisição
    const data = req.body
    // executando o método da classe 'Firestore'
    // que irá gravar o objeto (novo documento)
    // no banco
    await firestore
            .collection('publishers')
            .doc()
            .set(data)
    // retornando uma mensagem ao usuário
    res
      .status(201)
      .send('Editora salva com sucesso!')
  } catch (error) {
    res
      .status(400)
      .send(error.message)
  }
}

// criando o método para listar todas as 
// editoras (GET)
const getAllPublishers = async (req, res, next) => {
  try {
    // criando um objeto para receber a
    // coleção 'publishers'
    const publishers = await firestore
                          .collection('publishers')
    // criando uma constante para receber
    // os documentos da coleção 'publishers'
    const data = await publishers.get()
    // criando um 'array' vazio para receber
    // as editoras
    const publishersArray = []
    // testando se foram encontrados documentos
    if (data.empty) {
      // retornando uma mensagem caso não
      // tenham sido encontrados os documentos
      res
        .status(404)
        .send('Não há editoras cadastradas!')
    } else {
      // criando uma estrutura de repetição
      // para iterar sobre cada documento
      // da coleção
      data.forEach(doc => {
        // criando um novo objeto da classe
        // 'Publisher' para cada documento
        const publisher = new Publisher(
          doc.id,
          doc.data().nome,
          doc.data().pais,
          doc.data().site,
          doc.data().contato
        )
        // inserindo o objeto recém criado
        // no 'array'
        publishersArray.push(publisher)
      })
      // retornando a resposta da requisição
      res
        .status(200)
        .send(publishersArray)
    }
  } catch (error) {
    res
      .status(400)
      .send(error.message)
  }
}

// criando o método para listar uma
// editora específica (GET)
const getPublisher = async (req, res, next) => {
  try {
    // criando um objeto para receber o 'id'
    // da requisição
    const id = req.params.id
    // criando um objeto para receber o resultado
    // da consulta no 'Firestore'
    const publisher = await firestore
                          .collection('publishers')
                          .doc(id)
    // criando um novo objeto para receber 
    // apenas os dados do documento
    const data = await publisher.get()
    // testando se existe um documento válido
    if (!data.exists) {
      res
        .status(404)
        .send('Não foi encontrada uma editora com o ID informado!')
    } else {
      res
        .status(200)
        .send(data.data())
    }
  } catch (error) {
    res
      .status(400)
      .send(error.message)
  }
}

// criando o método para atualizar uma
// editora específico (PUT)
const updatePublisher = async (req, res, next) => {
  try {
    // criando um parâmetro para receber o
    // 'id' da requisição
    const id = req.params.id
    // criando uma constante para receber
    // o corpo da requisição
    const data = req.body
    // criando um novo objeto para receber
    // o resultado da consulta que irá buscar
    // pelo documento a ser alterado
    const publisher = await firestore
                          .collection('publishers')
                          .doc(id)
    // realizando a alteração dos dados
    await publisher.update(data)
    res
      .status(201)
      .send('Editora atualizada com sucesso!')
  } catch (error) {
    res
      .status(400)
      .send(error.message)
  }
}

// criando o método para excluir uma 
// editora específico (DELETE)
const deletePublisher = async (req, res, next) => {
  try {
    // criando uma constante para receber
    // o parâmetro 'id' da requisição
    const id = req.params.id
    // realizando a exclusão do documento
    await firestore
            .collection('publishers')
            .doc(id)
            .delete()
    res
      .status(200)
      .send('Editora excluída com sucesso!')
  } catch (error) {
    res
      .status(400)
      .send(error.message)
  }
}

module.exports = {
  addPublisher,
  getAllPublishers,
  getPublisher,
  updatePublisher,
  deletePublisher
}