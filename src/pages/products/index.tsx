import AddIcon from '@mui/icons-material/Add'
import { Button } from '@mui/material'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import ProductsTale from 'src/views/tables/ProductsTale'
import Card from '@mui/material/Card'

const MUITable = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Link href='/products/new' color='inherit'>
          <Button
            sx={{
              backgroundColor: '#000000',
              marginBottom: 7,
              '&:hover': {
                backgroundColor: 'white',
                color: '#000000'
              }
            }}
            variant='contained'
          >
            <AddIcon /> New product
          </Button>
        </Link>
        <Grid item xs={12}>
          <Card>
            <ProductsTale />
          </Card>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default MUITable
