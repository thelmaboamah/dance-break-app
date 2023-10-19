import { Link } from "react-router-dom";
import { PassageAuthGuard } from "@passageidentity/passage-react";
import { usePassageUserInfo } from "../hooks";

import LogoutButton from "../components/LogoutButton";
import styles from "../styles/Dashboard.module.css";
import AuthRedirect from "../components/AuthRedirect";

const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;

function Welcome() {
  const { userInfo, loading } = usePassageUserInfo();

  async function handleSpotifyAuthorization() {
    const verifier = generateCodeVerifier(128);
    const challenge = await generateCodeChallenge(verifier);

    localStorage.setItem("verifier", verifier);

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("response_type", "code");
    params.append("redirect_uri", "http://localhost:5173/spotify-auth");
    params.append(
      "scope",
      "user-read-private user-read-email playlist-read-private",
    );
    params.append("code_challenge_method", "S256");
    params.append("code_challenge", challenge);

    document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
  }

  // useEffect(() => {
  //   handleSpotifyAuthorization();
  // }, []);

  if (loading) {
    return (
      <div className={styles.dashboard}>
        <div className={styles.title}>Loading</div>
      </div>
    );
  }

  return (
    <PassageAuthGuard unAuthComp={<AuthRedirect />}>
      <main>
        <LogoutButton />
        <h1 className="font-dmSans text-h1-regular">
          Hi, {userInfo?.user_metadata.first_name}
        </h1>
        <p>
          Get started by signing into Spotify. If you only want to use the
          timer, click “Skip this step”.
        </p>
        <button onClick={handleSpotifyAuthorization}>Connect to Spotify</button>
        <Link to="/timer" state={{ mode: "quiet" }}>
          <p>Skip this step</p>
        </Link>
      </main>
    </PassageAuthGuard>
  );
}

function generateCodeVerifier(length) {
  let text = "";
  let possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

async function generateCodeChallenge(codeVerifier) {
  function base64encode(string) {
    return window
      .btoa(String.fromCharCode.apply(null, new Uint8Array(string)))
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");
  }

  const encoder = new TextEncoder();
  const data = encoder.encode(codeVerifier);
  const digest = await window.crypto.subtle.digest("SHA-256", data);

  return base64encode(digest);
}

export default Welcome;
