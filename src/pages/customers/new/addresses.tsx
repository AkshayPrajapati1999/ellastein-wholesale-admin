import { Box, Button, Card, Grid, Select, Typography } from '@mui/material'
import AddressesTable from 'src/views/tables/AddressesTable'

const Addresses = () => {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'left',
          gap: 3,
          m: 10,
          marginTop: 20
        }}
      >
        <Typography>Allow ordering from countries</Typography>

        <Select sx={{ width: '100%', maxWidth: 360 }} multiple native>
          <option>United Kingdom</option>
          <option>Canada</option>
          <option>United States</option>
          <option disabled>------------------</option>

          <option>Afghanistan</option>
          <option>Åland Islands</option>
          <option>Albania</option>
          <option>Algeria</option>
          <option>American Samoa</option>
          <option>Andorra</option>
          <option>Angola</option>
          <option>Anguilla</option>
          <option>Antarctica</option>
        </Select>
      </Box>

      <Grid item xs={12}>
        <Card>
          <AddressesTable />
        </Card>
      </Grid>
      <Box sx={{ m: 10, display: 'flex', gap: 5 }}>
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
        <Button
          sx={{
            backgroundColor: '#1dc9b7',
            '&:hover': {
              backgroundColor: '#1dc9b7'
            }
          }}
          variant='contained'
        >
          Save and stay on page
        </Button>
      </Box>
    </>
  )
}

export default Addresses
