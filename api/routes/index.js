const dataManager = require('../model/dataManager')
const express = require('express')

const router = express.Router()
module.exports = router

// Tell requester location of the server, and the range of data
router.get('/status', (req, res) => {
  const location = process.env.location || ''
  const { startHour, endHour } = dataManager.retrieveDataRange()
  return res.json({ data: { location, startHour, endHour } })
})

function parseQS(req, res) {
  let { start, end } = req.query
  if(!start || !end) return res.sendStatus(400)
  start = Number.parseInt(start)
  end = Number.parseInt(end)
  if(Number.isNaN(start) || Number.isNaN(end)) return res.sendStatus(400)
  return { start, end }
}

router.get('/data/second', (req, res) => {
  const { start, end } = parseQS(req, res)
  if(start && end) {
    const result = dataManager.retrieveDataInSeconds(start, end)
    if(!result) return res.sendStatus(400)
    return res.json({ data: result })
  }
})

router.get('/data/minute', (req, res) => {
  const { start, end } = parseQS(req, res)
  if(start && end) {
    const result = dataManager.retrieveDataInMinutes(start, end)
    if(!result) return res.sendStatus(400)
    return res.json({ data: result })
  }
})

router.get('/data/hour', (req, res) => {
  const { start, end } = parseQS(req, res)
  if(start && end) {
    const result = dataManager.retrieveDataInHours(start, end)
    if(!result) return res.sendStatus(400)
    return res.json({ data: result })
  }
})
