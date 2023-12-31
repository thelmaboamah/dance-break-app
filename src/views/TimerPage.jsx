import useTimer from "../hooks/useTimer";
import WorkTimer from "../components/WorkTimer";
import BreakTimer from "../components/BreakTimer";
import "react-circular-progressbar/dist/styles.css";

const TimerPage = () => {
  const {
    pomodoro,
    selectedControl,
    setPomodoro,
    // setSelectedControl,
    // resetTimerValues,
    getRemainingTimePercentage,
  } = useTimer();

  return (
    <>
      {selectedControl === 0 ? (
        <WorkTimer
          getRemainingTimePercentage={getRemainingTimePercentage}
          pomodoro={pomodoro}
          selectedControl={selectedControl}
          setPomodoro={setPomodoro}
        />
      ) : (
        <BreakTimer
          getRemainingTimePercentage={getRemainingTimePercentage}
          pomodoro={pomodoro}
          selectedControl={selectedControl}
          setPomodoro={setPomodoro}
        />
      )}
    </>
  );
};

export default TimerPage;
