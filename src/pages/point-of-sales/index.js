// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import { styled } from '@mui/material/styles'
import MuiTab from '@mui/material/Tab'
import Button from '@mui/material/Button'

// ** Icons Imports
import AccountOutline from 'mdi-material-ui/AccountOutline'
import Cart from 'mdi-material-ui/Cart'

// ** Demo Tabs Imports
import TabAllOrders from 'src/views/point-of-sales/TabAllOrders'
import TabAddOrder from 'src/views/point-of-sales/TabAddOrder'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'

// ** Reducer Imports
import { getAllProductsInInventoryRequest } from '../../store/reducers/inventoryReducer'
import { addACustomerRequest } from '../../store/reducers/customerReducer'

import { useDispatch, useSelector } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'

const Tab = styled(MuiTab)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    minWidth: 100
  },
  [theme.breakpoints.down('sm')]: {
    minWidth: 67
  }
}))

const TabName = styled('span')(({ theme }) => ({
  lineHeight: 1.71,
  fontSize: '0.875rem',
  marginLeft: theme.spacing(2.4),
  [theme.breakpoints.down('md')]: {
    display: 'none'
  }
}))

const PointOfSales = () => {
  // ** State
  const [value, setValue] = useState('add-order')
  const [orderPayload, setOrderPayload] = useState({
    customer_id: null,
    order_items: []
  })
  const [productsInInventoryLocal, setProductsInInventoryLocal] = useState(null)
  const [customerLocal, setCustomerLocal] = useState(null)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const dispatch = useDispatch()
  const { productsInInventory } = useSelector(state => state.inventory)
  const { customer } = useSelector(state => state.customers)

  const getAllProductsInInventory = () => {
    try {
      dispatch(getAllProductsInInventoryRequest())
        .then(unwrapResult)
        .then(res => {
          console.log('Response at getOrdersByCategoryIdRequest', res)
        })
        .catch(err => {
          console.log('Error at getOrdersByCategoryIdRequest', err)
        })
    } catch (err) {
      console.log('Error at getData', err)
    }
  }

  const handleAddCustomer = customerName => {
    try {
      if (customerName) {
        dispatch(addACustomerRequest({ customer_name: customerName }))
          .then(unwrapResult)
          .then(res => {
            console.log('Response at handleAddCustomer', res)
          })
          .catch(err => {
            console.log('Error at handleAddCustomer', err)
          })
      }
    } catch (err) {
      console.log('Error at handleAddCustomer', err)
    }
  }

  useEffect(() => {
    getAllProductsInInventory()
  }, [])

  useEffect(() => {
    if (productsInInventory) {
      setProductsInInventoryLocal(productsInInventory)
    }
  }, [productsInInventory])

  useEffect(() => {
    if (customer) {
      setCustomerLocal(customer)
    }
  }, [customer])

  useEffect(() => {
    if (customerLocal) {
      orderPayload.customer_id = customerLocal?.id
      setOrderPayload({ ...orderPayload })
    }
  }, [customerLocal])

  useEffect(() => {
    console.log(orderPayload.order_items)
  }, [orderPayload])

  const handleAddToOrder = product => {
    console.log(product)
    const productIndex = orderPayload.order_items.findIndex(val => val.product_id == product.id)
    if (productIndex !== -1) {
      orderPayload.order_items[productIndex] = {
        ...orderPayload.order_items[productIndex],
        quantity: orderPayload.order_items[productIndex]?.quantity + 1
      }
    } else {
      orderPayload.order_items.push({
        product_id: product.id,
        productName: product.product_name,
        unit_price: product.unit_price,
        unit_cost: product.unit_cost,
        quantity: 1
      })
    }
    setOrderPayload({ ...orderPayload })
  }

  const handleCancelOrder = () => setOrderPayload({ ...orderPayload, order_items: [] })

  const handleIncrementAndDecrement = (productId, action) => {
    const productIndex = orderPayload.order_items.findIndex(val => val.product_id == productId)
    if (action == 'increment') {
      if (productIndex !== -1) {
        orderPayload.order_items[productIndex] = {
          ...orderPayload.order_items[productIndex],
          quantity: orderPayload.order_items[productIndex].quantity + 1
        }
      }
    } else if (action == 'remove') {
      if (productIndex !== -1) {
        orderPayload.order_items.splice(productIndex, 1)
      }
    } else {
      if (productIndex !== -1) {
        if (orderPayload.order_items[productIndex].quantity == 1) {
          orderPayload.order_items.splice(productIndex, 1)
        } else {
          orderPayload.order_items[productIndex] = {
            ...orderPayload.order_items[productIndex],
            quantity: orderPayload.order_items[productIndex].quantity - 1
          }
        }
      }
    }
    setOrderPayload({ ...orderPayload })
  }

  const handleSearch = searchQuery => {
    let copyArr = [...productsInInventoryLocal]
    let filteredArr = []

    if (searchQuery && copyArr.length > 0) {
      if (typeof searchQuery == 'number') {
        filteredArr = copyArr.filter(product => product.Product.id === searchQuery)
      } else {
        filteredArr = copyArr.filter(product =>
          product.Product.product_name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      }
      setProductsInInventoryLocal([...filteredArr])
    } else {
      getAllProductsInInventory()
    }
  }

  const handleQuantity = productId => {
    if (productId) {
      const productIndex = orderPayload.order_items.findIndex(val => val.product_id == productId)
      if (productIndex !== -1) {
        return orderPayload.order_items[productIndex]?.quantity
      } else {
        return 0
      }
    } else {
      return 0
    }
  }

  const returnRows = () => {
    return productsInInventoryLocal && productsInInventoryLocal.length > 0
      ? productsInInventoryLocal.map(val => ({
          productName: val?.Product?.product_name,
          unitPrice: val?.Product?.unit_price,
          quantityInStock: `${val?.quantity_in_stock - handleQuantity(val?.Product?.id)}/${val?.quantity_in_stock}`,
          product_id: val?.Product?.id,
          action: () => (
            <Button
              style={{ color: 'white' }}
              disabled={val?.quantity_in_stock - handleQuantity(val?.Product?.id) == 0}
              onClick={() => handleAddToOrder(val?.Product)}
              variant='contained'
              color='success'
            >
              Add
            </Button>
          )
        }))
      : []
  }

  const handleConfirmOrder = () => {
    console.log(orderPayload)
  }

  return (
    <Card>
      <TabContext value={value}>
        <TabList
          onChange={handleChange}
          aria-label='account-settings tabs'
          sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}` }}
        >
          <Tab
            value='add-order'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <AccountOutline />
                <TabName>Add Order</TabName>
              </Box>
            }
          />
          <Tab
            value='view-all-orders'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Cart />
                <TabName>View All Orders</TabName>
              </Box>
            }
          />
        </TabList>

        <TabPanel sx={{ p: 0 }} value='add-order'>
          <TabAddOrder
            handleCancelOrder={handleCancelOrder}
            selectedProducts={orderPayload.order_items}
            handleIncrementAndDecrement={handleIncrementAndDecrement}
            handleSearch={handleSearch}
            handleAddCustomer={handleAddCustomer}
            customer={customerLocal}
            isCustomer={orderPayload.customer_id}
            handleConfirmOrder={handleConfirmOrder}
            rows={returnRows()}
            columns={[
              {
                id: 'productName',
                label: 'Product Name'
              },
              {
                id: 'unitPrice',
                label: 'Unit Price ($)'
              },
              {
                id: 'quantityInStock',
                label: 'In Stock'
              },
              {
                id: 'action',
                label: 'Action'
              }
            ]}
          />
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value='view-all-orders'>
          <TabAllOrders unwrapResult={unwrapResult} dispatch={dispatch} />
        </TabPanel>
      </TabContext>
    </Card>
  )
}

export default PointOfSales
