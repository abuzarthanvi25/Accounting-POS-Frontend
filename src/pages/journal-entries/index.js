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
import TabAddEntries from 'src/views/journal-entries/TabAddEntries'
import TabAllJournalEntries from 'src/views/journal-entries/TabAllEntries'

import { getAllJournalEntriesRequest, addJournalEntryRequest } from '../../store/reducers/journalReducer'

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

const Products = () => {
  // ** Redux States
  const { allJournalEntries } = useSelector(state => state.journal)

  // ** State
  const [value, setValue] = useState('add-entries')
  const [loading, setLoading] = useState(false)
  const [journalDataLocal, setJournalDataLocal] = useState(null)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const dispatch = useDispatch()

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

  const addJournalEntry = (payload, afterRun) => {
    try {
      setLoading(true)
      dispatch(addJournalEntryRequest(payload))
        .then(unwrapResult)
        .then(res => {
          getAllJournalEntries()
          afterRun && typeof afterRun == 'function' ? afterRun() : null
          setLoading(false)
          console.log('Response at addJournalEntry', res)
        })
        .catch(err => {
          setLoading(false)
          console.log('Error at addJournalEntry', err)
        })
    } catch (err) {
      setLoading(false)
      console.log('Error at getData', err)
    }
  }

  useEffect(() => {
    getAllJournalEntries()
  }, [])

  useEffect(() => {
    if (allJournalEntries) {
      setJournalDataLocal(allJournalEntries)
    }
  }, [allJournalEntries])

  return (
    <Card>
      <TabContext value={value}>
        <TabList
          onChange={handleChange}
          aria-label='account-settings tabs'
          sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}` }}
        >
          <Tab
            value='add-entries'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <AccountOutline />
                <TabName>Add Journal Entries</TabName>
              </Box>
            }
          />
          <Tab
            value='view-entries'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <AccountOutline />
                <TabName>View All Journal Entries</TabName>
              </Box>
            }
          />
        </TabList>

        <TabPanel sx={{ p: 0 }} value='add-entries'>
          <TabAddEntries addJournalEntry={addJournalEntry} loading={loading} />
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value='view-entries'>
          <TabAllJournalEntries journalEntries={journalDataLocal} />
        </TabPanel>
      </TabContext>
    </Card>
  )
}

export default Products
