import { PassageAuthGuard } from "@passageidentity/passage-react";
import AuthRedirect from "../components/AuthRedirect";
import AudioPlayer from "../components/AudioPlayer";
import Header from "../components/Header";
import Timer from "../components/Timer";

export default function BreakTimer({
  getRemainingTimePercentage,
  pomodoro,
  selectedControl,
  setPomodoro,
}) {
  return (
    <PassageAuthGuard unAuthComp={<AuthRedirect />}>
      <div className="flex flex-col h-screen bg-yellowBg">
        <div className="flex-shrink-0">
          <Header />
        </div>

        <div className="flex-col gap-32 flex-grow flex items-center justify-center">
          {/* <BreakCenterTimer /> */}
          <Timer
            getRemainingTimePercentage={getRemainingTimePercentage}
            pomodoro={pomodoro}
            selectedControl={selectedControl}
            setPomodoro={setPomodoro}
          />
          <AudioPlayer />
        </div>
      </div>
    </PassageAuthGuard>
  );
}
