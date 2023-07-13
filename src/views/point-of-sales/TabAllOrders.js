// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'

import { getAllOrdersRequest } from '../../store/reducers/ordersReducer'

import { useSelector } from 'react-redux'
import TableCustom from 'src/custom-components/TableCustom'
import { useRouter } from 'next/router'
import AppRoutes from '../../configs/appRoutes'

const TabAllOrders = ({ orders, dispatch, unwrapResult }) => {
  const router = useRouter()

  // ** State

  const { allOrders } = useSelector(state => state.orders)

  const getAllOrders = () => {
    try {
      dispatch(getAllOrdersRequest())
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
    getAllOrders()
  }, [])

  return (
    <CardContent>
      <form>
        <Grid container spacing={7}>
          <Grid item md={12} xs={12} sx={{ marginTop: 4.8, marginBottom: 3 }}>
            <TableCustom
              columns={[
                {
                  id: 'id',
                  label: '#'
                },
                {
                  id: 'customerId',
                  label: 'Customer ID'
                },
                {
                  id: 'subTotal',
                  label: 'SubTotal'
                },
                {
                  id: 'orderDate',
                  label: 'Order Date'
                },
                {
                  id: 'action',
                  label: 'Action'
                }
              ]}
              rows={
                allOrders && allOrders.length > 0
                  ? allOrders.map((val, index) => ({
                      id: index + 1,
                      customerId: val?.customer_id,
                      subTotal: val?.sub_total,
                      orderDate: val?.order_date,
                      action: () => (
                        <Button
                          onClick={() => router.push(`${AppRoutes.viewOrder}/${val?.id}`)}
                          style={{ color: 'white' }}
                          variant='contained'
                          color='info'
                        >
                          View
                        </Button>
                      )
                    }))
                  : []
              }
            />
          </Grid>
        </Grid>
      </form>
    </CardContent>
  )
}

export default TabAllOrders
