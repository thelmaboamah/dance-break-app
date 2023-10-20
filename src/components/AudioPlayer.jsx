import ReactAudioPlayer, { RHAP_UI } from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import {
  BsPlayFill,
  BsPauseFill,
  BsFillVolumeUpFill,
  BsVolumeMuteFill,
} from "react-icons/bs";

export default function AudioPlayer() {
  return (
    <section className="w-[360px]">
      <div>
        <h3 className="mb-2 text-h3">Song Name</h3>
        <p className="mb-1 text-small text-lightGray">Artist Name</p>
      </div>
      <ReactAudioPlayer
        autoPlay
        autoPlayAfterSrcChange
        layout="horizontal"
        showJumpControls={false}
        showDownloadProgress={false}
        src="/audio/love-on-top.mp3"
        customIcons={{
          play: <BsPlayFill />,
          pause: <BsPauseFill />,
          volume: <BsFillVolumeUpFill />,
          volumeMute: <BsVolumeMuteFill />,
        }}
        customProgressBarSection={[
          RHAP_UI.PROGRESS_BAR,
          RHAP_UI.CURRENT_TIME,
          <div className="px-1" key="divider">
            /
          </div>,
          RHAP_UI.DURATION,
        ]}
        // customVolumeControls={[]}
        customAdditionalControls={[]}
      />
    </section>
  );
}
