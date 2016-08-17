const dataManager = require('../model/dataManager')
const assert = require('assert')


describe('dataManager', () => {
  describe('second level', () => {
    it('Should return undefined if range incorrect', () => {
      const result = dataManager.retrieveDataInSeconds(50, 20)
      assert.equal(result, undefined)
    })

    it('Should return undefined if start point larger than current time', () => {
      const time = Math.floor(Date.now() / 1000)
      const result = dataManager.retrieveDataInSeconds(time + 100, time + 200)
      assert.equal(result, undefined)
    })

    it('Should works for normal cases', () => {
      const time = Math.floor(Date.now() / 1000)
      const result = dataManager.retrieveDataInSeconds(time - 1000, time - 100)
      assert.equal(result.length, 1000 - 100)
    })
  })

  describe('minute level', () => {
    it('Should works for normal cases', () => {
      const time = Math.floor(Date.now() / 1000 / 60)
      const result = dataManager.retrieveDataInSeconds(time - 30, time - 20)
      assert.equal(result.length, 30 - 20)
    })
  })

  describe('hour level', () => {
    it('Should works for normal cases', () => {
      const time = Math.floor(Date.now() / 1000 / 60 / 60)
      const result = dataManager.retrieveDataInSeconds(time - 30, time - 20)
      assert.equal(result.length, 30 - 20)
    })
  })
})
