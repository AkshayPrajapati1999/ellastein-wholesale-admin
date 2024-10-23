/* eslint-disable @typescript-eslint/no-unused-vars */
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import SaveIcon from '@mui/icons-material/Save'
import {
  Box,
  Button,
  Card,
  Checkbox,
  FormControlLabel,
  Grid,
  SelectChangeEvent,
  TextField,
  Typography
} from '@mui/material'
import React, { useState } from 'react'

const Index = () => {
  const [age, setAge] = useState('')

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string)
  }

  return (
    <div>
      <Grid container spacing={6}>
        <Box sx={{ marginLeft: 10, marginTop: 5 }}>
          <Typography variant='h5' gutterBottom>
            New Banner
          </Typography>
        </Box>
        <Grid item xs={12}>
          <Card>
            <Box sx={{ m: 10, gap: 7, display: 'flex', justifyContent: 'space-between', flexDirection: 'column' }}>
              <TextField id='outlined-basic' label={'View Order'} variant='outlined' sx={{ width: '40%' }} />
              <FormControlLabel control={<Checkbox defaultChecked />} label='Active' />
              <TextField id='outlined-basic' label={'Url'} variant='outlined' sx={{ width: '40%' }} />

              <Box sx={{ display: 'flex', gap: 5 }}>
                <Button
                  sx={{
                    backgroundColor: '#3699ff',
                    '&:hover': {
                      backgroundColor: '#3699ff'
                    },

                    width: '9%'
                  }}
                  variant='contained'
                >
                  <ArrowBackIcon />
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
                  <SaveIcon />
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

export default Index
