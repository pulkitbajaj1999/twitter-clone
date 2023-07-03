import React, { forwardRef } from 'react'
import './Post.css'
import Avatar from '@mui/material/Avatar'
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import RepeatIcon from '@mui/icons-material/Repeat'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import PublishIcon from '@mui/icons-material/Publish'
import IconButton from '@mui/material/IconButton'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

const Post = forwardRef(
  (
    {
      fullName,
      userName,
      verified,
      text,
      image,
      avatar,
      isEditable,
      onEdit,
      onDelete,
    },
    ref
  ) => {
    return (
      <>
        <div className="post" ref={ref}>
          <div className="post__avatar">
            <Avatar src={avatar} />
          </div>
          <div className="post__body">
            <div className="post__header">
              <div className="post__headerText">
                <h3>
                  {fullName}{' '}
                  <span className="post__headerSpecial">
                    {verified && <VerifiedUserIcon className="post__badge" />} @
                    {userName}
                  </span>
                </h3>
              </div>
              <div className="post__headerDescription">
                <p>{text}</p>
              </div>
            </div>
            <img src={image} alt="" width="400px" />
            <div className="post__footer">
              {!isEditable && (
                <>
                  <IconButton>
                    <ChatBubbleOutlineIcon sx={{ fontSize: '20px' }} />
                  </IconButton>
                  <IconButton>
                    <RepeatIcon sx={{ fontSize: '20px' }} />
                  </IconButton>
                  <IconButton>
                    <FavoriteBorderIcon sx={{ fontSize: '20px' }} />
                  </IconButton>
                  <IconButton>
                    <PublishIcon sx={{ fontSize: '20px' }} />
                  </IconButton>
                </>
              )}
              {isEditable && (
                <>
                  <IconButton onClick={onEdit}>
                    <EditIcon sx={{ fontSize: '20px' }} />
                  </IconButton>
                  <IconButton onClick={onDelete}>
                    <DeleteIcon sx={{ fontSize: '20px' }} />
                  </IconButton>
                </>
              )}
            </div>
          </div>
        </div>
      </>
    )
  }
)

export default Post
