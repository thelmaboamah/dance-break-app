import { useState, useRef, useEffect } from "react";

// import {
//   createClient,
//   REALTIME_LISTEN_TYPES,
//   REALTIME_POSTGRES_CHANGES_LISTEN_EVENT,
// } from "@supabase/supabase-js";

export const Timer = ( {workDuration}) => {
  const [timer, setTimer] = useState(workDuration);
  const [start, setStart] = useState(false);
  // const [newTimer, setNewTimer] = useState()
  const firstStart = useRef(true);
  const tick = useRef();

  // // Create a single supabase client for interacting with your database
  // const supabase = createClient(
  //   import.meta.env.VITE_SUPABASE_URL,
  //   import.meta.env.VITE_SUPABASE_ANON_KEY,
  // );

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
    } else {
      console.log("clear interval");
      clearInterval(tick.current);
    }

    return () => clearInterval(tick.current);
  }, [start]);

  // useEffect(() => {
  //   const todosChannel = supabase.channel("tasks");
  //   // Subscribe to "todos" channel for PostgreSQL changes (INSERT events)
  //   todosChannel.on(
  //     REALTIME_LISTEN_TYPES.POSTGRES_CHANGES,
  //     {
  //       event: REALTIME_POSTGRES_CHANGES_LISTEN_EVENT.INSERT,
  //       schema: "public",
  //       table: "tasks",
  //     },
  //     (payload) => {
  //       const { new: newInsertedTimer } = payload;
  //       setTimer(newInsertedTimer)
  //     },
  //   );

  //   // Start listening for changes
  //   todosChannel.subscribe();

  //   return () => {
  //     todosChannel.unsubscribe();
  //   };
  // }, [timer]);

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
