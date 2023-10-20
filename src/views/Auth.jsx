import {
  PassageAuth,
  PassageUnAuthGuard,
} from "@passageidentity/passage-react";
import { Navigate } from "react-router-dom";

export default function Auth() {
  return (
    <>
    <div className="desktop:flex-1">
      <img className="w-full desktop:block hidden h-screen object-cover bg-yellowBg opacity-[.3]" src="public/images/girl-dancing.jpg" alt="Girl dancing in front of a yellow background"></img>
    </div>
    <section className="desktop:flex-1">
      <img
        src="public/icons/dance_break_logo.svg"
        alt="Dance Break Logo"
        className="w-logo-lg m-auto pb-32"
      ></img>
      <h1 className="text-h2 text-center pb-12">
        Dance Break
      </h1>
      <PassageUnAuthGuard authComp={<Navigate to="/welcome" />}>
        <PassageAuth />
      </PassageUnAuthGuard>
    </section>
    </>
  );
}
