const { generateRandomNumber } = require('../helpers/number')
const assert = require('assert')

describe('randomGenerator', function() {
  it('Should generate random numbers', () => {
    let result = generateRandomNumber()
    let counter = 10
    while(counter--) {
      const newResult = generateRandomNumber()
      if(newResult !== result) break
    }
    assert.equal(true, counter > 0)
  })
})
