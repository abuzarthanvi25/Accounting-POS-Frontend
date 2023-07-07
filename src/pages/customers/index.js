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
import TabAllCustomers from 'src/views/customers/TabAllCustomers'
import TabManageCustomers from 'src/views/customers/TabManageCustomers'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'

// ** Reducer Imports
import { getAllCustomersRequest } from '../../store/reducers/customerReducer'

import { useDispatch, useSelector } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'

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

const Customers = () => {
  // ** Redux States
  const { allCustomers } = useSelector(state => state.customers)

  // ** State
  const [value, setValue] = useState('all-customers')
  const [customersDataLocal, setCustomersDataLocal] = useState(null)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const dispatch = useDispatch()

  const getAllCustomers = () => {
    try {
      dispatch(getAllCustomersRequest())
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
    getAllCustomers()
  }, [])

  useEffect(() => {
    if (allCustomers) {
      setCustomersDataLocal(allCustomers)
    }
  }, [allCustomers])

  return (
    <Card>
      <TabContext value={value}>
        <TabList
          onChange={handleChange}
          aria-label='account-settings tabs'
          sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}` }}
        >
          <Tab
            value='all-customers'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <AccountOutline />
                <TabName>All Customers</TabName>
              </Box>
            }
          />
          <Tab
            value='manage-customers'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <LockOpenOutline />
                <TabName>Manage Customers</TabName>
              </Box>
            }
          />
        </TabList>

        <TabPanel sx={{ p: 0 }} value='all-customers'>
          <TabAllCustomers customers={customersDataLocal} />
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value='manage-customers'>
          <TabManageCustomers />
        </TabPanel>
      </TabContext>
    </Card>
  )
}

export default Customers
