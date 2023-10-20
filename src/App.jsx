import { Routes, Route } from "react-router-dom";
import { PassageProvider } from "@passageidentity/passage-react";
import Auth from "./views/Auth";
import Profile from "./views/Profile";
import SplashPage from "./views/SplashPage";
import Timer from "./views/Timer";
import Dashboard from "./views/Dashboard";
import Welcome from "./views/Welcome";

function App() {
  return (
    <PassageProvider appId={import.meta.env.VITE_APP_PASSAGE_APP_ID}>
      <Routes>
        <Route path="/" element={<SplashPage />}></Route>
        <Route path="/auth" element={<Auth />}></Route>
        <Route path="/welcome" element={<Welcome />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/timer" element={<Timer />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
      </Routes>
    </PassageProvider>
  );
}

export default App;
