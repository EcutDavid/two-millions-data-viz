const express = require('express')

const router = express.Router()
module.exports = router

router.get('/data', (req, res) => {
  return res.json({ data: 'data' })
})
