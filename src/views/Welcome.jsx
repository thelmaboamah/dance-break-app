import styles from "../styles/Dashboard.module.css";
import { PassageAuthGuard } from "@passageidentity/passage-react";
import { usePassageUserInfo } from "../hooks";
import { loginUser } from "../utils/queries";
import { createClient } from "@supabase/supabase-js";
import AuthRedirect from "../components/AuthRedirect";
import LogoutButton from "../components/LogoutButton";
import { useState, useEffect, useMemo, createContext } from "react";
// import Timer from "./Timer";
import Clock from "../../todo/realtime/Clock";
import Timer from "../../todo/realtime/Timer";
import ClockTimer from "./ClockTimer";
import { Link } from "react-router-dom";
import dashStyles from "../styles/Dashboard.module.css";
import centerStyles from "../styles/Center.module.css";

export default function Welcome() {

  const { userInfo, loading } = usePassageUserInfo();
  const [isLogged, setIsLogged] = useState(false);
  const [isMusicBreak, setIsMusicBreak] = useState(true);
  const [isWorkTimer, setWorkTimer] = useState(true);

  const supaClient = useMemo(() => createClient(
    import.meta.env.VITE_PUBLIC_SUPABASE_URL,
    import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY,
  ), []
  );

  useEffect(() => {
    const goToLogin = async (userInfo, supaClient) => {
      console.log("passage sent us ", userInfo)
      setIsLogged(true);
      
      const data = await loginUser(userInfo, supaClient);
      console.log("client received all this: ", data);
      sessionStorage.setItem("supa_token", data?.token);
    };
    const tokenInSession = sessionStorage.getItem("supa_token");

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
  }, [userInfo, supaClient, isLogged]);

  const toggleBreakType = () => {
    setIsMusicBreak(!isMusicBreak);
  };

  if (loading) {
    return (
      <div className={dashStyles.dashboard}>
        <div className={dashStyles.title}>Loading...</div>
      </div>
    );
  }

  return (
    <div className={centerStyles.root}>
      <PassageAuthGuard unAuthComp={<AuthRedirect />}>
      <>
          <div className="desktop:flex-1">
            <img
              className="w-full desktop:block hidden h-screen object-cover"
              src="public/images/girl-dancing.jpg"
              alt="Girl dancing in front of a yellow background"
            ></img>
          </div>
          <section className="desktop:flex-1 px-64">
            <h1 className="font-dmSans text-h1-bold pb-32">
              Hi, {userInfo?.user_metadata.first_name}
            </h1>
            <p className="pb-32">
              Get started using Dance Break by clicking{" "}
              <span className="italic">Go to Timer</span> below.
            </p>
            <section className="flex justify-center">
                <Link
                  to="/timer"
                  className="primary-button flex justify-center"
                  // state={{ mode: "quiet" }}
                >
                  <button>Go to Timer</button>
                </Link>
            </section>
          </section>
        </>
    </PassageAuthGuard>
    </div>
  );
}
