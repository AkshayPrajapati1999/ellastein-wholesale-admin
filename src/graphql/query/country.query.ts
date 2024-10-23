import { DocumentNode, gql } from '@apollo/client'

export const getCountry = (): DocumentNode => {
  return gql`
    query Country {
      country {
        message
        statusCode
        graphdata {
          id
          name
          countryCode
        }
      }
    }
  `
}

export const getState = (countryId: number): DocumentNode => {
  return gql`
    query State {
      state(countryId: ${countryId}) {
        message
        statusCode
        graphdata {
          id
          name
        }
      }
    }
  `
}

export const getCity = (stateId: number): DocumentNode => {
  return gql`
    query City {
      city(stateId: ${stateId}) {
        message
        statusCode
        graphdata {
          id
          name
        }
      }
    }
  `
}
