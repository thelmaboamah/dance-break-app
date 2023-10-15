import supabase from "../utils/supabase";

// const fetchSupabaseData = async (userInfo) => {
//   console.log("User info is ", userInfo)
//   const supabase = getSupabase(userInfo); // You might need to pass a user ID if necessary
//   const { data, error } = await supabase.from('notes').select('*');

//   if (error) {
//     throw new Error('Failed to fetch data from Supabase');
//   }

//   return data;
// };

// Register a new user
// const registerUser = async (email, password) => {
//   const { user, error } = await supabase.auth.signUp({ email, password });
//   if (error) {
//     console.log("Error on sign up: ", error)
//   }
//   return user;
// }

// Log in a user
const loginUser = async (email) => {
  const { user, error } = await supabase.auth.signInWithIdToken({
    provider: 'google',
    token: 'your-id-token'
  })
  if (error) {
    console.log("Error on sign in: ", error)
  }
  return user;
}

// Insert data into a table
const insertData = async (data, tableName) => {
  const { data: insertedData, error } = await supabase.from(tableName).upsert([data]);
  if (error) {
    console.log("Error on data insert: ", error)
  }
  return insertedData;
}

// Fetch data from a table
const fetchTableData = async (tableName) => {
  console.log("Fetching client ", supabase)
  const { data, error } = await supabase.from(tableName).select('*');
  if (error) {
    console.log("Error on data fetch: ", error)
  }
  return data;
}

// Update data in a table
const updateData = async (data, tableName) => {
  const { data: updatedData, error } = await supabase.from(tableName).upsert([data]);
  if (error) {
    console.log("Error on data update: ", error)
  }
  return updatedData;
}

// Delete data from a table
const deleteData = async (rowId, tableName) => {
  const { error } = await supabase.from(tableName).delete().eq('id', rowId);
  if (error) {
    console.log("Error on data delete: ", error)
  }
}

export { 
  // registerUser,
  loginUser,
  insertData,
  fetchTableData,
  updateData,
  deleteData
 }