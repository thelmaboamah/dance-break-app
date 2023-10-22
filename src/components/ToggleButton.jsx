const ToggleButton = ({ pomodoro, setPomodoro }) => {
  function togglePausePlay() {
    setPomodoro((prevPomodoro) => {
      return {
        ...prevPomodoro,
        isPaused: !prevPomodoro.isPaused,
      };
    });
  }

  return (
    <button
      onClick={togglePausePlay}
      className="primary-button mt-6 font-normal"
    >
      {pomodoro.isPaused ? "Start Timer" : "Stop Timer"}
    </button>
  );
};

export default ToggleButton;
