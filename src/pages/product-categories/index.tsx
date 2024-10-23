import AddIcon from '@mui/icons-material/Add'
import { Button, Link } from '@mui/material'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Grid from '@mui/material/Grid'

// ** Demo Components Imports

import ProductCategoryTable from 'src/views/tables/ProductCategoryTable'

const MUITable = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Link href='/product-categories/new'>
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
            <AddIcon /> New category
          </Button>
        </Link>
      </Grid>

      <Grid item xs={12}>
        <Card>
          <CardHeader title='Product Category' titleTypographyProps={{ variant: 'h6' }} />
          <ProductCategoryTable />
        </Card>
      </Grid>
    </Grid>
  )
}

export default MUITable
