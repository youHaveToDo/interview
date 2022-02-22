# React Query와 상태관리
- zero-config
- 원하면 언제든 config

## 세 가지 core 컨셉
- Queries
- Mutations
- Query Invalidation

### ✅컨셉 - Queries
CRUD 중 Reading에만 사용하며, 데이터 Fetching용으로 사용한다.

```javascript
import { useQuery } from 'react-query'

// useQuery(Query Key, Query Function)

function App() {
  const info = useQuery('todos', fetchTodoList)
}
```

#### Query Key 설명
Key, Value 맵핑 구조로 Query Key에 따라 query caching을 관리합니다.

#### Query Function 설명
Promise를 반환하는 함수

#### useQuery() 설명
```javascript
const {
  data,
  error,
  isFetching,
  status,
  isLoading,
  isSuccess,
  isLoading,
  refetch,
  remove,
  etc  
} = useQuery(queryKey, queryFn)
```

- data: 마지막으로 성공한 resolved된 데이터 (Response)
- error: 에러가 발생했을 때 반환되는 객체
- isFetching: Request가 in-flight 중일 때 true
- status, isLoading, isSuccess, isLoading 등등: 모두 현재 query의 상태
- refetch: 해당 query refetch하는 함수 제공
- remove: 해당 query cache에서 지우는 함수 제공
- etc

#### useQuery Option
다양한 Option 인터페이스 제공
```javascript
} = useQuery(queryKey, queryFn?, {
  cacheTime,
  enabled,
  initialData,
  initialDataUpdateAt,
  isDataEqual,
  // ...
})
```

### ✅컨셉 - Mutations
데이터 updating시 사용되며, CRUD중 Create/Update/Delete에 모두 사용됨
```javascript
const mutation = useMutation(newTodo => {
  return axios.post('/todos', newTodo)
})
```

#### useMutation()
```javascript
const {
  data,
  error,
  isError,
  isIdle,
  isLoading,
  isPaused,
  isSuccess,
  mutate,
  mutateAsync,
  reset,
  status  
} = useMutation(mutationFn, {})
```

- mutate: mutation을 실행하는 함수 (자동으로 실행되지 않기 때문)
- mutateAsync: mutate와 비슷 But Promise 반환
- reset: mutation 내부 상태 clean

#### useMutation Option
```javascript
} = useMutation(mutationFn, {
  mutationKey,
  onError,
  onMutate,
  onSettled,
  onSuccess,
  retry,
  retryDelay,
  useErrorBoundary,
  meta
})
```

- onMutate: 본격적인 Mutation 동작 전에 먼저 동작하는 함수, Optimistic update 적용 할 때 유용

### ✅컨셉 - Query Invalidation
- 간단히 queryClient를 통해 invalidate 메소드를 호출하면 끝
```javascript
queryClient.invalidateQueries()
queryClient.invalidateQueries('todos')
```
- 이러면 해당 Key를 가진 query는 stale 취급되고, 현재 rendering 되고 있는 query들은 백그라운드에서 refetch된다.


# Caching하고 Synchronization은?