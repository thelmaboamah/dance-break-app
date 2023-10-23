// import { PassageUnAuthGuard } from "@passageidentity/passage-react";
import { Link } from "react-router-dom";
// import Home from "./Home";
import { useEffect, useRef } from "react";
import styles from "../styles/Center.module.css";

export default function SplashPage() {
  const bipEvent = useRef(null);

  function installListener(event) {
    event.preventDefault();
    console.log("Inside install listener");
    bipEvent.current = event;
  }

  function handleInstallClick() {
    if (bipEvent.current) {
      bipEvent.current.prompt();
    } else {
      // incompatible browser, your PWA is not passing the criteria, the user has already installed the PWA
      //TODO: show the user information on how to install the app
      alert(
        "To install the app look for Add to Homescreen or Install in your browser's menu",
      );
    }
  }

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", installListener);

    return () => {
      window.removeEventListener("beforeinstallprompt", installListener);
    };
  }, []);

  return (
    <div className={styles.root}>
      {/* <PassageUnAuthGuard authComp={<Home />}> */}
      <main className="w-full bg-yellowBg h-screen flex">
        <section className="w-4/5 desktop:w-1/2 m-auto">
          <img
            src="/icons/dance_break_logo.svg"
            alt="Dance Break Logo"
            className="w-logo-lg m-auto pb-32"
          ></img>
          <h1 className="text-h1-regular text-center desktop:text-left">
            Welcome to
          </h1>
          <h1 className="text-h1-bold text-center desktop:text-left pb-24">
            Dance Break
          </h1>
          <p className="text-body pb-24">
            We&apos;ve all heard it: &quot;Sitting is the new smoking.&quot;
            <br />
            <br />
            Dance Break invites you to engage in brief, 5-minute activity
            sessions. Whether you opt for a calming stretch or an uplifting
            dance, the choice is yours.
            <br />
            <br />
            So, are you ready to take a Dance Break? 🕺💃.
          </p>
          <div className="flex gap-24 flex-col desktop:flex-row items-center">
            <Link to="/auth">
              <button className="primary-button flex-1">
                Sign Up / Log In
              </button>
            </Link>

            <button
              id="install"
              className="download-button flex-1"
              onClick={handleInstallClick}
            >
              <img
                className="w-[25px] text-blueText pr-8"
                src="/icons/download.svg"
                alt="Download icon"
              ></img>
              <span>Download App</span>
            </button>
          </div>
        </section>
      </main>
      {/* </PassageUnAuthGuard> */}
    </div>
  );
}
