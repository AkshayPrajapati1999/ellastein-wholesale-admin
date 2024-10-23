import { gql } from '@apollo/client'

export const GetAllProduct = gql`
  query AdminProductListingResponse($page: Int!, $count: Int!) {
    adminProductListingResponse(page: $page, count: $count) {
      message
      statusCode
      totalPages
      totalProductsCount
      graphdata {
        productImage
        productCode
        productName
        categoryName
        quantity
        isActive
        wholesalePrice
        price
        createdAt
        updatedAt
      }
    }
  }
`

export const ProductOptionValue = gql`
  query ProductOptionsValue($productVariantOptionId: Int!) {
    productOptionsValue(productVariantOptionId: $productVariantOptionId) {
      message
      statusCode
      graphdata {
        id
        productVariantOptionId
        name
        isDeleted
      }
    }
  }
`

// export const GetAllProduct = gql`
//   query GetAllProducts($categoryId: Int!, $subCategoryId: Int!, $page: Int!, $count: Int!) {
//     products(categoryId: $categoryId, subCategoryId: $subCategoryId, page: $page, count: $count) {
//       totalPages
//       totalProductsCount
//       message
//       statusCode
//       graphdata {
//         productId
//         productImage
//         productPrice
//         variantWholesalePrice
//         productName
//       }
//     }
//   }
// `
