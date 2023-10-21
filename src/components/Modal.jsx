import Chevron from "../../public/icons/chevron-right-solid.svg";
import { useEffect, useRef } from "react";
import { usePassageLogout } from "../hooks";
import { useNavigate } from "react-router-dom";
export default function Modal() {
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

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", installListener);

    return () => {
      window.removeEventListener("beforeinstallprompt", installListener);
    };
  }, []);

  return (
    <div className="bg-white fixed right-0 top-0 h-screen desktop:w-1/4 w-[238px]">
      <div className="bg-white rounded-lg shadow-lg w-96 h-screen">
        <div className="p-6">
          <div className="bg-gray-100 rounded-t-lg px-6 py-4"></div>

          {/* 5 rows */}
          <ul className="space-y-5">
            <li>
              <button className="desktop:w-3/4 w-[189px] flex justify-between items-center hover:underline focus:outline-none">
                <div>Update Durations</div>
                <img
                  className="w-3 h-3"
                  src={Chevron}
                  alt="chevron pointing right"
                ></img>
              </button>
            </li>
            <li>
              <button className="hover:underline focus:outline-none">
                Disable Music
              </button>
            </li>
            <li>
              <button
                onClick={handleInstallClick}
                className="hover:underline focus:outline-none"
              >
                Download the app
              </button>
            </li>
            <li>
              <div className="bg-grey border-t-1 desktop:w-3/4 w-[189px] h-[1px]"></div>
            </li>
            <li>
              <button
                onClick={signout}
                className="hover:underline focus:outline-none"
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
