import React from 'react'
import { Routes, Route } from 'react-router-dom'

import { PassageProvider } from '@passageidentity/passage-react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Home from './views/Home'
import Dashboard from './views/Dashboard'
import Profile from './views/Profile'
import Banner from './components/banner'
import styles from './styles/App.module.css'
import './App.css'

const queryClient = new QueryClient()

function App() {
  return (
    <>
      <PassageProvider appId={process.env.REACT_APP_PASSAGE_APP_ID}>
        <QueryClientProvider client={queryClient}>
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
        </QueryClientProvider>
      </PassageProvider>
    </>
  )
}

export default App
