// ** React Imports

// ** MUI Imports
import Grid from '@mui/material/Grid'
import CardContent from '@mui/material/CardContent'
import TableCustom from 'src/custom-components/TableCustom'

const TabAllSales = ({ sales }) => {
  // ** State

  return (
    <CardContent>
      <form>
        <Grid container spacing={7}>
          <Grid item md={12} xs={12} sx={{ marginTop: 4.8, marginBottom: 3 }}>
            <TableCustom
              rows={sales && sales.length > 0 ? sales : []}
              columns={[
                {
                  id: 'id',
                  label: 'Sales ID'
                },
                {
                  id: 'order_id',
                  label: 'Order ID'
                },
                {
                  id: 'product_id',
                  label: 'Product ID'
                },
                {
                  id: 'quantity_sold',
                  label: 'Quantity Sold'
                },
                {
                  id: 'unit_cost',
                  label: 'Unit Cost ($)'
                },
                {
                  id: 'unit_price',
                  label: 'Unit Price ($)'
                },
                {
                  id: 'date',
                  label: 'Date Of Sale'
                }
              ]}
            />
          </Grid>
        </Grid>
      </form>
    </CardContent>
  )
}

export default TabAllSales
