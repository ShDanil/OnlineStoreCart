import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import cart from './cart'
import logs from './logs'


const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    cart,
    logs
  })

export default createRootReducer
