// ** MUI Imports
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'

const TableBasic = ({ columns, rows }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            {columns && columns.length > 0
              ? columns.map((col, index) => <TableCell key={index}>{col}</TableCell>)
              : null}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows &&
            rows.map((row, rowIndex) => (
              <TableRow
                key={rowIndex}
                sx={{
                  '&:last-of-type td, &:last-of-type th': {
                    border: 0
                  }
                }}
              >
                {Object.keys(row).map((key, cellIndex) => (
                  <TableCell key={cellIndex} component='th' scope='row'>
                    {row[key]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default TableBasic
