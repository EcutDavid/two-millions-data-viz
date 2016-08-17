const dataManager = require('../model/dataManager')
const express = require('express')

const router = express.Router()
module.exports = router

router.get('/status', (req, res) => {
  // res.sendStatus(404)
  const location = process.env.location || ''
  const { startHour, endHour } = dataManager.retrieveDataRange()
  return res.json({ data: { location, startHour, endHour } })
})

function parseQS(req, res) {
  let { start, end } = req.query
  if(!start || !end) return res.sendStatus(400)
  console.log(start);
  console.log(end);
  start = Number.parseInt(start)
  end = Number.parseInt(end)
  if(Number.isNaN(start) || Number.isNaN(end)) return res.sendStatus(400)
  return { start, end }
}

router.get('/data/second', (req, res) => {
  console.log(req.query);
  const { start, end } = parseQS(req, res)
  if(start && end) {
    const result = dataManager.retrieveDataInSeconds(start, end)
    if(!result) return res.sendStatus(400)
    return res.json({ data: result })
  }
})

router.get('/data/minute', (req, res) => {
  console.log(req.query);
  const { start, end } = parseQS(req, res)
  if(start && end) {
    const result = dataManager.retrieveDataInMinutes(start, end)
    if(!result) return res.sendStatus(400)
    return res.json({ data: result })
  }
})

router.get('/data/hour', (req, res) => {
  console.log(req.query);
  const { start, end } = parseQS(req, res)
  if(start && end) {
    const result = dataManager.retrieveDataInHours(start, end)
    if(!result) return res.sendStatus(400)
    return res.json({ data: result })
  }
})
