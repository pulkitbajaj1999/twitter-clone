// To-do
// handle email in avatar
import React, { useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'

import { styled, alpha } from '@mui/material/styles'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import InputBase from '@mui/material/InputBase'
import SearchIcon from '@mui/icons-material/Search'
import Avatar from '@mui/material/Avatar'
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'

import { logout } from '../store/authActions'

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    marginRight: '1rem',
    width: 'auto',
  },
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '40ch',
      '&:focus': {
        width: '50ch',
      },
    },
  },
}))

const TopBar = () => {
  const authState = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // component states
  const [query, setQuery] = useState('')

  const querySubmitHandler = (e) => {
    e.preventDefault()
    navigate(`/search?q=${query}`)
    setQuery('')
  }

  return (
    <React.Fragment>
      <AppBar position="static" style={{ backgroundColor: '#181818' }}>
        <Toolbar sx={{ justifyContent: 'left' }}>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <form onSubmit={querySubmitHandler}>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </form>
          </Search>
          <Button variant="contained" disableElevation onClick={() => {}}>
            Search
          </Button>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  )
}
export default TopBar
