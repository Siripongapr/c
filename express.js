const express = require('express') // Common Js (CJS)
// import express from 'express' // ES Module (ESM)

const port = 3000
const app = express()

app.use(express.urlencoded({extended: false})) //req.body

const shouldBeLoggedIn = (req,res, next) => {
  if (req.get('X-Login-Token') != '1234'){
    return next(new Error('Not Logged In'))
  }
  return next()
}

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
  { name: 'John Doe', age: 18 },
  { name: 'Joe Dan', age: 21 },
  { name: 'Jane Dee', age: 15 },
  { name: 'James Dun', age: 19 }

]

app.get('/users/create',(req,res) => {
  return res.send(`<form action="/users" method="POST">
    <input type = "text" name="name" placeholder="Name">
    <input type = "number" name="age" placeholder="Age">
    <button>Submit</button>
  </form>`)
})

app.post('/users', (req,res) => {
  users.push(req.body)
  res.redirect(`/users/${users.length}`)
})

app.get('/users' , (req,res) => {
  res.send(users)
})
app.get('/users/:id', (req, res) => {
  if (Number.isNaN(+req.params.id)) {
    return res.status(400).send({ error: 'Id is not number' })
  }
  if (req.params.id <= 0) {
    return res.status(400).send({ error: 'Id is negative or zero' })
  }

  const user = users[req.params.id - 1]

  if (!user) {
    return res.status(404).send({ error: 'Not found' })
  }
  if (req.query.type == 'text') {
    console.log('true case')
    return res.send(`${user.name} (${user.age})`)
  } else {
    console.log('false case')
    console.log(user['age'])
    console.log(users)
    return res.send(req.query.field ? user[req.query.field] : user)
  }

})

app.get('/test-login', (req,res,next) => {
  const token = req.get('X-Login-Token')
  if(!token){
    const err = new Error('X-Login-Token not found')
    err.status = 401
    return next(err)
  }
  if(token != 1234){
    const err = new Error('X-Login-Token is incorrect')
    err.status = 403
    return next(err)
  }
  next()
},(req,res) => {
  res.end()
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


app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err)
  }
  res.status(err.status ?? 500).send({ error: err.message })
})

app.listen(port ,() =>{
  console.log(`App start at http://localhost:${port}`)
})
