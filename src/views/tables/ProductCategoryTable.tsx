import { useQuery } from '@apollo/client'
import { Typography } from '@mui/material'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import React from 'react'
import { ChangeEvent, useState } from 'react'
import { GetAllCategoriesWithSubCategories } from 'src/graphql/query/categories-with-sub-categories.query'
import { IAllCategorieswithSubCategories } from 'src/models/product.model'

const ProductCategoryTable = () => {
  const [page, setPage] = useState<number>(0)
  const [rowsPerPage, setRowsPerPage] = useState<number>(10)
  const { loading, error, data } = useQuery(GetAllCategoriesWithSubCategories)
  const categories = data?.allCategoriesWithSubCategories?.graphdata || []

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  if (loading) return <p style={{ textAlign: 'center' }}>Loading...</p>
  if (error) return <p style={{ textAlign: 'center' }}>Error: {error.message}</p>

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 660 }}>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              <TableCell align='left' sx={{ minWidth: 170 }}>
                <Typography variant='subtitle1'>Category ID</Typography>
              </TableCell>
              <TableCell align='left' sx={{ minWidth: 170 }}>
                <Typography variant='subtitle1'>Category Name</Typography>
              </TableCell>
              <TableCell align='left' sx={{ minWidth: 170 }}>
                <Typography variant='subtitle1'>Subcategories</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories
              .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
              .map((category: IAllCategorieswithSubCategories, index: number) => (
                <React.Fragment key={category.categoryId}>
                  <TableRow hover>
                    <TableCell align='left'>
                      <Typography variant='subtitle1'>{category.categoryName}</Typography>
                    </TableCell>
                    <TableCell align='left'></TableCell>
                    <TableCell align='left'></TableCell>
                  </TableRow>
                  {category.subCategories.map(subcategory => (
                    <TableRow hover key={subcategory.subCategoryId}>
                      <TableCell align='left'>
                        <Typography variant='subtitle1'>{index + 1}</Typography>
                      </TableCell>
                      <TableCell align='left'>
                        <Typography variant='subtitle1'>{category.categoryName}</Typography>
                      </TableCell>
                      <TableCell align='left'>
                        <Typography>{subcategory.subCategoryName}</Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </React.Fragment>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[1, 2, 5, 10]}
        component='div'
        count={categories.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  )
}

export default ProductCategoryTable
