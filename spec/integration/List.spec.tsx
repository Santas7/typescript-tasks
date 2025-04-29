import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from 'react-redux';
import { store } from '../../src/store/configureStore';
import { App } from "../../src/App";
import { addTask, taskListSlice } from "../../src/store/taskSlice";

describe('Список задач', () => {
    beforeEach(() => {
        store.dispatch({
            type: `${taskListSlice.name}/reset`,
            payload: undefined,
        });

        taskListSlice.reducer(undefined, { type: `${taskListSlice.name}/reset` });

        // 10 невыполненных задач
        for (let i = 1; i <= 10; i++) {
            store.dispatch(addTask(`Задача ${i}`));
        }

        render(
            <Provider store={store}>
                <App />
            </Provider>
        );
    });

    it('не позволяет добавить больше 10 невыполненных задач', () => {
        expect(screen.getAllByRole('listitem')).toHaveLength(10);

        // поиск поля ввода по data-testid
        const input = screen.getByTestId('input-field');
        fireEvent.change(input, { target: { value: 'Новая задача 11' } });

        const addButton = screen.getByRole('button', { name: /добавить/i });
        expect(addButton).toBeDisabled();
        expect(screen.queryByText(/Новая задача 11/i)).not.toBeInTheDocument();
    });
});