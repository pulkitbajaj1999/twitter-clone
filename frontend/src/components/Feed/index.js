import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import TweetBox from './TweetBox'
import Post from './Post'

import {
  fetchFeeds,
  deletePost,
  addPost,
  editPost,
} from '../../store/assetActions'
// import FlipMove from 'react-flip-move'
import Modal from '../UI/Modal'
import EditPostForm from './EditPostForm'

const Feed = () => {
  const dispatch = useDispatch()
  const authState = useSelector((state) => state.auth)
  const assetState = useSelector((state) => state.asset)

  const [openEditPostModal, setEditPostModal] = useState(false)
  const [editPostDetail, setEditPostDetail] = useState(null)

  const showEditOverlayHandler = (postId, userId, body) => {
    setEditPostModal(true)
    setEditPostDetail({ postId: postId, userId: userId, body: body })
  }

  const closeOverlayHandler = () => {
    setEditPostModal(false)
    setEditPostDetail(null)
  }

  const addPostHandler = (body) => {
    if (authState?.isAuthenticated) {
      dispatch(
        addPost({
          token: authState?.token,
          userId: authState?.user?.id,
          body: body,
        })
      )
    }
  }

  const editPostHandler = (formBody) => {
    const { userId, postId } = editPostDetail
    if (authState?.user?.id === userId) {
      dispatch(
        editPost({
          token: authState?.token,
          postId: postId,
          body: formBody.get('body'),
        })
      )
    }
    closeOverlayHandler()
  }

  const deletePostHandler = (postId, userId) => {
    if (authState?.user?.id === userId) {
      dispatch(
        deletePost({
          postId,
          userId,
          feeds: assetState?.feeds,
          token: authState?.token,
        })
      )
    }
  }

  // fetching  feeds when the app loads
  useEffect(() => {
    dispatch(
      fetchFeeds({ token: authState?.token, userId: authState?.user?.id })
    )
  }, [])

  return (
    <>
      {openEditPostModal && (
        <Modal onCloseOverlay={closeOverlayHandler}>
          <EditPostForm
            onClose={closeOverlayHandler}
            onSave={editPostHandler}
            post={editPostDetail}
          />
        </Modal>
      )}
      <TweetBox onTweet={addPostHandler} />
      {/* <FlipMove>
      </FlipMove> */}
      {assetState?.feeds?.map((post) => (
        <Post
          key={post.id}
          fullName={post.fullName}
          userName={post.userName}
          verified={true}
          text={post.body}
          avatar={'/avatar.png'}
          image={'/sample_tweet_image.jpg'}
          isEditable={authState?.user?.id === post.userId}
          onEdit={showEditOverlayHandler.bind(
            null,
            post.id,
            post.userId,
            post.body
          )}
          onDelete={deletePostHandler.bind(null, post.id, post.userId)}
        />
      ))}
    </>
  )
}

export default Feed
