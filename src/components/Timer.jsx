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
          <div className="w-[242px] h-[242px]">
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
            </CircularProgressbarWithChildren>
          </div>
          <ToggleButton pomodoro={pomodoro} setPomodoro={setPomodoro} />
        </div>
      </div>
    </div>
  );
}
