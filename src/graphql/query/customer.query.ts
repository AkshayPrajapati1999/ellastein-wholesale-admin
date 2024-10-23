import { DocumentNode, gql } from '@apollo/client'

export const GetAllUser = gql`
  query UserDetail {
    userDetail {
      message
      statusCode
      graphdata {
        userId
        storeName
        email
        phoneNumber
        status
        customerCode
        salesAgentName
        paymentTerms
        location
        openOrders
        lastOrderDate
        lastOrderValue
      }
    }
  }
`

export const PendingUser = gql`
  query PendingCustomerList {
    pendingCustomerList {
      totalCount
      message
      statusCode
      graphdata {
        userId
        status
        storeName
        numberOfDoors
        platformWebsite
        email
        phoneNumber
        primarySalesChannel {
          key
          value
        }
        storeTypes {
          key
          value
        }
      }
    }
  }
`

export const ActiveAndPendingCustomerDetail = (id: string | number) => {
  return gql`
    query ActiveAndPendingCustomerDetail {
      activeAndPendingCustomerDetail(userId: "${id}") {
        message
        statusCode
        graphdata {
          customerCode
          contactPerson
          secondaryEmailId1
          secondaryEmailId2
          secondaryEmailId3
          salesTaxIdOrEinNumber
          instagramLink
          facebookLink
          tiktokLink
          salesAgentId
          customerSince
          paymentTerms
          userId
          status
          storeName
          numberOfDoors
          platformWebsite
          email
          phoneNumber
          userShippingAddress {
            id
               addressLine1
               addressLine2
               cityId
               cityName
               stateId
               stateName
               countryCode
               countryId
               countryName
               postalCode
          }
          primarySalesChannel {
            key
            value
          }
          storeTypes {
            key
            value
          }
        }
      }
    }
  `
}

export const UpdateActiveUserDetail = (): DocumentNode => {
  return gql`
    mutation UpdateActiveUserDetail(
      $userId: String!
      $addressId: Int!
      $contactPerson: String
      $numberOfDoors: Int
      $primarySalesChannel: Int
      $phoneNumber: String
      $storeType: [Int!]!
      $secondaryEmailId1: String
      $secondaryEmailId2: String
      $secondaryEmailId3: String
      $platformWebsite: String
      $instagramLink: String
      $facebookLink: String
      $tiktokLink: String
      $salesAgentId: String!
      $addressLine1: String
      $addressLine2: String
      $cityId: Int!
      $stateId: Int!
      $countryId: Int!
      $countryCode: String
      $postalCode: String
    ) {
      updateActiveUserDetail(
        userId: $userId
        addressId: $addressId
        model: {
          contactPerson: $contactPerson
          numberOfDoors: $numberOfDoors
          phoneNumber: $phoneNumber
          secondaryEmailId1: $secondaryEmailId1
          secondaryEmailId2: $secondaryEmailId2
          secondaryEmailId3: $secondaryEmailId3
          primarySalesChannel: $primarySalesChannel
          platformWebsite: $platformWebsite
          storeType: $storeType
          instagramLink: $instagramLink
          facebookLink: $facebookLink
          tiktokLink: $tiktokLink
          salesAgentId: $salesAgentId
          addressLine1: $addressLine1
          addressLine2: $addressLine2
          cityId: $cityId
          stateId: $stateId
          countryId: $countryId
          countryCode: $countryCode
          postalCode: $postalCode
          customerStatus: ACTIVE
        }
      ) {
        message
        statusCode
      }
    }
  `
}

export const UpdatePendingUserDetail = (): DocumentNode => {
  return gql`
    mutation UpdatePendingUserDetail(
      $userId: String!
      $addressId: Int!
      $storeName: String!
      $customerCode: String!
      $contactPerson: String
      $numberOfDoors: Int!
      $phoneNumber: String!
      $email: String!
      $secondaryEmailId1: String
      $secondaryEmailId2: String
      $secondaryEmailId3: String
      $primarySalesChannel: Int!
      $platformWebsite: String
      $storeType: [Int!]!
      $instagramLink: String
      $facebookLink: String
      $tiktokLink: String
      $salesAgentId: String!
      $paymentTerms: String!
      $salesTaxIdOrEinNumber: String
      $customerSince: DateTime!
      $addressLine1: String!
      $addressLine2: String
      $cityId: Int!
      $stateId: Int!
      $countryId: Int!
      $countryCode: String!
      $postalCode: String!
    ) {
      updatePendingUserDetail(
        userId: $userId
        addressId: $addressId
        model: {
          storeName: $storeName
          customerCode: $customerCode
          contactPerson: $contactPerson
          numberOfDoors: $numberOfDoors
          phoneNumber: $phoneNumber
          email: $email
          secondaryEmailId1: $secondaryEmailId1
          secondaryEmailId2: $secondaryEmailId2
          secondaryEmailId3: $secondaryEmailId3
          primarySalesChannel: $primarySalesChannel
          platformWebsite: $platformWebsite
          storeType: $storeType
          instagramLink: $instagramLink
          facebookLink: $facebookLink
          tiktokLink: $tiktokLink
          salesAgentId: $salesAgentId
          paymentTerms: $paymentTerms
          salesTaxIdOrEinNumber: $salesTaxIdOrEinNumber
          customerSince: $customerSince
          addressLine1: $addressLine1
          addressLine2: $addressLine2
          cityId: $cityId
          stateId: $stateId
          countryId: $countryId
          countryCode: $countryCode
          postalCode: $postalCode
          customerStatus: ACTIVE
        }
      ) {
        message
        statusCode
      }
    }
  `
}

export const CreateCustomerAdminSide = (): DocumentNode => {
  return gql`
    mutation SaveCustomer(
      $storeName: String!
      $email: String!
      $salesAgentId: String
      $numberOfDoors: Int
      $customerCode: String
      $contactPerson: String!
      $secondaryEmailID1: String
      $secondaryEmailID2: String
      $secondaryEmailID3: String
      $salesTaxIdOrEinNumber: String!
      $customerSince: DateTime
      $paymentTerms: String
      $contactNumber: String!
      $primarySalesChannel: Int
      $platformWebsite: String
      $storeType: [Int!]
      $instagramLink: String
      $facebookLink: String
      $tiktokLink: String
      $userMessage: String
      $addressLine1: String!
      $addressLine2: String!
      $cityId: Int!
      $stateId: Int!
      $countryId: Int!
      $countryCode: String!
      $postalCode: String!
    ) {
      saveCustomer(
        createCustomerRequest: {
          storeName: $storeName
          email: $email
          password: "Test@123"
          confirmPassword: "Test@123"
          status: PENDING
          salesAgentId: $salesAgentId
          numberOfDoors: $numberOfDoors
          customerCode: $customerCode
          contactPerson: $contactPerson
          secondaryEmailID1: $secondaryEmailID1
          secondaryEmailID2: $secondaryEmailID2
          secondaryEmailID3: $secondaryEmailID3
          salesTaxIdOrEinNumber: $salesTaxIdOrEinNumber
          customerSince: $customerSince
          paymentTerms: $paymentTerms
          contactNumber: $contactNumber
          primarySalesChannel: $primarySalesChannel
          platformWebsite: $platformWebsite
          storeType: $storeType
          instagramLink: $instagramLink
          facebookLink: $facebookLink
          tiktokLink: $tiktokLink
          userMessage: $userMessage
          userShippingAddress: {
            addressLine1: $addressLine1
            addressLine2: $addressLine2
            cityId: $cityId
            stateId: $stateId
            countryId: $countryId
            countryCode: $countryCode
            postalCode: $postalCode
            isDefault: true
          }
        }
      ) {
        message
        statusCode
      }
    }
  `
}
