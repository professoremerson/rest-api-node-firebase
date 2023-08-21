// definindo o 'strict mode'
'use strict'

// definindo os imports
const firebase = require('../conf/db')
const Author = require('../models/author')

// fazendo a chamada para inicializar o
// Firebase
const firestore = firebase.firestore

// criando o método para adicionar um novo
// autor (POST)
const addAuthor = async (req, res, next) => {
  try {
    // criando uma constante para receber
    // o conteúdo do corpo da requisição
    const data = req.body
    // executando o método da classe 'Firestore'
    // que irá gravar o objeto (novo documento)
    // no banco
    await firestore
            .collection('authors')
            .doc()
            .set(data)
    // retornando uma mensagem ao usuário
    res
      .status(201)
      .send('Autor salvo com sucesso!')
  } catch (error) {
    res
      .status(400)
      .send(error.message)
  }
}

// criando o método para listar todos os
// autores (GET)
const getAllAuthors = async (req, res, next) => {
  try {
    // criando um objeto para receber a
    // coleção 'authors'
    const authors = await firestore
                          .collection('authors')
    // criando uma constante para receber
    // os documentos da coleção 'authors'
    const data = await authors.get()
    // criando um 'array' vazio para receber
    // os autores
    const authorsArray = []
    // testando se foram encontrados documentos
    if (data.empty) {
      // retornando uma mensagem caso não
      // tenham sido encontrados os documentos
      res
        .status(404)
        .send('Não há autores cadastrados!')
    } else {
      // criando uma estrutura de repetição
      // para iterar sobre cada documento
      // da coleção
      data.forEach(doc => {
        // criando um novo objeto da classe
        // 'Author' para cada documento
        const author = new Author(
          doc.id,
          doc.data().nome,
          doc.data().genero,
          doc.data().nacionalidade,
          doc.data().nascimento
        )
        // inserindo o objeto recém criado
        // no 'array'
        authorsArray.push(author)
      })
      // retornando a resposta da requisição
      res
        .status(200)
        .send(authorsArray)
    }
  } catch (error) {
    res
      .status(400)
      .send(error.message)
  }
}

// criando o método para listar um 
// autor específico (GET)
const getAuthor = async (req, res, next) => {
  try {
    // criando um objeto para receber o 'id'
    // da requisição
    const id = req.params.id
    // criando um objeto para receber o resultado
    // da consulta no 'Firestore'
    const author = await firestore
                          .collection('authors')
                          .doc(id)
    // criando um novo objeto para receber 
    // apenas os dados do documento
    const data = await author.get()
    // testando se existe um documento válido
    if (!data.exists) {
      res
        .status(404)
        .send('Não foi encontrado um autor com o ID informado!')
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

// criando o método para atualizar um 
// autor específico (PUT)
const updateAuthor = async (req, res, next) => {
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
    const author = await firestore
                          .collection('authors')
                          .doc(id)
    // realizando a alteração dos dados
    await author.update(data)
    res
      .status(201)
      .send('Autor atualizado com sucesso!')
  } catch (error) {
    res
      .status(400)
      .send(error.message)
  }
}

// criando o método para excluir um 
// autor específico (DELETE)
const deleteAuthor = async (req, res, next) => {
  try {
    // criando uma constante para receber
    // o parâmetro 'id' da requisição
    const id = req.params.id
    // realizando a exclusão do documento
    await firestore
            .collection('authors')
            .doc(id)
            .delete()
    res
      .status(200)
      .send('Autor excluído com sucesso!')
  } catch (error) {
    res
      .status(400)
      .send(error.message)
  }
}

module.exports = {
  addAuthor,
  getAllAuthors,
  getAuthor,
  updateAuthor,
  deleteAuthor
}