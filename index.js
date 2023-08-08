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
firebase.initializeApp(firebaseConfig)
console.log('Inicializando o Firebase...')

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

// Criando um novo objeto Firestore
const db = firebase.firestore()

// Definindo qual collection do Firestore
// iremos salvar os dados
const Book = db.collection('books')

// criando a nossa primeira rota para teste
// app.get('/api', (req, res) => {
//   // enviando uma resposta para a requisição
//   res.status(200).send({
//     msg: 'Hello World'
//   })
// })

/**
 * criando um recurso para salvar um novo
 * documento na coleção 'books' (POST)
 */
app.post('/books', async (req, res) => {
  // armazenando o corpo da requisição
  // em um objeto
  const data = req.body
  // console.log(data)
  // inserindo o objeto em uma coleção no
  // Firebase
  await Book.add(data)
  // retornando uma resposta para a requisição
  res.status(201).send({
    msg: 'Livro Salvo!'
  })
})

/**
 * criando um recurso para listar os
 * documentos da coleção 'books' (GET)
 */
app.get('/books', async (req, res) => {
  // criando um objet para receber o
  // resultado da busca na coleção 'Books'
  const snapshot = await Book.get()
  // console.log(snapshot)
  // criando o objeto que irá receber o
  // JSON com os documentos encontrados
  // no banco
  const books = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }))
  // retornando uma resposta para o usuário
  res.send(books)
})

/**
 * criando um recurso para listar um
 * documento específco da coleção 'books'
 * (GET)
 */
app.get('/books/:id', async (req, res) => {
  // criando uma variável para receber o
  // parâmetro ID vindo na requisição
  const id = req.params.id
  // criando um objeto para receber o
  // resultado da busca na coleção 'Books'
  const snapshot = await Book.get()
  // criando o objeto que irá receber o
  // JSON com os documentos encontrados
  // no banco
  const books = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }))
  // filtrando dentro do objeto books para
  // encontrar o documento com o ID igual
  // ao que foi enviado por parâmetro
  const book = books.filter(b => {
    return b.id == id
  })
  // enviando a resposta da requisição
  res.send(book)
})

/**
 * criando um recurso para alterar um
 * documento na coleção 'books' (PUT)
 */
app.put('/books/:id', async (req, res) => {
  // criando uma constante para receber o
  // parâmetro ID que está na requisição
  const id = req.params.id
  // chamando o método update() do Firebase
  // para atualizar o documento que contenha
  // o ID igual ao que foi fornecido via
  // parâmetro
  await Book.doc(id).update(req.body)
  // enviando a resposta da requisição
  res.status(203).send({
    msg: 'Livro Alterado!'
  })
})

/**
 * criando um recurso para excluir um
 * documento na coleção 'books' (DELETE)
 */
app.delete('/books/:id', async (req, res) => {
  // criando uma constante para receber o
  // parâmetro ID enviado na requisição
  const id = req.params.id
  // chamando o método 'delete' do Firestore
  // para excluir o documento que possui ID
  // igual ao fornecido por parâmetro
  await Book.doc(id).delete()
  // enviando uma resposta para a requisição
  res.send({
    msg: 'Livro Excluído!'
  })
})

/**
 * definindo a porta onde o servidor
 * estará 'ouvindo'
 */
app.listen(3000, () => {
  console.log('REST API rodando em http://localhost:3000')
})
