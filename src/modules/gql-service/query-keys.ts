import { gql } from '@apollo/client'

export const QUERY_KEYS = {
  locations: gql`
    query GetLocations {
      locations {
        id
        name
        description
        photo
      }
    }
  `,
}
