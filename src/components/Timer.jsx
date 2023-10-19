import { useState, useRef, useEffect } from "react";

import {
  REALTIME_LISTEN_TYPES,
  REALTIME_POSTGRES_CHANGES_LISTEN_EVENT,
} from "@supabase/supabase-js";

export const Timer = ({ workDuration, supabaseClient, passageClient }) => {
  const [timer, setTimer] = useState(workDuration);
  const [start, setStart] = useState(false);
  // const [newTimer, setNewTimer] = useState()
  const firstStart = useRef(true);
  const tick = useRef();

  useEffect(() => {
    if (firstStart.current) {
      console.log("first render, don't run useEffect for timer");
      firstStart.current = !firstStart.current;
      return;
    }

    console.log("subsequent renders");
    console.log(start);
    if (start) {
      tick.current = setInterval(() => {
        setTimer((timer) => timer - 1);
      }, 1000);

      // Insert timer data into the Supabase table when the timer starts.
      supabaseClient.from("tasks").insert([
        { duration: workDuration - timer, started_at: new Date() },
      ]);
      
    } else {
      console.log("clear interval");
      clearInterval(tick.current);
    }

    return () => clearInterval(tick.current);
  }, [start]);

  const toggleStart = () => {
    setStart(!start);
  };

  const dispSecondsAsMins = (seconds) => {
    // 25:00
    console.log("seconds " + seconds);
    const mins = Math.floor(seconds / 60);
    const seconds_ = seconds % 60;
    return mins.toString() + ":" + (seconds_ == 0 ? "00" : seconds_.toString());
  };

  return (
    <div>
      <h1>{dispSecondsAsMins(timer)}</h1>
      <div className="startDiv">
        <button className="startBut" onClick={toggleStart}>
          {!start ? "START" : "STOP"}
        </button>
      </div>
    </div>
  );
};
