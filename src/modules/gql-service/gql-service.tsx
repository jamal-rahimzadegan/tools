import { PropsWithChildren } from 'react'
import { QueryHookOptions } from '@apollo/client/react/types/types'
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
  useQuery,
} from '@apollo/client'
import { QUERY_KEYS } from './query-keys'

class GqlService {
  readonly client: ApolloClient<any>

  constructor() {
    this.client = new ApolloClient({
      cache: new InMemoryCache(),
      link: createHttpLink({
        uri: 'https://flyby-router-demo.herokuapp.com/',
      }),
    })
  }

  readonly Provider = ({ children }: PropsWithChildren) => {
    return <ApolloProvider client={this.client}>{children}</ApolloProvider>
  }
}

function useApolloQuery(
  key: keyof typeof QUERY_KEYS,
  variables: QueryHookOptions<any>,
) {
  return useQuery(QUERY_KEYS[key], {
    skip: false,
    onError: console.error,
    ...variables,
  })
}

const gqlSvc = new GqlService()
const GqlProvider = gqlSvc.Provider

export { gqlSvc, GqlProvider, useApolloQuery }
