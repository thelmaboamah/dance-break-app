// @ts-ignore
import styles from "../styles/Dashboard.module.css";
import { PassageAuthGuard } from "@passageidentity/passage-react";
import { usePassageUserInfo } from "../hooks";
import { createTaskInDb, loginUser } from "../utils/queries";
import { createClient } from "@supabase/supabase-js";
import AuthRedirect from "../components/AuthRedirect";
import { useState, useEffect } from "react";
import React from "react";
import { Timer } from "../components/Timer";

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
    const tokenInSession = sessionStorage.getItem("supa_token")

    if (
      !isLogged &&
      userInfo &&
      supaClient &&
      //TODO: test again for undefined - seems it doesn't work
      //add logic how to refresh token? 
      (tokenInSession === undefined || tokenInSession === null)
    ) {
      goToLogin(userInfo, supaClient);
    }
  }, [userInfo, supaClient])

  if (loading) {
    return (
      <div className={styles.dashboard}>
        <div className={styles.title}>Loading</div>
      </div>
    );
  }

  return (
    <PassageAuthGuard unAuthComp={<AuthRedirect />} >
      <div className={styles.dashboard}>
        <Timer workDuration={60}/>
      </div>
    </PassageAuthGuard>
  );
}

export default Dashboard;
