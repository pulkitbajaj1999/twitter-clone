import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'

// import PropTypes from 'prop-types'
// import AppBar from '@mui/material/AppBar'
import { logout } from '../store/authActions'

import Box from '@mui/material/Box'
// import CssBaseline from '@mui/material/CssBaseline'
import Drawer from '@mui/material/Drawer'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
// import MenuIcon from '@mui/icons-material/Menu'
import IconButton from '@mui/material/IconButton'
import Avatar from '@mui/material/Avatar'
// import Typography from '@mui/material/Typography'

import PersonIcon from '@mui/icons-material/Person'
import { Typography } from '@mui/material'
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'

const classes = {
  logo: {
    objectFit: 'contain',
    overflow: 'hidden',
  },
  sidebarIcon: {
    color: 'white',
  },
  listItem: {
    '&:hover': {
      backgroundColor: '#353739',
      borderRadius: '0.5rem',
    },
    marginBottom: '0.5rem',
  },
  listItemSelected: {
    backgroundColor: '#353739',
    borderRadius: '0.5rem',
    marginBottom: '0.5rem',
  },
  dividor: {
    color: 'white',
  },
}

const ResponsiveDrawer = (props) => {
  const authState = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const location = useLocation()

  const drawerItems = [
    { key: 'feed', path: '/feed', icon: HomeOutlinedIcon, text: 'Feed' },
    { key: 'user', path: '/user', icon: PersonIcon, text: 'User' },
  ]

  const menuId = 'primary-search-account-menu'
  const [anchorEl, setAnchorEl] = useState(null)

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const logoutHandler = () => {
    dispatch(logout())
    window.location.replace('/login')
  }
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      PaperProps={{
        style: {
          width: '20ch',
        },
      }}
      open={Boolean(anchorEl)}
      onClose={handleMenuClose}
    >
      {<MenuItem>Edit profile</MenuItem>}
      {<MenuItem onClick={logoutHandler}>Logout</MenuItem>}
    </Menu>
  )

  return (
    <Box
      component="nav"
      sx={{
        width: { sm: props.drawerWidth },
        flexShrink: { sm: 0 },
      }}
      aria-label="mailbox folders"
    >
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: props.drawerWidth,
            backgroundColor: '#181818',
            color: 'white',
          },
        }}
        open
      >
        <List sx={{ marginTop: '100px' }}>
          {drawerItems.map((drawerItem) => {
            return (
              <Link
                style={{ textDecoration: 'none', color: 'inherit' }}
                to={drawerItem.path}
              >
                <ListItem
                  key={drawerItem.key}
                  sx={
                    location.pathname === drawerItem.path
                      ? classes.listItemSelected
                      : classes.listItem
                  }
                  disablePadding
                >
                  <ListItemButton>
                    <ListItemIcon>
                      <drawerItem.icon sx={classes.sidebarIcon} />
                    </ListItemIcon>
                    <ListItemText primary={drawerItem.text} />
                  </ListItemButton>
                </ListItem>
              </Link>
            )
          })}
        </List>

        <Box sx={{ marginTop: 'auto', display: { xs: 'none', md: 'flex' } }}>
          <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            aria-controls={'primary-search-account-menu'}
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
          >
            <Avatar>{authState?.user?.firstName[0]}</Avatar>
          </IconButton>
          <Typography
            sx={{
              margin: 'auto 10px',
            }}
            variant="h5"
          >
            {`${authState?.user?.firstName} ${authState?.user?.lastName}`}
          </Typography>
        </Box>
        {renderMenu}
      </Drawer>
    </Box>
  )
}

export default ResponsiveDrawer
