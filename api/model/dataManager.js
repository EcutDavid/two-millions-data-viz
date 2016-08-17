// 2M data points is about 23 ＊ 24 hours totally
const DATA_COUNT = 2 * 1000 * 1000
const { generateRandomNumber } = require('../helpers/number')

// TODO fix edge case bug, implement mintutes, hours update.

class DataManager {
  constructor() {
    // Hash table of data for different granularities
    this.valuesInSecondLevel
      = this.valuesInMinuteLevel
      = this.valuesInHourLevel
      = {}

    // Fix bug for edge cases.
    this.updatedDateInSecond = Math.floor(Date.now() / 1000)
    this.firstSecondIndex = this.updatedDateInSecond - DATA_COUNT + 1

    this.minuteAccCounter = this.updatedDateInSecond % 60
    this.updatedDateInMinute = Math.floor(this.updatedDateInSecond / 60)
    this.firstMinuteIndex = Math.floor(this.firstSecondIndex / 60) + 2

    this.hourAccCounter = this.updatedDateInMinute % 60
    this.updatedDateInHour = Math.floor(this.updatedDateInMinute / 60)
    this.firstHourIndex = Math.floor(this.firstMinuteIndex / 60) + 2

    this.parseInitialData()
    this.handleMessageQueue()
  }

  parseInitialData() {
    let counter = 0
    while(counter < DATA_COUNT) {
      const index = this.firstSecondIndex + counter++
      this.valuesInSecondLevel[index] = generateRandomNumber()
    }


    counter = 0
    let loopLength = this.updatedDateInMinute - this.firstMinuteIndex + 1
    while(counter < loopLength) {
      let sum = 0
      const startPoint = (this.firstMinuteIndex + counter - 1) * 60
      for (let i = 0; i < 60; i++) {
        sum += this.valuesInSecondLevel[startPoint + i]
      }
      const index = this.firstMinuteIndex + counter++
      this.valuesInMinuteLevel[index] = sum
    }

    counter = 0
    loopLength = this.updatedDateInHour - this.firstHourIndex + 1
    while(counter < loopLength) {
      let sum = 0
      const startPoint = (this.firstHourIndex + counter - 1) * 60
      for (let i = 0; i < 60; i++) {
        sum += this.valuesInMinuteLevel[startPoint + i]
      }
      const index = this.firstHourIndex + counter++
      this.valuesInHourLevel[index] = sum
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

  retrieveData(data, start, end) {
    const result = []
    const loopLength = end - start
    for (let i = 0; i < loopLength; i++) {
      result[i] = data[start + i]
    }
    return result
  }

  retrieveDataInSeconds(start, end) {
    if(start > end || start > this.updatedDateInSecond) return undefined
    return this.retrieveData(this.valuesInSecondLevel, start, end)
  }

  retrieveDataInMinutes(start, end) {
    if(start > end || start > this.updatedDateInMinute) return undefined
    return this.retrieveData(this.valuesInMinuteLevel, start, end)
  }

  retrieveDataInHours(start, end) {
    if(start > end || start > this.updatedDateInHour) return undefined
    return this.retrieveData(this.valuesInHourLevel, start, end)
  }

  retrieveDataRange() {
    return {
      startHour: this.firstHourIndex,
      endHour: this.updatedDateInHour
    }
  }
}

// This data manager should be singleton
module.exports = new DataManager()
