import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  import.meta.env.VITE_PUBLIC_SUPABASE_URL,
  import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY
)

const fetchTableData = async (userId) => {
  console.log("Fetching client ", supabase)
  const { data, error } = await supabase.functions.invoke('signin', 
  {
    headers: {
      "mode": 'no-cors'
    },
    body: JSON.stringify({
      userId,
      title: "client task 5"
    })
  }
  )
  if (error) {
    console.log("Error on data fetch: ", error)
  }
  return data;
}

export { 
  fetchTableData
 }