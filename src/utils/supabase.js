// import { createClient } from '@supabase/supabase-js'

// const supabase = createClient(
//   process.env.REACT_PUBLIC_SUPABASE_URL,
//   process.env.REACT_PUBLIC_SUPABASE_ANON_KEY,
// )

// export default supabase;

import { createClient } from '@supabase/supabase-js'
import jwt from 'jsonwebtoken'

const getSupabase = (userId) => {
  const options = {}

  if (userId) {
    const payload = {
      userId,
      exp: Math.floor(Date.now() / 1000) + 60 * 60,
    }
    const token = jwt.sign(payload, process.env.SUPABASE_JWT_SECRET)
    options.global = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
   }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    options
  )

  return supabase
}

export { getSupabase }

// import jwt from "jsonwebtoken";
// var jwt = require('jsonwebtoken');

// const getSupabase = async (userInfo) => {



//   console.log("Supabase is ", supabase)
//   // const options = {}

//   if (userInfo) {

//     const { data, error } = await supabase.auth.signInWithOtp({
//       email: 'example@email.com',
//     })
//     // const payload = {
//     //   userInfo,
//     //   exp: Math.floor(Date.now() / 1000) + 60 * 60,
//     // }
//     // console.log("Payload is ", payload)

//     // supabase.auth. = () => ({
//     //   access_token: process.env.SUPABASE_JWT_SECRET,
//     //   token_type: "",
//     //   user: userInfo
//     // })

//     // console.log("Supa inside is ", supabase)

//     // const token = jwt.sign(payload, process.env.SUPABASE_JWT_SECRET)
//     // console.log("Token is ", token)
//     // options.global = {
//     //     headers: {
//     //       Authorization: `Bearer ${token}`,
//     //     },
//     //   }
//    }



//   return supabase
// }


