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
  date: string
  price: string
}

const rows: RowType[] = [
  {
    date: '23.02.24 for John',
    price: '$ 434.02'
  },
  {
    date: '23.02.24 for John',
    price: '$ 434.02'
  },
  {
    date: '23.02.24 for John',
    price: '$ 434.02'
  },
  {
    date: '23.02.24 for John',
    price: '$ 434.02'
  },
  {
    date: '23.02.24 for John',
    price: '$ 434.02'
  },
  {
    date: '23.02.24 for John',
    price: '$ 434.02'
  },
  {
    date: '23.02.24 for John',
    price: '$ 434.02'
  },
  {
    date: '23.02.24 for John',
    price: '$ 434.02'
  },
  {
    date: '23.02.24 for John',
    price: '$ 434.02'
  },
  {
    date: '23.02.24 for John',
    price: '$ 434.02'
  }
]

const LatestOrders = () => {
  return (
    <Card sx={{ maxHeight: '303.56px' }}>
      <CardHeader
        title='Latest Orders'
        titleTypographyProps={{
          sx: { lineHeight: '1.2 !important', fontSize: '14.94px', letterSpacing: '0px !important' }
        }}
      />
      <TableContainer>
        <Table sx={{ maxWidth: '100%' }} aria-label='table in dashboard'>
          <TableBody>
            {rows.map((row: RowType) => (
              <TableRow hover key={row.date} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  )
}

export default LatestOrders
