import Immutable from 'immutable'

import { CHANGE_LOADING_STATUS } from 'actions/statusActions'

const initialState = Immutable.fromJS({
  isLoding: true,
  location: '',
  startHour: '',
  endHour: ''
})

export default function user (state = initialState, action) {
  switch (action.type) {
  case CHANGE_LOADING_STATUS:
    const { isLoding, location, startHour, endHour } = action.payload
    state = state.set('isLoding', isLoding)
    if(location) state = state.set('location', location)
    if(startHour) state = state.set('startHour', startHour)
    if(endHour) state = state.set('endHour', endHour)
    console.log(endHour);
    return state
  default:
    return state
  }
}
