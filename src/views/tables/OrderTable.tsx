/* eslint-disable @next/next/link-passhref */
import { useQuery } from '@apollo/client'
import { Checkbox, TablePagination, Typography } from '@mui/material'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Link from 'next/link'
import { useState } from 'react'
import { GetOrderHistory } from 'src/graphql/query/order.query'
import { IOrderFor, IOrders } from 'src/models/product.model'
import * as styles from '../../pages/orderPage'

export const formatDateTime = (dateTimeString: string | number | Date) => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric'
  }

  return new Date(dateTimeString).toLocaleString('en-US', options)
}

const OrderTable = () => {
  const [selectAll, setSelectAll] = useState(false)
  const [selectedOrders, setSelectedOrders] = useState<OrderId[]>([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const { loading, error, data } = useQuery(GetOrderHistory)

  type OrderId = number

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  if (loading) return <p style={styles.loading()}>Loading...</p>
  if (error) return <p style={styles.error()}>Error: {error.message}</p>

  const orders = data?.orderHistory?.graphdata

  const label = { inputProps: { 'aria-label': 'Checkbox demo' } }

  const handleSelectAll = () => {
    setSelectAll(!selectAll)
  }

  const handleCheckboxClick = (orderId: OrderId) => {
    setSelectedOrders(prevSelectedOrders => {
      if (prevSelectedOrders.includes(orderId)) {
        return prevSelectedOrders.filter(id => id !== orderId)
      } else {
        return [...prevSelectedOrders, orderId]
      }
    })
  }

  return (
    <Paper style={styles.paper()}>
      <TableContainer style={styles.tableContainer()}>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              <TableCell style={styles.checkboxCell()} sx={{ backgroundColor: '#EEEEEE' }}>
                <Checkbox {...label} checked={selectAll} onChange={handleSelectAll} style={styles.checkbox()} />
              </TableCell>
              <TableCell align='center' sx={{ backgroundColor: '#EEEEEE' }}>
                <Typography variant='subtitle1' style={styles.tableHeaderText()}>
                  Order No.
                </Typography>
              </TableCell>
              <TableCell align='center' sx={{ backgroundColor: '#EEEEEE' }}>
                <Typography variant='subtitle1' style={styles.tableHeaderText()}>
                  Date
                </Typography>
              </TableCell>
              <TableCell align='center' sx={{ backgroundColor: '#EEEEEE' }}>
                <Typography variant='subtitle1' style={styles.tableHeaderText()}>
                  Customer Code
                </Typography>
              </TableCell>
              <TableCell align='center' sx={{ backgroundColor: '#EEEEEE' }}>
                <Typography variant='subtitle1' style={styles.tableHeaderText()}>
                  Customer Name
                </Typography>
              </TableCell>
              <TableCell align='center' sx={{ backgroundColor: '#EEEEEE' }}>
                <Typography variant='subtitle1' style={styles.tableHeaderText()}>
                  Order Amount
                </Typography>
              </TableCell>
              <TableCell align='center' sx={{ backgroundColor: '#EEEEEE' }}>
                <Typography variant='subtitle1' style={styles.tableHeaderText()}>
                  No. of Pieces
                </Typography>
              </TableCell>
              <TableCell align='center' sx={{ backgroundColor: '#EEEEEE' }}>
                <Typography variant='subtitle1' style={styles.tableHeaderText()}>
                  Order Status
                </Typography>
              </TableCell>
              <TableCell align='center' sx={{ backgroundColor: '#EEEEEE' }}>
                <Typography variant='subtitle1' style={styles.tableHeaderText()}>
                  Payment Terms
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.slice(page * rowsPerPage, (page + 1) * rowsPerPage)?.map((item: IOrders) => (
              <Link href={`orders/new/${item.id}`} key={item.id}>
                <TableRow
                  key={item.id}
                  hover
                  sx={{ backgroundColor: item.orderStatus === 'Completed' ? '#F6F5F7' : '' }}
                >
                  <TableCell style={styles.checkboxCell()}>
                    <Checkbox
                      {...label}
                      checked={selectedOrders.includes(item.id)}
                      onChange={() => handleCheckboxClick(item.id)}
                      style={styles.checkbox()}
                    />
                  </TableCell>
                  <TableCell align='center'>{item.orderNumber}</TableCell>
                  <TableCell align='center'>{formatDateTime(item.orderDate)}</TableCell>
                  <TableCell align='center'>{item.customerCode}</TableCell>
                  <TableCell align='center'>{item.orderFor.map((customer: IOrderFor) => customer.value)}</TableCell>
                  <TableCell align='center'>${item.totalAmount}</TableCell>
                  <TableCell align='center'>
                    {item.orderDetails.reduce(
                      (totalQuantity: number, detail: any) => totalQuantity + detail.quantity,
                      0
                    )}
                  </TableCell>
                  <TableCell align='center'>
                    <span style={styles.orderStatus()}>{item.orderStatus}</span>
                  </TableCell>
                  <TableCell align='center'>{item.paymentType}</TableCell>
                </TableRow>
              </Link>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component='div'
        count={orders.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  )
}

export default OrderTable
