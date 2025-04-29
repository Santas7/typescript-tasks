import { render, screen, fireEvent, within } from "@testing-library/react"; 
import { Provider } from 'react-redux';
import { store } from '../../src/store/configureStore';
import { App } from "../../src/App";
import { addTask, toggleTask, taskListSlice } from "../../src/store/taskSlice";


const setupTasks = () => {
    store.dispatch(addTask("купить хлеб"));
    store.dispatch(addTask("купить молоко"));
    store.dispatch(addTask("выгулять собаку"));
    const tasks = store.getState().taskList.list;
    const lastTaskId = tasks[tasks.length - 1].id;
    store.dispatch(toggleTask(lastTaskId));
};

describe('Список задач', () => {
    beforeEach(() => {
        store.dispatch({
            type: `${taskListSlice.name}/reset`,
            payload: undefined,
        });
        taskListSlice.reducer(undefined, { type: `${taskListSlice.name}/reset` });

        setupTasks(); 
        render(
            <Provider store={store}>
                <App />
            </Provider>
        );
    });

    it('с включенным фильтром', () => {
        const filterButton = screen.getByText(/Скрыть выполненные/i);
        fireEvent.click(filterButton);

        store.dispatch({ type: 'taskList/clearNotification' });

        const taskList = screen.getByRole('list');
        expect(within(taskList).queryByText(/выгулять собаку/i)).not.toBeInTheDocument();
        expect(within(taskList).getByText(/купить хлеб/i)).toBeInTheDocument();
        expect(within(taskList).getByText(/купить молоко/i)).toBeInTheDocument();
    });

    it('с выключенным фильтром', () => {
        const filterButton = screen.getByText(/Скрыть выполненные/i);
        fireEvent.click(filterButton); 
        expect(screen.getByText(/Показать все/i)).toBeInTheDocument(); 
        fireEvent.click(screen.getByText(/Показать все/i)); 

        const taskList = screen.getByRole('list');
        expect(within(taskList).getByText(/выгулять собаку/i)).toBeInTheDocument();
        expect(within(taskList).getByText(/купить хлеб/i)).toBeInTheDocument();
        expect(within(taskList).getByText(/купить молоко/i)).toBeInTheDocument();
    });

    it('не отображает новую выполненную задачу с включенным фильтром', () => {
        const filterButton = screen.getByText(/Скрыть выполненные/i);
        fireEvent.click(filterButton); 

        const input = screen.getByPlaceholderText(/например, введите "купить молоко"/i);
        fireEvent.change(input, { target: { value: 'Новая выполненная задача' } });
        const addButton = screen.getByRole('button', { name: /добавить/i });
        fireEvent.click(addButton);

        const checkbox = screen.getByRole('checkbox', { name: /Новая выполненная задача/i });
        fireEvent.click(checkbox);

        const taskList = screen.getByRole('list');
        expect(within(taskList).queryByText(/Новая выполненная задача/i)).not.toBeInTheDocument();
    });
});