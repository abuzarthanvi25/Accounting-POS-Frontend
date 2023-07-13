// ** React Imports

// ** MUI Imports
import Grid from '@mui/material/Grid'
import CardContent from '@mui/material/CardContent'
import { Box, Button, Typography } from '@mui/material'
import DatePicker from 'react-multi-date-picker'
import InputLabel from '@mui/material/InputLabel'
import AppConstants from '../../configs/appConstants'
import moment from 'moment'
import { useEffect, useState } from 'react'

// ** Reducer Imports
import { getStatementOfOwnersEquityRequest } from '../../store/reducers/journalReducer'

import { useDispatch, useSelector } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'

const TabIncomeStatement = () => {
  // ** Redux States
  const { allOwnersEquityEntries } = useSelector(state => state.journal)

  const [ownersEquityDataLocal, setOwnersEquityDataLocal] = useState(null)
  const [loading, setLoading] = useState(false)

  const [model, setModel] = useState({
    date_of_transaction: null
  })

  // ** State

  const dispatch = useDispatch()

  const generateStatementOfOwnersEquity = () => {
    setLoading(true)
    try {
      if (model.date_of_transaction) {
        dispatch(getStatementOfOwnersEquityRequest({ date_of_transaction: model.date_of_transaction }))
          .then(unwrapResult)
          .then(res => {
            setLoading(false)
            console.log('Response at balanceSheetDataLocal', res)
          })
          .catch(err => {
            setLoading(false)
            console.log('Error at balanceSheetDataLocal', err)
          })
      }
    } catch (err) {
      setLoading(false)
      console.log('Error at balanceSheetDataLocal', err)
    }
  }

  useEffect(() => {
    if (allOwnersEquityEntries) {
      setOwnersEquityDataLocal(allOwnersEquityEntries)
    }
  }, [allOwnersEquityEntries])

  const rebuildData = () => {
    if (ownersEquityDataLocal?.capitalAndDrawingEntries) {
      const groups = ownersEquityDataLocal.capitalAndDrawingEntries.reduce(
        (accumulator, entry) => {
          if (entry.financial_element_type_id == 5) {
            accumulator?.Capital.push(entry)
          } else if (entry.financial_element_type_id == 6) {
            accumulator?.Drawings.push(entry)
          }
          return accumulator
        },
        {
          Capital: [],
          Drawings: []
        }
      )
      return groups
    }
  }

  const handleSum = entries => {
    if (entries) {
      const subTotal = entries.reduce((accumulator, entry) => {
        return accumulator + entry.amount
      }, 0)
      return subTotal
    } else {
      return 0
    }
  }

  return (
    <CardContent>
      <form>
        <Grid container spacing={7}>
          <Grid item md={12}>
            <Typography variant='h4'>
              Statement Of Owner's Equity {model.date_of_transaction ? `upto ${model.date_of_transaction}` : null}
            </Typography>
          </Grid>
          <Grid item md={12} xs={12} sm={6}>
            <InputLabel style={{ fontSize: '20px' }}>Select date</InputLabel>
            <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
              <DatePicker
                style={{ padding: '20px', fontSize: '20px', width: '450px' }}
                onChange={e => setModel({ ...model, date_of_transaction: e.format(AppConstants.dateFormat) })}
                format={AppConstants.dateFormat}
                editable={false}
                calendarPosition='bottom-left'
              />
              <Button disabled={loading} onClick={generateStatementOfOwnersEquity} variant='contained' color='success'>
                Generate Statement Of Owner's Equity
              </Button>
            </Box>
          </Grid>

          <Grid style={{ padding: '20px 40px' }} item md={12}>
            <Box style={{ display: 'flex', justifyContent: 'space-between', margin: '10px 0px' }}>
              <Typography variant='h6'></Typography>
              <Typography variant='h6'>$</Typography>
            </Box>
            <Box style={{ display: 'flex', justifyContent: 'space-between', margin: '10px 0px' }}>
              <Typography variant='h6'>Point Of Sale Capital at the start of the year</Typography>
              <Typography variant='h6'>{rebuildData()?.Capital[0]?.amount}</Typography>
            </Box>
            <Box style={{ display: 'flex', justifyContent: 'space-between', margin: '10px 0px' }}>
              <Typography variant='h6'>
                {`${ownersEquityDataLocal?.netIncome?.incomeStatus == 'Profit' ? 'Add' : 'Deduct'} `} Net Income
              </Typography>
              <Typography variant='h6'>{ownersEquityDataLocal?.netIncome?.netIncome}</Typography>
            </Box>
            <Box style={{ display: 'flex', justifyContent: 'space-between', margin: '10px 0px' }}>
              <Typography variant='h6'></Typography>
              <Typography style={{ borderTop: '2px solid #202020' }} variant='h6'>
                {rebuildData()?.Capital[0]?.amount + ownersEquityDataLocal?.netIncome?.netIncome}
              </Typography>
            </Box>
            <Box style={{ display: 'flex', justifyContent: 'space-between', margin: '10px 0px' }}>
              <Typography variant='h6'>Less Drawings</Typography>
              <Typography variant='h6'>{handleSum(rebuildData()?.Drawings)}</Typography>
            </Box>
            <Box style={{ display: 'flex', justifyContent: 'space-between', margin: '10px 0px' }}>
              <Typography variant='h6'>Point Of Sale Capital at the end of the Year</Typography>
              <Typography style={{ borderTop: '2px solid #202020', fontWeight: 'bold' }} variant='h6'>
                ${' '}
                {rebuildData()?.Capital[0]?.amount +
                  ownersEquityDataLocal?.netIncome?.netIncome -
                  handleSum(rebuildData()?.Drawings)}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </form>
    </CardContent>
  )
}

export default TabIncomeStatement
