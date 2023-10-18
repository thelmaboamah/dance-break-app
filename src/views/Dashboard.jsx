import styles from "../styles/Dashboard.module.css";
import { PassageAuthGuard } from "@passageidentity/passage-react";
import { usePassageUserInfo } from "../hooks";
import { loginUser } from "../utils/queries";
import { createClient } from "@supabase/supabase-js";
import AuthRedirect from "../components/AuthRedirect";
import LogoutButton from "../components/LogoutButton";
import { useState, useEffect } from "react";
import { Timer } from "../components/Timer";

function Dashboard() {
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
        <div className="font-dmSans text-h1-regular">Welcome to</div>
        <div className="font-dmSans text-h1-bold">Dance Break</div>
        <div className="font-dmSans text-body py-[24px]">
          You successfully signed in with Passage. This is your homepage. <br />
          <br />
          {/* Your username is: {userInfo?.email} */}
        </div>
        <Timer workDuration={60}/>
        <LogoutButton />
      </div>
    </PassageAuthGuard>
  );
}

export default Dashboard;
