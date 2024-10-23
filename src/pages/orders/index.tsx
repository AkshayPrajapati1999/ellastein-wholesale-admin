/* eslint-disable @next/next/link-passhref */
import { Box, Typography } from '@mui/material'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Grid from '@mui/material/Grid'
import OrderTable from 'src/views/tables/OrderTable'
import * as styles from '../orderPage'

const MUITable = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Box style={styles.tableHeaderStyle()}>
          <Typography variant='h5'>Orders</Typography>
          {/* <div style={styles.actions()}>
            <Link href='/customers/new'>
              <Button
                variant='contained'
                sx={{
                  backgroundColor: 'white',
                  boxShadow: 'none',
                  marginLeft: '20px',
                  color: '#4C4A54',
                  '&:hover': {
                    backgroundColor: 'white',
                    boxShadow: 'none'
                  }
                }}
              >
                Add New Order
              </Button>
            </Link>
          </div> */}
        </Box>
        <Card>
          <CardHeader title='Orders' titleTypographyProps={{ variant: 'h6' }} />
          <OrderTable />
        </Card>
      </Grid>
    </Grid>
  )
}

export default MUITable
