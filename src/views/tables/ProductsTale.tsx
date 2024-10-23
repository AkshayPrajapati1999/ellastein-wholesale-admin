/* eslint-disable @typescript-eslint/no-unused-vars */
import { useQuery } from '@apollo/client'
import { IconButton, InputAdornment, MenuItem, Select, TextField, Typography } from '@mui/material'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import { ChangeEvent, SetStateAction, useEffect, useState } from 'react'
import { GetAllProduct } from 'src/graphql/query/products.query'
import { IProducts } from 'src/models/product.model'

import EditIcon from '@mui/icons-material/Edit'
import SearchIcon from '@mui/icons-material/Search'

const ProductsTable = () => {
  const [page, setPage] = useState<number>(0)
  const [rowsPerPage, setRowsPerPage] = useState<number>(10)
  const [totalCount, setTotalCount] = useState<number>(0)
  const [products, setProducts] = useState<IProducts[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const { loading, error, data, refetch } = useQuery(GetAllProduct, {
    variables: {
      categoryId: 0,
      subCategoryId: 0,
      page: page + 1,
      count: rowsPerPage
    }
  })

  useEffect(() => {
    if (data) {
      setTotalCount(data.adminProductListingResponse.totalProductsCount)
      setProducts(data.adminProductListingResponse.graphdata || [])
    }
  }, [data])

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  useEffect(() => {
    refetch({
      variables: {
        categoryId: 0,
        subCategoryId: 0,
        page: page + 1,
        count: rowsPerPage
      }
    }).then(result => {
      if (result.data) {
        setTotalCount(result.data.adminProductListingResponse.totalProductsCount)
        setProducts(result.data.adminProductListingResponse.graphdata || [])
      }
    })
  }, [page, rowsPerPage, refetch])

  const handleSearch = (event: { target: { value: SetStateAction<string> } }) => {
    setSearchTerm(event.target.value)
  }

  if (loading) return <p style={{ textAlign: 'center' }}>Loading...</p>
  if (error) return <p style={{ textAlign: 'center' }}>Error: {error.message}</p>

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          margin: '1.25rem'
        }}
      >
        <Typography sx={{ fontWeight: 500, fontSize: '1.25rem' }}>Products</Typography>
        {/* <TextField
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
        /> */}
      </div>

      <TableContainer sx={{ maxHeight: 660 }}>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              <TableCell sx={{ backgroundColor: '#EEEEEE' }}></TableCell>
              <TableCell align='left' sx={{ backgroundColor: '#EEEEEE' }}>
                <Typography variant='subtitle1'>Product Name</Typography>
              </TableCell>
              <TableCell align='left' sx={{ backgroundColor: '#EEEEEE' }}>
                <Typography variant='subtitle1'>Category</Typography>
              </TableCell>

              <TableCell align='left' sx={{ backgroundColor: '#EEEEEE' }}>
                <Typography variant='subtitle1'>Wholesale</Typography>
              </TableCell>
              <TableCell align='left' sx={{ backgroundColor: '#EEEEEE' }}>
                <Typography variant='subtitle1'>Retail</Typography>
              </TableCell>
              <TableCell align='left' sx={{ backgroundColor: '#EEEEEE' }}>
                <Typography variant='subtitle1'>Status</Typography>
              </TableCell>
              <TableCell sx={{ backgroundColor: '#EEEEEE' }}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((item: IProducts) => {
              return (
                <>
                  <TableRow hover role='checkbox' tabIndex={-1} key={item.productId}>
                    <TableCell align='center'>
                      <img src={item.productImage} alt={item.productName} style={{ width: 70, height: 70 }} />
                    </TableCell>
                    <TableCell align='left'>
                      <Typography variant='subtitle1'>{item.productName}</Typography>
                    </TableCell>
                    <TableCell align='left'>
                      <Typography variant='subtitle1'>{item.categoryName}</Typography>
                    </TableCell>

                    <TableCell align='left'>
                      <Typography variant='subtitle1'>${item.wholesalePrice}</Typography>
                    </TableCell>
                    <TableCell align='left'>
                      <Typography variant='subtitle1'>${item.price}</Typography>
                    </TableCell>
                    <TableCell align='left'>
                      <Select
                        value={item.isActive}
                        sx={{
                          height: 50
                        }}
                        renderValue={item.isActive ? () => 'Active' : () => 'Inactive'}
                      >
                        <MenuItem value={1}>Active</MenuItem>
                        <MenuItem value={2}>Inactive</MenuItem>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <IconButton
                        aria-label='edit'
                        sx={{
                          color: '#FFFFFF',
                          margin: 1,
                          backgroundColor: '#3699FF',
                          border: '#3699FF',
                          '&: hover': {
                            backgroundColor: '#335de7',
                            border: '#2754e6'
                          }
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                </>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component='div'
        count={totalCount * rowsPerPage}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  )
}

export default ProductsTable
