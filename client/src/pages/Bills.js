import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { showLoading, hideLoading } from '../redux/cartSlice'
import { Button } from 'antd'
import { useReactToPrint } from 'react-to-print'
import { EyeOutlined } from '@ant-design/icons'
import { Modal, Table } from 'antd'
import { useRef } from 'react'
const Bills = () => {
  const [billsData, setBillsData] = useState([])
  const [printBillModalVisibility, setPrintBillVisibility] = useState(false)
  const [selectedBill, setselectedBill] = useState(null)
  const dispatch = useDispatch()
  const facturaRef = useRef()
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
      title: 'Id',
      dataIndex: '_id',
    },
    {
      title: 'Cliente',
      dataIndex: 'customerName',
    },
    {
      title: 'Celular',
      dataIndex: 'customPhoneNumber',
    },
    {
      title: 'subTotal',
      dataIndex: 'subTotal',
    },
    {
      title: 'Total',
      dataIndex: 'total',
    },

    {
      title: 'Acciones',
      dataIndex: '_id',
      render: (id, record) => (
        <div className='d-flex'>
          <EyeOutlined
            className='mx-2'
            onClick={() => {
              setselectedBill(record)
              setPrintBillVisibility(true)
            }}
          />
        </div>
      ),
    },
  ]

  const cartColums = [
    {
      title: 'Nombre',
      dataIndex: 'name',
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
          <p className='me-3 mx-3'>{record.quantity}</p>
        </div>
      ),
    },
    {
      title: 'Total',
      dataIndex: '_id',
      render: (id, record) => (
        <div>
          <p>{record.price * record.quantity}</p>
        </div>
      ),
    },
  ]
  const handlePrint = useReactToPrint({
    content: () => facturaRef.current,
  })
  return (
    <div>
      <div className='d-flex justify-content-between'>
        <h3>Facturas</h3>
      </div>

      <Table columns={columns} dataSource={billsData} bordered />
      {printBillModalVisibility && (
        <Modal
          visible={printBillModalVisibility}
          title='Detalle Factura'
          onCancel={() => {
            setPrintBillVisibility(false)
          }}
          footer={false}
          width={800}
        >
          <div className='bill-model p-3 ' ref={facturaRef}>
            <div className='d-flex justify-content-between bill-header pb-2'>
              <div>
                <h1>
                  <b>POS MARKET</b>
                </h1>
              </div>

              <div>
                <p>Alexis Auris,</p>
                <p>Ventanilla</p>
                <p>970993166</p>
              </div>
            </div>
            <div className='bill-customer-details mt-2'>
              <p>
                <b>Nombre :</b> {selectedBill.customerName}
              </p>
              <p>
                <b>Celular :</b> {selectedBill.customPhoneNumber}
              </p>
              <p>
                <b>Fecha :</b>
                {selectedBill.createdAt.toString().substring(0, 10)}
              </p>
            </div>
            <Table
              dataSource={selectedBill.cartItems}
              columns={cartColums}
              pagination={false}
            />

            <div className='dotted-border'>
              <p>
                <b>Sub Total :</b> {selectedBill.subTotal}
              </p>
              <p>
                <b>Impuesto :</b>
                {selectedBill.tax}
              </p>
            </div>

            <h2 className='my-2'>
              <b>Total a Pagar :</b>
              {selectedBill.total}
            </h2>
          </div>
          <div className='d-flex justify-content-end'>
            <Button type='primary' onClick={handlePrint}>
              Imprimir!
            </Button>
          </div>
        </Modal>
      )}
    </div>
  )
}

export default Bills
