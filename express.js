const express = require('express') // Common Js (CJS)

// import express from 'express' // ES Module (ESM)

const port = 3000
const app = express()

app.get('/' , (req, res) => {
  res.send('homepage')
})

app.get('/ping', (req, res) => {
  res.send('pong')
})

app.get('/5', (req, res) =>{
  res.send('5555')
})

app.get('/hello', (req, res) =>{
  res.send('hi')
})
app.listen(port ,() =>{
  console.log(`App start at http://localhost:${port}`)
})
