import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { setBase, sortByName, sortByPrice } from '../redux/reducers/cart'

import gunLogo from './revolver.png'

const Header = () => {
  const dispatch = useDispatch()
  const base = useSelector((s) => s.cart.base)
  const rates = useSelector((s) => s.cart.rates)
  const list = useSelector((s) => s.cart.list)
  const selection = useSelector((s) => s.cart.selection)
  const getPrice = (id) => list.find((it) => it.id === id).price
  const numberOfItems = Object.values(selection).reduce((acc, rec) => acc + rec, 0)

  const sum = Object.entries(selection).reduce(
    (acc, [id, qty]) => acc + getPrice(id) * qty * (rates[base] || 1),
    0
  )
const fixedSum = sum.toFixed(2)

console.log(fixedSum)
  return (
    <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-4">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <img
          className="fill-current h-15 w-15 mr-5 ml-2"
          width="54"
          height="54"
          viewBox="0 0 54 54"
          src={gunLogo}
          alt=""
        />
        <span id="brand-name" className="font-semibold text-5xl mr-1 ">
          {' '}
          <Link to="/"> Las Pistolas</Link>
        </span>
        <div className="block lg:inline-block  text-teal-200 hover:text-white m-4">
          <Link to="/cart"> В корзину </Link>
        </div>
        <div id="sort-price" className="block lg:inline-block  text-teal-200 hover:text-white m-4">
          <button
            type="button"
            className="block lg:inline-block  text-teal-200 hover:text-white m-4"
            onClick={() => {
              dispatch(sortByPrice(list))
            }}
          >
            По цене
          </button>
        </div>
        <div id="sort-name"className="block lg:inline-block text-teal-200 hover:text-white m-4">
          <button
            type="button"
            className="block lg:inline-block  text-teal-200 hover:text-white m-4"
            onClick={() => {
              dispatch(sortByName(list))
            }}
          >
            от А до Я
          </button>
        </div>
        <div className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-4 rounded">
          {['CAD', 'USD', 'EUR'].map((it) => {
            return (
              <button
                key={it}
                type="button"
                className={`mx-4 ${base === it ? 'underline' : ''}`}
                onClick={() => {
                  dispatch(setBase(it))
                }}
              >
                {it}
              </button>
            )
          })}
        </div>
        <div className="inline-block text-sm px-4 py-2 border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white">
          Сумма товаров в корзине: {fixedSum !== 0 && fixedSum}
        </div>
        <div
          id="order-count"
          className="inline-block text-sm px-4 py-2 border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white"
        >
          Товаров в корзине {numberOfItems !== 0 && numberOfItems}
        </div>
      </div>
    </nav>
  )
}

Header.propTypes = {}

export default Header
