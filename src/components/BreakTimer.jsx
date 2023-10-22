import { PassageAuthGuard } from "@passageidentity/passage-react";
import AuthRedirect from "./AuthRedirect";
import AudioPlayer from "./AudioPlayer";
import Header from "./Header";
import Timer from "./Timer";
import Confetti from "../../public/images/Confetti.png";

export default function BreakTimer({
  getRemainingTimePercentage,
  pomodoro,
  selectedControl,
  setPomodoro,
}) {
  const isQuietBreak = JSON.parse(localStorage.getItem("is_quiet_break"));

  return (
    <PassageAuthGuard unAuthComp={<AuthRedirect />}>
      <div className="flex flex-col h-screen bg-yellowBg">
        <div className="flex-shrink-0">
          <Header />
        </div>

        <div className="flex-col gap-32 flex-grow flex items-center justify-center">
          <Timer
            getRemainingTimePercentage={getRemainingTimePercentage}
            pomodoro={pomodoro}
            selectedControl={selectedControl}
            setPomodoro={setPomodoro}
          />
          {!isQuietBreak && <AudioPlayer />}
        </div>
        <img id="Confetti" src={Confetti} alt="confetti" className="fixed bottom-0 left-0  w-full h-[670px] pointer-events-none"/>
      </div>
    </PassageAuthGuard>
  );
}
