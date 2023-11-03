import { useState } from "react";
import ReactAudioPlayer, { RHAP_UI } from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import {
  BsPlayFill,
  BsPauseFill,
  BsFillVolumeUpFill,
  BsVolumeMuteFill,
} from "react-icons/bs";

export default function AudioPlayer() {
  const playlist = [
    {
      songName: "Track 1",
      artistName: "Dance Break",
      src: "audio/DanceBreak1.m4a",
    },
    {
      songName: "Track 2",
      artistName: "Dance Break",
      src: "audio/DanceBreak2.m4a",
    },
  ];

  const [songIndex, setSongIndex] = useState(getRandomInt(playlist.length));

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  return (
    <section className="w-[360px]">
      <div>
        <h3 className="mb-1 text-small">{playlist[songIndex].songName}</h3>
        <p className="mb-1 text-xs text-lightGray">
          {playlist[songIndex].artistName}
        </p>
      </div>
      <ReactAudioPlayer
        autoPlay
        autoPlayAfterSrcChange
        layout="horizontal"
        showJumpControls={false}
        showDownloadProgress={false}
        src={playlist[songIndex].src}
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
        customAdditionalControls={[]}
        onEnded={() => {
          setSongIndex(getRandomInt(playlist.length));
        }}
      />
    </section>
  );
}
