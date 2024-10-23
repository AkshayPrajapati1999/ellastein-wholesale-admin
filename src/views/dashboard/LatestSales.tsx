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
  name: string
  price: string
}

const rows: RowType[] = [
  {
    name: 'John Mackey',
    price: '$ 434.02'
  },
  {
    name: 'John Mackey',
    price: '$ 434.02'
  },
  {
    name: 'John Mackey',
    price: '$ 434.02'
  },
  {
    name: 'John Mackey',
    price: '$ 434.02'
  },
  {
    name: 'John Mackey',
    price: '$ 434.02'
  },
  {
    name: 'John Mackey',
    price: '$ 434.02'
  }
]

const LatestSales = () => {
  return (
    <Card sx={{ maxHeight: '303.56px' }}>
      <CardHeader
        title='Latest Sales'
        titleTypographyProps={{
          sx: { lineHeight: '1.2 !important', fontSize: '14.94px', letterSpacing: '0px !important' }
        }}
      />
      <TableContainer>
        <Table sx={{ maxWidth: '100%' }} aria-label='table in dashboard'>
          <TableBody>
            {rows.map((row: RowType) => (
              <TableRow hover key={row.name} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  )
}

export default LatestSales
