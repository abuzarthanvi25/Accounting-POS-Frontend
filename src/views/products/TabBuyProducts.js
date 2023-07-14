// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import CardContent from '@mui/material/CardContent'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import TableCustom from 'src/custom-components/TableCustom'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import { Typography } from '@mui/material'
import Badge from '@mui/material/Badge'
import Avatar from '@mui/material/Avatar'
import { getMarketplaceProductsRequest } from '../../store/reducers/marketplaceReducer'
import { addProductsToInventoryRequest } from '../../store/reducers/inventoryReducer'

import { useDispatch, useSelector } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'

import { showToast } from '../../custom-components/Toast'

import Cross from 'mdi-material-ui/Cancel'
import USD from 'mdi-material-ui/CurrencyUsd'
import PinOutline from 'mdi-material-ui/PinOutline'
import Search from 'mdi-material-ui/Magnify'

const TabBuyProducts = () => {
  const [orderPayload, setOrderPayload] = useState({
    products_bought: []
  })

  // ** State

  const { marketplaceProducts } = useSelector(state => state.marketplace)

  const [marketplaceProductsLocal, setMarketplaceProductsLocal] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(false)

  const dispatch = useDispatch()

  const getAllMarketplaceProducts = () => {
    try {
      dispatch(getMarketplaceProductsRequest())
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

  useEffect(() => {
    getAllMarketplaceProducts()
  }, [])

  useEffect(() => {
    if (marketplaceProducts) {
      setMarketplaceProductsLocal(marketplaceProducts)
    }
  }, [marketplaceProducts])

  const handleAddToOrder = product => {
    console.log(product)
    const productIndex = orderPayload.products_bought.findIndex(val => val.id == product.id)
    if (productIndex !== -1) {
      orderPayload.products_bought[productIndex] = {
        ...orderPayload.products_bought[productIndex],
        quantity: orderPayload.products_bought[productIndex]?.quantity + 1
      }
    } else {
      orderPayload.products_bought.push({
        id: product.id,
        product_name: product.product_name,
        unit_price: product.unit_price,
        unit_cost: product.unit_cost,
        quantity: 1,
        supplier_id: product.supplier_id
      })
    }
    setOrderPayload({ ...orderPayload })
  }

  const handleCancelOrder = () => setOrderPayload({ products_bought: [] })

  const handleIncrementAndDecrement = (productId, action) => {
    const productIndex = orderPayload.products_bought.findIndex(val => val.id == productId)
    if (action == 'increment') {
      if (productIndex !== -1) {
        orderPayload.products_bought[productIndex] = {
          ...orderPayload.products_bought[productIndex],
          quantity: orderPayload.products_bought[productIndex].quantity + 1
        }
      }
    } else if (action == 'remove') {
      if (productIndex !== -1) {
        orderPayload.products_bought.splice(productIndex, 1)
      }
    } else {
      if (productIndex !== -1) {
        if (orderPayload.products_bought[productIndex].quantity == 1) {
          orderPayload.products_bought.splice(productIndex, 1)
        } else {
          orderPayload.products_bought[productIndex] = {
            ...orderPayload.products_bought[productIndex],
            quantity: orderPayload.products_bought[productIndex].quantity - 1
          }
        }
      }
    }
    setOrderPayload({ ...orderPayload })
  }

  const handleSearch = searchQuery => {
    let copyArr = [...marketplaceProductsLocal]
    let filteredArr = []

    if (searchQuery && copyArr.length > 0) {
      if (typeof searchQuery == 'number') {
        filteredArr = copyArr.filter(product => product.id === searchQuery)
      } else {
        filteredArr = copyArr.filter(product => product.product_name.toLowerCase().includes(searchQuery.toLowerCase()))
      }
      setMarketplaceProductsLocal([...filteredArr])
    } else {
      getAllMarketplaceProducts()
    }
  }

  const returnRows = () => {
    return marketplaceProductsLocal && marketplaceProductsLocal.length > 0
      ? marketplaceProductsLocal.map(val => ({
          product_name: val?.product_name,
          unitCost: val?.unit_cost,
          unitPrice: val?.unit_price,
          id: val?.id,
          supplier_id: val?.supplier_id,
          action: () => (
            <Button
              style={{ color: 'white' }}
              onClick={() => handleAddToOrder(val)}
              variant='contained'
              color='success'
            >
              Add
            </Button>
          )
        }))
      : []
  }

  const rows = returnRows()

  const columns = [
    {
      id: 'product_name',
      label: 'Product Name'
    },
    {
      id: 'unitCost',
      label: 'Unit Cost ($)'
    },
    {
      id: 'unitPrice',
      label: 'Unit Price ($)'
    },
    {
      id: 'action',
      label: 'Action'
    }
  ]

  const handleConfirmOrder = () => {
    try {
      console.log(orderPayload.products_bought)
      if (orderPayload.products_bought && orderPayload.products_bought.length > 0) {
        setLoading(true)
        dispatch(addProductsToInventoryRequest({ products_bought: orderPayload.products_bought }))
          .then(unwrapResult)
          .then(res => {
            setOrderPayload({ products_bought: [] })
            getAllMarketplaceProducts()
            showToast(res?.data?.message)
            setLoading(false)
            console.log('Response at handleConfirmOrder', res)
          })
          .catch(err => {
            showToast('Error buying products from marketplace', 'error')
            setLoading(false)
            console.log('Error at handleConfirmOrder', err)
          })
      }
    } catch (error) {
      showToast('Error buying products from marketplace', 'error')
      setLoading(false)
      console.log('Error at handleConfirmOrder', error)
    }
  }

  const getTotalPayable = () => {
    const subTotal = orderPayload.products_bought.reduce((accumulator, product) => {
      return accumulator + product.unit_cost * product.quantity
    }, 0)
    return subTotal
  }

  return (
    <CardContent>
      <form
        onSubmit={e => {
          e.preventDefault()
          handleSearch(searchQuery)
        }}
      >
        <Grid container spacing={7}>
          <Grid style={{ display: 'flex', justifyContent: 'space-between' }} item md={12}>
            <Box style={{ display: 'flex', alignItems: 'center' }}>
              <Badge overlap='circular' anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                <Avatar
                  alt='John Doe'
                  src='/images/avatars/1.png'
                  sx={{ width: '2.5rem', height: '2.5rem', margin: '0px 10px 0px 10px' }}
                />
              </Badge>
              <Typography variant={'h4'}>Point Of Sale's Order</Typography>
            </Box>
          </Grid>
          <Grid item md={6} xs={12} sm={12}>
            <Grid style={{ display: 'flex', alignItems: 'center', maxWidth: '100%' }} item md={8} xs={12} sm={4}>
              <TextField
                fullWidth
                sx={{ marginRight: 3.5 }}
                onChange={e => setSearchQuery(e.target.value)}
                label='Search Product'
                type='search'
                placeholder='product name/product id'
              />
              <Button
                style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                type={'submit'}
                variant='contained'
                color='secondary'
              >
                <Search style={{ fontSize: '16px' }} />
                Search
              </Button>
            </Grid>

            <Grid style={{ marginTop: '10px' }} item md={12} xs={12} sm={12}>
              {columns && columns.length > 0 && rows && rows.length > 0 ? (
                <TableCustom columns={columns} rows={rows} />
              ) : null}
            </Grid>
          </Grid>
          <Grid item md={6} xs={12} sm={12}>
            <Grid item xs={12}>
              <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography style={{ textAlign: 'center' }} variant='h5'>
                  Products in Cart
                </Typography>
                <Typography style={{ textAlign: 'center' }} variant='h5'>
                  Total Payable: $ <span style={{ fontWeight: 'bold', color: '#2196f3' }}>{getTotalPayable()}</span>
                </Typography>
              </Box>
              <CardContent
                style={{ minHeight: '460px', height: '460px', overflow: 'scroll', backgroundColor: '#F6F6F6' }}
              >
                {orderPayload.products_bought && orderPayload.products_bought.length > 0 ? (
                  orderPayload.products_bought.map((product, index) => {
                    return (
                      <Box
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          margin: '0px 0px 10px 0px',
                          backgroundColor: '#ECECEC',
                          borderRadius: '10px'
                        }}
                        key={index}
                      >
                        <PinOutline style={{ fontSize: '18px', padding: '0px' }} />
                        <Typography style={{ fontWeight: 'bold' }}>{product.product_name}</Typography>
                        <Box style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                          <Button
                            onClick={() => handleIncrementAndDecrement(product.id, 'increment')}
                            variant='contained'
                            color='secondary'
                          >
                            +
                          </Button>
                          <Typography
                            style={{
                              padding: '10px',
                              width: '100%',
                              minWidth: '5ch',
                              textAlign: 'center',
                              fontWeight: 'bold'
                            }}
                          >
                            {product.quantity}
                          </Typography>
                          <Button
                            onClick={() => handleIncrementAndDecrement(product.id, 'decrement')}
                            disabled={product.quantity == 0}
                            variant='contained'
                            color='secondary'
                          >
                            -
                          </Button>
                        </Box>
                        <Box style={{ display: 'flex', width: '100%', maxWidth: '150px' }}>
                          <Typography
                            style={{
                              padding: '10px',
                              minWidth: '5ch',
                              width: '100%',
                              textAlign: 'center',
                              display: 'flex',
                              alignItems: 'center',
                              fontWeight: 'bold',
                              fontSize: '16px'
                            }}
                          >
                            <USD />
                            {product.quantity * product.unit_cost}
                          </Typography>

                          <Button onClick={() => handleIncrementAndDecrement(product.id, 'remove')} color='error'>
                            <Cross />
                          </Button>
                        </Box>
                      </Box>
                    )
                  })
                ) : (
                  <Box
                    style={{
                      display: 'flex',
                      width: '100%',
                      height: '100%',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  >
                    <Typography variant={'caption'}>No Products In Cart</Typography>
                  </Box>
                )}
              </CardContent>
            </Grid>
            <Grid style={{ marginTop: '20px' }} item xs={12}>
              <Button
                onClick={handleConfirmOrder}
                disabled={getTotalPayable() == 0 || loading}
                variant='contained'
                color='success'
                sx={{ marginRight: 3.5 }}
              >
                Confirm Order
              </Button>
              <Button
                disabled={orderPayload.products_bought.length == 0}
                onClick={handleCancelOrder}
                variant='outlined'
                color='error'
              >
                Cancel Order
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </CardContent>
  )
}

export default TabBuyProducts
