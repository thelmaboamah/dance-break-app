import { PassageAuthGuard } from "@passageidentity/passage-react";
import AuthRedirect from "../components/AuthRedirect";
import Header from "../components/Header";
import Timer from "../components/Timer";

export default function WorkTimer({
  getRemainingTimePercentage,
  pomodoro,
  selectedControl,
  setPomodoro,
}) {
  return (
    <PassageAuthGuard unAuthComp={<AuthRedirect />}>
      {/* <div className="flex flex-col justify-between items-center"> */}
      {/* min-w-full  */}
      <div className="flex flex-col h-screen">
        <div className="flex-shrink-0">
          <Header />
        </div>
        {/* <div className="flex-grow flex flex-col justify-center items-center"> */}
        <div className="flex-grow flex items-center justify-center">
          {/* <CenterTimer /> */}
          <Timer
            getRemainingTimePercentage={getRemainingTimePercentage}
            pomodoro={pomodoro}
            selectedControl={selectedControl}
            setPomodoro={setPomodoro}
          />
        </div>
      </div>
    </PassageAuthGuard>
  );
}
