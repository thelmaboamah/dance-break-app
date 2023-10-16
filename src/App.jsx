import { PassageProvider } from "@passageidentity/passage-react";
import { Routes, Route } from "react-router-dom";

import Home from "./views/Home";
import Dashboard from "./views/Dashboard";
import Profile from "./views/Profile";
import Banner from "./components/banner";
import styles from "./styles/App.module.css";

// import '@passageidentity/passage-elements/passage-auth'
import "./App.css";

import Spotify from "./views/Spotify";

function App() {
  return (
    <>
    <Spotify/>
      {/* <PassageProvider appId={import.meta.env.VITE_APP_PASSAGE_APP_ID}>
        <div>
          <Banner />
          <div className={styles.mainContainer}>
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/dashboard" element={<Dashboard />}></Route>
              <Route path="/profile" element={<Profile />}></Route>
            </Routes>
          </div>
        </div>
      </PassageProvider> */}
    </>
  );
}

export default App;
