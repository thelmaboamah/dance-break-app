import { useEffect, useState } from "react";

import {
  createClient,
  REALTIME_LISTEN_TYPES,
  REALTIME_POSTGRES_CHANGES_LISTEN_EVENT,
} from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
);

export default function App2() {
  const [todos, setTodos] = useState([]);

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const newTodo = formData.get("todo");

    await supabase.from("todos").insert({ item: newTodo });
  }

  useEffect(() => {
    const todosChannel = supabase.channel("todos");
    // Subscribe to "todos" channel for PostgreSQL changes (INSERT events)
    todosChannel.on(
      REALTIME_LISTEN_TYPES.POSTGRES_CHANGES,
      {
        event: REALTIME_POSTGRES_CHANGES_LISTEN_EVENT.INSERT,
        schema: "public",
        table: "todos",
      },
      (payload) => {
        const { new: newTodo } = payload;
        setTodos((todos) => [...todos, newTodo]);
      },
    );

    // Start listening for changes
    todosChannel.subscribe();

    return () => {
      todosChannel.unsubscribe();
    };
  }, [todos]);

  useEffect(() => {
    async function fetchTodos() {
      const { data, error } = await supabase.from("todos").select("*");
      if (error) {
        console.log(error);
      } else {
        setTodos(data);
      }
    }

    fetchTodos();
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="todo" />
        <button>Add</button>
      </form>
      {!todos.length && (
        <div>
          <p>Enter to dos</p>
        </div>
      )}
      {todos && (
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>{todo.item}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
