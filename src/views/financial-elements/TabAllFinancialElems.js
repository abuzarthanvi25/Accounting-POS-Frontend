// ** MUI Imports
import Grid from '@mui/material/Grid'
import CardContent from '@mui/material/CardContent'
import TableBasic from 'src/custom-components/TableBasic'
import { useEffect, useState } from 'react'

import { getAllElemTypeRequest } from '../../store/reducers/journalReducer'

import { useDispatch, useSelector } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'

const TabAllFinancialElements = () => {
  // ** Redux States
  const { financialElemTypes } = useSelector(state => state.journal)

  const [financialElemTypesDataLocal, setFinancialElemTypesDataLocal] = useState(null)

  // ** State
  const dispatch = useDispatch()

  const getAllElemTypes = () => {
    try {
      dispatch(getAllElemTypeRequest())
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
    getAllElemTypes()
  }, [])

  useEffect(() => {
    if (financialElemTypes) {
      setFinancialElemTypesDataLocal(financialElemTypes)
    }
  }, [financialElemTypes])

  return (
    <CardContent>
      <form>
        <Grid container spacing={7}>
          <Grid item md={12} xs={12} sx={{ marginTop: 4.8, marginBottom: 3 }}>
            <TableBasic
              columns={['Financial Element Type ID', 'Financial Element Type']}
              rows={
                financialElemTypesDataLocal && financialElemTypesDataLocal.length > 0 ? financialElemTypesDataLocal : []
              }
            />
          </Grid>
        </Grid>
      </form>
    </CardContent>
  )
}

export default TabAllFinancialElements
