import React, { useState } from 'react'
import {
  Button,
  Checkbox,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography
} from '@mui/material'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import CloseIcon from '@mui/icons-material/Close'

interface Row {
  id: number
}

const AddressesTable: React.FC = () => {
  const [rows, setRows] = useState<Row[]>([])
  const [country, setcountry] = React.useState('')

  const handleChange = (event: SelectChangeEvent) => {
    setcountry(event.target.value as string)
  }

  const handleAddRow = () => {
    setRows([...rows, { id: rows.length + 1 }])
  }

  const handleRemoveRow = (id: number) => {
    setRows(rows.filter(row => row.id !== id))
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 660 }}>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              <TableCell align='left'>
                <Typography variant='subtitle1'>Address</Typography>
              </TableCell>
              <TableCell align='left'>
                <Typography variant='subtitle1'>
                  City <br />
                  Province
                </Typography>
              </TableCell>
              <TableCell align='left'>
                <Typography variant='subtitle1'>Country</Typography>
              </TableCell>
              <TableCell align='left'>
                <Typography variant='subtitle1'>Postal code</Typography>
              </TableCell>
              <TableCell align='left'>
                <Typography variant='subtitle1'>Active</Typography>
              </TableCell>
              <TableCell sx={{ width: 50 }}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.id} hover>
                <TableCell sx={{ width: 200 }}>
                  <TextField id='outlined-number' size='small' sx={{ marginBottom: 4 }} label='Address Line 1' />
                  <TextField id='outlined-number' size='small' label='Address Line 2' />
                </TableCell>
                <TableCell sx={{ width: 200 }}>
                  <TextField id='outlined-number' size='small' sx={{ marginBottom: 4 }} />
                  <TextField id='outlined-number' size='small' />
                </TableCell>
                <TableCell sx={{ width: 200 }}>
                  <FormControl fullWidth>
                    <InputLabel id='demo-simple-select-label'>country</InputLabel>
                    <Select
                      labelId='demo-simple-select-label'
                      id='demo-simple-select'
                      value={country}
                      label='country'
                      onChange={handleChange}
                    >
                      <MenuItem value={1}>Ten</MenuItem>
                      <MenuItem value={2}>Twenty</MenuItem>
                      <MenuItem value={3}>Thirty</MenuItem>
                    </Select>
                  </FormControl>
                </TableCell>
                <TableCell sx={{ width: 200 }}>
                  <TextField id='outlined-number' size='small' />
                </TableCell>
                <TableCell>
                  <Checkbox />
                </TableCell>

                <TableCell>
                  <IconButton
                    aria-label='edit'
                    sx={{
                      color: '#FFFFFF',
                      margin: 1,
                      backgroundColor: '#fd397a',
                      border: '#fd397a',
                      '&: hover': {
                        backgroundColor: '#fd397a',
                        border: '#fd397a'
                      }
                    }}
                    onClick={() => handleRemoveRow(row.id)}
                  >
                    <CloseIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        onClick={handleAddRow}
        sx={{
          backgroundColor: '#1dc9b7',
          margin: 3,
          '&:hover': {
            backgroundColor: '#1dc9b7'
          }
        }}
        variant='contained'
      >
        <AddOutlinedIcon />
      </Button>
    </Paper>
  )
}

export default AddressesTable
