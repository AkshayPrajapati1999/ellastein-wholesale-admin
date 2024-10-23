import React, { useState } from 'react'
import { Button, Paper, Table, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined'

const PriceListTable = () => {
  const [selectedButton, setSelectedButton] = useState('retail')

  const handleButtonClick = (buttonName: any) => {
    setSelectedButton(buttonName)
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 660 }}>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              <TableCell align='left' sx={{ minWidth: 170 }}>
                <Typography variant='subtitle1'>Name</Typography>
              </TableCell>
              <TableCell align='left' sx={{ minWidth: 170 }}>
                <Typography variant='subtitle1'>Short name</Typography>
              </TableCell>
              <TableCell align='left' sx={{ minWidth: 170 }}>
                <Typography variant='subtitle1'>Default</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableRow hover>
            <TableCell align='left' sx={{ minWidth: 170 }}>
              <Typography variant='subtitle1'>Wholesale Price List</Typography>
            </TableCell>
            <TableCell align='left' sx={{ minWidth: 170 }}>
              <Typography variant='subtitle1'>Wholesale</Typography>
            </TableCell>
            <TableCell align='left' sx={{ minWidth: 170 }}>
              {selectedButton === 'wholesale' ? (
                <CheckOutlinedIcon style={{ color: 'green', height: '35px' }} />
              ) : (
                <Button
                  sx={{
                    '&:hover': {
                      backgroundColor: 'white',
                      color: '#000000'
                    },
                    height: '40px'
                  }}
                  variant='outlined'
                  onClick={() => handleButtonClick('wholesale')}
                >
                  Set Default
                </Button>
              )}
            </TableCell>
          </TableRow>
          <TableRow hover>
            <TableCell align='left' sx={{ minWidth: 170 }}>
              <Typography variant='subtitle1'>Retail Price List</Typography>
            </TableCell>
            <TableCell align='left' sx={{ minWidth: 170 }}>
              <Typography variant='subtitle1'>Retail</Typography>
            </TableCell>
            <TableCell align='left' sx={{ minWidth: 170 }}>
              {selectedButton === 'retail' ? (
                <CheckOutlinedIcon style={{ color: 'green', height: '35px' }} />
              ) : (
                <Button
                  sx={{
                    '&:hover': {
                      backgroundColor: 'white',
                      color: '#000000'
                    },
                    height: '40px'
                  }}
                  variant='outlined'
                  onClick={() => handleButtonClick('retail')}
                >
                  Set Default
                </Button>
              )}
            </TableCell>
          </TableRow>
        </Table>
      </TableContainer>
    </Paper>
  )
}

export default PriceListTable
