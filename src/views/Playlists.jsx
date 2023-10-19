import { useEffect } from "react";

export default function Playlists() {
  useEffect(() => {
    let accessToken = localStorage.getItem("access_token");

    async function getProfile(accessToken) {
      const response = await fetch("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      });

      const data = await response.json();
      console.log(data);
      // return data;
    }
    if (accessToken) {
      getProfile(accessToken);
    }
  }, []);
  return <div>Playlists</div>;
}
