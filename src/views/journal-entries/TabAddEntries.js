// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import DatePicker from 'react-multi-date-picker'
import Button from '@mui/material/Button'
import AppConstants from '../../configs/appConstants'
import moment from 'moment'
import InputAdornment from '@mui/material/InputAdornment'
import { showSuccessToast } from '../../configs/appToast'

// ** Icons Imports
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'

const TabAddEntries = ({ addJournalEntry, loading }) => {
  // ** State
  const [error, setError] = useState(false)
  const [model, setModel] = useState({
    financial_element_type_id: 1,
    transaction_type_id: 1,
    date_of_transaction: null,
    account_title: null,
    amount: null
  })

  const resetModel = () => {
    setModel({
      financial_element_type_id: 1,
      transaction_type_id: 1,
      date_of_transaction: null,
      account_title: null,
      amount: null
    })
    setError(false)
  }

  return (
    <CardContent>
      <form
        onSubmit={e => {
          e.preventDefault()
          setError(false)
          console.log(model)
          if (
            !model.account_title ||
            !model.amount ||
            !model.date_of_transaction ||
            !model.financial_element_type_id ||
            !model.transaction_type_id
          ) {
            setError(true)
            return
          } else {
            // API CALL HERE
            addJournalEntry(model)
            showSuccessToast('Journal Entry Added Successfully')
            resetModel()
            console.log(model)
          }
        }}
      >
        <Grid container spacing={8}>
          <Grid item md={6} xs={12} sm={6}>
            <TextField
              error={error}
              helperText={error ? 'Incorrect entry.' : null}
              onChange={e => setModel({ ...model, account_title: e.target.value })}
              value={model.account_title}
              fullWidth
              label='Account Title'
              placeholder='Account Title'
            />
          </Grid>
          <Grid item md={3} xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Element Type</InputLabel>
              <Select
                error={error}
                helperText={error ? 'Incorrect entry.' : null}
                onChange={e => setModel({ ...model, financial_element_type_id: e.target.value })}
                label='Financial Element Types'
                value={model.financial_element_type_id}
              >
                {AppConstants.financialElementType.map(elem => (
                  <MenuItem key={elem.id} value={elem.id}>
                    {elem.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item md={3} xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Transaction Type</InputLabel>
              <Select
                error={error}
                helperText={error ? 'Incorrect entry.' : null}
                onChange={e => setModel({ ...model, transaction_type_id: e.target.value })}
                label='Transaction Types'
                value={model.transaction_type_id}
              >
                {AppConstants.transactionTypes.map(elem => (
                  <MenuItem key={elem.id} value={elem.id}>
                    {elem.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item md={6} xs={12} sm={6}>
            <InputLabel style={{ fontSize: '10px' }}>Date Of Transaction</InputLabel>
            <DatePicker
              onChange={e => setModel({ ...model, date_of_transaction: e.format(AppConstants.dateFormat) })}
              style={{ padding: '20px', fontSize: '20px', width: '450px' }}
              format={AppConstants.dateFormat}
              minDate={moment(new Date()).toDate()}
              editable={false}
              calendarPosition='bottom-left'
            />
          </Grid>
          <Grid item md={6} xs={12} sm={6}>
            <TextField
              error={error}
              helperText={error ? 'Incorrect entry.' : null}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <CurrencyUsd />
                  </InputAdornment>
                )
              }}
              onChange={e => setModel({ ...model, amount: e.target.value })}
              type='number'
              fullWidth
              label='Amount'
              placeholder='Amount'
            />
          </Grid>

          <Grid style={{ display: 'flex', justifyContent: 'center' }} item md={12} xs={12} sm={6}>
            <Button disabled={loading} type='submit' variant='contained' color='success' sx={{ marginRight: 3.5 }}>
              Add Journal Entry
            </Button>
          </Grid>
        </Grid>
      </form>
    </CardContent>
  )
}

export default TabAddEntries
