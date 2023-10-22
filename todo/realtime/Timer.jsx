import { PassageAuthGuard } from "@passageidentity/passage-react";
import AuthRedirect from "../../src/components/AuthRedirect";
import { useContext, useEffect, useState } from "react";
import { useClockTimer } from "./useClockTimer";
// import { SupabaseContext } from "../../src/views/Welcome";

export default function Timer({supabaseClient, isMusicBreak, duration, setWorkTimer, isWorkTimer}) {
  const [start, setStart] = useState(false);
  console.log("sup client is ", supabaseClient)
  const {timer, status}  = useClockTimer(duration, supabaseClient, start, isMusicBreak)

  useEffect(() => {
    if (status === 'finished') {
      setWorkTimer(!isWorkTimer)
    }
  }, [status])

  const toggleStart = () => {
    setStart(!start);
  };

  const dispSecondsAsMins = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const seconds_ = seconds % 60;
    return mins.toString() + ":" + (seconds_ == 0 ? "00" : seconds_.toString());
  };

  return (
    <PassageAuthGuard unAuthComp={<AuthRedirect />}>
    <div>
      <h1>{dispSecondsAsMins(timer)}</h1>
      <div className="startDiv">
        <button className="startButton" onClick={toggleStart}>
          {!start ? "START" : "STOP"}
        </button>
        <br />
      </div>
    </div>
    </PassageAuthGuard>
  );
};
