// ** MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'

// ** Demo Components Imports
import { Button } from '@mui/material'

const MUITable = () => {
  return (
    <Grid container spacing={6}>
      <Link href='/product-categories' color='inherit'>
        <Button variant='contained'>add new items</Button>
      </Link>

      <Grid item xs={12}>
        <Card>
          <CardHeader title='Tools' titleTypographyProps={{ variant: 'h6' }} />
        </Card>
      </Grid>
    </Grid>
  )
}

export default MUITable
