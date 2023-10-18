
const createTaskInDb = async (userId, title, supabase) => {
  console.log("Create task with client ", supabase);
  const { data, error } = await supabase.functions.invoke("signin", {
    headers: {
      mode: "no-cors",
    },
    body: JSON.stringify({ userId, title }),
  });
  if (error) {
    console.log("Error on data fetch: ", error);
  }
  return data;
};

const readTasksFromDb = async (userId, supabase) => {
  console.log("Create task with client ", supabase);
  const { data, error } = await supabase.functions.invoke("signin", {
    headers: {
      mode: "no-cors",
    },
    body: JSON.stringify({ userId }),
  });
  if (error) {
    console.log("Error on data fetch: ", error);
  }
  return data;
};

export { createTaskInDb, readTasksFromDb };
