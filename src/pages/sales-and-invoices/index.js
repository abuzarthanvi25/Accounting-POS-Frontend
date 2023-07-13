// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import { styled } from '@mui/material/styles'
import MuiTab from '@mui/material/Tab'

// ** Icons Imports
import AccountOutline from 'mdi-material-ui/AccountOutline'
import LockOpenOutline from 'mdi-material-ui/LockOpenOutline'

// ** Demo Tabs Imports
import TabAllSales from 'src/views/sales-and-invoices/TabAllSales'
import TabAllInvoices from 'src/views/sales-and-invoices/TabAllInvoices'

import { getAllSalesRequest } from '../../store/reducers/salesReducer'
import { getAllInvoicesRequest } from '../../store/reducers/InvoiceReducer'

import { useDispatch, useSelector } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'

const Tab = styled(MuiTab)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    minWidth: 100
  },
  [theme.breakpoints.down('sm')]: {
    minWidth: 67
  }
}))

const TabName = styled('span')(({ theme }) => ({
  lineHeight: 1.71,
  fontSize: '0.875rem',
  marginLeft: theme.spacing(2.4),
  [theme.breakpoints.down('md')]: {
    display: 'none'
  }
}))

const SalesAndInvoices = () => {
  // ** Redux States
  const { allSales } = useSelector(state => state.sales)
  const { allInvoices } = useSelector(state => state.invoices)

  // ** State
  const [value, setValue] = useState('all-sales')
  const [salesDataLocal, setSalesDataLocal] = useState(null)
  const [invoiceDataLocal, setInvoiceDataLocal] = useState(null)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const dispatch = useDispatch()

  const getAllSales = () => {
    try {
      dispatch(getAllSalesRequest())
        .then(unwrapResult)
        .then(res => {
          console.log('Response at getAllSales', res)
        })
        .catch(err => {
          console.log('Error at getAllSales', err)
        })
    } catch (err) {
      console.log('Error at getData', err)
    }
  }

  const getAllInvoices = () => {
    try {
      dispatch(getAllInvoicesRequest())
        .then(unwrapResult)
        .then(res => {
          console.log('Response at getAllSales', res)
        })
        .catch(err => {
          console.log('Error at getAllSales', err)
        })
    } catch (err) {
      console.log('Error at getData', err)
    }
  }

  useEffect(() => {
    getAllSales()
    getAllInvoices()
  }, [])

  useEffect(() => {
    if (allSales) {
      setSalesDataLocal(allSales)
    }
  }, [allSales])

  useEffect(() => {
    if (allInvoices) {
      setInvoiceDataLocal(allInvoices)
    }
  }, [allInvoices])

  return (
    <Card>
      <TabContext value={value}>
        <TabList
          onChange={handleChange}
          aria-label='account-settings tabs'
          sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}` }}
        >
          <Tab
            value='all-sales'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <AccountOutline />
                <TabName>All Sales</TabName>
              </Box>
            }
          />
          <Tab
            value='manage-customers'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <LockOpenOutline />
                <TabName>All Invoices</TabName>
              </Box>
            }
          />
        </TabList>

        <TabPanel sx={{ p: 0 }} value='all-sales'>
          <TabAllSales sales={salesDataLocal} />
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value='manage-customers'>
          <TabAllInvoices invoices={invoiceDataLocal} />
        </TabPanel>
      </TabContext>
    </Card>
  )
}

export default SalesAndInvoices
