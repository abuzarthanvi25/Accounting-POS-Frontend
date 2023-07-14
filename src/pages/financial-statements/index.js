// ** React Imports
import { useState } from 'react'

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
import TabBalanceSheet from 'src/views/financial-statements/TabBalanceSheet'
import TabIncomeStatement from 'src/views/financial-statements/TabIncomeStatement'
import TabOwnersEquity from 'src/views/financial-statements/TabOwnersEquity'

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

const Products = () => {
  // ** State
  const [value, setValue] = useState('balance-sheet')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <Card>
      <TabContext value={value}>
        <TabList
          onChange={handleChange}
          aria-label='account-settings tabs'
          sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}` }}
        >
          <Tab
            value='balance-sheet'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <AccountOutline />
                <TabName>Balance Sheet</TabName>
              </Box>
            }
          />
          <Tab
            value='income-statement'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <AccountOutline />
                <TabName>Income Statement</TabName>
              </Box>
            }
          />
          <Tab
            value='statement-of-owners-equity'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <AccountOutline />
                <TabName>Statement Of Owner's Equity</TabName>
              </Box>
            }
          />
        </TabList>

        <TabPanel sx={{ p: 0 }} value='balance-sheet'>
          <TabBalanceSheet />
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value='income-statement'>
          <TabIncomeStatement />
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value='statement-of-owners-equity'>
          <TabOwnersEquity />
        </TabPanel>
      </TabContext>
    </Card>
  )
}

export default Products
