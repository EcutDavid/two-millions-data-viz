const MAX_NUMBER = 10000
const HOUR_IN_SECONDS = 1 * 60 * 60

let counter = 0
let hour = 1

// TODO: generate real world random number
exports.generateRandomNumber = function() {
  if(counter++ > HOUR_IN_SECONDS) {
    counter = 0
    hour++
  }
  hour = (hour % 10 === 0) ? 1 : hour % 10
  return Math.floor(Math.random() * MAX_NUMBER / hour)
}
