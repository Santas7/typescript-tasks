import { useParams } from 'react-router-dom'

export default function Detail() {
  const { id } = useParams()
  return (
    <div>
      <h2>информация для категории {id}</h2>
    </div>
  )
}
