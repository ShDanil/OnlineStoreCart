
const GET_LOGS = 'GET_LOGS'

const initialState = {
  list: []
}

export default (state = initialState, action) => {
  if (action.type.indexOf('@@') !== 0) {
    fetch('/api/v1/logs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(action)
    })
  } if (action.type === GET_LOGS) {
    return { ...state,
    list: [...state.list, ...action.logs] }
  }
  return {
    ...state,
    list: [...state.list, action]
  }
}


export function getLogs() {
  return (dispatch) => {
    fetch('/api/v1/logs')
      .then((res) => res.json())
      .then((logs) => {
        dispatch({ type: GET_LOGS, logs })
      })
  }
}