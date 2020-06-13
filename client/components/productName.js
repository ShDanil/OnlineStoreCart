import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addSelection, removeSelection } from '../redux/reducers/cart'

const ProductName = () => {
  const dispatch = useDispatch()
  const data = useSelector((s) => s.cart.list)
  const selection = useSelector((s) => s.cart.selection)
  const base = useSelector((s) => s.cart.base)
  const rates = useSelector((s) => s.cart.rates)
  const symbols = {
    USD: '$',
    EUR: '€',
    CAD: 'C$'
  }

//  React.useEffect(() => {

//  }, [data])


  return (
    <div className="flex flex-wrap content-center justify-center">
      {data.map((it) => {
        if (selection[it.id] > 0) {
          return (
            <div
              className="border-2 flex flex-col border-solid border-black w-64 h-64 p-2 m-4"
              key={it.id}
            >
              <img
                id="card__image"
                className="fill-current h-15 w-15 mr-5 ml-2"
                width="74"
                height="74"
                viewBox="0 0 54 54"
                src={it.image}
                alt={it.description}
              />
              <div id="card__title">{it.title}</div>
              <div id="card__price">
                Cost: {(it.price * (rates[base] || 1)).toFixed(2)}{' '}
                <div id="currency"> {symbols[base]}</div>
              </div>
              <div>{it.description}</div>

              <div className="flex p-10 justify-between">
                <button
                  id="go-back"
                  type="button"
                  className="bg-gray-300 hover:bg-gray-400 text-red-800 font-bold py-2 px-4 rounded-l"
                  onClick={() => dispatch(removeSelection(it.id))}
                >
                  -
                </button>
                <div id="card__product-amount">{selection[it.id] || 0}</div>
                <button
                  id="go-back"
                  type="button"
                  className="bg-gray-300 hover:bg-gray-400 text-green-800 font-bold py-2 px-4 rounded-l"
                  onClick={() => dispatch(addSelection(it.id))}
                >
                  +
                </button>
              </div>
            </div>
          )
        }
          return (
            <div
              className="border-2 flex flex-col border-solid border-black w-64 h-64 p-2 m-4"
              key={it.id}
            >
              <img
                className="fill-current h-15 w-15 mr-5 ml-2"
                width="74"
                height="74"
                viewBox="0 0 54 54"
                src={it.image}
                alt=""
              />
              <div>{it.title}</div>
              <div>
                Cost: {(it.price * (rates[base] || 1)).toFixed(2)} {symbols[base]}
              </div>
              <div>{it.description}</div>

              <div className="flex p-10 justify-between">
                <button
                  id="go-back"
                  type="button"
                  className="bg-gray-300 hover:bg-gray-400 text-red-800 font-bold py-2 px-4 rounded-l"
                >
                  -
                </button>
                <div>{selection[it.id] || 0}</div>
                <button
                  id="go-back"
                  type="button"
                  className="bg-gray-300 hover:bg-gray-400 text-green-800 font-bold py-2 px-4 rounded-l"
                  onClick={() => dispatch(addSelection(it.id))}
                >
                  +
                </button>
              </div>
            </div>
          )

      })}
    </div>
  )
}

export default ProductName
