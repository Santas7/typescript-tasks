import { render, screen, within } from '@testing-library/react';
import { List } from '../../src/components/List';

describe('List', () => {
    const mockOnDelete = jest.fn();
    const mockOnToggle = jest.fn();

    it('отображает все переданные задачи', () => {
        const tasks = [
            { id: '1', header: 'Задача 1', done: false },
            { id: '2', header: 'Задача 2', done: false },
            { id: '3', header: 'Задача 3', done: false },
            { id: '4', header: 'Задача 4', done: false },
            { id: '5', header: 'Задача 5', done: false },
            { id: '6', header: 'Задача 6', done: false },
            { id: '7', header: 'Задача 7', done: false },
            { id: '8', header: 'Задача 8', done: false },
            { id: '9', header: 'Задача 9', done: false },
            { id: '10', header: 'Задача 10', done: false },
            { id: '11', header: 'Задача 11', done: false },
            { id: '12', header: 'Задача 12', done: true },
        ];

        render(<List items={tasks} onDelete={mockOnDelete} onToggle={mockOnToggle} />);

        const taskList = screen.getByRole('list');
        expect(screen.getAllByRole('listitem')).toHaveLength(12);

        // точное совпадение текста внутри списка
        expect(within(taskList).getByText('Задача 1')).toBeInTheDocument();
        expect(within(taskList).getByText('Задача 10')).toBeInTheDocument();
        expect(within(taskList).getByText('Задача 11')).toBeInTheDocument();
        expect(within(taskList).getByText('Задача 12')).toBeInTheDocument();
    });
});