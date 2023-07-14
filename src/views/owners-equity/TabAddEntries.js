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
import { getAllJournalEntriesRequest, addJournalEntryRequest } from '../../store/reducers/journalReducer'
import { useDispatch } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'
import { showToast } from '../../custom-components/Toast'

// ** Icons Imports
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'

const TabAddEntries = () => {
  // ** State
  const [error, setError] = useState(false)
  const [model, setModel] = useState({
    date_of_transaction: moment(new Date()).format(AppConstants.dateFormat),
    amount: ''
  })
  const [loading, setLoading] = useState(false)

  const dispatch = useDispatch()

  const addJournalEntry = payload => {
    try {
      setLoading(true)
      dispatch(addJournalEntryRequest(payload))
        .then(unwrapResult)
        .then(res => {
          getAllJournalEntries()
          setLoading(false)
          console.log('Response at addJournalEntry', res)
        })
        .catch(err => {
          setLoading(false)
          showToast('Error Adding journal entries for the investment', 'error')
          console.log('Error at addJournalEntry', err)
        })
    } catch (err) {
      setLoading(false)
      console.log('Error at addJournalEntry', err)
    }
  }

  const getAllJournalEntries = () => {
    try {
      dispatch(getAllJournalEntriesRequest())
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

  return (
    <CardContent>
      <form
        onSubmit={e => {
          e.preventDefault()
          setError(false)
          console.log(model)

          if (!model.amount || !model.date_of_transaction) {
            setError(true)
            return
          } else {
            // API CALL HERE
            addJournalEntry({ ...model, financial_element_type_id: 1, transaction_type_id: 1, account_title: 'Cash' })
            addJournalEntry({
              ...model,
              financial_element_type_id: 5,
              transaction_type_id: 2,
              account_title: 'Capital'
            })
            showToast(`$ ${model.amount} invested in Point Of Sale business successfully`)
            setModel({ ...model, amount: '', date_of_transaction: null })
          }
        }}
      >
        <Grid container spacing={8}>
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
              value={model.amount}
              onChange={e => setModel({ ...model, amount: e.target.value })}
              type='number'
              fullWidth
              label='Amount'
              placeholder='Amount'
            />
          </Grid>

          <Grid style={{ display: 'flex', justifyContent: 'center' }} item md={6} xs={12} sm={6}>
            <Button disabled={loading} type='submit' variant='contained' color='success' sx={{ marginRight: 4.5 }}>
              Invest
            </Button>
          </Grid>
        </Grid>
      </form>
    </CardContent>
  )
}

export default TabAddEntries
