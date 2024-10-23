/* eslint-disable @next/next/link-passhref */
import SearchIcon from '@mui/icons-material/Search'
import {
  Container,
  InputAdornment,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography
} from '@mui/material'
import Link from 'next/link'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { getUserId } from 'src/redux/feature/slice/testSlice'

interface PrimarySalesChannel {
  key: number
  value: string
}

interface StoreType {
  key: number
  value: string
}

interface PendingCustomers {
  userId: string
  status: string
  storeName: string
  primarySalesChannel: any
  numberOfDoors: number
  platformWebsite: string
  storeTypes: any
  phoneNumber: string
  email: string
}
const PendingCustomersTable = ({ PendingCustomer }: any) => {
  const dispatch = useDispatch()

  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [page, setPage] = useState(0)

  const handleClick = (item: any) => {
    dispatch(getUserId(item))
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  return (
    <>
      <Paper sx={{ width: '100%' }}>
        <Container
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            margin: '1.25rem',
            width: '96%'
          }}
        >
          <TextField
            id='search'
            type='search'
            label='Search'
            size='small'
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <SearchIcon />
                </InputAdornment>
              )
            }}
          />
        </Container>
        <TableContainer sx={{ maxHeight: 660, overflowX: 'auto' }}>
          <Table stickyHeader aria-label='sticky table'>
            <TableHead>
              <TableRow>
                <TableCell align='left' sx={{ minWidth: '10rem', backgroundColor: '#EEEEEE' }}>
                  <Typography variant='subtitle1' sx={{ fontSize: '0.75rem', color: '#4C4A54' }}>
                    Status
                  </Typography>
                </TableCell>
                <TableCell align='left' sx={{ minWidth: '10rem', backgroundColor: '#EEEEEE' }}>
                  <Typography variant='subtitle1' sx={{ fontSize: '0.75rem', color: '#4C4A54' }}>
                    Store Name
                  </Typography>
                </TableCell>
                <TableCell align='left' sx={{ minWidth: '10rem', backgroundColor: '#EEEEEE' }}>
                  <Typography variant='subtitle1' sx={{ fontSize: '0.75rem', color: '#4C4A54' }}>
                    primary Sales Channel
                  </Typography>
                </TableCell>
                <TableCell align='left' sx={{ minWidth: '10rem', backgroundColor: '#EEEEEE' }}>
                  <Typography variant='subtitle1' sx={{ fontSize: '0.75rem', color: '#4C4A54' }}>
                    No.of Stores
                  </Typography>
                </TableCell>
                <TableCell align='left' sx={{ minWidth: '10rem', backgroundColor: '#EEEEEE' }}>
                  <Typography variant='subtitle1' sx={{ fontSize: '0.75rem', color: '#4C4A54' }}>
                    Website link
                  </Typography>
                </TableCell>
                <TableCell align='left' sx={{ minWidth: '10rem', backgroundColor: '#EEEEEE' }}>
                  <Typography variant='subtitle1' sx={{ fontSize: '0.75rem', color: '#4C4A54' }}>
                    Store Type
                  </Typography>
                </TableCell>
                <TableCell align='left' sx={{ minWidth: '10rem', backgroundColor: '#EEEEEE' }}>
                  <Typography variant='subtitle1' sx={{ fontSize: '0.75rem', color: '#4C4A54' }}>
                    Contact Number
                  </Typography>
                </TableCell>
                <TableCell align='left' sx={{ minWidth: '10rem', backgroundColor: '#EEEEEE' }}>
                  <Typography variant='subtitle1' sx={{ fontSize: '0.75rem', color: '#4C4A54' }}>
                    Primary email Adress
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {PendingCustomer?.slice(page * rowsPerPage, (page + 1) * rowsPerPage)?.map(
                (item: PendingCustomers, index: string) => {
                  return (
                    <Link href={`/customers/pending-customer/${item.userId}`} key={index + 1}>
                      <TableRow
                        key={index + 1}
                        hover
                        tabIndex={-1}
                        onClick={() => handleClick(item.userId)}
                        style={{ cursor: 'pointer' }}
                      >
                        <TableCell sx={{ background: '#f6f5f7' }}>{item.status}</TableCell>
                        <TableCell>{item.storeName}</TableCell>
                        <TableCell sx={{ background: '#f6f5f7' }}>
                          {item.primarySalesChannel?.map((item: PrimarySalesChannel) => {
                            return <>{item.value}</>
                          })}
                        </TableCell>
                        <TableCell>{item.numberOfDoors}</TableCell>
                        <TableCell sx={{ background: '#f6f5f7' }}>{item.platformWebsite}</TableCell>
                        <TableCell>{item.storeTypes?.map((items: StoreType) => items.value).join(', ')}</TableCell>
                        <TableCell sx={{ background: '#f6f5f7' }}>{item.phoneNumber}</TableCell>
                        <TableCell>{item.email}</TableCell>
                      </TableRow>
                    </Link>
                  )
                }
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50]}
          component='div'
          count={PendingCustomer.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  )
}

export default PendingCustomersTable
