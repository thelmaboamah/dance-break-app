import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import TimeDisplay from "./TimeDisplay";
import ToggleButton from "./ToggleButton";

export default function Timer({
  getRemainingTimePercentage,
  pomodoro,
  selectedControl,
  setPomodoro,
}) {
  return (
    <div className="tw-timer-container">
      <div className="tw-timer">
        <div className="flex flex-col justify-center items-center font-semibold relative">
          <CircularProgressbarWithChildren
            strokeWidth={4}
            trailColor="transparent"
            value={getRemainingTimePercentage()}
            styles={buildStyles({
              trailColor: "#818181",
              pathColor: "#00C2FF",
            })}
            counterClockwise={true}
          >
            <TimeDisplay
              pomodoro={pomodoro}
              selectedControl={selectedControl}
            />
            <ToggleButton pomodoro={pomodoro} setPomodoro={setPomodoro} />
          </CircularProgressbarWithChildren>
        </div>
      </div>
    </div>
  );
}
