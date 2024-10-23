/* eslint-disable @next/next/link-passhref */
import { useQuery } from '@apollo/client'
import { Box, Button, Typography } from '@mui/material'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Link from 'next/link'
import { PendingUser } from 'src/graphql/query/customer.query'
import CustomerTable from 'src/views/tables/CustomerTable'
import * as styles from '../customer'

const MUITable = () => {
  const { data, loading, error } = useQuery(PendingUser)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Box style={styles.headerContainer()}>
          <Box>
            <Typography style={styles.title()}>Customers</Typography>
          </Box>
          <Box style={styles.buttonsContainer()}>
            <Link href='/customers/pending-customer'>
              <Button
                variant='contained'
                sx={{
                  backgroundColor: 'white',
                  boxShadow: 'none',
                  marginLeft: '20px',
                  color: '#4C4A54',
                  '&:hover': styles.pendingButtonHover()
                }}
              >
                Pending Customers
                <Box sx={styles.badge()}>{data?.pendingCustomerList?.totalCount}</Box>
              </Button>
            </Link>
            <Link href='/customers/new'>
              <Button
                variant='contained'
                sx={{
                  backgroundColor: 'white',
                  boxShadow: 'none',
                  marginLeft: '20px',
                  color: '#4C4A54',
                  '&:hover': styles.addButtonHover()
                }}
              >
                Add New Customer
              </Button>
            </Link>
          </Box>
        </Box>
        <Card>
          <CustomerTable />
        </Card>
      </Grid>
    </Grid>
  )
}

export default MUITable
