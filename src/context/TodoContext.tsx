import {createContext, useContext, useReducer, useCallback} from "react";
import type {ReactNode} from "react";
import type {
 Todo,
 TodoState,
 TodoStats,
 CreateTodoData,
 UpdateTodoData,
} from "../types/todo";
import {todoService} from "../services/todoService";
import {format, parseISO} from "date-fns";

interface TodoContextType extends TodoState {
 addTodo: (todoData: CreateTodoData) => Promise<void>;
 updateTodo: (id: string, updates: UpdateTodoData) => Promise<void>;
 deleteTodo: (id: string) => Promise<void>;
 toggleTodo: (id: string) => Promise<void>;
 fetchTodos: (page?: number) => Promise<void>;
 getStats: () => TodoStats;
 getTodosByDate: () => Record<string, Todo[]>;
 clearError: () => void;
}

type TodoAction =
 | {type: "SET_LOADING"; payload: boolean}
 | {type: "SET_TODOS"; payload: Todo[]}
 | {type: "ADD_TODO"; payload: Todo}
 | {type: "UPDATE_TODO"; payload: {id: string; todo: Todo}}
 | {type: "DELETE_TODO"; payload: string}
 | {type: "SET_ERROR"; payload: string | null}
 | {type: "SET_PAGE"; payload: number}
 | {type: "SET_TOTAL_COUNT"; payload: number}
 | {type: "CLEAR_ERROR"};

const initialState: TodoState = {
 todos: [],
 loading: false,
 error: null,
 currentPage: 1,
 totalCount: 0,
};

function todoReducer(state: TodoState, action: TodoAction): TodoState {
 switch (action.type) {
  case "SET_LOADING":
   return {...state, loading: action.payload};
  case "SET_TODOS":
   return {...state, todos: action.payload, loading: false};
  case "ADD_TODO":
   return {
    ...state,
    todos: [action.payload, ...state.todos],
    totalCount: state.totalCount + 1,
    loading: false,
   };
  case "UPDATE_TODO":
   return {
    ...state,
    todos: state.todos.map((todo) =>
     todo.id === action.payload.id ? action.payload.todo : todo
    ),
    loading: false,
   };
  case "DELETE_TODO":
   return {
    ...state,
    todos: state.todos.filter((todo) => todo.id !== action.payload),
    totalCount: state.totalCount - 1,
    loading: false,
   };
  case "SET_ERROR":
   return {...state, error: action.payload, loading: false};
  case "SET_PAGE":
   return {...state, currentPage: action.payload};
  case "SET_TOTAL_COUNT":
   return {...state, totalCount: action.payload};
  case "CLEAR_ERROR":
   return {...state, error: null};
  default:
   return state;
 }
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export function TodoProvider({children}: {children: ReactNode}) {
 const [state, dispatch] = useReducer(todoReducer, initialState);

 const fetchTodos = useCallback(async (page: number = 1) => {
  try {
   dispatch({type: "SET_LOADING", payload: true});
   dispatch({type: "CLEAR_ERROR"});

   const skip = (page - 1) * 100;
   const response = await todoService.getTodos({skip, limit: 100});

   if (response.success && response.data) {
    dispatch({type: "SET_TODOS", payload: response.data});
    dispatch({type: "SET_PAGE", payload: page});
    // Note: Backend doesn't return total count, using todos.length for now
    dispatch({type: "SET_TOTAL_COUNT", payload: response.data.length});
   } else {
    throw new Error(response.message || "Failed to fetch todos");
   }
  } catch (error: any) {
   const errorMessage =
    error?.response?.data?.message || error?.message || "Failed to fetch todos";
   dispatch({type: "SET_ERROR", payload: errorMessage});
  }
 }, []);

 const addTodo = async (todoData: CreateTodoData) => {
  try {
   dispatch({type: "SET_LOADING", payload: true});
   dispatch({type: "CLEAR_ERROR"});

   const response = await todoService.createTodo(todoData);

   if (response.success && response.data) {
    dispatch({type: "ADD_TODO", payload: response.data});
   } else {
    throw new Error(response.message || "Failed to create todo");
   }
  } catch (error: any) {
   const errorMessage =
    error?.response?.data?.message || error?.message || "Failed to create todo";
   dispatch({type: "SET_ERROR", payload: errorMessage});
   throw error;
  }
 };

 const updateTodo = async (id: string, updates: UpdateTodoData) => {
  try {
   dispatch({type: "SET_LOADING", payload: true});
   dispatch({type: "CLEAR_ERROR"});

   const response = await todoService.updateTodo(id, updates);

   if (response.success && response.data) {
    dispatch({type: "UPDATE_TODO", payload: {id, todo: response.data}});
   } else {
    throw new Error(response.message || "Failed to update todo");
   }
  } catch (error: any) {
   const errorMessage =
    error?.response?.data?.message || error?.message || "Failed to update todo";
   dispatch({type: "SET_ERROR", payload: errorMessage});
   throw error;
  }
 };

 const toggleTodo = async (id: string) => {
  try {
   dispatch({type: "SET_LOADING", payload: true});
   dispatch({type: "CLEAR_ERROR"});

   const response = await todoService.toggleTodoCompletion(id);

   if (response.success && response.data) {
    dispatch({type: "UPDATE_TODO", payload: {id, todo: response.data}});
   } else {
    throw new Error(response.message || "Failed to toggle todo");
   }
  } catch (error: any) {
   const errorMessage =
    error?.response?.data?.message || error?.message || "Failed to toggle todo";
   dispatch({type: "SET_ERROR", payload: errorMessage});
   throw error;
  }
 };

 const deleteTodo = async (id: string) => {
  try {
   dispatch({type: "SET_LOADING", payload: true});
   dispatch({type: "CLEAR_ERROR"});

   const response = await todoService.deleteTodo(id);

   if (response.success) {
    dispatch({type: "DELETE_TODO", payload: id});
   } else {
    throw new Error(response.message || "Failed to delete todo");
   }
  } catch (error: any) {
   const errorMessage =
    error?.response?.data?.message || error?.message || "Failed to delete todo";
   dispatch({type: "SET_ERROR", payload: errorMessage});
   throw error;
  }
 };

 const getStats = (): TodoStats => {
  const total = state.todos.length;
  const completed = state.todos.filter((todo) => todo.completed).length;
  const uncompleted = total - completed;

  // Calculate on-time vs overtime completions
  const completedTodos = state.todos.filter((todo) => todo.completed);
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

 const getTodosByDate = (): Record<string, Todo[]> => {
  const todosByDate: Record<string, Todo[]> = {};

  state.todos.forEach((todo) => {
   const dateKey = format(parseISO(todo.created_at), "yyyy-MM-dd");
   if (!todosByDate[dateKey]) {
    todosByDate[dateKey] = [];
   }
   todosByDate[dateKey].push(todo);
  });

  // Sort dates in descending order
  const sortedDates = Object.keys(todosByDate).sort((a, b) =>
   b.localeCompare(a)
  );
  const sortedTodosByDate: Record<string, Todo[]> = {};

  sortedDates.forEach((date) => {
   sortedTodosByDate[date] = todosByDate[date];
  });

  return sortedTodosByDate;
 };

 const clearError = () => {
  dispatch({type: "CLEAR_ERROR"});
 };

 const value: TodoContextType = {
  ...state,
  addTodo,
  updateTodo,
  deleteTodo,
  toggleTodo,
  fetchTodos,
  getStats,
  getTodosByDate,
  clearError,
 };

 return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
}

export function useTodos() {
 const context = useContext(TodoContext);
 if (context === undefined) {
  throw new Error("useTodos must be used within a TodoProvider");
 }
 return context;
}
