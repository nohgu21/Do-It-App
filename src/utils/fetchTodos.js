import localforage from 'localforage'

async function fetchMyTodos(page = 1) {
  const response = await fetch(`https://dummyjson.com/todos?limit=0&select=id,todo,completed`)
  if (!response.ok) throw new Error('Failed to fetch')

  const data = await response.json()
  return data.todos ?? []
}

async function fetchCachedTodos(page) {
  const cached = await localforage.getItem(`all-todos`)
  if (cached) return cached

  const response = await fetchMyTodos(page)
  localforage.setItem(`all-todos`, response)
  return response;
}

export { fetchMyTodos, fetchCachedTodos }
