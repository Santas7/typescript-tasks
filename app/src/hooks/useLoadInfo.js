import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'

export const useLoadInfo = (name) => {
  const [data, setData] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)

  const loadMore = useCallback(() => {
    if (loading || !hasMore) return
    setLoading(true)
    axios
      .get(`https://rickandmortyapi.com/api/${name}?page=${page}`)
      .then((res) => {
        setData((prev) => [...prev, ...res.data.results])
        setHasMore(res.data.info.next !== null)
        setPage((prev) => prev + 1)
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [loading, hasMore, name, page])

  useEffect(() => {
    loadMore()
  }, [loadMore])

  return { 
    data, 
    loading, 
    hasMore, 
    loadMore 
  }
}