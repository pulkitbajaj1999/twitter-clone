import React from 'react'
// import { addRecent, setCurrentPlaylist } from '../../store/asset'
// import { addToPlaylist, toggleFavorite } from '../../store/assetActions'
// import { setCurrentSong } from '../../store/player'

// third-party libraries
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import { Typography } from '@mui/material'

const BASE_URL = process.env.REACT_APP_BASE_URL || ''

const ListItem = ({
  userImageUrl,
  fullName,
  userName,
  bio,
  isFollowed,
  toggleFollowing,
}) => {
  return (
    <TableRow hover>
      <TableCell align="left" sx={{ width: '8%', padding: 1 }}>
        <Avatar src={userImageUrl} />
      </TableCell>
      <TableCell align="left">
        <Typography sx={{ margin: '0' }} variant="h6">
          {fullName}
        </Typography>
        <Typography
          sx={{ margin: '0', color: 'rgb(83, 100, 113)' }}
          variant="h7"
        >
          @{userName}
        </Typography>
        <p>{bio}</p>
      </TableCell>
      <TableCell align="right">
        {isFollowed && (
          <Button onClick={toggleFollowing} variant="contained">
            Unfollow
          </Button>
        )}
        {!isFollowed && (
          <Button onClick={toggleFollowing} variant="contained">
            Follow
          </Button>
        )}
      </TableCell>
    </TableRow>
  )
}

export default ListItem
