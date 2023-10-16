// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import {
  createClient,
  SupabaseClient,
} from "https://esm.sh/@supabase/supabase-js";
import { createHmac } from "https://deno.land/std@0.173.0/node/crypto.ts";


const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "mode,Access-Control-Allow-Origin,Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,Content-Type,authorization, x-client-info, apikey",
};

interface Task {
  title: string;
}

async function getAllTasks(supabaseClient: SupabaseClient) {
  const { data: tasks, error } = await supabaseClient.from('todo').select('*')
  if (error) throw error

  return new Response(JSON.stringify({ tasks }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    status: 200,
  })
}

async function createTask(supabaseClient: SupabaseClient, task: Task) {
  console.log("received todo ", task);
  const { error } = await supabaseClient.from("todo").insert(task);
  if (error) throw error;

  return new Response(JSON.stringify({ task }), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
    status: 200,
  });
}

Deno.serve(async (req) => {
  const { url, method } = req
  const options = {};

  if (method === 'OPTIONS') {
    console.log("in the options")
    return new Response('ok', { headers: corsHeaders })
  }

  let task = null
  if (method === 'POST') {
    const body = await req.json()
    console.log("received request ", body);
    
    const { userId } = body;
    task = body.task
    console.log("received userId ", userId);
    console.log("received task ", task);
    const payload = {
      userId,
    };
    console.log("Payload ", payload);

    const secretKey = Deno.env.get("SUPAB_JST_SECRET");
    console.log("secret key passed");

    const token = await generateToken(payload, secretKey);
    console.log("passed jwt", token);

    // Initialize Supabase client with authorization headers.
    
    options.global = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  }

  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL"),
    Deno.env.get("SUPABASE_ANON_KEY"),
    options,
  );

  console.log("created client ", supabaseClient);

  switch (true) {
    case method === 'POST':
      console.log("sending task ", task);
      return createTask(supabaseClient, task)
    case method === 'GET':
      return getAllTasks(supabaseClient)
    default:
      return getAllTasks(supabaseClient)
  }
  return getAllTasks(supabaseClient)
});

const toBase64 = (obj) => {
  // converts the obj to a string
  const str = JSON.stringify(obj);
  return btoa(str)
};

const replaceSpecialChars = (b64string) => {
  // create a regex to match any of the characters =,+ or / and replace them with their // substitutes
  return b64string.replace(/[=+/]/g, (charToBeReplaced) => {
    switch (charToBeReplaced) {
      case "=":
        return "";
      case "+":
        return "-";
      case "/":
        return "_";
    }
  });
};

const createSignature = (jwtB64Header, jwtB64Payload, secret) => {
  // create a HMAC(hash based message authentication code) using sha256 hashing alg
  let signature = createHmac("sha256", secret);
  // use the update method to hash a string formed from our jwtB64Header a period and
  //jwtB64Payload
  signature.update(jwtB64Header + "." + jwtB64Payload);
  //signature needs to be converted to base64 to make it usable
  signature = signature.digest("base64");
  //of course we need to clean the base64 string of URL special characters
  signature = replaceSpecialChars(signature);
  return signature;
};

async function generateToken(payload, secret) {
  const header = {
    alg: 'HS256',
    typ: 'JWT',
  };
  const b64Header = toBase64(header);
  const jwtB64Header = replaceSpecialChars(b64Header);
  console.log("the header is: ", jwtB64Header);

  const b64Payload = toBase64(payload);
  const jwtB64Payload = replaceSpecialChars(b64Payload);
  console.log("the payload is: ", jwtB64Payload);

  const signature = createSignature(jwtB64Header, jwtB64Payload, secret);
  console.log("the signature is: ", signature);
  const jsonWebToken = jwtB64Header + "." + jwtB64Payload + "." + signature;
  return jsonWebToken;
}
