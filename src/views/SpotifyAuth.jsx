import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const redirectUri = "http://localhost:5173/spotify-auth";

export default function SpotifyAuth() {
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");
  const [playlists, setPlaylists] = useState(null);

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
          // clear url params
          window.location.search = "";
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
    if (code) {
      fetchAccessToken();
    }
  }, [code]);

  useEffect(() => {
    let accessToken = localStorage.getItem("access_token");

    async function getProfile(accessToken) {
      const response = await fetch("https://api.spotify.com/v1/me/playlists", {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      });

      const data = await response.json();
      console.log(data);
      setPlaylists(data.items);
      // return data;
    }
    if (accessToken) {
      getProfile(accessToken);
    }
  }, []);

  /** Playlist item properties:
   * id: string
   *name: string
   images: []obj {url: string} 
   tracks: {href: string, total: number}
   */
  if (!playlists) {
    return <p>No playlists</p>;
  }

  return (
    <ul>
      {playlists.map(({ id, name, images }) => (
        <li key={id}>
          <img
            alt={`Cover art for ${name}`}
            src={images[0].url}
            className="w-[100px]"
          />
          <span>{name}</span>
        </li>
      ))}
    </ul>
  );
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
