// @ts-ignore
import styles from "../styles/Dashboard.module.css";
import { PassageAuthGuard } from "@passageidentity/passage-react";
import { usePassageUserInfo } from "../hooks";
import LogoutButton from "../components/LogoutButton";
import { createTaskInDb, loginUser, readTasksFromDb } from "../utils/queries";
import { useQuery } from "@tanstack/react-query";
import { 
  createClient,
  REALTIME_LISTEN_TYPES,
  REALTIME_POSTGRES_CHANGES_LISTEN_EVENT
 } from "@supabase/supabase-js";
import AuthRedirect from "../components/AuthRedirect";
import { useState, useEffect } from "react";
import React from "react";

function Dashboard() {
  // const [todos, setTodos] = useState([]);
  const { userInfo, loading } = usePassageUserInfo();
  const [ supaClient, setSupaClient ] = useState();
  const [ isLogged, setIsLogged ] = useState(false);

  useEffect(() => {
    const supabase = createClient(
      import.meta.env.VITE_PUBLIC_SUPABASE_URL,
      import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY,
    );

    setSupaClient(supabase);
    console.log("created supa client ", supaClient)
  }, []);

  useEffect(() => {
    const goToLogin = async (userInfo, supaClient) => {
      setIsLogged(true)
      const data = await loginUser(userInfo, supaClient);
      console.log("client received all this: ", data)
      sessionStorage.setItem("supa_token", data?.token)
    }
  
    if (
      !isLogged &&
      userInfo &&
      supaClient &&
      sessionStorage.getItem("supa_token") === undefined
    ) {
      goToLogin(userInfo, supaClient);
    }
  }, [userInfo, supaClient])

  // useEffect(() => {
  //   const todosChannel = supaClient?.channel("todo");
  //   // Subscribe to "todos" channel for PostgreSQL changes (INSERT events)
  //   todosChannel?.on(
  //     REALTIME_LISTEN_TYPES.POSTGRES_CHANGES,
  //     {
  //       event: REALTIME_POSTGRES_CHANGES_LISTEN_EVENT.INSERT,
  //       schema: "public",
  //       table: "todo",
  //     },
  //     (payload) => {
  //       const { new: newTodo } = payload;
  //       setTodos((todos) => [...todos, newTodo]);
  //     },
  //   );

  //   // Start listening for changes
  //   todosChannel?.subscribe();

  //   return () => {
  //     todosChannel?.unsubscribe();
  //   };
  // }, [todos]);

    // async function handleSubmit(e) {
  //   e.preventDefault();

  //   const formData = new FormData(e.target);
  //   const newTodo = formData.get("todo");

  //   const query = useQuery({
  //     queryKey: ["gettingTasks", userInfo?.id, newTodo],
  //     queryFn: () => createTaskInDb(userInfo.id, newTodo, supaClient),
  //   });
  //   console.log("Query is ", query.data?.task);
  // }


  if (loading) {
    return (
      <div className={styles.dashboard}>
        <div className={styles.title}>Loading</div>
      </div>
    );
  }

  return (
    <PassageAuthGuard unAuthComp={<AuthRedirect />}>
      <div className={styles.dashboard}>
        <div className={styles.title}>Welcome</div>
        <div className={styles.message}>
          You successfully signed in with Passage. This is your homepage. <br />
          <br />
          {/* {todos && 
            <div>
              <form 
              // onSubmit={handleSubmit}
              >
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
          } */}
        </div>
        <LogoutButton />
      </div>
    </PassageAuthGuard>
  );
}

export default Dashboard;
