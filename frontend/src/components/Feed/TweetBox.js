import React, { useState } from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import { AttachFile } from '@mui/icons-material'
import './TweetBox.css'

const TweetBox = ({ onTweet }) => {
  const [tweetMessage, setTweetMessage] = useState('')

  const sendTweet = (e) => {
    e.preventDefault()
    onTweet(tweetMessage)
    setTweetMessage('')
  }

  return (
    <div className="tweetBox">
      <form>
        <div className="tweetBox__input">
          <Avatar src="/avatar.png" />
          <input
            onChange={(e) => setTweetMessage(e.target.value)}
            value={tweetMessage}
            placeholder="Post a tweet?"
            type="textbox"
          />
        </div>

        <div className="tweetBox__controls">
          <div className="tweetBox__attachment">
            <input
              style={{ display: 'none' }}
              type="file"
              id="file-upload"
              name="attachment"
            />
            <label for="file-upload" className="attachment__label">
              <AttachFile />
            </label>
          </div>
          <Button
            onClick={sendTweet}
            type="submit"
            className="tweetBox__tweetButton"
          >
            Tweet
          </Button>
        </div>
      </form>
    </div>
  )
}

export default TweetBox
