// definindo o 'strict mode'
'use strict'

// definindo os imports
const firebase = require('../conf/db')
const Book = require('../models/book')

// fazendo a chamada para inicializar o
// Firebase
const firestore = firebase.firestore

// criando o método para adicionar um novo
// livro (POST)
const addBook = async (req, res, next) => {
  try {
    // criando uma constante para receber
    // o conteúdo do corpo da requisição
    const data = req.body
    // executando o método da classe 'Firestore'
    // que irá gravar o objeto (novo documento)
    // no banco
    await firestore
            .collection('books')
            .doc()
            .set(data)
    // retornando uma mensagem ao usuário
    res
      .status(201)
      .send('Livro salvo com sucesso!')
  } catch (error) {
    res
      .status(400)
      .send(error.message)
  }
}

// criando o método para listar todos os
// livros (GET)
const getAllBooks = async (req, res, next) => {
  try {
    // criando um objeto para receber a
    // coleção 'Books'
    const books = await firestore
                          .collection('books')
    // criando uma constante para receber
    // os documentos da coleção 'Books'
    const data = await books.get()
    // criando um 'array' vazio para receber
    // os livros
    const booksArray = []
    // testando se foram encontrados documentos
    if (data.empty) {
      // retornando uma mensagem caso não
      // tenham sido encontrados os documentos
      res
        .status(404)
        .send('Não há livros cadastrados!')
    } else {
      // criando uma estrutura de repetição
      // para iterar sobre cada documento
      // da coleção
      data.forEach(doc => {
        // criando um novo objeto da classe
        // 'Book' para cada documento
        const book = new Book(
          doc.id,
          doc.data().titulo,
          doc.data().tituloOriginal,
          doc.data().genero,
          doc.data().anoLancamento
        )
        // inserindo o objeto recém criado
        // no 'array'
        booksArray.push(book)
      })
      // retornando a resposta da requisição
      res
        .status(200)
        .send(booksArray)
    }
  } catch (error) {
    res
      .status(400)
      .send(error.message)
  }
}

// criando o método para listar um 
// livro específico (GET)
const getBook = async (req, res, next) => {
  try {
    // criando um objeto para receber o 'id'
    // da requisição
    const id = req.params.id
    // criando um objeto para receber o resultado
    // da consulta no 'Firestore'
    const book = await firestore
                          .collection('books')
                          .doc(id)
    // criando um novo objeto para receber 
    // apenas os dados do documento
    const data = await book.get()
    // testando se existe um documento válido
    if (!data.exists) {
      res
        .status(404)
        .send('Não foi encontrado um livro com o ID informado!')
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
// livro específico (PUT)
const updateBook = async (req, res, next) => {
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
    const book = await firestore
                          .collection('books')
                          .doc(id)
    // realizando a alteração dos dados
    await book.update(data)
    res
      .status(201)
      .send('Livro atualizado com sucesso!')
  } catch (error) {
    res
      .status(400)
      .send(error.message)
  }
}

// criando o método para excluir um 
// livro específico (DELETE)
const deleteBook = async (req, res, next) => {
  try {
    // criando uma constante para receber
    // o parâmetro 'id' da requisição
    const id = req.params.id
    // realizando a exclusão do documento
    await firestore
            .collection('books')
            .doc(id)
            .delete()
    res
      .status(200)
      .send('Livro excluído com sucesso!')
  } catch (error) {
    res
      .status(400)
      .send(error.message)
  }
}

module.exports = {
  addBook,
  getAllBooks,
  getBook,
  updateBook,
  deleteBook
}