import { useState } from 'react'
import {
  Box,
  Button,
  Card,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography
} from '@mui/material'

const ProductCategory = () => {
  const [age, setAge] = useState('')

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string)
  }

  return (
    <div>
      <Grid container spacing={6}>
        <Box sx={{ marginLeft: 10, marginTop: 5 }}>
          <Typography variant='h5' gutterBottom>
            New category
          </Typography>
        </Box>
        <Grid item xs={12}>
          <Card>
            <Box sx={{ marginTop: 5, marginLeft: 10, display: 'flex', flexWrap: 'wrap', gap: 3 }}>
              <Button
                sx={{
                  backgroundColor: '#3699ff',
                  '&:hover': {
                    backgroundColor: '#3699ff'
                  }
                }}
                variant='contained'
              >
                Category
              </Button>
              <Button
                sx={{
                  backgroundColor: '#3699ff',
                  '&:hover': {
                    backgroundColor: '#3699ff'
                  }
                }}
                variant='contained'
              >
                Advanced
              </Button>
              <Button
                sx={{
                  backgroundColor: '#3699ff',
                  '&:hover': {
                    backgroundColor: '#3699ff'
                  }
                }}
                variant='contained'
              >
                Access
              </Button>
              <Button
                sx={{
                  backgroundColor: '#3699ff',
                  '&:hover': {
                    backgroundColor: '#3699ff'
                  }
                }}
                variant='contained'
              >
                Extra fields
              </Button>
            </Box>
            <Box sx={{ m: 10, gap: 7, display: 'flex', justifyContent: 'space-between', flexDirection: 'column' }}>
              <TextField id='outlined-basic' label={'Name'} variant='outlined' sx={{ width: '40%' }} />
              <FormControl sx={{ width: '40%' }}>
                <InputLabel id='demo-simple-select-label'>Parent category</InputLabel>
                <Select
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  value={age}
                  label='Age'
                  onChange={handleChange}
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
              <FormControlLabel control={<Checkbox defaultChecked />} label='Active' />
              <TextField
                sx={{ width: '40%' }}
                id='outlined-number'
                label='Discount %'
                type='number'
                InputLabelProps={{
                  shrink: true
                }}
              />
              <Box sx={{ display: 'flex', gap: 5 }}>
                <Button
                  sx={{
                    backgroundColor: '#3699ff',
                    '&:hover': {
                      backgroundColor: '#3699ff'
                    },

                    width: 30
                  }}
                  variant='contained'
                >
                  Back
                </Button>
                <Button
                  sx={{
                    backgroundColor: '#1dc9b7',
                    '&:hover': {
                      backgroundColor: '#1dc9b7'
                    }
                  }}
                  variant='contained'
                >
                  Save
                </Button>
              </Box>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </div>
  )
}

export default ProductCategory
