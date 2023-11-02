import { PassageAuthGuard } from "@passageidentity/passage-react";
import AuthRedirect from "./AuthRedirect";
import AudioPlayer from "./AudioPlayer";
import Header from "./Header";
import Timer from "./Timer";

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
          <Header setPomodoro={setPomodoro} />
        </div>

        <div className="flex-col gap-y-32 flex-grow flex items-center justify-center z-1">
          <h1 className="text-h1-regular">
            {isQuietBreak ? "Time to move!" : "Time to dance!"}
          </h1>
          <Timer
            getRemainingTimePercentage={getRemainingTimePercentage}
            pomodoro={pomodoro}
            selectedControl={selectedControl}
            setPomodoro={setPomodoro}
          />
          {!isQuietBreak && <AudioPlayer />}
        </div>
        <img
          id="Confetti"
          src="/images/Confetti.png"
          alt="confetti"
          className="fixed bottom-0 left-0 object-cover w-full h-[670px] pointer-events-none opacity-[0.6]"
        />
      </div>
    </PassageAuthGuard>
  );
}
