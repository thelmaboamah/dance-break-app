import { useState, useRef, useEffect } from "react";
import { createTaskInDb } from "../utils/queries";

export const useClockTimer = (
  duration,
  supabaseClient,
  start,
  isMusicBreak,
) => {
  const [timer, setTimer] = useState(duration);
  const [isWorkTimer, setIsWorkTimer] = useState(true);
  const [status, setStatus] = useState("")

  const firstStart = useRef(true);
  const tick = useRef();

  useEffect(() => {
    if (firstStart.current) {
      firstStart.current = !firstStart.current;
      return;
    }

    if (start) {
      const insertTimer = async () => {
        const timerType = isWorkTimer ? "work" : (isMusicBreak ? "music" : "quiet");
        const task = {
          duration: String(duration),
          start_time: new Date().toISOString(),
          type: timerType,
        };
        console.log("task is ", task);
        await createTaskInDb(task, supabaseClient);
      };
      insertTimer();
      setIsWorkTimer(!isWorkTimer);

      // @ts-ignore
      tick.current = setInterval(() => {
        if (timer === 0) { 
          setStatus("finished") 
        } else if (timer > 0) {
          setTimer((timer) => timer - 1);
        }
      }, 1000);

      // const timeDown = (value) => {
      //   if (isTimerRunning) {
      //     var t = Number(String(value)) - 1;
      //     if (t < 0) {
      //       t = 0;
      //     }
    
      //     timerValue.current = t;
      //     setTime(t);
      //   }
      // };

    } else {
      console.log("clear interval");
      clearInterval(tick.current);
    }

    return () => {
        clearInterval(tick.current);
    }
  }, [start]);

  return {timer, status};
};
