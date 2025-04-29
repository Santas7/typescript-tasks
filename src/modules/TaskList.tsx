import { useSelector, useDispatch } from 'react-redux';
import { List } from '../components/List';
import { Empty } from '../components/Empty';
import { Filter } from '../components/Filter';
import { selectFilteredTasks, deleteTask, toggleTask } from '../store/taskSlice';

export const TaskList = () => {
    const dispatch = useDispatch();
    const tasks = useSelector(selectFilteredTasks);

    const handleDelete = (id: string) => {
        dispatch(deleteTask(id));
    };

    const handleToggle = (id: string) => {
        dispatch(toggleTask(id));
    };

    return (
        <div className="task-list">
            <Filter />
            {tasks.length === 0 ? (
                <Empty />
            ) : (
                <List items={tasks} onDelete={handleDelete} onToggle={handleToggle} />
            )}
        </div>
    );
};