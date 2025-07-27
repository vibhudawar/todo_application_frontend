export interface Todo {
 id: string;
 user_id: string;
 title: string;
 description: string;
 completed: boolean;
 created_at: string;
 updated_at: string;
}

export interface TodoState {
 todos: Todo[];
 loading: boolean;
 error: string | null;
 currentPage: number;
 totalCount: number;
}

export interface TodoStats {
 total: number;
 completed: number;
 onTime: number; // created_at === updated_at
 overtime: number; // created_at !== updated_at
 uncompleted: number;
}

export interface CreateTodoData {
 title?: string;
 description?: string;
}

export interface UpdateTodoData {
 title?: string;
 description?: string;
 completed?: boolean;
}
