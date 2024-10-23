/* eslint-disable @next/next/link-passhref */
import { useQuery } from '@apollo/client'
import SearchIcon from '@mui/icons-material/Search'
import {
  Checkbox,
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
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { GetAllUser } from 'src/graphql/query/customer.query'
import { ICustomers } from 'src/models/product.model'
import { getUserId } from 'src/redux/feature/slice/testSlice'
import { formatDateTime } from './OrderTable'

const CustomerTable: React.FC = () => {
  const dispatch = useDispatch()
  const [searchTerm, setSearchTerm] = useState('')
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [page, setPage] = useState(0)
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [selectAll, setSelectAll] = useState(false)

  const { loading, error, data } = useQuery(GetAllUser)

  const customer = data?.userDetail?.graphdata

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
    setPage(0)
  }

  const handleClick = (item: any) => {
    dispatch(getUserId(item))
  }

  const filteredCustomers = customer?.filter(
    (item: ICustomers) =>
      item.storeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  if (loading) return <p style={{ textAlign: 'center' }}>Loading...</p>
  if (error) return <p style={{ textAlign: 'center' }}>Error: {error.message}</p>

  const label = { inputProps: { 'aria-label': 'Checkbox demo' } }

  const handleHeaderCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked
    const selectedCustomerIds = isChecked ? filteredCustomers.map((customer: ICustomers) => customer.index) : []
    setSelectedIds(selectedCustomerIds)
    setSelectAll(isChecked)
  }

  const handleRowCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, customerId: string) => {
    const isChecked = event.target.checked
    let updatedSelectedIds: string[]
    if (isChecked) {
      updatedSelectedIds = [...selectedIds, customerId]
    } else {
      updatedSelectedIds = selectedIds.filter(id => id !== customerId)
    }
    setSelectedIds(updatedSelectedIds)
    setSelectAll(updatedSelectedIds.length === filteredCustomers.length)
  }

  return (
    <Paper sx={{ width: '100%' }}>
      <Container
        sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '1.25rem', width: '96%' }}
      >
        <TextField
          id='search'
          type='search'
          label='Search'
          value={searchTerm}
          onChange={handleSearch}
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
              <TableCell sx={{ backgroundColor: '#EEEEEE', justifyContent: 'space-between' }}>
                <Checkbox
                  {...label}
                  checked={selectAll}
                  onChange={handleHeaderCheckboxChange}
                  sx={{ top: '2px', justifyContent: 'space-between', left: '-1px' }}
                />
              </TableCell>
              <TableCell align='left' sx={{ minWidth: '10rem', backgroundColor: '#EEEEEE' }}>
                <Typography variant='subtitle1' sx={{ fontSize: '0.75rem', color: '#4C4A54' }}>
                  Customer Code
                </Typography>
              </TableCell>
              <TableCell align='left' sx={{ minWidth: '10rem', backgroundColor: '#EEEEEE' }}>
                <Typography variant='subtitle1' sx={{ fontSize: '0.75rem', color: '#4C4A54' }}>
                  Store Name
                </Typography>
              </TableCell>
              <TableCell align='left' sx={{ minWidth: '10rem', backgroundColor: '#EEEEEE' }}>
                <Typography variant='subtitle1' sx={{ fontSize: '0.75rem', color: '#4C4A54' }}>
                  Location
                </Typography>
              </TableCell>
              <TableCell align='left' sx={{ minWidth: '10rem', backgroundColor: '#EEEEEE' }}>
                <Typography variant='subtitle1' sx={{ fontSize: '0.75rem', color: '#4C4A54' }}>
                  Open Orders
                </Typography>
              </TableCell>
              <TableCell align='left' sx={{ minWidth: '10rem', backgroundColor: '#EEEEEE' }}>
                <Typography variant='subtitle1' sx={{ fontSize: '0.75rem', color: '#4C4A54' }}>
                  Last Order Date
                </Typography>
              </TableCell>
              <TableCell align='left' sx={{ minWidth: '10rem', backgroundColor: '#EEEEEE' }}>
                <Typography variant='subtitle1' sx={{ fontSize: '0.75rem', color: '#4C4A54' }}>
                  Last Order Value
                </Typography>
              </TableCell>
              <TableCell align='left' sx={{ minWidth: '10rem', backgroundColor: '#EEEEEE' }}>
                <Typography variant='subtitle1' sx={{ fontSize: '0.75rem', color: '#4C4A54' }}>
                  E-mail
                </Typography>
              </TableCell>
              <TableCell align='left' sx={{ minWidth: '10rem', backgroundColor: '#EEEEEE' }}>
                <Typography variant='subtitle1' sx={{ fontSize: '0.75rem', color: '#4C4A54' }}>
                  Phone
                </Typography>
              </TableCell>
              <TableCell align='left' sx={{ minWidth: '10rem', backgroundColor: '#EEEEEE' }}>
                <Typography variant='subtitle1' sx={{ fontSize: '0.75rem', color: '#4C4A54' }}>
                  Sales Agent
                </Typography>
              </TableCell>
              <TableCell align='left' sx={{ backgroundColor: '#EEEEEE' }}>
                <Typography variant='subtitle1' sx={{ fontSize: '0.75rem', color: '#4C4A54' }}>
                  Status
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCustomers
              .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
              .map((item: ICustomers, index: string) => {
                return (
                  <Link href={`/customers/update-customer/${item.userId}`} key={item.userId}>
                    <TableRow key={index + 1} hover tabIndex={-1} onClick={() => handleClick(item.userId)}>
                      <TableCell>
                        <Checkbox
                          {...label}
                          checked={selectedIds.includes(index + 1)}
                          onChange={event => handleRowCheckboxChange(event, index + 1)}
                          sx={{ justifyContent: 'space-between' }}
                        />
                      </TableCell>
                      <TableCell
                        sx={{
                          background: '#f6f5f7',
                          zIndex: '-1',
                          height: '100%'
                        }}
                      >
                        {item.customerCode}
                      </TableCell>
                      <TableCell>{item.storeName}</TableCell>
                      <TableCell sx={{ background: '#f6f5f7' }}>{item.location}</TableCell>
                      <TableCell>
                        {item.status === 'PENDING' || item.lastOrderValue === 0 ? '-' : item.openOrders}
                      </TableCell>
                      <TableCell>
                        {item.status === 'PENDING' || item.lastOrderValue === 0
                          ? '-'
                          : formatDateTime(item.lastOrderDate)}
                      </TableCell>
                      <TableCell>
                        {item.status === 'PENDING' || item.lastOrderValue === 0 ? '-' : item.lastOrderValue}
                      </TableCell>
                      <TableCell>{item.email}</TableCell>
                      <TableCell sx={{ background: '#f6f5f7' }}>{item.phoneNumber}</TableCell>
                      <TableCell>{item.salesAgentName}</TableCell>
                      <TableCell>{item.status}</TableCell>
                    </TableRow>
                  </Link>
                )
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component='div'
        count={filteredCustomers.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  )
}

export default CustomerTable
