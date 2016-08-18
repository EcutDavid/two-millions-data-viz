/* global API_BASE_URL */
import request from 'superagent'

export const CHANGE_LOADING_STATUS = 'CHANGE_LOADING_STATUS'
import { pullDataInHourLevel } from './dataAction'

export function loadServerStatus() {
  return dispatch => {
    request
      // TODO: replace the hard coding here
      .get(`${API_BASE_URL}/status`)
      .end((err, res) => {
        if (err) {
          console.error(err)
        } else {
          dispatch({
            type: CHANGE_LOADING_STATUS,
            payload: { isLoding: false, ...res.body.data }
          })
          const { startHour } = res.body.data
          // Send first data pulling action
          dispatch(pullDataInHourLevel(startHour, startHour + 100))
        }
      })
  }
}
