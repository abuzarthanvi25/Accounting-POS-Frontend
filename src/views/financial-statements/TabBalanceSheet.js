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
import { getBalanceSheetRequest } from '../../store/reducers/journalReducer'

import { useDispatch, useSelector } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'

const TabBalanceSheet = () => {
  // ** Redux States
  const { allBalanceSheetEntries } = useSelector(state => state.journal)

  const [balanceSheetDataLocal, setBalanceSheetDataLocal] = useState(null)
  const [loading, setLoading] = useState(false)

  const [model, setModel] = useState({
    date_of_transaction: null
  })

  // ** State

  const dispatch = useDispatch()

  const generateBalanceSheet = () => {
    setLoading(true)
    try {
      if (model.date_of_transaction) {
        dispatch(getBalanceSheetRequest({ date_of_transaction: model.date_of_transaction }))
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
    if (allBalanceSheetEntries) {
      setBalanceSheetDataLocal(allBalanceSheetEntries)
    }
  }, [allBalanceSheetEntries])

  const rebuildData = () => {
    if (allBalanceSheetEntries && allBalanceSheetEntries.length > 0) {
      const formattedData = allBalanceSheetEntries.reduce(
        (accumulator, entry) => {
          if (entry?.financial_element_type_id == 1) {
            accumulator.Assets.push(entry)
          } else if (entry?.financial_element_type_id == 3) {
            accumulator.Liabilities.push(entry)
          } else if (entry?.financial_element_type_id == 5) {
            accumulator.Capital.push(entry)
          }

          return accumulator
        },
        {
          Assets: [],
          Liabilities: [],
          Capital: []
        }
      )

      return formattedData
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

  const handleBalance = accountEntries => {
    const allDebitEntries = accountEntries.filter(val => val.transaction_type_id == 1)
    const allCreditEntries = accountEntries.filter(val => val.transaction_type_id == 2)

    const debitSum = allDebitEntries.reduce((accumulator, entry) => {
      return accumulator + entry.amount
    }, 0)

    const creditSum = allCreditEntries.reduce((accumulator, entry) => {
      return accumulator + entry.amount
    }, 0)

    const balance = debitSum - creditSum

    return { balance, status: balance > 0 ? 1 : 2 }
  }

  const formatLedger = () => {
    if (allBalanceSheetEntries && allBalanceSheetEntries.length > 0) {
      const ledgerObject = allBalanceSheetEntries.reduce((acc, entry) => {
        const { account_title } = entry
        if (!acc[account_title]) {
          acc[account_title] = []
        }
        acc[account_title].push(entry)
        return acc
      }, {})

      return ledgerObject
    } else {
      return {}
    }
  }

  const singularize = () => {
    const a = []
    const l = []
    const c = []
    Object.keys(formatLedger()).map(key => {
      const obj = { ...formatLedger()[key][0], amount: Math.abs(handleBalance(formatLedger()[key]).balance) }
      if (obj.financial_element_type_id == 1) {
        a.push(obj)
      } else if (obj.financial_element_type_id == 3) {
        l.push(obj)
      } else if (obj.financial_element_type_id == 5) {
        c.push(obj)
      }
    })
    return {
      Assets: a,
      Capital: c,
      Liabilities: l
    }
  }

  return (
    <CardContent>
      <form>
        <Grid container spacing={7}>
          <Grid item md={12}>
            <Typography variant='h4'>
              Balance Sheet {model.date_of_transaction ? `upto ${model.date_of_transaction}` : null}
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
              <Button disabled={loading} onClick={generateBalanceSheet} variant='contained' color='success'>
                Generate Balance Sheet
              </Button>
            </Box>
          </Grid>

          {allBalanceSheetEntries && allBalanceSheetEntries.length > 0 ? (
            <>
              <Grid item md={6}>
                <Box>
                  <Typography style={{ borderBottom: '4px solid #202020', margin: '10px 0px' }} variant='h4'>
                    Assets
                  </Typography>
                  {singularize()?.Assets && singularize()?.Assets.length > 0 ? (
                    singularize()?.Assets.map((asset, index) => {
                      return (
                        <Box
                          style={{ display: 'flex', justifyContent: 'space-between', margin: '10px 0px' }}
                          key={index}
                        >
                          <Typography variant='body3' style={{ fontSize: '18px' }}>
                            {asset.account_title}
                          </Typography>
                          <Typography variant='body3' style={{ fontSize: '18px' }}>
                            $ {asset.amount}
                          </Typography>
                        </Box>
                      )
                    })
                  ) : (
                    <Box style={{ display: 'flex', justifyContent: 'center', margin: '10px 0px' }}>
                      <Typography variant='body3' style={{ fontSize: '18px', margin: '30px 0px' }}>
                        NO ASSETS YET
                      </Typography>
                    </Box>
                  )}
                  {singularize()?.Assets ? (
                    <Box
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        margin: '10px 0px',
                        borderTop: '2px solid #202020',
                        borderBottom: '2px solid #202020',
                        alignItems: 'center'
                      }}
                    >
                      <Typography variant='body3' style={{ fontSize: '18px', padding: '10px 0px' }}>
                        Total Current Assets
                      </Typography>
                      <Typography variant='body3' style={{ fontSize: '18px', fontWeight: 'bold' }}>
                        $ {handleSum(singularize()?.Assets)}
                      </Typography>
                    </Box>
                  ) : null}
                </Box>
              </Grid>

              <Grid item md={6}>
                <Box>
                  <Typography style={{ borderBottom: '4px solid #202020', margin: '10px 0px' }} variant='h4'>
                    Liabilities
                  </Typography>
                  {singularize()?.Liabilities && singularize()?.Liabilities.length > 0 ? (
                    singularize()?.Liabilities.map((asset, index) => {
                      return (
                        <Box
                          style={{ display: 'flex', justifyContent: 'space-between', margin: '10px 0px' }}
                          key={index}
                        >
                          <Typography variant='body3' style={{ fontSize: '18px' }}>
                            {asset.account_title}
                          </Typography>
                          <Typography variant='body3' style={{ fontSize: '18px' }}>
                            $ {asset.amount}
                          </Typography>
                        </Box>
                      )
                    })
                  ) : (
                    <Box style={{ display: 'flex', justifyContent: 'center', margin: '10px 0px' }}>
                      <Typography variant='body3' style={{ fontSize: '18px', margin: '30px 0px' }}>
                        NO LIABILITIES YET
                      </Typography>
                    </Box>
                  )}
                  {singularize()?.Liabilities ? (
                    <Box
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        margin: '10px 0px',
                        borderTop: '2px solid #202020',
                        borderBottom: '2px solid #202020',
                        alignItems: 'center'
                      }}
                    >
                      <Typography variant='body3' style={{ fontSize: '18px', padding: '10px 0px' }}>
                        Total Current Liabilities
                      </Typography>
                      <Typography variant='body3' style={{ fontSize: '18px', fontWeight: 'bold' }}>
                        $ {handleSum(singularize()?.Liabilities)}
                      </Typography>
                    </Box>
                  ) : null}
                </Box>

                <Box>
                  <Typography
                    style={{ borderBottom: '4px solid #202020', margin: '10px 0px', marginTop: '40px' }}
                    variant='h4'
                  >
                    Capital
                  </Typography>
                  {singularize()?.Capital && singularize()?.Capital.length > 0 ? (
                    singularize()?.Capital.map((asset, index) => {
                      return (
                        <Box
                          style={{ display: 'flex', justifyContent: 'space-between', margin: '10px 0px' }}
                          key={index}
                        >
                          <Typography variant='body3' style={{ fontSize: '18px' }}>
                            {asset.account_title}
                          </Typography>
                          <Typography variant='body3' style={{ fontSize: '18px' }}>
                            $ {asset.amount}
                          </Typography>
                        </Box>
                      )
                    })
                  ) : (
                    <Box style={{ display: 'flex', justifyContent: 'center', margin: '10px 0px' }}>
                      <Typography variant='body3' style={{ fontSize: '18px', margin: '30px 0px' }}>
                        NO CAPITAL YET
                      </Typography>
                    </Box>
                  )}
                  {singularize()?.Capital ? (
                    <Box
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        margin: '10px 0px',
                        borderTop: '2px solid #202020',
                        borderBottom: '2px solid #202020',
                        alignItems: 'center'
                      }}
                    >
                      <Typography variant='body3' style={{ fontSize: '18px', padding: '10px 0px' }}>
                        Total Current Capital
                      </Typography>
                      <Typography variant='body3' style={{ fontSize: '18px', fontWeight: 'bold' }}>
                        $ {handleSum(singularize().Capital)}
                      </Typography>
                    </Box>
                  ) : null}
                </Box>
              </Grid>
            </>
          ) : null}
        </Grid>
      </form>
    </CardContent>
  )
}

export default TabBalanceSheet
