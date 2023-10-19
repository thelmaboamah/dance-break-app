const createTaskInDb = async (userId, title, supabase) => {
  console.log("Create task with client ", supabase);
  const { data, error } = await supabase.functions.invoke("restful", {
    body: JSON.stringify({ userId, task }),
  });
  if (error) {
    console.log("Error on data fetch: ", error);
  }
  return data;
};

const loginUser = async (userInfo, supabase) => {
  console.log("Login started with client ", userInfo);
  const dataPayload = {
    userId: userInfo?.id,
    email: userInfo?.email,
    first_name: userInfo?.user_metadata.first_name,
    spotify_token: "",
  };
  console.log("seding this login payload: ", dataPayload);
  const { data, error } = await supabase.functions.invoke("signin", {
    body: JSON.stringify(dataPayload),
  });
  if (error) {
    console.log("Error on data fetch: ", error);
  }
  return data;
};

export { createTaskInDb, loginUser };
