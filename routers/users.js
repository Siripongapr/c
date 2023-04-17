const express = require('express')
const getUsersAsTr = require('../utils/getUsersAsTr')
 const router = express.Router()

 const users = [
  { name: 'John Doe', age: 18 },
  { name: 'Joe Dan', age: 21 },
  { name: 'Jane Dee', age: 15 },
  { name: 'James Dun', age: 19 }

]

router.get('/', (req, res) => {
  res.send(`<table>
    <thead>
      <tr>
        <th>ชื่อ</th>
        <th>อายุ</th>
      </tr>
    </thead>
    <tbody>
      ${getUsersAsTr(users)}
    </tbody>
  </table>
  `)
})

module.exports = router
