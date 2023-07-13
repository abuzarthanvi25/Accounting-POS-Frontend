// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import { styled } from '@mui/material/styles'
import MuiTab from '@mui/material/Tab'
import { Typography } from '@mui/material'
import Grid from '@mui/material/Grid'

// ** Icons Imports

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'

const ViewOrder = () => {
  // ** State

  const { allOrders } = useSelector(state => state.orders)
  const [currentOrder, setCurrentOrder] = useState(null)

  const router = useRouter()

  const { slug } = router.query

  const findOrder = () => {
    const order = allOrders.find(val => val.id == slug)
    setCurrentOrder(order)
  }

  useEffect(() => {
    findOrder()
  }, [slug])

  return (
    <Card>
      <CardContent>
        {currentOrder ? (
          <Grid container spacing>
            <Grid style={{ display: 'flex', justifyContent: 'space-between', margin: '10px 0px' }} item md={12}>
              <Typography variant='h4'>Order ID:</Typography>
              <Typography variant='h4'>{currentOrder?.id}</Typography>
            </Grid>
            <Grid style={{ display: 'flex', justifyContent: 'space-between', margin: '10px 0px' }} item md={12}>
              <Typography variant='h4'>Order Customer ID:</Typography>
              <Typography variant='h4'>{currentOrder?.customer_id}</Typography>
            </Grid>
            <Grid style={{ display: 'flex', justifyContent: 'space-between', margin: '10px 0px' }} item md={12}>
              <Typography variant='h4'>Order Date:</Typography>
              <Typography variant='h4'>{currentOrder?.order_date}</Typography>
            </Grid>
            <Grid style={{ display: 'flex', justifyContent: 'space-between', margin: '10px 0px' }} item md={12}>
              <Typography variant='h4'>Sub Total:</Typography>
              <Typography variant='h4'>{currentOrder?.sub_total}</Typography>
            </Grid>
            <Grid
              style={{
                border: '1px solid #B2B2B2',
                padding: '20px',
                borderRadius: '10px',
                boxShadow: '9px 10px 14px -8px rgba(55,55,55,0.75);',
                marginTop: '20px'
              }}
              item
              md={12}
            >
              <Typography variant='h4' style={{ textAlign: 'center' }}>
                Order Items
              </Typography>
              <Box>
                {currentOrder?.OrderItems && currentOrder?.OrderItems.length > 0
                  ? currentOrder?.OrderItems.map((val, index) => (
                      <Box
                        style={{
                          backgroundColor: '#E4E4E4',
                          margin: '10px 0px',
                          padding: '10px',
                          borderRadius: '20px'
                        }}
                        key={index}
                      >
                        <Grid
                          style={{ display: 'flex', justifyContent: 'space-between', margin: '10px 0px' }}
                          item
                          md={12}
                        >
                          <Typography variant='h6'>Order ID</Typography>
                          <Typography variant='h6'>{val?.order_id}</Typography>
                        </Grid>
                        <Grid
                          style={{ display: 'flex', justifyContent: 'space-between', margin: '10px 0px' }}
                          item
                          md={12}
                        >
                          <Typography variant='h6'>Product ID</Typography>
                          <Typography variant='h6'>{val?.product_id}</Typography>
                        </Grid>
                        <Grid
                          style={{ display: 'flex', justifyContent: 'space-between', margin: '10px 0px' }}
                          item
                          md={12}
                        >
                          <Typography variant='h6'>Quantity Purchased</Typography>
                          <Typography variant='h6'>{val?.quantity}</Typography>
                        </Grid>
                        <Grid
                          style={{ display: 'flex', justifyContent: 'space-between', margin: '10px 0px' }}
                          item
                          md={12}
                        >
                          <Typography variant='h6'>Unit Price</Typography>
                          <Typography variant='h6'>{val?.unit_price}</Typography>
                        </Grid>
                      </Box>
                    ))
                  : null}
              </Box>
            </Grid>
          </Grid>
        ) : null}
      </CardContent>
    </Card>
  )
}

export default ViewOrder
