import { Button, Form, Input, message, Modal, Select, Table } from 'antd'
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  DeleteOutlined,
  PlusCircleOutlined,
  MinusCircleOutlined,
} from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import {
  updateCart,
  deleteteFromCart,
  deleteteAllCart,
} from '../redux/cartSlice'
import { useEffect } from 'react'
import axios from 'axios'
const CardPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { cartItems } = useSelector((state) => state.cart)
  const [billChargeModal, setbillChargeModal] = useState(false)
  const [subTotal, setSubTotal] = useState(0)
  useEffect(() => {
    let temp = 0
    cartItems.forEach((cartItem) => {
      temp = temp + cartItem.price * cartItem.quantity
    })
    setSubTotal(temp)
  }, [cartItems])

  const increaseQuantity = (record) => {
    dispatch(updateCart({ ...record, quantity: record.quantity + 1 }))
  }
  const decreaseQuantity = (record) => {
    if (record.quantity !== 1) {
      dispatch(updateCart({ ...record, quantity: record.quantity + -1 }))
    } else {
      dispatch(deleteteFromCart(record))
    }
  }

  const columns = [
    {
      title: 'Nombre',
      dataIndex: 'name',
    },
    {
      title: 'Imagen',
      dataIndex: 'image',
      render: (image, record) => (
        <img src={image} alt='' height='60' width='60' />
      ),
    },
    {
      title: 'Precio',
      dataIndex: 'price',
    },
    {
      title: 'Cantidad',
      dataIndex: '_id',
      render: (id, record) => (
        <div className='text-center'>
          <MinusCircleOutlined onClick={() => decreaseQuantity(record)} />
          <b className='me-3 mx-3'>{record.quantity}</b>
          <PlusCircleOutlined onClick={() => increaseQuantity(record)} />
        </div>
      ),
    },
    {
      title: 'Acciones',
      dataIndex: '_id',
      render: (id, record) => (
        <DeleteOutlined onClick={() => dispatch(deleteteFromCart(record))} />
      ),
    },
  ]
  const onFinish = async (values) => {
    const object = {
      ...values,
      subTotal,
      cartItems,
      tax: Number(((subTotal / 100) * 18).toFixed(2)),
      total: Number(
        (subTotal + Number(((subTotal / 100) * 18).toFixed(2))).toFixed(2)
      ),
      userId: JSON.parse(localStorage.getItem('user'))._id,
    }
    try {
      await axios.post('/api/bills/chargeBill', object)
      message.success('Factura generada')
      dispatch(deleteteAllCart())

      navigate('/')
    } catch (error) {
      message.error('Hubo un error')
      console.log(error)
    }
  }
  return (
    <div>
      <Table columns={columns} dataSource={cartItems} bordered />
      <div className='d-flex  justify-content-end flex-column align-items-end'>
        <div className='subtotal'>
          <h3>SUB TOTAL S/ {subTotal}</h3>
        </div>
        <Button type='primary' onClick={() => setbillChargeModal(true)}>
          {' '}
          Generar Factura
        </Button>
      </div>

      <Modal
        footer={false}
        title='Factura'
        visible={billChargeModal}
        onCancel={() => {
          setbillChargeModal(false)
        }}
      >
        <Form layout='vertical' onFinish={onFinish}>
          <Form.Item name='customerName' label=' Cliente'>
            <Input />
          </Form.Item>
          <Form.Item name='customPhoneNumber' label='Celular '>
            <Input />
          </Form.Item>
          <Form.Item name='paymentMode' label='Modo de Pago'>
            <Select>
              <Select.Option value='cash'>Efectivo</Select.Option>
              <Select.Option value='card'>Tarjeta</Select.Option>
            </Select>
          </Form.Item>

          <div className='charge-bill-amount'>
            <h5>
              Subtotal : <b>{subTotal}</b>
            </h5>
            <h5>
              Impuesto : <b>{((subTotal / 100) * 18).toFixed(2)}</b>
            </h5>
            <h2>
              Total : <b>S/ {(subTotal + (subTotal / 100) * 18).toFixed(2)}</b>
            </h2>
          </div>

          <div className='d-flex justify-content-end'>
            <Button htmlType='submit' type='primary'>
              Generar Factura
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  )
}

export default CardPage
