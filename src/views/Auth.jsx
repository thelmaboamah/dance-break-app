import {
  PassageAuth,
  PassageUnAuthGuard,
} from "@passageidentity/passage-react";
import { Navigate } from "react-router-dom";
import styles from "../styles/Center.module.css";

export default function Auth() {
  return (
    <div className={styles.root}>
      <div className="desktop:flex-1">
        <img
          className="w-full desktop:block hidden h-screen object-cover"
          src="/images/girl-dancing.jpg"
          alt="Girl dancing in front of a yellow background"
        ></img>
      </div>
      <section className="desktop:flex-1">
        <img
          src="/icons/dance_break_logo.svg"
          alt="Dance Break Logo"
          className="w-logo-lg m-auto pb-32"
        ></img>
        <h1 className="text-h2 text-center pb-12">Dance Break</h1>
        <PassageUnAuthGuard authComp={<Navigate to="/home" />}>
          <PassageAuth />
        </PassageUnAuthGuard>
      </section>
    </div>
  );
}
