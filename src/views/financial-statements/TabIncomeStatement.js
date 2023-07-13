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
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'

// ** Reducer Imports
import { getIncomeStatementRequest } from '../../store/reducers/journalReducer'

import { useDispatch, useSelector } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'

const TabIncomeStatement = () => {
  // ** Redux States
  const { allIncomeStatementEntries } = useSelector(state => state.journal)

  const [incomeStatementLocal, setIncomeStatementLocal] = useState({
    revenueAndExpenseEntries: [],
    netIncome: {}
  })
  const [loading, setLoading] = useState(false)

  const [model, setModel] = useState({
    date_of_transaction: null
  })

  // ** State

  const dispatch = useDispatch()

  const generateIncomeStatement = () => {
    setLoading(true)
    try {
      if (model.date_of_transaction) {
        dispatch(getIncomeStatementRequest({ date_of_transaction: model.date_of_transaction }))
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
    if (allIncomeStatementEntries) {
      setIncomeStatementLocal(allIncomeStatementEntries)
    }
  }, [allIncomeStatementEntries])

  const rebuildData = () => {
    if (incomeStatementLocal?.revenueAndExpenseEntries) {
      const groups = incomeStatementLocal.revenueAndExpenseEntries.reduce(
        (accumulator, entry) => {
          if (entry.financial_element_type_id == 4) {
            accumulator?.Revenues.push(entry)
          } else if (entry.financial_element_type_id == 2) {
            accumulator?.Expenses.push(entry)
          }
          return accumulator
        },
        {
          Revenues: [],
          Expenses: []
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
              Income Statement {model.date_of_transaction ? `upto ${model.date_of_transaction}` : null}
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
              <Button disabled={loading} onClick={generateIncomeStatement} variant='contained' color='success'>
                Generate Income Statement
              </Button>
            </Box>
          </Grid>

          <Grid item md={12}>
            <TableContainer sx={{ maxHeight: 'auto' }}>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell style={{ fontWeight: 'bolder' }}>Account Type</TableCell>
                    <TableCell style={{ fontWeight: 'bolder' }}>Debit ($)</TableCell>
                    <TableCell style={{ fontWeight: 'bolder' }}>Credit ($)</TableCell>
                  </TableRow>
                  <TableHead>
                    <TableCell>Revenue</TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                  </TableHead>
                  {rebuildData() && rebuildData()?.Revenues?.length > 0
                    ? rebuildData()?.Revenues?.map((entry, index) => {
                        return (
                          <TableRow key={index}>
                            <TableCell>{entry?.account_title}</TableCell>
                            <TableCell></TableCell>
                            <TableCell>{entry?.amount}</TableCell>
                          </TableRow>
                        )
                      })
                    : null}
                  <TableHead>
                    <TableCell>Expense</TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                  </TableHead>
                  {rebuildData() && rebuildData()?.Expenses?.length > 0
                    ? rebuildData()?.Expenses?.map((entry, index) => {
                        return (
                          <TableRow key={index}>
                            <TableCell>{entry?.account_title}</TableCell>
                            <TableCell>{entry?.amount}</TableCell>
                            <TableCell></TableCell>
                          </TableRow>
                        )
                      })
                    : null}
                  <TableRow>
                    <TableCell
                      style={{ fontSize: '18px', borderTop: '2px solid #202020', borderBottom: '2px solid #202020' }}
                    ></TableCell>
                    <TableCell
                      style={{ fontSize: '18px', borderTop: '2px solid #202020', borderBottom: '2px solid #202020' }}
                    >
                      $ {handleSum(rebuildData()?.Expenses)}
                    </TableCell>
                    <TableCell
                      style={{ fontSize: '18px', borderTop: '2px solid #202020', borderBottom: '2px solid #202020' }}
                    >
                      $ {handleSum(rebuildData()?.Revenues)}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ fontSize: '18px', fontWeight: 'bold' }}>Net Income</TableCell>
                    <TableCell></TableCell>
                    <TableCell style={{ fontSize: '18px', fontWeight: 'bold' }}>
                      $ {incomeStatementLocal?.netIncome?.netIncome} ({incomeStatementLocal?.netIncome?.incomeStatus})
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </form>
    </CardContent>
  )
}

export default TabIncomeStatement
