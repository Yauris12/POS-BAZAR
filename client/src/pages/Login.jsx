import React, { useEffect } from 'react'
import { Form, Input, Button, message, Row, Col } from 'antd'
import { useDispatch } from 'react-redux'
import { showLoading, hideLoading } from '../redux/cartSlice'
import { Link, useNavigate } from 'react-router-dom'
import '../resources/authentification.css'
import axios from 'axios'
const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const onFinish = async (values) => {
    dispatch(showLoading())

    try {
      const { data } = await axios.post('/api/users/login', values)
      message.success(' login exitoso , espera para la verificación')

      localStorage.setItem('user', JSON.stringify(data))
      dispatch(hideLoading())
      navigate('/')
    } catch (error) {
      message.error(`Algo salio mal`)
      dispatch(hideLoading())
    }
  }

  useEffect(() => {
    if (localStorage.getItem('user')) {
      navigate('/')
    }
  })

  return (
    <div className='authentification'>
      <Row className=''>
        <Col lg={8} xs={22}>
          <Form layout='vertical' onFinish={onFinish}>
            <h1>
              <b>Bazar POS</b>
            </h1>
            <h3>Inicia Sesión</h3>
            <Form.Item name='userId' label='userName'>
              <Input />
            </Form.Item>

            <Form.Item name='password' label='Password'>
              <Input type='password' />
            </Form.Item>
            <div className='mb-3'>
              <Link to='/register'>Si no tienes una cuenta, Registrate</Link>
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

export default Login
