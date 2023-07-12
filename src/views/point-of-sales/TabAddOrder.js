// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import TableCustom from 'src/custom-components/TableCustom'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import { Typography } from '@mui/material'

// ** Icons Imports
import Cross from 'mdi-material-ui/Cancel'
import USD from 'mdi-material-ui/CurrencyUsd'
import PinOutline from 'mdi-material-ui/PinOutline'
import Search from 'mdi-material-ui/Magnify'

const TabAddOrder = ({
  columns,
  rows,
  NoOfRowsPerPage,
  pageNumber,
  handleCancelOrder,
  selectedProducts,
  handleIncrementAndDecrement,
  handleSearch,
  handleAddCustomer,
  isCustomer,
  customer
}) => {
  // ** State

  const getTotalPayable = () => {
    const subTotal = selectedProducts.reduce((accumulator, product) => {
      return accumulator + product.unit_price * product.quantity
    }, 0)
    return subTotal
  }

  const [searchQuery, setSearchQuery] = useState('')
  const [customerName, setCustomerName] = useState('')

  return (
    <>
      <CardContent style={{ opacity: isCustomer ? '1' : '0.8', pointerEvents: isCustomer ? 'all' : 'none' }}>
        <form
          onSubmit={e => {
            e.preventDefault()
            handleSearch(searchQuery)
          }}
        >
          <Grid container spacing={7}>
            <Grid item md={12}>
              <Typography variant={'h4'}>{customer?.customer_name}'s Order</Typography>
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
                  <TableCustom
                    columns={columns}
                    rows={rows}
                    NoOfRowsPerPage={NoOfRowsPerPage}
                    pageNumber={pageNumber}
                  />
                ) : null}
              </Grid>
            </Grid>
            <Grid item md={6} xs={12} sm={12}>
              <Grid item xs={12}>
                <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Typography style={{ textAlign: 'center' }} variant='h5'>
                    Order Items
                  </Typography>
                  <Typography style={{ textAlign: 'center' }} variant='h5'>
                    Total Payable: $ <span style={{ fontWeight: 'bold', color: '#2196f3' }}>{getTotalPayable()}</span>
                  </Typography>
                </Box>
                <CardContent
                  style={{ minHeight: '460px', height: '460px', overflow: 'scroll', backgroundColor: '#F6F6F6' }}
                >
                  {selectedProducts && selectedProducts.length > 0 ? (
                    selectedProducts.map((product, index) => {
                      return (
                        <Box
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            margin: '10px 0px 10px 0px',
                            backgroundColor: '#ECECEC',
                            borderRadius: '10px'
                          }}
                          key={index}
                        >
                          <PinOutline style={{ fontSize: '15px', padding: '0px' }} />
                          <Typography style={{ fontWeight: 'bold' }}>{product.productName}</Typography>
                          <Box style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                            <Button
                              onClick={() => handleIncrementAndDecrement(product.product_id, 'increment')}
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
                              onClick={() => handleIncrementAndDecrement(product.product_id, 'decrement')}
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
                              {product.quantity * product.unit_price}
                            </Typography>

                            <Button
                              onClick={() => handleIncrementAndDecrement(product.product_id, 'remove')}
                              color='error'
                            >
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
                      <Typography variant={'caption'}>No order items</Typography>
                    </Box>
                  )}
                </CardContent>
              </Grid>
              <Grid style={{ marginTop: '20px' }} item xs={12}>
                <Button disabled={getTotalPayable() == 0} variant='contained' color='success' sx={{ marginRight: 3.5 }}>
                  Confirm Order
                </Button>
                <Button
                  disabled={selectedProducts.length == 0}
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
      <Modal
        open={isCustomer ? false : true}
        onClose={() => console.log()}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '500px',
            height: '260px',
            backgroundColor: 'white',
            border: '2px solid #000',
            boxShadow: 24,
            padding: '20px'
          }}
        >
          <Typography variant='h3' style={{ textAlign: 'center' }}>
            Customer
          </Typography>
          <Typography sx={{ mt: 2 }} style={{ textAlign: 'center' }} color={'error'}>
            Please add a customer for creating an order*
          </Typography>

          <Grid style={{ display: 'flex', justifyContent: 'center' }} container spacing={3}>
            <Grid
              style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}
              item
              md={8}
            >
              <TextField
                onChange={e => setCustomerName(e.target.value)}
                style={{ marginTop: '20px' }}
                fullWidth
                label='Customer Name'
                placeholder='John Doe'
              />
              <Button
                onClick={() => {
                  if (customerName) {
                    handleAddCustomer(customerName)
                  }
                }}
                style={{ marginTop: '20px' }}
                variant='contained'
                color='success'
              >
                Add Customer
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </>
  )
}

export default TabAddOrder
