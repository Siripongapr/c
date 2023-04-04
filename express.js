const express = require('express') // Common Js (CJS)
// import express from 'express' // ES Module (ESM)

const port = 3000
const app = express()

app.get('/' , (req, res) => {
  res.format({
    'text/html' : () => {
      res.send('<h1>Hello World</h1>')
    },
    'text/plain' : () => {
      res.set('Content-Type', 'text/plain')
      res.send('Hello World')
    },
    'application/json' : () => {
      res.send({ text: 'Hello World'})
    },
    default: () => {
      res.status(400).send('Content-Type not allow')
    }
  })
})

const users = [
  { name: 'John Doe' , age: 18 },
  { name: 'Joe Dan' , age: 18 },
  { name: 'Jane Dee' , age: 18 },
  { name: 'Josh Dum' , age: 18 }
]
app.get('/users/:id', (req, res) => {
  if (Number.isNaN(+req.params.id)){
    return res.status(400).send({ error: ' Id is not Number'})
  }
  if (req.params.id <= 0) {
    return res.status(400).send({ error: ' ID is Negative or zero'})
  }
  const user = users[req.params.id - 1]
  if (!user) {
    return res.status(404).send({ error: 'Not Found'})
  }
  return res.send(user)
})

// app.get('/hello', (req, res) =>{
//   res.send('hi')
// })

// app.get('/img' , (req, res) => {
//   res.download('./img/Screenshot 2023-04-03 162951.png', 'cat.jpg')
// })

// app.get('/notfound' , (req, res) =>{
//   res.status(404).send('not found page')
// })

// app.get('/notallow' , (req, res) => {
//   res.status(403).send('no permission')
// })

// app.get('/redirect', (req , res) => {
//   res.redirect(301 ,'http://google.com')
// })

app
app.listen(port ,() =>{
  console.log(`App start at http://localhost:${port}`)
})
