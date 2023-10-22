export const createTaskInDb = async (task, supabase) => {
  const token = sessionStorage.getItem("supa_token");
  const { data, error } = await supabase.functions.invoke("restful", {
    headers: {
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({ task }),
  });
  if (error) {
    console.log("Error on data fetch: ", error);
  }
  return data;
};

export const loginUser = async (userInfo, supabase) => {
  const dataPayload = {
    userId: userInfo?.id,
    email: userInfo?.email,
    first_name: userInfo?.user_metadata.first_name,
    spotify_token: "",
  };
  const { data, error } = await supabase.functions.invoke("signin", {
    body: JSON.stringify(dataPayload),
  });
  if (error) {
    console.log("Error on data fetch: ", error);
  }
  return data;
};

export async function setMainTimer(gameId, timeValue, supabase) {
  console.log("setting time: ", timeValue);
  const { data, error } = await supabase
    .from("tasks_duplicate")
    .update({ end_time: timeValue })
    .eq("id", gameId);

  console.log(error)
  return data;
}

export async function updateMainTimerRunningAndUnpause(
  gameId,
  timerRunning,
  newEndDate,
  supabase
) {
  const data = supabase
    .from("tasks_duplicate")
    .update({ is_active: timerRunning, end_time: newEndDate })
    .eq("id", gameId)
    .select();

  return data;
}

export async function updateMainTimerRunning(gameId, value, supabase) {
  console.log("setting timer: ", value);
  const data = supabase
    .from("tasks_duplicate")
    .update({ is_active: value })
    .eq("id", gameId)
    .select();

  return data;
}

export function subscribeToRoom(gameId, changeCallback, initCallback, supabase) {
  console.log("connecting to receive updates...");
  var timerTrack = supabase
    .channel(`tasks_duplicate:id=eq.${gameId}`)
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "tasks_duplicate",
        filter: `id=eq.${gameId}`
      },
      (payload) => {
        changeCallback(payload);
      }
    )
    .on("system", {}, (payload) => {
      if (payload.extension === "postgres_changes" && payload.status === "ok") {
        if (initCallback) {
          initCallback();
        }
      }
    })
    .subscribe((status, e) => {
      console.log(status, e)
    });

  return timerTrack;
}