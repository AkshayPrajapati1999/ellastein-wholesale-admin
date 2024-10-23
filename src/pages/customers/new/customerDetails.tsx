import {
  FormControl,
  InputLabel,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Button,
  Box,
  TextField,
  Select
} from '@mui/material'

const CustomerDetails = () => {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'left',
          gap: 20,
          m: 10,
          marginTop: 20
        }}
      >
        <TextField id='outlined-number' label='Company name' />
        <TextField id='outlined-number' label='Full Name' />
        <Box sx={{ display: 'flex', gap: 6 }}>
          <FormControl sx={{ width: '100%' }}>
            <InputLabel id='demo-simple-select-label'>Activity</InputLabel>
            <Select labelId='demo-simple-select-label' id='demo-simple-select' label='Status'>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
          <TextField sx={{ width: '100%' }} id='outlined-number' label='Specify activity' />
        </Box>
        <TextField id='outlined-number' label='Email' />
        <FormControlLabel control={<Checkbox defaultChecked />} label='Notify customer by email' />
        <FormControlLabel control={<Checkbox defaultChecked />} label='Is active' />
        <FormControlLabel control={<Checkbox defaultChecked />} label='Disable Ordering' />
        <FormControl sx={{ width: '100%' }}>
          <InputLabel id='demo-simple-select-label'>Language</InputLabel>
          <Select labelId='demo-simple-select-label' id='demo-simple-select' label='Status'>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ width: '100%' }}>
          <InputLabel id='demo-simple-select-label'>VAT group *</InputLabel>
          <Select labelId='demo-simple-select-label' id='demo-simple-select' label='Status'>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ width: '100%' }}>
          <InputLabel id='demo-simple-select-label'>Price List</InputLabel>
          <Select labelId='demo-simple-select-label' id='demo-simple-select' label='Status'>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
        <TextField
          value='0.0'
          id='outlined-number'
          label='Discount % '
          type='number'
          InputLabelProps={{
            shrink: true
          }}
        />
        <TextField
          value='0.0'
          id='outlined-number'
          label='Minimum order value'
          type='number'
          InputLabelProps={{
            shrink: true
          }}
        />
        <TextField
          value='0.0'
          id='outlined-number'
          label='Phone'
          type='number'
          InputLabelProps={{
            shrink: true
          }}
        />
        <TextField
          label='Admin comments'
          placeholder='MultiLine with rows: 2 and rowsMax: 4'
          multiline
          rows={2}
          maxRows={4}
        />
      </Box>
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

export default CustomerDetails
