import { gql } from '@apollo/client'

export const GetAllCategoriesWithSubCategories = gql`
  query AllCategoriesWithSubCategories {
    allCategoriesWithSubCategories {
      message
      statusCode
      graphdata {
        categoryId
        categoryName
        subCategories {
          categoryId
          subCategoryId
          subCategoryName
        }
      }
    }
  }
`
