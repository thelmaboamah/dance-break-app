// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import {
  createClient,
  SupabaseClient,
} from "https://esm.sh/@supabase/supabase-js";
import { createHmac } from "https://deno.land/std@0.173.0/node/crypto.ts";

// TODO: add netlify to origin
const corsHeaders = {
  "Access-Control-Allow-Origin": "http://localhost:5173",
  "Access-Control-Allow-Headers": "mode, content-type, authorization, x-client-info, apikey",
  "Access-Control-Allow-Methods": "POST, GET"
};

// TODO: either add update function for spotify token or include it in login
async function loginUsers(body) {
  const { userId, email, first_name } = body;

  console.log("received userId for login ", userId);
  console.log("received first_name ", first_name);

  const payload = {
    userId
  };

  const secretKey = Deno.env.get("SUPAB_JST_SECRET");
  const token = await generateToken(payload, secretKey);

  const options = {};
  options.global = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL"),
    Deno.env.get("SUPABASE_ANON_KEY"),
    options,
  );

  const { error } = await supabaseClient.from("users").insert({ email, first_name });
  if (error) throw error;

  return new Response(JSON.stringify({ token, userId }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    status: 200,
  })
}

// Listening and serving begins
Deno.serve(async (req) => {
  const { url, method } = req
  const options = {};

  if (method === 'OPTIONS') {
    console.log("in the options")
    return new Response('ok', { headers: corsHeaders })
  }

  const body = await req.json()
  console.log("received request ", body);

  return loginUsers(body)
});

// Signing related functions
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
  // create a HMAC(hash based message authentication code) using sha256 hashing algo
  let signature = createHmac("sha256", secret);
  signature.update(jwtB64Header + "." + jwtB64Payload);
  signature = signature.digest("base64");
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

  const b64Payload = toBase64(payload);
  const jwtB64Payload = replaceSpecialChars(b64Payload);

  const signature = createSignature(jwtB64Header, jwtB64Payload, secret);
  const jsonWebToken = jwtB64Header + "." + jwtB64Payload + "." + signature;
  return jsonWebToken;
}
