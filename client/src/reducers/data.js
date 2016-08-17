import Immutable from 'immutable'

import { CHANGE_DATA } from 'actions/dataAction'

const initialState = Immutable.fromJS({
  end: undefined,
  start: undefined,
  level: undefined,
  data: undefined
})

export default function data(state = initialState, action) {
  switch (action.type) {
  case CHANGE_DATA:
    const { end, start, level, data } = action.payload
    state = state.set('end', end)
    state = state.set('start', start)
    state = state.set('level', level)
    state = state.set('data', data)
    return state
  default:
    return state
  }
}
