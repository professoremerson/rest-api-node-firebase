// definindo o strict mode
'use strict'

// definindo os imports
const firebase = require('../conf/db')
const firestore = firebase.firestore()

class bookRepository {
  constructor() {}

  // criando o método 'create' que receberá do 
  // 'controller' o corpo da requisição e irá
  // fazer a chamada  para o Firestore para
  // realizar a persistência dos dados
  async create(data) {
    let res = await firestore
                      .collection('books')
                      .doc()
                      .set(data)

    return res
  }

  async update(id,data) {
    let book = await firestore
                      .collection('books')
                      .doc(id)
    let res = await book.update(data)

    return res
  }

  async getAll() {
    let books = await firestore
                        .collection('books')
    let res = await books.get()

    return res
  }

  async getById(id) {
    let book = await firestore
                        .collection('books')
                        .doc(id)
    let res = await book.get()

    return res
  }

  async delete(id) {
    return await firestore
                    .collection('books')
                    .doc(id)
                    .delete()
  }
}

module.exports = bookRepository