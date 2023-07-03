import { createSlice } from '@reduxjs/toolkit'

const assetSlice = createSlice({
  name: 'asset',
  initialState: {
    feeds: [],
    users: [],
  },
  reducers: {
    setFeeds: (state, action) => {
      state.feeds = action.payload
    },
    setUsers: (state, action) => {
      state.users = action.payload
    },
    appendFeed: (state, action) => {
      state.feeds.unshift(action.payload)
    },
    removeFeed: (state, action) => {
      const postId = action.payload.id
      state.feeds = state.feeds.filter((post) => post.id !== postId)
    },
    editFeed: (state, action) => {
      const postId = action.payload.id
      const postIndex = state.feeds.findIndex((post) => post.id === postId)
      state.feeds[postIndex] = action.payload
    },
    updateUsersFromFollowingList: (state, action) => {
      const myFollowingList = new Set(action.payload)
      state.users = state.users.map((user) => {
        return { ...user, beingFollowed: myFollowingList.has(user.id) }
      })
    },
    setError: (state, action) => {
      console.log('__error_in_asset_store__', action.payload)
    },
  },
})

export const {
  setFeeds,
  setUsers,
  appendFeed,
  removeFeed,
  editFeed,
  updateUsersFromFollowingList,
  setError,
} = assetSlice.actions
export default assetSlice.reducer
