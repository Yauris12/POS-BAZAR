import React from 'react'
import { Form, Input, Button, message, Row, Col } from 'antd'
import axios from 'axios'
import { Link } from 'react-router-dom'
import '../resources/authentification.css'
import { useDispatch } from 'react-redux'
import { showLoading, hideLoading } from '../redux/cartSlice'
import { useEffect } from 'react'

const Register = () => {
  const dispatch = useDispatch()

  const onFinish = async (values) => {
    dispatch(showLoading())

    try {
      await axios.post('/api/users/register', values)
      message.success(' Registro exitoso , espera para la verificación')
      dispatch(hideLoading())
    } catch (error) {
      message.error(`Algo salio mal`)
      dispatch(hideLoading())
    }
  }

  return (
    <div className='authentification'>
      <Row className=''>
        <Col lg={8} xs={22}>
          <Form layout='vertical' onFinish={onFinish}>
            <h1>
              <b>Bazar POS</b>
            </h1>
            <h3>Registro</h3>
            <Form.Item name='name' label='Nombre'>
              <Input />
            </Form.Item>
            <Form.Item name='userId' label='User Id'>
              <Input />
            </Form.Item>
            <Form.Item name='password' label='Password'>
              <Input type='password' />
            </Form.Item>
            <div className='mb-3'>
              <Link to='/login'>Si ya estas registrado, Inicia Sesion</Link>
            </div>

            <div className='d-flex justify-content-end'>
              <Button htmlType='submit' type='primary'>
                Registrate
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </div>
  )
}

export default Register
