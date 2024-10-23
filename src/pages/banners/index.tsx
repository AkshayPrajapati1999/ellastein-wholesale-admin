// ** MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'

// ** Demo Components Imports
import AddIcon from '@mui/icons-material/Add'
import { Button } from '@mui/material'
import TableStickyHeader from 'src/views/tables/ProductsTale'

const MUITable = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Link href='/banners/new' color='inherit'>
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
            <AddIcon /> New Banner
          </Button>
        </Link>
        <Card>
          <CardHeader title='Customer List' titleTypographyProps={{ variant: 'h6' }} />
          <TableStickyHeader />
        </Card>
      </Grid>
    </Grid>
  )
}

export default MUITable
