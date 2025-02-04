const GET_PRODUCTS = '@@GET_PRODUCTS'
const ADD_TO_SELECTION = 'ADD_TO_SELECTION'
const REMOVE_FROM_SELECTION = 'REMOVE_FROM_SELECTION'
const GET_RATES = '@@GET_RATES'
const SET_BASE = 'SET_BASE'
const SORT_BY_NAME = 'SORT_BY_NAME'
const SORT_BY_PRICE = 'SORT_BY_PRICE'

const initialState = {
  list: [],
  selection: {},
  rates: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_SELECTION:
      return {
        ...state,
        selection: {
          ...state.selection,
          [action.id]: (state.selection[action.id] || 0) + 1
        }
      }

    case REMOVE_FROM_SELECTION: {
      const newSelection = {
        ...state.selection,
        [action.id]: state.selection[action.id] - 1
      }
      if (newSelection[action.id] <= 0) {
        delete newSelection[action.id]
      }
      return {
        ...state,
        selection: newSelection
      }
    }
    case SORT_BY_PRICE: {
      const newSortListArrayByPrice = state.list.sort(function (a, b) {
        return b.price - a.price
      })
      return { ...state, list: [...newSortListArrayByPrice] }
    }
    case SORT_BY_NAME: {
      const newSortListArray = state.list.sort(function (a, b) {
        const nameA = a.title.toLowerCase()
        const nameB = b.title.toLowerCase()
        if (nameA < nameB) return -1
        if (nameA > nameB) return 1
        return 0
      })
      return { ...state, list: [...newSortListArray] }
    }
    case SET_BASE:
      return { ...state, base: action.base }

    case GET_RATES:
      return { ...state, ...action.rates }

    case GET_PRODUCTS:
      return { ...state, list: action.list }
    default:
      return state
  }
}

export function sortByPrice(list) {
  return { type: SORT_BY_PRICE, list }
}

export function sortByName(list) {
  return { type: SORT_BY_NAME, list }
}

export function addSelection(id) {
  return { type: ADD_TO_SELECTION, id }
}

export function removeSelection(id) {
  return { type: REMOVE_FROM_SELECTION, id }
}
export function setBase(base) {
  return { type: SET_BASE, base }
}

export function getRates() {
  return (dispatch) => {
    fetch('/api/v1/rates')
      .then((res) => res.json())
      .then((rates) => {
        dispatch({ type: GET_RATES, rates })
      })
  }
}
export function getProducts() {
  return (dispatch) => {
    fetch('/api/v1/products')
      .then((res) => res.json())
      .then((list) => {
        dispatch({ type: GET_PRODUCTS, list })
      })
  }
}
