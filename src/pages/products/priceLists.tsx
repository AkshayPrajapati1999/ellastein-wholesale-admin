// ** MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Grid from '@mui/material/Grid'

// ** Demo Components Imports
import PriceListTable from 'src/views/tables/priceListTable'

const MUITable = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Price List' titleTypographyProps={{ variant: 'h6' }} />
          <PriceListTable />
        </Card>
      </Grid>
    </Grid>
  )
}

export default MUITable
