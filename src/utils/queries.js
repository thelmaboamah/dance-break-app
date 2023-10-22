export const createTaskInDb = async (task, supabase) => {
  const token = sessionStorage.getItem("supa_token");
  const { data, error } = await supabase.functions.invoke("restful", {
    headers: {
      Authorization: `Bearer ${token}`,
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
