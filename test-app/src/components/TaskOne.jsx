import { useFetch } from '../hooks/useFetch/useFetch.js';

export default function TaskOne() {
  const {
    data,
    isLoading,
    error,
    refetch
  } = useFetch('https://jsonplaceholder.typicode.com/posts');
	
  return (
    <div>
      <div>
        <button onClick={() => refetch({
          params: {
            _limit: 5
          }
        })}>
          Перезапросить
        </button>
      </div>
      {isLoading && 'Загрузка...'}
      {error && 'Произошла ошибка'}
      {data && !isLoading && data.map(item => <div key={item.id}>{item.title}</div>) }
    </div>
  );
}