// 2M data points
// Since we measure data in second level, 2M data is about 23 ＊ 24 hours totally
const DATA_COUNT = 2 * 1000 * 1000
const { generateRandomNumber } = require('../helpers/number')

class DataManager {
  constructor() {
    // Hash table of data for different granularities
    this.valuesInSecondLevel
      = this.valuesInMinuteLevel
      = this.valuesInHourLevel
      = {}

    this.updatedDateInSecond = Math.floor(Date.now() / 1000)
    this.firstSecondIndex = this.updatedDateInSecond - DATA_COUNT + 1

    // TODO handle first minute index

    this.parseInitialData()
    this.handleMessageQueue()
  }

  parseInitialData() {
    let counter = 0

    while(counter < DATA_COUNT) {
      const index = this.firstSecondIndex + counter++
      this.valuesInSecondLevel[index] = generateRandomNumber()
    }
  }

  // As the real world, every second there will be new data generated
  handleMessageQueue() {
    setInterval(() => {
      const lastSecondIndex = this.updatedDateInSecond
      const currentTimeInSecond = Math.floor(Date.now() / 1000)
      this.updatedDateInSecond = currentTimeInSecond

      // Time-consuming process will block this method,
      // which will cause loopTimes larger than 1
      let loopTimes = currentTimeInSecond - lastSecondIndex
      for (let i = 0; i < loopTimes; i++) {
        const index = lastSecondIndex + i + 1
        this.valuesInSecondLevel[index] = generateRandomNumber()

        // Remove the head item
        this.valuesInSecondLevel[this.firstSecondIndex++] = undefined
      }
    }, 1000) // One new data point per second
  }

  retrieveDataInSeconds(start, end) {
    if(start > end || start > this.updatedDateInSecond) return undefined
    const result = []
    const loopLength = end - start
    for (let i = 0; i < loopLength; i++) {
      result[i] = this.valuesInSecondLevel[start + i]
    }
    return result
  }

  retrieveDataInMinutes(start, end) {

  }

  retrieveDataInHours(start, end) {

  }
}

// This data manager should be singleton
module.exports = new DataManager()
