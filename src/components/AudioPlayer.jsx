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
  const [songIndex, setSongIndex] = useState(getRandomInt(5));

  const playlist = [
    {
      songName: "Love On Top",
      artistName: "Beyoncé",
      src: "/audio/love-on-top.mp3",
    },
    {
      songName: "I Like It",
      artistName: "Enriqure Iglesias",
      src: "/audio/i-like-it.mp3",
    },
    {
      songName: "Don't Start Now",
      artistName: "Dua Lipa",
      src: "/audio/dont-start-now.mp3",
    },
    {
      songName: "One More Time",
      artistName: "Daft Punk",
      src: "/audio/one-more-time.mp3",
    },
    {
      songName: "Adventure of a Lifetime",
      artistName: "Coldplay",
      src: "/audio/adventure-of-a-lifetime.mp3",
    },
    {
      songName: "Just Dance",
      artistName: "Lady Gaga",
      src: "/audio/just-dance.mp3",
    },
  ];

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  return (
    <section className="w-[360px]">
      <div>
        <h3 className="mb-2 text-h3">{playlist[songIndex].songName}</h3>
        <p className="mb-1 text-small text-lightGray">
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
          setSongIndex(getRandomInt(5));
        }}
      />
    </section>
  );
}
