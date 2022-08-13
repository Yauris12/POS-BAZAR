import React from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import { Col, Row } from 'antd'
import { useDispatch } from 'react-redux'
import { showLoading, hideLoading } from '../redux/cartSlice'

import Item from '../components/Item'
const HomePage = () => {
  const dispatch = useDispatch()
  const [products, setProducts] = useState([])
  const [selectCategory, setSelectCategory] = useState('frutas-verduras')
  const categories = [
    {
      name: 'frutas-verduras',
      key: 'frutas-verduras',
      imgURL:
        'https://www.pasadenahealthcenter.com/es/wp-content/uploads/2019/10/shutterstock_553662235.jpg',
    },
    {
      name: 'abarrotes',
      key: 'abarrotes',

      imgURL:
        'https://img77.uenicdn.com/image/upload/v1595716655/business/92f695d4-a0c5-4ed1-8e84-14aa967b58b9/inbound1660873240983114893jpg.jpg',
    },
    {
      name: 'limpieza',
      key: 'limpieza',

      imgURL:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTR6OSzVFIFshhl-Vt0Rvf3oI_YHYiQtaGJe3ZYGVIi82By9yB_UPsPuC6w5ZRniafXA7c&usqp=CAU',
    },
  ]
  const getAllItems = async () => {
    dispatch(showLoading())
    try {
      const { data } = await axios.get('api/products/allproducts')
      setProducts(data)
      dispatch(hideLoading())
    } catch (error) {
      console.log(error)
      dispatch(hideLoading())
    }
  }

  useEffect(() => {
    getAllItems()
  }, [])

  return (
    <>
      <div className='d-flex mb-5 categories'>
        {categories.map((category, id) => (
          <div
            key={id}
            onClick={() => setSelectCategory(category.name)}
            className={`d-flex category ${
              selectCategory === category.key && 'selected-category'
            }`}
          >
            <h4>{category.name}</h4>
            <img src={category.imgURL} alt='' height='60' width='80' />
          </div>
        ))}
      </div>
      <Row gutter={20}>
        {products
          .filter((i) => i.category === selectCategory)
          .map((product) => (
            <Col key={product._id} xs={24} lg={6} md={12} sm={6}>
              <Item item={product} />
            </Col>
          ))}
      </Row>
    </>
  )
}

export default HomePage
