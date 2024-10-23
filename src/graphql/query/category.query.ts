import { DocumentNode, gql } from '@apollo/client'

export const GetAllCategory = gql`
  query AllCategories {
    allCategories {
      message
      statusCode
      graphdata {
        categoryId
        categoryName
        isDeleted
      }
    }
  }
`

export const GetAllSubCategory = (categoryId: number): DocumentNode => gql`
query SubCategoryByCategoryId {
  subCategoryByCategoryId(categoryId: ${categoryId}) {
      message
      statusCode
      graphdata {
          subCategoryId
          categoryId
          subCategoryName
          isDeleted
      }
  }
}
`

export const GetAllProduct = gql`
  query ProductOptions {
    productOptions {
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
