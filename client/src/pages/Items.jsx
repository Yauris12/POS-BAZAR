import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { showLoading, hideLoading } from '../redux/cartSlice'
import { Select, Form, Input, Button, message } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Modal, Table } from 'antd'
const Items = () => {
  const [itemsData, setItemsData] = useState([])
  const [addEditModalVisibility, setAddEditModalVisibility] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  console.log(editingItem)
  const dispatch = useDispatch()

  const getAllItems = async () => {
    dispatch(showLoading())
    try {
      const { data } = await axios.get('api/products/allproducts')
      setItemsData(data)
      dispatch(hideLoading())
    } catch (error) {
      console.log(error)
      dispatch(hideLoading())
    }
  }

  const deleteItem = async (record) => {
    dispatch(showLoading())
    try {
      const { data } = await axios.post('api/products/deleteProduct', {
        itemId: record._id,
      })
      message.success('Product delete succesdully')
      dispatch(hideLoading())
      getAllItems()
    } catch (error) {
      console.log(error)
      dispatch(hideLoading())
      message.error('Something went wrong')
    }
  }
  useEffect(() => {
    getAllItems()
  }, [])

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
      title: 'Categoria',
      dataIndex: 'category',
    },

    {
      title: 'Acciones',
      dataIndex: '_id',
      render: (id, record) => (
        <div className='d-flex'>
          <EditOutlined
            className='mx-2'
            onClick={() => {
              setEditingItem(record)
              setAddEditModalVisibility(true)
            }}
          />

          <DeleteOutlined className='mx-2' onClick={() => deleteItem(record)} />
        </div>
      ),
    },
  ]

  const onFinish = async (values) => {
    console.log(values)

    dispatch(showLoading())
    if (editingItem) {
      try {
        const { data } = await axios.post('api/products/editProduct', {
          ...values,
          itemId: editingItem._id,
        })
        message.success('Item edited Succesfully')
        setEditingItem(null)
        dispatch(hideLoading())
        setAddEditModalVisibility(false)
        getAllItems()
      } catch (error) {
        console.log(error)
        message.error(`Something went wrong `)
        dispatch(hideLoading())
      }
    } else {
      try {
        const { data } = await axios.post('api/products/addProduct', values)
        message.success('Item added Succesfully')
        dispatch(hideLoading())
        setAddEditModalVisibility(false)
        getAllItems()
      } catch (error) {
        console.log(error)
        message.error(`Something went wrong `)
        dispatch(hideLoading())
      }
    }
  }

  return (
    <div>
      <div className='d-flex justify-content-between'>
        <h3>Products</h3>
        <button
          className='btn btn-primary'
          onClick={() => setAddEditModalVisibility(true)}
        >
          Add Item
        </button>
      </div>

      <Table columns={columns} dataSource={itemsData} bordered />
      {addEditModalVisibility && (
        <Modal
          visible={addEditModalVisibility}
          title={`${editingItem ? 'Editar Producto' : 'Nuevo Producto'}`}
          onCancel={() => {
            setEditingItem(null)
            setAddEditModalVisibility(false)
          }}
          footer={false}
        >
          <Form
            layout='vertical'
            onFinish={onFinish}
            initialValues={editingItem}
          >
            <Form.Item name='name' label='Nombre'>
              <Input />
            </Form.Item>
            <Form.Item name='price' label='Precio'>
              <Input />
            </Form.Item>
            <Form.Item name='image' label='IMAGEN  URL'>
              <Input />
            </Form.Item>
            <Form.Item name='category' label='Categorias'>
              <Select>
                <Select.Option value='frutas-verduras'>
                  Frutas y Verduras
                </Select.Option>
                <Select.Option value='abarrotes'>Abarrotes</Select.Option>
                <Select.Option value='limpieza'>
                  Limpieza del Hogar
                </Select.Option>
              </Select>
            </Form.Item>
            <div className='d-flex justify-content-end'>
              <Button htmlType='submit' type='primary'>
                SAVE
              </Button>
            </div>
          </Form>
        </Modal>
      )}
    </div>
  )
}

export default Items
