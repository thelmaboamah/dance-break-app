import { PassageAuthGuard } from "@passageidentity/passage-react";
import AuthRedirect from "../components/AuthRedirect";
import AudioPlayer from "../components/AudioPlayer";
import Header from "../components/Header";
import BreakCenterTimer from "../components/BreakCenterTimer";

export default function BreakTimer() {
  return (
    <PassageAuthGuard unAuthComp={<AuthRedirect />}>
      <div className="flex flex-col h-screen bg-yellowBg">
        <div className="flex-shrink-0">
          <Header />
        </div>

        <div className="flex-col gap-32 flex-grow flex items-center justify-center">
          <BreakCenterTimer />
          <AudioPlayer />
        </div>
      </div>
    </PassageAuthGuard>
  );
}
