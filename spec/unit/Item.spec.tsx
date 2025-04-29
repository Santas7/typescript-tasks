import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { Item } from '../../src/components/Item';

describe('Элемент списка задач', () => {
    const mockOnDelete = jest.fn();
    const mockOnToggle = jest.fn();

    const defaultTask = {
        id: '1',
        header: 'Задача 1',
        done: false,
    };

    beforeEach(() => {
        mockOnDelete.mockClear();
        mockOnToggle.mockClear();
    });

    afterEach(() => {
        cleanup();
    });

    it('название не должно быть больше 32 символов', () => {
        const longHeader = 'Это очень длинное название задачи, которое превышает 32 символа';
        const task = { ...defaultTask, header: longHeader };

        render(<Item {...task} onDelete={mockOnDelete} onToggle={mockOnToggle} />);

        const expectedHeader = longHeader.slice(0, 32) + '...';
        expect(screen.getByText(expectedHeader)).toBeInTheDocument();
        expect(screen.getByRole('checkbox', { name: longHeader })).toBeInTheDocument();
    });

    it('название не должно быть пустым', () => {
        const task = { ...defaultTask, header: '' };

        render(<Item {...task} onDelete={mockOnDelete} onToggle={mockOnToggle} />);

        const label = screen.getByLabelText('');
        expect(label).toBeInTheDocument();

        expect(screen.getByRole('checkbox', { name: '' })).toBeInTheDocument();
    });

    it('нельзя удалять невыполненные задачи', () => {
        const task = { ...defaultTask, done: false };

        render(<Item {...task} onDelete={mockOnDelete} onToggle={mockOnToggle} />);

        const deleteButton = screen.getByRole('button', { name: /удалить/i });
        expect(deleteButton).toBeDisabled();

        fireEvent.click(deleteButton);
        expect(mockOnDelete).not.toHaveBeenCalled();
    });

    it('чекбокс отображает состояние задачи', () => {
       
        const uncompletedTask = { ...defaultTask, done: false };
        const { rerender } = render(<Item {...uncompletedTask} onDelete={mockOnDelete} onToggle={mockOnToggle} />);
        let checkbox = screen.getByRole('checkbox', { name: uncompletedTask.header });
        expect(checkbox).not.toBeChecked();

        const completedTask = { ...defaultTask, done: true };
        rerender(<Item {...completedTask} onDelete={mockOnDelete} onToggle={mockOnToggle} />);
        checkbox = screen.getByRole('checkbox', { name: completedTask.header });
        expect(checkbox).toBeChecked();
    });

    it('при клике на чекбокс вызывается onToggle с правильным id', () => {
        const task = { ...defaultTask, done: false };

        render(<Item {...task} onDelete={mockOnDelete} onToggle={mockOnToggle} />);

        const checkbox = screen.getByRole('checkbox', { name: task.header });
        fireEvent.click(checkbox);

        expect(mockOnToggle).toHaveBeenCalledWith(task.id);
        expect(mockOnToggle).toHaveBeenCalledTimes(1);
    });
});