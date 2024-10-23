import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

import { useQuery } from '@apollo/client'
import { PendingUser } from 'src/graphql/query/customer.query'
import PendingCustomerTable from 'src/views/tables/PendingcustomerTable'

const PendingCustomers = () => {
  const { loading, error, data } = useQuery(PendingUser)
  const PendingCustomer = data?.pendingCustomerList?.graphdata

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    <>
      <Grid container spacing={9}>
        <Grid item xs={12}>
          <Box mb={10}>
            <Typography variant='h6' sx={{ display: 'flex', alignItems: 'center' }}>
              <KeyboardArrowLeftIcon /> Pending Customers
            </Typography>
          </Box>
          <Card>
            <PendingCustomerTable PendingCustomer={PendingCustomer} />
          </Card>
        </Grid>
      </Grid>
    </>
  )
}

export default PendingCustomers
