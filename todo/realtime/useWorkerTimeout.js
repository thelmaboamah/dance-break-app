import { useState, useEffect } from "react";

export function useWorkerTimeout() {
  const [tick, setTick] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    var worker = new Worker("./worker.js");

    worker.onmessage = (event) => {
      if (running) {
        var workerTime = event.data;
        setTick((prev) => prev + 1);
      }
    };

    return () => worker.terminate();
  }, [running]);

  return { setRunning, tick };
}





// import { useEffect } from "react";
// import {
//   REALTIME_LISTEN_TYPES,
//   REALTIME_POSTGRES_CHANGES_LISTEN_EVENT,
// } from "@supabase/supabase-js";

// export const useRealtime = (supabase, timer, setTimer) => {
    
//   useEffect(() => {
//     const todosChannel = supabase.channel("tasks");
//     // Subscribe to "todos" channel for PostgreSQL changes (INSERT events)
//     todosChannel.on(
//       REALTIME_LISTEN_TYPES.POSTGRES_CHANGES,
//       {
//         event: REALTIME_POSTGRES_CHANGES_LISTEN_EVENT.INSERT,
//         schema: "public",
//         table: "tasks",
//       },
//       (payload) => {
//         const { new: newTask} = payload;
//         const newTimer = Date.now() - Date.parse(newTask.start_time)
//         console.log(Date.now(), " ", Date.parse(newTask.start_time), " ", newTimer)
//         setTimer(newTimer)
//       },
//     );

//     // Start listening for changes
//     todosChannel.subscribe();

//     return () => {
//       todosChannel.unsubscribe();
//     };
//   }, [timer]);

//   return 
// };
