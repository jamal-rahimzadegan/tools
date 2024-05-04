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
  readonly client: ApolloClient<unknown>;

  constructor() {
    this.client = new ApolloClient({
      cache: new InMemoryCache(),
      link: createHttpLink({
        uri: "https://flyby-router-demo.herokuapp.com/",
      }),
    });
  }

  readonly Provider = ({ children }: PropsWithChildren) => {
    return <ApolloProvider client={this.client}>{children}</ApolloProvider>;
  };
}

const gqlSvc = new GqlService();
const GqlProvider = gqlSvc.Provider;

function useApolloQuery(
  key: keyof typeof QUERY_KEYS,
  variables?: QueryHookOptions<unknown>
) {
  return useQuery(QUERY_KEYS[key], {
    client: gqlSvc.client,
    skip: false,
    onError: console.error,
    ...variables,
  });
}

export { gqlSvc, GqlProvider, useApolloQuery };

// usage:
// gqlSvc.client
//   .query({
//     query: gql`
//       query GetLocations {
//         locations {
//           id
//           name
//           description
//           photo
//         }
//       }
//     `,
//   })
//   .then((result) => console.log(result));

// or with hooks
// const { data } = useApolloQuery("locations", {});
