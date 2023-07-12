// react-libraries
import React, { useEffect } from 'react'
import { Route, Routes, Navigate } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'
import { checkAuth } from './store/authActions'

import Login from './components/Auth/Login'
import SignUp from './components/Auth/SignUp'
import Dashboard from './Dashboard'
import Feed from './components/Feed'
import User from './components/User'
import LoadingSpinner from './components/UI/LoadingSpinner/Spinner'
// import NotFound from './components/404/NotFound'

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
      {authState?.loading && <LoadingSpinner />}
      {authState?.isAuthenticated === false && (
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/*" element={<Navigate to="/login" replace />} />
        </Routes>
      )}

      {authState?.isAuthenticated === true && (
        <Routes>
          <Route path="/" element={<Navigate to="/feed" replace />} />
          <Route
            path="/feed"
            element={
              <Dashboard>
                <Feed />
              </Dashboard>
            }
          />
          <Route
            path="/user"
            element={
              <Dashboard>
                <User />
              </Dashboard>
            }
          />
          <Route path="/*" element={<Navigate to="/feed" />} />
        </Routes>
      )}
    </>
  )
}

export default App
