import { Routes, Route } from "react-router-dom";
import { PassageProvider } from "@passageidentity/passage-react";
import Auth from "./views/Auth";
import Profile from "./views/Profile";
import SplashPage from "./views/SplashPage";
import Timer from "./views/Timer";
import Playlists from "./views/Playlists";
import SpotifyAuth from "./views/SpotifyAuth";
import Dashboard from "./views/Dashboard";

function App() {
  return (
    <PassageProvider appId={import.meta.env.VITE_APP_PASSAGE_APP_ID}>
      <Routes>
        <Route path="/" element={<SplashPage />}></Route>
        <Route path="/auth" element={<Auth />}></Route>
        <Route path="/welcome" element={<Dashboard />}></Route>
        <Route path="/spotify-auth" element={<SpotifyAuth />}></Route>
        <Route path="/playlists" element={<Playlists />}></Route>
        <Route path="/timer" element={<Timer />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
      </Routes>
    </PassageProvider>
  );
}

export default App;
