import { useEffect, useState, useRef, useContext, useCallback } from "react";
import { stages, controllers } from "../utils/constants";
import { FormDataContext } from "../context/FormDataContext";

const useTimer = () => {
  const { formData } = useContext(FormDataContext);
  const [selectedControl, setSelectedControl] = useState(0);
  const [pomodoro, setPomodoro] = useState(stages);
  const periodId = useRef(stages.period);

  const resetTimerValues = useCallback(() => {
    setPomodoro((prevPomodoro) => ({
      ...prevPomodoro,
      workTime: formData.workTime * 60,
      danceTime: formData.danceTime * 60,
      quietTime: formData.quietTime * 60,
    }));
  }, [formData]);

  const getRemainingTimePercentage = () => {
    const totalTime = formData[controllers[selectedControl].value] * 60;
    const remainingTime = pomodoro[controllers[selectedControl].value];
    return (remainingTime / totalTime) * 100;
  };

  useEffect(() => {
    let timer = null;
    if (!pomodoro.isPaused) {
      timer = setInterval(() => {
        setPomodoro((prevPomodoro) => {
          if (prevPomodoro[controllers[selectedControl].value] === 0) {
            setSelectedControl((prevState) => {
              if (periodId.current % 8 === 0) {
                return 2;
              } else {
                return prevState >= controllers.length - 1
                  ? 0
                  : prevState === 0
                  ? prevState + 1
                  : prevState === 1
                  ? prevState - 1
                  : 0;
              }
            });

            resetTimerValues();
            clearInterval(timer);
            periodId.current += 1;

            return prevPomodoro;
          }
          return {
            ...prevPomodoro,
            [controllers[selectedControl].value]:
              prevPomodoro[controllers[selectedControl].value] - 1,
          };
        });
      }, 1000);
    }
    return () => {
      clearInterval(timer);
    };
  }, [
    pomodoro.isPaused,
    selectedControl,
    setPomodoro,
    setSelectedControl,
    pomodoro.period,
    resetTimerValues,
  ]);

  return {
    pomodoro,
    setPomodoro,
    selectedControl,
    setSelectedControl,
    resetTimerValues,
    getRemainingTimePercentage,
  };
};

export default useTimer;
