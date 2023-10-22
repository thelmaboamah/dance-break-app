import { useState, useRef, useEffect, useMemo } from "react";
import _ from "lodash";
import { useWorkerTimeout } from "./useWorkerTimeout";
import {
  updateMainTimerRunning,
  subscribeToRoom,
  updateMainTimerRunningAndUnpause
} from "../../src/utils/queries";
import { createClient } from "@supabase/supabase-js";

export default function Clock({ duration }) {
  const { setRunning, tick } = useWorkerTimeout();
  const [instance, setInstance] = useState("Admin");
  const [time, setTime] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  var lastTick = useRef(performance.now());
  var lastSync = useRef(performance.now());
  const [roomData, setRoomData] = useState({});
  const [isPaused, setIsPaused] = useState(false);
  const [pauseTime, setPauseTime] = useState(0);
  var timerValue = useRef(duration);
  const [timer, setTimer] = useState(duration);
  var initialRun = useRef(true);
  const MAIN_TIMER_DURATION = duration; // seconds
  const [isMusicBreak, setIsMusicBreak] = useState(true);

  const supabaseClient = useMemo(() => {
    const token = sessionStorage.getItem("supa_token")
    console.log("creating supabase client, got token ", token)
    return createClient(
        import.meta.env.VITE_PUBLIC_SUPABASE_URL,
        import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY,
        {
          // realtime: {
          //   transport: window.WebSocket,
          // },
          global: {
            headers: { Authorization: `Bearer ${token}` },
            },
        },
    )
    }, []
  );

  // use effects
  useEffect(() => {
    subscribeToRoom(1, onChange, supabaseClient);
  }, [isPaused]);

  useEffect(() => {
    if (roomData.is_active) {
      if (initialRun.current === true) {
        lastTick.current = performance.now();
        timerValue.current = MAIN_TIMER_DURATION;
        initialRun.current = false;
        setTimer(lastTick.current);
        setRunning(true);
        setIsTimerRunning(true);
      }
    }
  }, [roomData]);

  useEffect(() => {
    if (tick > 0) {
      var now = performance.now();

      // run only if timer is running
      if (isTimerRunning) {
        // attempt sync
        if (now - lastTick.current >= 950) {
          //console.log(">>>", now);
          timeDown(timerValue.current);
          lastTick.current = now;
        }
      }
    }
  }, [tick]);

  // end of use effects

  const startCountdown = () => {
    if (isPaused) {
      var now = Date.now();
      var pauseDiff = Math.abs(now - pauseTime);
      var newEndTime = roomData.end_time + pauseDiff;

      //EDGE case if pause is greater than the remaining time
      // get the diff from the pause until the end
      var pauseEndDiff = Math.abs(roomData.end_time - pauseTime);
      // edge case that handles zero pauseTime
      if (pauseTime <= 0) {
        pauseEndDiff = MAIN_TIMER_DURATION;
      }
      //
      // add that diff to now to get the same remaining seconds

      if (roomData.end_time < now) {
        newEndTime = now + pauseEndDiff;
      }

      if (newEndTime - now > MAIN_TIMER_DURATION * 1000) {
        newEndTime = now + MAIN_TIMER_DURATION * 1000;
      }

      var timerValue = updateMainTimerRunningAndUnpause(1, true, newEndTime, supabaseClient);
      timerValue.then(() => {
        now = Date.now();
        lastTick.current = performance.now();
        lastSync.current = now;
        setIsTimerRunning(true);
        setIsPaused(false);
        setPauseTime(0);
        setRunning(true);
      });
    } else {
      // initiate time on server
      if (instance.toLowerCase() === "admin") {
        now = Date.now();
        var future = now + MAIN_TIMER_DURATION * 1000; // in seconds //10*60000)
        var result = updateMainTimerRunningAndUnpause(1, true, future, supabaseClient);

        result.then(() => {
          console.log("date set");
        });
      }
    }
  };

  const pauseCountdown = async () => {
    console.log(isTimerRunning);
    if (isTimerRunning) {
      setIsPaused(true);
      setIsTimerRunning(false);
      setRunning(false);

      await updateMainTimerRunning(1, false, supabaseClient);
      var now = Date.now();
      setPauseTime(now);
    }
  };

  const onChange = (payload) => {
    console.log(isPaused, payload);
    setRoomData(payload.new);
    if (isPaused === false) {
      if (roomData.is_active) {
        var end = roomData.end_time;
        var now = performance.now();
        var diff = end - now;
        if (diff < 0) {
          setTimer(0);
          timerValue.current = 0;
        } else {
          // can lose up to a second here depending on network latency, but the timer value needs to be less than then initial one so
          // that useEffect captures it
          var finalTimer = Math.ceil(diff / 1000);

          lastTick.current = performance.now();
          timerValue.current = finalTimer;
          setTimer(finalTimer);
          setRunning(true);
          setIsTimerRunning(true);
        }
      }
    }
  };

  const timeDown = (value) => {
    if (isTimerRunning) {
      var t = Number(String(value)) - 1;
      if (t < 0) {
        t = 0;
      }

      timerValue.current = t;
      setTime(t);
    }
  };

  // presentation functions

  function formatTime(t) {
    // for hours '0' + Math.floor(t / 3600) % 24).slice(-2) + ':' +
    var finalTime =
      ("0" + (Math.floor(t / 60) % 60)).slice(-2) +
      ":" +
      ("0" + (t % 60)).slice(-2);
    return finalTime;
  }

  const getTime = () => {
    return formatTime(timerValue.current);
  };

  const toggleBreakType = () => {
    setIsMusicBreak(!isMusicBreak);
  };

  return (
    <div className="App">
      <h1>{instance}</h1>
      <h2>{getTime()}</h2>
      {isTimerRunning ? (
        <button onClick={pauseCountdown}>
          Stop Timer
        </button>
      ) : (
        <button onClick={pauseCountdown}>
          Start Timer
        </button>
      )}
        <button className="breakType" onClick={toggleBreakType}>
            {isMusicBreak ? "MUSIC" : "QUIET"}
        </button>
    </div>
  );
}



  // useEffect(() => {
  //   console.log("second use effect ");
  //   const timerSubscription = supabaseClient
  //     .channel("tasks_inserts")
    
  //   timerSubscription.on(REALTIME_LISTEN_TYPES.POSTGRES_CHANGES, 
  //       {
  //         event: REALTIME_POSTGRES_CHANGES_LISTEN_EVENT.INSERT,
  //         schema: "public",
  //         table: "tasks",
  //       },
  //       (payload) => {
  //       const newTask = payload.new;
  //       console.log("got new task ", newTask)
  //         const newTimer = Date.now() - Date.parse(newTask.end_time);
  //         console.log(Date.now(), " ", Date.parse(newTask.end_time)," ",newTimer);
  //     })
  //     .subscribe();

  //   // return () => {
  //   //   timerSubscription.unsubscribe();
  //   // };
  // }, []);