import { gql } from '@apollo/client'

export const GetOrderHistory = gql`
  query OrderHistory {
    orderHistory(fromDate: null, toDate: null, status: null) {
      message
      statusCode
      graphdata {
        id
        orderNumber
        userId
        storeName
        email
        orderDate
        amount
        tax
        totalAmount
        paymentType
        paymentStatus
        isCancel
        isShipped
        orderStatus
        customerCode
        orderFor {
          key
          value
        }
        orderDetails {
          productId
          productName
          productImage
          quantity
          price
          sku
          combinationsData {
            key
            value
          }
        }
      }
    }
  }
`

export const UpdateOrderHistory = gql`
  mutation UpdateOrderStatus($orderId: Int!) {
    updateOrderStatus(orderId: $orderId, orderStatus: COMPLETED) {
      message
      statusCode
    }
  }
`
