import { useDispatch, useSelector } from 'react-redux';
import { toggleFilter, selectFilter } from '../store/taskSlice';
import { RootState } from '../store/configureStore';

export const Filter = () => {
    const dispatch = useDispatch();
    const isFilterEnabled = useSelector(selectFilter); // Используем селектор напрямую

    return (
        <button onClick={() => dispatch(toggleFilter())}>
            {isFilterEnabled ? 'Показать все' : 'Скрыть выполненные'}
        </button>
    );
};