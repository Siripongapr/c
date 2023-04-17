 const express = require('express')
 const router = express.Router()

router.get('/', (req, res) => {
  res.send('<h1> หน้าหลัก </h1> <a href ="/users"> ดูรายชื่อผู้ใช่งาน</a>')
})
module.exports = router
