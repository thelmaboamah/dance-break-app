import { PassageAuthGuard } from "@passageidentity/passage-react";
import AuthRedirect from "./AuthRedirect";
import Header from "./Header";
import Timer from "./Timer";

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
        <div className="flex-grow flex flex-col items-center justify-center">
          <h1 className="text-h1-regular mb-6">Time to work. </h1>
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
