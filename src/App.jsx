import { Routes, Route } from "react-router-dom";
import { PassageProvider } from "@passageidentity/passage-react";
import Auth from "./views/Auth";
import SplashPage from "./views/SplashPage";
import Home from "./views/Home";
import TimerPage from "./views/TimerPage";

function App() {
  return (
    <PassageProvider appId={import.meta.env.VITE_APP_PASSAGE_APP_ID}>
      <Routes>
        <Route path="/" element={<SplashPage />}></Route>
        <Route path="/auth" element={<Auth />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/timer" element={<TimerPage />}></Route>
      </Routes>
    </PassageProvider>
  );
}

export default App;
