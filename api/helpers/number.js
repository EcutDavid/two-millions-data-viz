const MAX_NUMBER = 10000

let counter

// TODO: generate real world random number
exports.generateRandomNumber = function() {
  return Math.floor(Math.random() * MAX_NUMBER)
}
