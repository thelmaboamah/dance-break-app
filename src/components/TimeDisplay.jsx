import useCalculateTime from "../hooks/useCalculateTime";

const TimeDisplay = ({ pomodoro, selectedControl }) => {
  const { minutes, seconds } = useCalculateTime({ pomodoro, selectedControl });

  return (
    <p className="text-timer">
      {minutes < 9 ? "0" : ""}
      {minutes}:{seconds < 9 ? "0" : ""}
      {seconds}
    </p>
  );
};

export default TimeDisplay;
