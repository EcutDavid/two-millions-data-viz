import { combineReducers } from 'redux'

import status from './status'
import data from './data'

export default combineReducers({
  data,
  status
})
