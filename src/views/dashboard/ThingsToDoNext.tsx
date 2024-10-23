// ** MUI Imports
import Card from '@mui/material/Card'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'

// ** Types Imports
import { CardHeader } from '@mui/material'

interface RowType {
  status: string
  data: string
  time: string
}

const rows: RowType[] = [
  {
    status: 'Approve',
    data: ' 2 new customers',
    time: '7m ago'
  },
  {
    status: 'Approve',
    data: ' 2 new customers',
    time: '7m ago'
  },
  {
    status: 'Approve',
    data: ' 2 new customers',
    time: '7m ago'
  },
  {
    status: 'Approve',
    data: ' 2 new customers',
    time: '7m ago'
  },
  {
    status: 'Approve',
    data: ' 2 new customers',
    time: '7m ago'
  },
  {
    status: 'Approve',
    data: ' 2 new customers',
    time: '7m ago'
  },
  {
    status: 'Approve',
    data: ' 2 new customers',
    time: '7m ago'
  }
]

const ThingsToDoNext = () => {
  return (
    <Card sx={{ maxHeight: '100%' }}>
      <CardHeader
        title='Things to do next'
        titleTypographyProps={{
          sx: { lineHeight: '1.2 !important', fontSize: '14.94px', letterSpacing: '0px !important' }
        }}
      />
      <TableContainer>
        <Table sx={{ maxWidth: '100%' }} aria-label='table in dashboard'>
          <TableBody>
            {rows.map((row: RowType, index: number) => (
              <TableRow hover key={index} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                <TableCell style={{ color: index === 0 ? '#5F76FF' : 'inherit' }}>
                  {row.status}
                  <span style={{ textDecoration: 'underline' }}> {row.data}</span>
                </TableCell>
                <TableCell style={{ color: index === 0 ? '#5F76FF' : 'inherit' }}>{row.time}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  )
}

export default ThingsToDoNext
