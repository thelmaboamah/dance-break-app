import { useEffect } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

const redirectUri = "http://localhost:5173/playlists";

export default function SpotifyAuth() {
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");

  useEffect(() => {
    async function fetchAccessToken() {
      let codeVerifier = localStorage.getItem("verifier");

      let body = new URLSearchParams({
        grant_type: "authorization_code",
        code: code,
        redirect_uri: redirectUri,
        client_id: import.meta.env.VITE_SPOTIFY_CLIENT_ID,
        code_verifier: codeVerifier,
      });

      fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: body,
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("HTTP status " + response.status);
          }
          return response.json();
        })
        .then((data) => {
          localStorage.setItem("access_token", data.access_token);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
    fetchAccessToken();
  }, [code]);

  return <div>Blah</div>;
}

// async function fetchAccessToken() {
//   const res = await fetch("https://accounts.spotify.com/api/token", {
//     method: "POST",
//     headers: { "Content-Type": "application/x-www-form-urlencoded" },
//     body: `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`,
//   });
//   const data = await res.json();
//   return data.access_token;
// }

// async function getUserPlaylists() {
//   const accessToken = await fetchAccessToken();
// }
