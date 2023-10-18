import { Routes, Route } from "react-router-dom";

import { PassageProvider } from "@passageidentity/passage-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Auth from "./views/Auth";
import Dashboard from "./views/Dashboard";
import Profile from "./views/Profile";
import styles from "./styles/App.module.css";
import "./App.css";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <PassageProvider appId={import.meta.env.VITE_APP_PASSAGE_APP_ID}>
        <QueryClientProvider client={queryClient}>
          <div>
            <div className={styles.mainContainer}>
              <Routes>
                <Route path="/" element={<Auth />}></Route>
                <Route path="/auth" element={<Auth />}></Route>
                <Route path="/welcome" element={<Dashboard />}></Route>
                <Route path="/profile" element={<Profile />}></Route>
              </Routes>
            </div>
          </div>
        </QueryClientProvider>
      </PassageProvider>
    </>
  );
}

export default App;
