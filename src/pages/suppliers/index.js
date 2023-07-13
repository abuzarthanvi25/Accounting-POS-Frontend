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

// ** Demo Tabs Imports
import TabAllSuppliers from 'src/views/suppliers/TabAllSuppliers'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'

// ** Reducer Imports
import { getAllSuppliersRequest } from '../../store/reducers/supplierReducer'

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
  const { allSuppliers } = useSelector(state => state.suppliers)

  // ** State
  const [value, setValue] = useState('all-suppliers')
  const [supplierDataLocal, setSupplierDataLocal] = useState(null)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const dispatch = useDispatch()

  const getAllSuppliers = () => {
    try {
      dispatch(getAllSuppliersRequest())
        .then(unwrapResult)
        .then(res => {
          console.log('Response at getAllSuppliers', res)
        })
        .catch(err => {
          console.log('Error at getAllSuppliers', err)
        })
    } catch (err) {
      console.log('Error at getAllSuppliers', err)
    }
  }

  useEffect(() => {
    getAllSuppliers()
  }, [])

  useEffect(() => {
    if (allSuppliers) {
      setSupplierDataLocal(allSuppliers)
    }
  }, [allSuppliers])

  return (
    <Card>
      <TabContext value={value}>
        <TabList
          onChange={handleChange}
          aria-label='account-settings tabs'
          sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}` }}
        >
          <Tab
            value='all-suppliers'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <AccountOutline />
                <TabName>All Suppliers</TabName>
              </Box>
            }
          />
        </TabList>

        <TabPanel sx={{ p: 0 }} value='all-suppliers'>
          <TabAllSuppliers suppliers={supplierDataLocal} />
        </TabPanel>
      </TabContext>
    </Card>
  )
}

export default Customers
