// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'

import { useDispatch, useSelector } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'
import { getAllJournalEntriesRequest } from '../../store/reducers/journalReducer'

import TableCustom from 'src/custom-components/TableCustom'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import { Typography } from '@mui/material'

const TabAllLedgerAccounts = () => {
  // ** State

  const { allJournalEntries } = useSelector(state => state.journal)

  const [journalDataLocal, setJournalDataLocal] = useState(null)

  const dispatch = useDispatch()

  const getAllJournalEntries = () => {
    try {
      dispatch(getAllJournalEntriesRequest())
        .then(unwrapResult)
        .then(res => {
          console.log('Response at getAllJournalEntries', res)
        })
        .catch(err => {
          console.log('Error at getAllJournalEntries', err)
        })
    } catch (err) {
      console.log('Error at getAllJournalEntries', err)
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

  const formatLedger = () => {
    if (journalDataLocal && journalDataLocal.length > 0) {
      const ledgerObject = journalDataLocal.reduce((acc, entry) => {
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

  return (
    <CardContent>
      <form>
        <Grid container spacing={7}>
          <Grid item md={12} xs={12}>
            <Ledger ledger={formatLedger()} />
          </Grid>
        </Grid>
      </form>
    </CardContent>
  )
}

const Ledger = ({ ledger }) => {
  return (
    <div>
      {Object.keys(ledger).map(accountTitle => (
        <div
          style={{ margin: '70px 0px', border: '1px solid rgba(58, 53, 65, 0.12)', padding: '20px' }}
          key={accountTitle}
        >
          <Typography style={{ textAlign: 'center' }} variant='h4'>
            {accountTitle}
          </Typography>
          <LedgerTable accountEntries={ledger[accountTitle]} />
        </div>
      ))}
    </div>
  )
}

const LedgerTable = ({ accountEntries }) => {
  const handleLedgerBalance = () => {
    const allDebitEntries = accountEntries.filter(val => val.transaction_type_id == 1)
    const allCreditEntries = accountEntries.filter(val => val.transaction_type_id == 2)

    const debitSum = allDebitEntries.reduce((accumulator, entry) => {
      return accumulator + entry.amount
    }, 0)

    const creditSum = allCreditEntries.reduce((accumulator, entry) => {
      return accumulator + entry.amount
    }, 0)

    const balance = debitSum - creditSum

    return `$ ${balance > 0 ? balance : Math.abs(balance)} ${balance > 0 ? 'DR' : 'CR'}`
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Debit ($)</TableCell>
            <TableCell>Credit ($)</TableCell>
            <TableCell>Balance ($)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {accountEntries.map((entry, index) => (
            <TableRow key={entry.id}>
              <TableCell>{entry.date_of_transaction}</TableCell>
              <TableCell>{entry.transaction_type_id == 1 ? entry.amount : null}</TableCell>
              <TableCell>{entry.transaction_type_id == 2 ? entry.amount : null}</TableCell>
              {/* <TableCell></TableCell> */}
            </TableRow>
          ))}
          <TableRow>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell style={{ fontWeight: 'bolder', fontSize: '20px' }}>{handleLedgerBalance()}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default TabAllLedgerAccounts
