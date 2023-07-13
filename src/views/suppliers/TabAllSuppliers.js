// ** React Imports

// ** MUI Imports
import Grid from '@mui/material/Grid'
import CardContent from '@mui/material/CardContent'
import TableCustom from 'src/custom-components/TableCustom'

const TabAllSuppliers = ({ suppliers }) => {
  // ** State

  return (
    <CardContent>
      <form>
        <Grid container spacing={7}>
          <Grid item md={12} xs={12} sx={{ marginTop: 4.8, marginBottom: 3 }}>
            <TableCustom
              rows={
                suppliers && suppliers.length > 0
                  ? suppliers.map((val, index) => ({ id: val?.id, customerName: val.supplier_name }))
                  : []
              }
              columns={[
                {
                  id: 'id',
                  label: 'Supplier ID'
                },
                {
                  id: 'customerName',
                  label: 'Supplier Name'
                }
              ]}
            />
          </Grid>
        </Grid>
      </form>
    </CardContent>
  )
}

export default TabAllSuppliers
