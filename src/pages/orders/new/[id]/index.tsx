import { useMutation, useQuery } from '@apollo/client'
import { Box, Button, Card, Divider, Grid, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { GetOrderHistory, UpdateOrderHistory } from 'src/graphql/query/order.query'
import { IOrders } from 'src/models/product.model'

const Index = () => {
  const router = useRouter()
  const { loading, error, data } = useQuery(GetOrderHistory)
  const [updateOrderStatus] = useMutation(UpdateOrderHistory)

  const { id } = router.query

  const intId = parseInt(id as string, 10)

  if (loading) return <p style={{ textAlign: 'center' }}>Loading...</p>
  if (error) return <p style={{ textAlign: 'center' }}>Error: {error.message}</p>

  const orders = data?.orderHistory?.graphdata

  const handleUpdateOrderStatus = (orderId: number) => {
    updateOrderStatus({
      variables: { orderId: orderId },
      onCompleted: data => {
        console.log('Mutation completed:', data)
        router.push('/orders/')
      },
      onError: error => {
        console.error('Mutation error:', error)
      }
    })
  }

  return (
    <div>
      <Grid container spacing={6}>
        <Grid xs={12} sx={{ marginLeft: 6, marginTop: 5, display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant='h5' gutterBottom>
            Order Details
          </Typography>
          <Button variant='contained' onClick={() => handleUpdateOrderStatus(intId)}>
            Update
          </Button>
        </Grid>

        <Grid item xs={12}>
          {orders?.map(
            (item: IOrders) =>
              intId === item.id && (
                <Box key={item.id}>
                  <Card sx={{ gap: 5, margin: 0, padding: 5 }}>
                    {item.orderDetails.map((detail: any, index: number) => (
                      <Box key={index} sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Box sx={{ display: 'flex', gap: '20px' }}>
                          <img
                            style={{ width: '10%', borderRadius: '10%' }}
                            src={detail.productImage}
                            alt={detail.productName}
                          />
                          <Box sx={{ gap: '10px' }}>
                            <Typography variant='subtitle1'>Name : {detail.productName}</Typography>
                            <Typography variant='subtitle1'>Id : {detail.productId}</Typography>
                            <Typography variant='subtitle1'> sku : {detail.sku}</Typography>
                          </Box>
                          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px', marginLeft: 'auto' }}>
                            <Typography variant='subtitle1'>Wholesale Price : ${detail.price}</Typography>
                            <Typography variant='subtitle1'>Quantity : {detail.quantity}</Typography>
                          </Box>
                        </Box>
                        {index !== item.orderDetails.length - 1 && <Divider sx={{ backgroundColor: '#E5E5E5' }} />}
                      </Box>
                    ))}
                  </Card>
                </Box>
              )
          )}
        </Grid>
      </Grid>
    </div>
  )
}

export default Index
