// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.
import {
  createClient,
  SupabaseClient,
} from "https://esm.sh/@supabase/supabase-js";
import { decode } from "https://deno.land/std/encoding/base64url.ts";
import { createHmac } from "https://deno.land/std@0.173.0/node/crypto.ts";

// TODO: add netlify to origin
const corsHeaders = {
  "Access-Control-Allow-Origin": "http://localhost:5173, https://dance-break.netlify.app/",
  "Access-Control-Allow-Headers":
    "content-type, authorization, x-client-info, apikey",
  "Access-Control-Allow-Methods": "POST, GET",
};

type Task = {
  duration: number | null;
  is_active: boolean | null;
  start_time: string | null;
  type: string | null;
};

async function getTasks(supabaseClient: SupabaseClient) {
  const { data: tasks, error } = await supabaseClient.from("tasks").select("*");
  console.log("received tasks ", tasks);
  if (error) throw error;

  return new Response(JSON.stringify({ tasks }), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
    status: 200,
  });
}

async function createTask(supabaseClient: SupabaseClient, task: Task) {
  console.log("received task ", task);
  const { error } = await supabaseClient.from("tasks").insert(task);
  if (error) throw error;

  return new Response(JSON.stringify({ task }), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
    status: 200,
  });
}

// Listening and serving begins
Deno.serve(async (req) => {
  const { method } = req;
  // This is needed if you're planning to invoke your function from a browser.
  if (method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // Create a Supabase client with the Auth context of the logged in user.
    const receivedAuth = req.headers.get("Authorization");
    const receivedToken = receivedAuth.split(" ")[1];

    const verification = verifyJWT(
      receivedToken,
      Deno.env.get("SUPA_JWT_SECRET"),
    );
    console.log("verify resulted in ", verification);

    if (!verification.userId) {
      return new Response(JSON.stringify({ error: error.message }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 401,
      });
    }
  
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      {
        global: {
          headers: { Authorization: `Bearer ${receivedToken}` },
        },
      },
    );

    let task = {};
    if (method === "POST") {
      const body = await req.json();
      task = body.task;
      console.log("received request with task ", task);
    }
    console.log("going into respective functions ");
    switch (true) {
      case method === "POST":
        return createTask(supabaseClient, task);
      case method === "GET":
        return getTasks(supabaseClient);
      default:
        return getTasks(supabaseClient);
    }
  } catch (error) {
    console.error(error);

    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
});

function verifyJWT(token: string, secret: string) {
  const parts = token.split(".");
  if (parts.length !== 3) return;

  const newVal = `${parts[0]}.${parts[1]}`;
  const calcSign = createHmac("sha256", secret).update(newVal).digest("base64");
  const newSign = replaceSpecialChars(calcSign);

  if (newSign !== parts[2]) return;
  const pyld = JSON.parse(new TextDecoder().decode(decode(parts[1])));
  if (pyld.exp && Date.now() > pyld.exp) return;
  return pyld;
}

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
