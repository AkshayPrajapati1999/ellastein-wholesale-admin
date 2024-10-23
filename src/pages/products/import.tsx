// ** MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Grid from '@mui/material/Grid'

const MUITable = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Imports' titleTypographyProps={{ variant: 'h6' }} />
        </Card>
      </Grid>
    </Grid>
  )
}

export default MUITable
