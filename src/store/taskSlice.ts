import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./configureStore";

export interface Task {
    id: string;
    header: string;
    done: boolean;
}

export interface taskListState {
    list: Task[];
    notification: string;
    isFilterEnabled: boolean;
}

const initialState: taskListState = {
    list: [],
    notification: "",
    isFilterEnabled: false,
};

export const taskListSlice = createSlice({
    name: "taskList",
    initialState,
    reducers: {
        addTask: (state, action: PayloadAction<Task["header"]>) => {
            state.list.push({
                id: crypto.randomUUID(),
                header: action.payload,
                done: false,
            });
        },
        completeTask: (state, action: PayloadAction<Task["id"]>) => {
            const task = state.list.find((x) => x.id === action.payload);
            if (task) {
                task.done = true;
            }
        },
        toggleTask: (state, action: PayloadAction<Task["id"]>) => {
            const task = state.list.find((x) => x.id === action.payload);
            if (task) {
                task.done = !task.done;
                if (task.done) {
                    state.notification = `Задача "${task.header}" завершена`;
                }
            }
        },
        deleteTask: (state, action: PayloadAction<Task["id"]>) => {
            state.list = state.list.filter((x) => x.id !== action.payload);
        },
        setNotification: (state, action: PayloadAction<Task["header"]>) => {
            state.notification = `Задача "${action.payload}" завершена`;
        },
        clearNotification: (state) => {
            state.notification = "";
        },
        toggleFilter: (state) => {
            state.isFilterEnabled = !state.isFilterEnabled;
        },
        reset: () => initialState,
    },
});

export const {
    addTask,
    completeTask,
    deleteTask,
    toggleTask,
    clearNotification,
    toggleFilter,
    reset,
} = taskListSlice.actions;

export default taskListSlice.reducer;

// Селекторы
export const tasksSelector = (state: RootState) => state.taskList.list;
export const selectFilter = (state: RootState) => state.taskList.isFilterEnabled;

// Ограничиваем количество невыполненных задач до 10
export const selectFilteredTasks = (state: RootState) => {
    const tasks = tasksSelector(state);
    const isFilterEnabled = selectFilter(state);

    // Разделяем выполненные и невыполненные задачи
    const completedTasks = tasks.filter(task => task.done);
    const uncompletedTasks = tasks.filter(task => !task.done);

    // Ограничиваем количество невыполненных задач до 10
    const limitedUncompletedTasks = uncompletedTasks.slice(0, 10);

    // Объединяем задачи с учетом фильтра
    let filteredTasks = [...limitedUncompletedTasks, ...completedTasks];
    if (isFilterEnabled) {
        filteredTasks = filteredTasks.filter(task => !task.done);
    }

    return filteredTasks;
};

export const fullCount = (state: RootState) => state.taskList.list.length;

export const completeCount = (state: RootState) =>
    state.taskList.list.filter((x) => x.done).length;

export const uncompleteCount = (state: RootState) =>
    state.taskList.list.filter((x) => !x.done).length;

export const getNotification = (state: RootState) =>
    state.taskList.notification;