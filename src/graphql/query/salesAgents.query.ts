import { gql } from '@apollo/client'

export const GetAllSalesAgents = gql`
  query SalesAgents {
    salesAgents {
      message
      statusCode
      graphdata {
        userId
        storeName
        email
      }
    }
  }
`

export const GetAllSalesChannel = gql`
  query AllSalesChannel {
    allSalesChannel {
      message
      statusCode
      graphdata {
        id
        name
        isDeleted
      }
    }
  }
`
export const GetStoreType = gql`
  query AllStoreType {
    allStoreType {
      message
      statusCode
      graphdata {
        id
        name
        isDeleted
      }
    }
  }
`
