import { Link } from "react-router-dom";
import { PassageAuthGuard } from "@passageidentity/passage-react";
import { usePassageUserInfo } from "../hooks";
import dashStyles from "../styles/Dashboard.module.css";
import AuthRedirect from "../components/AuthRedirect";
import centerStyles from "../styles/Center.module.css";

function Welcome() {
  const { userInfo, loading } = usePassageUserInfo();

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
              state={{ mode: "quiet" }}
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

export default Welcome;
