import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { showLoading, hideLoading } from '../redux/cartSlice'
import { Table } from 'antd'
const Customers = () => {
  const [billsData, setBillsData] = useState([])
  const dispatch = useDispatch()
  const getAllBills = async () => {
    dispatch(showLoading())
    try {
      const { data } = await axios.get('api/bills/')
      data.reverse()
      setBillsData(data)
      dispatch(hideLoading())
    } catch (error) {
      console.log(error)
      dispatch(hideLoading())
    }
  }

  useEffect(() => {
    getAllBills()
  }, [])

  const columns = [
    {
      title: 'Cliente',
      dataIndex: 'customerName',
    },
    {
      title: 'Celular',
      dataIndex: 'customPhoneNumber',
    },
    {
      title: 'Creado en',
      dataIndex: 'createdAt',
      render: (value) => <span>{value.toString().substring(0, 10)}</span>,
    },
  ]

  return (
    <div>
      <div className='d-flex justify-content-between'>
        <h3>Clientes</h3>
      </div>

      <Table columns={columns} dataSource={billsData} bordered />
    </div>
  )
}

export default Customers
