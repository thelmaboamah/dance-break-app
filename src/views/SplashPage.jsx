import { PassageUnAuthGuard } from "@passageidentity/passage-react";
import { Link } from "react-router-dom";
import Welcome from "./Welcome";
import { useEffect, useRef } from "react";
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
    <PassageUnAuthGuard authComp={<Welcome />}>
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
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quia sint,
            laudantium praesentium temporibus quas beatae soluta excepturi
            magnam dicta provident sequi ex ipsa natus ut aliquam facere,
            voluptatum aperiam aspernatur?
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
    </PassageUnAuthGuard>
  );
}
