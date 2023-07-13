// ** React Imports
import { useState, Fragment } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import Collapse from '@mui/material/Collapse'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'

// ** Icons Imports
import ChevronUp from 'mdi-material-ui/ChevronUp'
import ChevronDown from 'mdi-material-ui/ChevronDown'

const Row = ({ row, columns, nestedColumns, nestedColumnHeading, nestedRowKey }) => {
  // ** State
  const [open, setOpen] = useState(false)

  return (
    <Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton aria-label='expand row' size='small' onClick={() => setOpen(!open)}>
            {open ? <ChevronUp /> : <ChevronDown />}
          </IconButton>
        </TableCell>
        {columns.map(column => (
          <TableCell key={column.key} component='th' scope='row'>
            {row[column.key]}
          </TableCell>
        ))}
      </TableRow>
      <TableRow>
        <TableCell colSpan={columns.length + 1} sx={{ py: '0 !important' }}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box sx={{ m: 2 }}>
              <Typography variant='h6' gutterBottom component='div'>
                {nestedColumnHeading ?? ''}
              </Typography>
              <Table size='small' aria-label='purchases'>
                <TableHead>
                  <TableRow>
                    {nestedColumns.map((nestedColumn, nestedIndex) => (
                      <TableCell key={nestedIndex}>{nestedColumn.key}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row[nestedRowKey] && row[nestedRowKey].length > 0 ? (
                    row[nestedRowKey].map((historyRow, index) => (
                      <TableRow key={index}>
                        {nestedColumns.map(column => (
                          <TableCell key={column.key} component='th' scope='row'>
                            {historyRow[column.key]}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  ) : (
                    <Box style={{ display: 'flex', justifyContent: 'center' }}>No {nestedColumnHeading}</Box>
                  )}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  )
}

const TableCollapsible = ({
  columns,
  rows,
  NoOfRowsPerPage,
  pageNumber,
  nestedColumnHeading,
  nestedRowKey,
  nestedColumns
}) => {
  // ** States
  const [page, setPage] = useState(pageNumber ?? 0)
  const [rowsPerPage, setRowsPerPage] = useState(NoOfRowsPerPage ?? 10)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }
  return (
    <TableContainer component={Paper}>
      <Table aria-label='collapsible table'>
        <TableHead>
          <TableRow>
            <TableCell />
            {columns.map(column => (
              <TableCell key={column.key}>{column.label}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => (
            <Row
              key={row.name}
              row={row}
              columns={columns}
              nestedColumns={nestedColumns}
              nestedColumnHeading={nestedColumnHeading}
              nestedRowKey={nestedRowKey}
            />
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component='div'
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  )
}

export default TableCollapsible
