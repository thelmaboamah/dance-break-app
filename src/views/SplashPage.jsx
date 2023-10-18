import { PassageUnAuthGuard } from "@passageidentity/passage-react";
import { Link } from "react-router-dom";
import Welcome from "./Welcome";
export default function SplashPage() {
  return (
    <PassageUnAuthGuard authComp={<Welcome />}>
      <main className="w-full bg-yellowBg h-screen flex">
        <section className="w-4/5 desktop:w-1/2 m-auto">
          <img
            src="public/icons/dance_break_logo.svg"
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

            <button className="download-button flex-1">
              <img
                className="w-[25px] text-blueText pr-8"
                src="public/icons/download.svg"
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
