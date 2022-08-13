import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  HomeOutlined,
  CopyOutlined,
  UnorderedListOutlined,
  LoginOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons'
import { Layout, Menu } from 'antd'
import React, { useState } from 'react'
import '../resources/layour.css'
import { Link, Outlet, useNavigate } from 'react-router-dom'

import { useSelector } from 'react-redux'
import { useEffect } from 'react'

const { Header, Sider, Content } = Layout

const DefaultLayout = () => {
  const { cartItems, loading } = useSelector((state) => state.cart)

  const navigate = useNavigate()
  const [collapsed, setCollapsed] = useState(false)

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems))
  }, [cartItems])

  return (
    <Layout>
      {loading && <div className='spinner-border'></div>}
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className='logo'>
          <h3>POS BAZAR</h3>
        </div>
        <Menu
          theme='dark'
          mode='inline'
          defaultSelectedKeys={window.location.pathname}
          // defaultSelectedKeys={['1']}
        >
          <Menu.Item key='/' icon={<HomeOutlined />}>
            <Link to='/'> Inicio</Link>
          </Menu.Item>
          <Menu.Item key='/bills' icon={<CopyOutlined />}>
            <Link to='/bills'> Facturas</Link>
          </Menu.Item>
          <Menu.Item key='/products' icon={<UnorderedListOutlined />}>
            <Link to='/products'> Productos</Link>
          </Menu.Item>
          <Menu.Item key='/customers' icon={<UserOutlined />}>
            <Link to='/customers'> Clientes</Link>
          </Menu.Item>
          <Menu.Item
            key='/logout'
            icon={<LoginOutlined />}
            onClick={() => {
              localStorage.removeItem('user')
              navigate('/login')
            }}
          >
            <Link to='/logout'> Cerrar Sesion</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className='site-layout'>
        <Header
          className='site-layout-background'
          style={{
            padding: 0,
          }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: 'trigger',
              onClick: () => setCollapsed(!collapsed),
            }
          )}

          <div
            className='cart-count d-flex align-items-center me-3'
            onClick={() => navigate('/cart')}
          >
            <p className='mt-3  '>{cartItems.length}</p>
            <ShoppingCartOutlined />
          </div>
        </Header>
        <Content
          className='site-layout-background'
          style={{
            margin: '10px',
            padding: 24,
            minHeight: '80vh',
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}

export default DefaultLayout
