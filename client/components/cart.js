import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addSelection, removeSelection } from '../redux/reducers/cart'


const Cart = () => {
  const data = useSelector((s) => s.cart.list)
  const dispatch = useDispatch()
  const base = useSelector((s) => s.cart.base)
  const rates = useSelector((s) => s.cart.rates)
  const list = useSelector((s) => s.cart.list)
  const selection = useSelector((s) => s.cart.selection)
  const getPrice = (id) => list.find((it) => it.id === id).price
// function productSum(it) {
//  return it.price * selection.it * (rates[base] || 1)
// }
  const sum = Object.entries(selection).reduce(
    (acc, [id, qty]) => acc + getPrice(id) * qty * (rates[base] || 1),
    0
  )
  const fixedSum = sum.toFixed(2)
  const symbols = {
    USD: '$',
    EUR: '€',
    CAD: 'C$'
  }
if (sum > 0 ) {
  return (
    <div className="flex flex-wrap content-center justify-center">
      {data.map((it) => {
        if (it.id in selection) {
          //  && selection[it.id] > 0
          return (
            <div
              key={it.index}
              className="border-2 flex flex-col border-solid border-black w-64 h-64 p-2 m-4"
            >
              <img
                id="product__image"
                className="fill-current h-15 w-15 mr-5 ml-2"
                width="75"
                height="75"
                viewBox="0 0 54 54"
                src={it.image}
                alt={it.description}
              />
              <div id="product__title">{it.title}</div>
              <div>
                <div id="product__price">
                  Cost: {(it.price * (rates[base] || 1)).toFixed(2)}
                  {symbols[base]}
                </div>
                <div id="product__amout">In cart: {selection[it.id] || 0}</div>
                <div id="product__total_price">
                  Total value: {(selection[it.id] * it.price * (rates[base] || 1)).toFixed(2)}
                  {symbols[base]}
                </div>
              </div>
              <button
                id="product__remove"
                type="button"
                className="bg-gray-300 hover:bg-gray-400 text-red-800 font-bold py-2 px-4 rounded-l"
                onClick={() => dispatch(removeSelection(it.id))}
              >
                -
              </button>
              <button
                id="go-back"
                type="button"
                className="bg-gray-300 hover:bg-gray-400 text-green-800 font-bold py-2 px-4 rounded-l"
                onClick={() => dispatch(addSelection(it.id))}
              >
                +
              </button>
            </div>
          )
        }
        return <div key={it.index}> </div>
      })}
      <div id="total-amount">
        Total: {fixedSum} {symbols[base]}
      </div>
    </div>
  )}
  return <div className="flex flex-wrap content-center justify-center">No items</div>
}

Cart.propTypes = {}

export default Cart
