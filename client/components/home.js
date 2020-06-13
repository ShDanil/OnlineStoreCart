import React, { useEffect} from 'react'
import { Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import Header from './header'
import Cart from './cart'
import ProductName from './productName'
import { getProducts, getRates} from '../redux/reducers/cart'
import { getLogs } from '../redux/reducers/logs'

const Home = () => {



 const dispatch = useDispatch()
 useEffect(() => {
   dispatch(getLogs())
   dispatch(getProducts())
   dispatch(getRates())

 }, [])

  return (
    <div>
      <Header />
      <Route exact path="/" component={() => <ProductName />} />
      <Route exact path="/cart" component={() => <Cart />} />
    </div>
  )
}

Home.propTypes = {}

export default Home
