// ** React Imports

// ** MUI Imports
import Grid from '@mui/material/Grid'
import CardContent from '@mui/material/CardContent'
import TableCollapsible from 'src/custom-components/TableCollapsable'

const TabAllInvoices = ({ invoices }) => {
  // ** State

  return (
    <CardContent>
      <form>
        <Grid container spacing={7}>
          <Grid item md={12} xs={12} sx={{ marginTop: 4.8, marginBottom: 3 }}>
            {/* <TableCustom
              rows={invoices && invoices.length > 0 ? invoices : []}
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
            /> */}
            <TableCollapsible
              rows={invoices && invoices.length > 0 ? invoices : []}
              columns={[
                {
                  key: 'id',
                  label: 'Invoice ID'
                },
                {
                  key: 'customer_id',
                  label: 'Customer ID'
                },
                {
                  key: 'sub_total',
                  label: 'Sub Total'
                },
                {
                  key: 'order_date',
                  label: 'Invoice Date'
                }
              ]}
              nestedRowKey={'OrderItems'}
              nestedColumnHeading={'Order Items'}
              nestedColumns={[
                {
                  key: 'id',
                  label: 'Order Item ID'
                },
                {
                  key: 'order_id',
                  label: 'Order ID'
                },
                {
                  key: 'product_id',
                  label: 'Product ID'
                },
                {
                  key: 'quantity',
                  label: 'Quantity'
                },
                {
                  key: 'unit_price',
                  label: 'Unit Price ($)'
                }
              ]}
            />
          </Grid>
        </Grid>
      </form>
    </CardContent>
  )
}

export default TabAllInvoices
