// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import CardContent from '@mui/material/CardContent'
import TableBasic from 'src/custom-components/TableBasic'

const TabAllCustomers = ({ customers }) => {
  // ** State

  return (
    <CardContent>
      <form>
        <Grid container spacing={7}>
          <Grid item md={12} xs={12} sx={{ marginTop: 4.8, marginBottom: 3 }}>
            <TableBasic
              columns={['#', 'Customer Name']}
              rows={
                customers && customers.length > 0
                  ? customers.map((val, index) => ({ id: index + 1, customerName: val.customer_name }))
                  : []
              }
            />
          </Grid>
        </Grid>
      </form>
    </CardContent>
  )
}

export default TabAllCustomers
