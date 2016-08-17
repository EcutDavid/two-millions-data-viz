import request from 'superagent'

export const CHANGE_LOADING_STATUS = 'CHANGE_LOADING_STATUS'

export function loadServerStatus() {
  return dispatch => {
    request
      .get('http://localhost:3000/status')
      .end((err, res) => {
        if (err) {
          console.error(err)
        } else {
          dispatch({
            type: CHANGE_LOADING_STATUS,
            payload: { isLoding: false, ...res.body.data }
          })
        }
      })
  }
}
