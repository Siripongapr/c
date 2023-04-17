const express = require('express') // Common Js (CJS)
const index = require('./routers/index')
const users = require('./routers/users')
const port = 3000
const app = express()

app.use(express.urlencoded({extended: false})) //req.body

app.use('/', index)
app.use('/users', users)

//404
app.use((req,res) => {
  res.status(404).send({error : 'Not found'})
})

app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err)
  }
  res.status(err.status ?? 500).send({ error: err.message })
})

app.listen(port ,() =>{
  console.log(`App start at http://localhost:${port}`)
})
