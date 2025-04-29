import { render, screen } from "@testing-library/react";
import { Notifier } from "../../src/components/Notifier";

describe('Окно оповещения', () => {

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

    it('автоматически исчезает с экрана через 2 секунды', () => {
        const onClose = jest.fn();
        const taskName = "Любая задача";
        const { rerender } = render(<Notifier open={true} task={taskName} onClose={onClose} />);
        expect(screen.getByText(taskName)).toBeInTheDocument();
        jest.advanceTimersByTime(2000);
        expect(onClose).toHaveBeenCalledTimes(1);
        rerender(<Notifier open={false} task={taskName} onClose={onClose} />);
        expect(screen.queryByText(taskName)).not.toBeInTheDocument();
    });
});