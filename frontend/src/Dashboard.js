import React from 'react'
import TopBar from './components/TopBar'
import ResponsiveDrawer from './components/ResponsiveDrawer'

import Box from '@mui/material/Box'

const Dashboard = (props) => {
  return (
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
          {props.children}
        </Box>
      </Box>
    </Box>
  )
}

export default Dashboard
