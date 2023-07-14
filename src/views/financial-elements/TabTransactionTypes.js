// ** MUI Imports
import Grid from '@mui/material/Grid'
import CardContent from '@mui/material/CardContent'
import TableBasic from 'src/custom-components/TableBasic'
import { useEffect, useState } from 'react'

import { getAllTransactionTypesRequest } from '../../store/reducers/journalReducer'

import { useDispatch, useSelector } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'

const TabAllFinancialElements = () => {
  // ** Redux States
  const { transactionTypes } = useSelector(state => state.journal)

  const [transactionTypesDataLocal, setTransactionTypesDataLocal] = useState(null)

  // ** State
  const dispatch = useDispatch()

  const getAllTransactionTypes = () => {
    try {
      dispatch(getAllTransactionTypesRequest())
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

  useEffect(() => {
    getAllTransactionTypes()
  }, [])

  useEffect(() => {
    if (transactionTypes) {
      setTransactionTypesDataLocal(transactionTypes)
    }
  }, [transactionTypes])

  return (
    <CardContent>
      <form>
        <Grid container spacing={7}>
          <Grid item md={12} xs={12} sx={{ marginTop: 4.8, marginBottom: 3 }}>
            <TableBasic
              columns={['Transaction Type ID', 'Transaction Type']}
              rows={transactionTypesDataLocal && transactionTypesDataLocal.length > 0 ? transactionTypesDataLocal : []}
            />
          </Grid>
        </Grid>
      </form>
    </CardContent>
  )
}

export default TabAllFinancialElements
