import { DocumentNode, gql } from '@apollo/client'

export const GetAllCatalog = gql`
  query AllCatalogs {
    allCatalogs {
      message
      statusCode
      graphdata {
        id
        name
        path
        isDeleted
      }
    }
  }
`

export const DeleteCatalog = (): DocumentNode => {
  return gql`
    mutation DeleteCatalog($id: Int!) {
      deleteCatalog(id: $id) {
        message
        statusCode
      }
    }
  `
}
