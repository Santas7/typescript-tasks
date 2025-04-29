import { render, screen } from "@testing-library/react";
import { Notifier } from "../../src/components/Notifier";

describe('Оповещение при выполнении задачи', () => {
    
    beforeAll(() => {
        jest.useFakeTimers();
    });

    afterAll(() => {
        jest.useRealTimers();
    });

    beforeEach(() => {
        jest.clearAllMocks();
        jest.clearAllTimers();
    });

    it('появляется и содержит заголовок задачи', () => {
        const taskName = "Выполненная задача";
        const onClose = jest.fn();

        const { rerender } = render(<Notifier open={false} task={taskName} onClose={onClose} />);

        expect(screen.queryByText(taskName)).not.toBeInTheDocument();

        rerender(<Notifier open={true} task={taskName} onClose={onClose} />);

        expect(screen.getByText(taskName)).toBeInTheDocument();

        jest.advanceTimersByTime(2000);
        expect(onClose).toHaveBeenCalledTimes(1);

        rerender(<Notifier open={false} task={taskName} onClose={onClose} />);

        expect(screen.queryByText(taskName)).not.toBeInTheDocument();
    });

    it('одновременно может отображаться только одно', () => {
        const firstTask = "Первая задача";
        const secondTask = "Вторая задача";
        const onCloseFirst = jest.fn();
        const onCloseSecond = jest.fn();

        const { rerender } = render(<Notifier open={true} task={firstTask} onClose={onCloseFirst} />);

        expect(screen.getByText(firstTask)).toBeInTheDocument();

        rerender(<Notifier open={true} task={secondTask} onClose={onCloseSecond} />);

        expect(screen.getByText(secondTask)).toBeInTheDocument();
        expect(screen.queryByText(firstTask)).not.toBeInTheDocument();

        jest.advanceTimersByTime(2000);
        expect(onCloseSecond).toHaveBeenCalledTimes(1);
        expect(onCloseFirst).not.toHaveBeenCalled();

        rerender(<Notifier open={false} task={secondTask} onClose={onCloseSecond} />);

        expect(screen.queryByText(secondTask)).not.toBeInTheDocument();
    });
});