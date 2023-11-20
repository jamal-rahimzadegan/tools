import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
  QueryFunction,
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from 'react-query'
import { PropsWithChildren } from 'react'

type KeysType = keyof typeof KEYS

type QueryPayload<R> = [
  queryKey: KeysType,
  fetchData: QueryFunction<any>,
  options?: UseQueryOptions<R>,
]

// Note: you may move it to an external file
const KEYS = {
  GET_USER_INFO: 'GET_USER_INFO',
}

class ReactQueryService {
  readonly client: QueryClient
  private readonly cache: QueryCache

  constructor() {
    this.client = new QueryClient()
    this.cache = new QueryCache()
  }

  generateProvider = ({ children }: PropsWithChildren) => (
    <QueryClientProvider client={this.client}>{children}</QueryClientProvider>
  )

  // R stands for the response type
  wrapUseQuery<R>(...payload: QueryPayload<R>): UseQueryResult<R> {
    const [queryKey, fetchData, options] = payload

    return useQuery<R, unknown>(queryKey, fetchData, {
      staleTime: 0,
      ...options,
    })
  }

  async reFetch(queryKey: KeysType) {
    await this.client.invalidateQueries(queryKey)
  }

  async clearCache(cb?: Function) {
    await this.client.invalidateQueries()
    cb?.()
  }
}

const querySvc = new ReactQueryService()
const QueryProvider = querySvc.generateProvider
const useReactQuery = querySvc.wrapUseQuery

export { querySvc, QueryProvider, useReactQuery }
