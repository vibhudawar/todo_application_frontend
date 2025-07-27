import {useEffect} from "react";
import {useAppSelector, useAppDispatch} from "../store/hooks";
import {selectUser, logout} from "../store/authSlice";
import {fetchTodos, selectTodos, selectTodosLoading, selectTodosError} from "../store/todoSlice";

export default function TodoPage() {
 const dispatch = useAppDispatch();
 const user = useAppSelector(selectUser);
 const todos = useAppSelector(selectTodos);
 const loading = useAppSelector(selectTodosLoading);
 const error = useAppSelector(selectTodosError);

 useEffect(() => {
  dispatch(fetchTodos(1));
 }, [dispatch]);

 return (
  <div className="min-h-screen bg-background">
   <header className="border-b bg-background/80 backdrop-blur-sm">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
     <div className="flex justify-between items-center py-4">
      <h1 className="text-2xl font-bold">Welcome back, {user?.name}!</h1>
      <button
       onClick={() => dispatch(logout())}
       className="text-sm text-muted-foreground hover:text-foreground"
      >
       Logout
      </button>
     </div>
    </div>
   </header>

   <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
    {loading && <p>Loading todos...</p>}
    {error && <p className="text-red-500">{error}</p>}

    <div className="space-y-4">
     <h2 className="text-xl font-semibold">Your Todos ({todos.length})</h2>

     {todos.length === 0 ? (
      <p className="text-muted-foreground">
       No todos yet. Start by creating your first todo!
      </p>
     ) : (
      <div className="space-y-2">
       {todos.map((todo) => (
        <div key={todo.id} className="border rounded-lg p-4 bg-card">
         <h3
          className={`font-medium ${
           todo.completed ? "line-through text-muted-foreground" : ""
          }`}
         >
          {todo.title || "Untitled"}
         </h3>
         {todo.description && (
          <p className="text-sm text-muted-foreground mt-1">
           {todo.description}
          </p>
         )}
         <p className="text-xs text-muted-foreground mt-2">
          Created: {new Date(todo.created_at).toLocaleDateString()}
         </p>
        </div>
       ))}
      </div>
     )}
    </div>
   </main>
  </div>
 );
}
