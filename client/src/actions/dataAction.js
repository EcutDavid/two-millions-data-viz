import request from 'superagent'

import { CHANGE_LOADING_STATUS } from './statusActions'
import { DATA_LEVEL_HOUR } from '../constants/dataLevel'

export const CHANGE_DATA = 'CHANGE_DATA'

export function pullDataInHourLevel(start, end) {
  return dispatch => {
    dispatch({ type: CHANGE_LOADING_STATUS, payload: { isLoding: true }})
    request
      .get(`http://localhost:3000/data/hour?start=${start}&end=${end}`)
      .end((err, res) => {
        if (err) {
          dispatch({ type: CHANGE_LOADING_STATUS, payload: { isLoding: false }})
          console.error(err)
        } else {
          dispatch({
            type: CHANGE_DATA,
            payload: {
              end,
              level: DATA_LEVEL_HOUR,
              start,
              data: res.body.data
            }
          })
          dispatch({ type: CHANGE_LOADING_STATUS, payload: { isLoding: false }})
        }
      })
  }
}
