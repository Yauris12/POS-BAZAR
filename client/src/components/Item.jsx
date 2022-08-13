import { Button } from 'antd'
import React from 'react'
import '../resources/item.css'
import { useDispatch } from 'react-redux'
import { addProduct } from '../redux/cartSlice'

const Item = ({ item }) => {
  const dispatch = useDispatch()

  const addToCart = (item) => {
    dispatch(addProduct({ ...item, quantity: 1 }))
  }
  return (
    <div className='item'>
      <h4 className='name'>{item.name}</h4>
      <img src={item.image} alt='' height={100} />
      <h4 className='price'>
        {' '}
        <b>Price : </b>
        S/{item.price}
      </h4>
      <div className='d-flex justify-content-end'>
        <Button
          onClick={() => {
            addToCart(item)
          }}
        >
          Agregar a carrito
        </Button>
      </div>
    </div>
  )
}

export default Item
