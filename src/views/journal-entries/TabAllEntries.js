// ** React Imports

// ** MUI Imports
import Grid from '@mui/material/Grid'
import CardContent from '@mui/material/CardContent'
import TableCustom from 'src/custom-components/TableCustom'
import AppConstants from '../../configs/appConstants'

const TabAllEntries = ({ journalEntries }) => {
  const handleIDs = (id, arr) => {
    if (id && arr) {
      const elem = arr.find(val => val.id == id)
      return elem.label
    }
  }

  // ** State

  return (
    <CardContent>
      <form>
        <Grid container spacing={7}>
          <Grid item md={12} xs={12} sx={{ marginTop: 4.8, marginBottom: 3 }}>
            <TableCustom
              rows={
                journalEntries && journalEntries.length > 0
                  ? journalEntries.map((val, index) => ({
                      ...val,
                      financialElementType: handleIDs(
                        val?.financial_element_type_id,
                        AppConstants.financialElementType
                      ),
                      transactionType: handleIDs(val?.transaction_type_id, AppConstants.transactionTypes)
                    }))
                  : []
              }
              columns={[
                {
                  id: 'id',
                  label: 'ID'
                },
                {
                  id: 'account_title',
                  label: 'Account Title'
                },
                {
                  id: 'financialElementType',
                  label: 'Financial Element Type'
                },
                {
                  id: 'transactionType',
                  label: 'Transaction Type'
                },
                {
                  id: 'amount',
                  label: 'Amount ($)'
                }
              ]}
            />
          </Grid>
        </Grid>
      </form>
    </CardContent>
  )
}

export default TabAllEntries
