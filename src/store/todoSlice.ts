import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit";
import {format, parseISO} from "date-fns";
import type {
  Todo,
  TodoState,
  TodoStats,
  CreateTodoData,
  UpdateTodoData,
} from "../types/todo";
import {todoService} from "../services/todoService";

type TodoSliceState = TodoState;

const initialState: TodoSliceState = {
  todos: [],
  loading: false,
  error: null,
  currentPage: 1,
  totalCount: 0,
};

export const fetchTodos = createAsyncThunk(
  "todos/fetchTodos",
  async (page: number = 1) => {
    const skip = (page - 1) * 100;
    const response = await todoService.getTodos({skip, limit: 100});

    if (response.success && response.data) {
      return {todos: response.data, page};
    } else {
      throw new Error(response.message || "Failed to fetch todos");
    }
  }
);

export const addTodo = createAsyncThunk(
  "todos/addTodo",
  async (todoData: CreateTodoData) => {
    const response = await todoService.createTodo(todoData);

    if (response.success && response.data) {
      return response.data;
    } else {
      throw new Error(response.message || "Failed to create todo");
    }
  }
);

export const updateTodo = createAsyncThunk(
  "todos/updateTodo",
  async ({id, updates}: {id: string; updates: UpdateTodoData}) => {
    const response = await todoService.updateTodo(id, updates);

    if (response.success && response.data) {
      return {id, todo: response.data};
    } else {
      throw new Error(response.message || "Failed to update todo");
    }
  }
);

export const toggleTodo = createAsyncThunk(
  "todos/toggleTodo",
  async (id: string) => {
    const response = await todoService.toggleTodoCompletion(id);

    if (response.success && response.data) {
      return {id, todo: response.data};
    } else {
      throw new Error(response.message || "Failed to toggle todo");
    }
  }
);

export const deleteTodo = createAsyncThunk(
  "todos/deleteTodo",
  async (id: string) => {
    const response = await todoService.deleteTodo(id);

    if (response.success) {
      return id;
    } else {
      throw new Error(response.message || "Failed to delete todo");
    }
  }
);

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = action.payload.todos;
        state.currentPage = action.payload.page;
        state.totalCount = action.payload.todos.length;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch todos";
      })
      .addCase(addTodo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.todos.unshift(action.payload);
        state.totalCount += 1;
      })
      .addCase(addTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to create todo";
      })
      .addCase(updateTodo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.todos.findIndex(
          (todo) => todo.id === action.payload.id
        );
        if (index !== -1) {
          state.todos[index] = action.payload.todo;
        }
      })
      .addCase(updateTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to update todo";
      })
      .addCase(toggleTodo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleTodo.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.todos.findIndex(
          (todo) => todo.id === action.payload.id
        );
        if (index !== -1) {
          state.todos[index] = action.payload.todo;
        }
      })
      .addCase(toggleTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to toggle todo";
      })
      .addCase(deleteTodo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = state.todos.filter((todo) => todo.id !== action.payload);
        state.totalCount -= 1;
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to delete todo";
      });
  },
});

export const {clearError, setPage} = todoSlice.actions;

export const selectTodos = (state: {todos: TodoSliceState}) => state.todos.todos;
export const selectTodosLoading = (state: {todos: TodoSliceState}) =>
  state.todos.loading;
export const selectTodosError = (state: {todos: TodoSliceState}) =>
  state.todos.error;
export const selectCurrentPage = (state: {todos: TodoSliceState}) =>
  state.todos.currentPage;
export const selectTotalCount = (state: {todos: TodoSliceState}) =>
  state.todos.totalCount;

export const selectTodoStats = (state: {todos: TodoSliceState}): TodoStats => {
  const todos = state.todos.todos;
  const total = todos.length;
  const completed = todos.filter((todo) => todo.completed).length;
  const uncompleted = total - completed;

  const completedTodos = todos.filter((todo) => todo.completed);
  const onTime = completedTodos.filter(
    (todo) =>
      format(parseISO(todo.created_at), "yyyy-MM-dd") ===
      format(parseISO(todo.updated_at), "yyyy-MM-dd")
  ).length;
  const overtime = completed - onTime;

  return {
    total,
    completed,
    uncompleted,
    onTime,
    overtime,
  };
};

export const selectTodosByDate = (
  state: {todos: TodoSliceState}
): Record<string, Todo[]> => {
  const todos = state.todos.todos;
  const todosByDate: Record<string, Todo[]> = {};

  todos.forEach((todo) => {
    const dateKey = format(parseISO(todo.created_at), "yyyy-MM-dd");
    if (!todosByDate[dateKey]) {
      todosByDate[dateKey] = [];
    }
    todosByDate[dateKey].push(todo);
  });

  const sortedDates = Object.keys(todosByDate).sort((a, b) =>
    b.localeCompare(a)
  );
  const sortedTodosByDate: Record<string, Todo[]> = {};

  sortedDates.forEach((date) => {
    sortedTodosByDate[date] = todosByDate[date];
  });

  return sortedTodosByDate;
};

export default todoSlice.reducer;