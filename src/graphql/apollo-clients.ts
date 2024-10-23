import { ApolloClient, ApolloLink, InMemoryCache, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { parseCookies } from 'nookies'
import { CookieKeys } from 'src/models/cookie.model'
import { environment } from 'src/service/env'

const graphqlEndpoint = environment.graphQl
const httpLink = createHttpLink({
  uri: graphqlEndpoint
})

const authLink = setContext((_, { headers }) => {
  const cookies = parseCookies()
  const accessToken = cookies[CookieKeys.USER_TOKEN]

  return {
    headers: {
      ...headers,
      Authorization: accessToken ? `Bearer ${accessToken}` : ''
    }
  }
})

const link = ApolloLink.from([authLink, httpLink])

const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
})

export default client
