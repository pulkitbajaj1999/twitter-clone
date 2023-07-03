// react-libraries
import React, { useEffect } from 'react'
import { Route, Routes, Navigate } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'
import { checkAuth } from './store/authActions'

import Login from './components/Auth/Login'
import SignUp from './components/Auth/SignUp'
import TopBar from './components/TopBar'
import ResponsiveDrawer from './components/ResponsiveDrawer'
import NotFound from './components/404/NotFound'
import Feed from './components/Feed'
import User from './components/User'

import Box from '@mui/material/Box'

const App = () => {
  const dispatch = useDispatch()

  // fetching auth state
  const authState = useSelector((state) => state.auth)

  // checking authentication and setting user
  useEffect(() => {
    dispatch(checkAuth())
  }, [dispatch])

  console.log('authstate', authState)
  return (
    <>
      {!authState?.isAuthenticated && (
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      )}

      {authState?.isAuthenticated && (
        <Box
          sx={{
            display: 'flex',
            overflow: 'hidden',
          }}
        >
          {/* sidebar */}
          <ResponsiveDrawer drawerWidth={400} />
          {/* main section */}
          <Box
            component="main"
            sx={{
              width: { sm: '60%' },
              height: '100vh',
            }}
          >
            <TopBar />
            <Box
              sx={{
                borderLeft: '1px solid var(--twitter-background)',
                minWidth: 'fit-content',
                overflow: 'scroll',
                height: '95%',
              }}
            >
              <Routes>
                <Route path="/" element={<Navigate to="/feed" replace />} />
                <Route path="/feed" element={<Feed />} />
                <Route path="/user" element={<User />} />
                <Route path="/*" element={<NotFound />} />
              </Routes>
            </Box>
          </Box>
        </Box>
      )}
    </>
  )
}

export default App
