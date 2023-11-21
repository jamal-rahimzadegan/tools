import { PropsWithChildren } from 'react'
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
  QueryFunction,
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from 'react-query'

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
  readonly queryClient: QueryClient
  private readonly queryCache: QueryCache

  constructor() {
    this.queryClient = new QueryClient()
    this.queryCache = new QueryCache()
  }

  wrapProvider = ({ children }: PropsWithChildren) => (
    <QueryClientProvider client={this.queryClient}>
      {children}
    </QueryClientProvider>
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
    await this.queryClient.invalidateQueries(queryKey)
  }

  async clearCache(cb?: Function) {
    await this.queryClient.invalidateQueries()
    cb?.()
  }
}

const querySvc = new ReactQueryService()
const QueryProvider = querySvc.wrapProvider
const useReactQuery = querySvc.wrapUseQuery

export { querySvc, QueryProvider, useReactQuery }
