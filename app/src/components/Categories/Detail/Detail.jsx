import { useParams } from 'react-router-dom'
import { useRef, useEffect } from 'react'
import { useLoadInfo } from '../../../hooks/useLoadInfo'

export default function Detail() {
  const { name } = useParams()
  const { data, loading, hasMore, loadMore } = useLoadInfo(name)
  const observerRef = useRef()

  useEffect(() => {
    if (loading) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMore()
        }
      }
    )

    if (observerRef.current) observer.observe(observerRef.current)

    return () => {
      if (observerRef.current) 
        observer.unobserve(observerRef.current)
    }
  }, [loading, hasMore, loadMore])

  return (
    <div>
      <h2>Информация для категории {name}</h2>
      {data.map((item) => (
        <div key={item.id}>
          <p>{item.name}</p>
        </div>
      ))}
      <div ref={observerRef} style={{ height: '20px' }} />
      {loading && <p>Загрузка...</p>}
      {!hasMore && <p>Все данные загружены</p>}
    </div>
  )
}
