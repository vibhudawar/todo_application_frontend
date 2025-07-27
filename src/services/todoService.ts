import api from "./api";
import type {Todo, CreateTodoData, UpdateTodoData} from "../types/todo";
import type {APIResponse, PaginationParams} from "../types/api";

export const todoService = {
 // Get todos with pagination
 async getTodos(params: PaginationParams = {}): Promise<APIResponse<Todo[]>> {
  const {skip = 0, limit = 100} = params;
  const response = await api.get<APIResponse<Todo[]>>(
   `/todos?skip=${skip}&limit=${limit}`
  );
  return response.data;
 },

 // Create new todo
 async createTodo(todoData: CreateTodoData): Promise<APIResponse<Todo>> {
  const response = await api.post<APIResponse<Todo>>("/todos", todoData);
  return response.data;
 },

 // Get todo by ID
 async getTodoById(todoId: string): Promise<APIResponse<Todo>> {
  const response = await api.get<APIResponse<Todo>>(`/todos/${todoId}`);
  return response.data;
 },

 // Update todo
 async updateTodo(
  todoId: string,
  updates: UpdateTodoData
 ): Promise<APIResponse<Todo>> {
  const response = await api.put<APIResponse<Todo>>(
   `/todos/${todoId}`,
   updates
  );
  return response.data;
 },

 // Delete todo
 async deleteTodo(todoId: string): Promise<APIResponse> {
  const response = await api.delete<APIResponse>(`/todos/${todoId}`);
  return response.data;
 },

 // Toggle todo completion
 async toggleTodoCompletion(todoId: string): Promise<APIResponse<Todo>> {
  const response = await api.patch<APIResponse<Todo>>(
   `/todos/${todoId}/toggle`
  );
  return response.data;
 },
};
