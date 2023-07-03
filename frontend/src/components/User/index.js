import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchUsers, toggleFollow } from '../../store/assetActions'

import ListItem from './ListItem'

// third-party libraries
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import Paper from '@mui/material/Paper'

// custom react components

const User = (props) => {
  const dispatch = useDispatch()
  const authState = useSelector((state) => state.auth)
  const assetState = useSelector((state) => state.asset)

  const toggleFollowHandler = (userId) => {
    dispatch(toggleFollow({ token: authState?.token, userId }))
  }
  // fetching users when the app loads
  useEffect(() => {
    dispatch(
      fetchUsers({ token: authState?.token, userId: authState?.user?.id })
    )
  }, [])

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="caption table">
        <TableBody>
          {assetState?.users.map((user) => (
            <ListItem
              userImageUrl={'/avatar.png'}
              fullName={`${user?.firstName} ${user?.lastName}`}
              userName={user?.userName}
              bio={user?.bio}
              isFollowed={user.beingFollowed}
              toggleFollowing={toggleFollowHandler.bind(null, user.id)}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default User
