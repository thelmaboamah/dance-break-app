import { PassageAuthGuard } from "@passageidentity/passage-react";
import AuthRedirect from "../components/AuthRedirect";
import AudioPlayer from "../components/AudioPlayer";

export default function Timer() {
  const date = new Date();
  return (
    <PassageAuthGuard unAuthComp={<AuthRedirect />}>
      <AudioPlayer />
      {/* <div>{date.toTimeString()}</div> */}
    </PassageAuthGuard>
  );
}
