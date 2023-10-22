import Chevron from "../assets/chevron-right-solid.svg";
import { useState, useEffect, useRef } from "react";
import { usePassageLogout } from "../hooks";
import { useNavigate } from "react-router-dom";
import Switch from "./Switch";
export default function Modal() {
  const [isQuietBreak, setIsQuietBreak] = useState(
    JSON.parse(localStorage.getItem("is_quiet_break")) || false,
  );

  const { logout } = usePassageLogout();

  const navigate = useNavigate();

  const signout = () => {
    logout();
    navigate("/");
  };

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

  function handleMusicToggle() {
    setIsQuietBreak((status) => {
      localStorage.setItem("is_quiet_break", JSON.stringify(!status));
      return !status;
    });
  }

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", installListener);

    return () => {
      window.removeEventListener("beforeinstallprompt", installListener);
    };
  }, []);

  useEffect(() => {
    const status = JSON.parse(localStorage.getItem("is_quiet_break"));
    if (status == null) {
      localStorage.setItem("is_quiet_break", JSON.stringify(false));
    }
  }, []);

  return (
    <div className="bg-white fixed right-0 top-0 h-screen desktop:w-[330px] w-[238px] z-20">
      <div className="bg-white w-full rounded-lg shadow-lg w-96 h-screen">
        <div className="p-6">
          <div className="bg-gray-100 rounded-t-lg px-6 py-4"></div>

          {/* 5 rows */}
          <ul className="space-y-5">
            <li>
              <button className="desktop:w-3/4 w-[189px] desktop:w-[262px] flex justify-between items-center hover:underline focus:outline-none pointer-events-auto">
                <div>Update Durations</div>
                <img
                  className="w-3 h-3"
                  src={Chevron}
                  alt="chevron pointing right"
                ></img>
              </button>
            </li>
            <li>
              <div className="w-[189px] desktop:w-[262px] flex justify-between items-center">
                <span>Disable Music</span>
                <Switch
                  isOn={isQuietBreak}
                  onColor="#00C2FF"
                  handleToggle={handleMusicToggle}
                />
              </div>
            </li>
            <li>
              <button
                onClick={handleInstallClick}
                className="hover:underline focus:outline-none pointer-events-auto"
              >
                Download the app
              </button>
            </li>
            <li>
              <div className="bg-grey border-t-1 w-[189px] desktop:w-[262px] h-[1px]"></div>
            </li>
            <li>
              <button
                onClick={signout}
                className="hover:underline focus:outline-none pointer-events-auto"
              >
                Log out
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
