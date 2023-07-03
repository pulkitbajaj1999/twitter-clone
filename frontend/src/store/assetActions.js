import axios from 'axios'

import {
  setFeeds,
  setUsers,
  setError,
  appendFeed,
  removeFeed,
  updateUsersFromFollowingList,
  editFeed,
} from './asset'

const BASE_URL = process.env.REACT_APP_BASE_URL || ''
const GRAPHQL_URL = BASE_URL + '/graphql'

export const fetchFeeds =
  ({ token, userId }) =>
  async (dispatch) => {
    try {
      // Send a request to the server
      const query = `
        query {
          posts(userId: "${userId}") {
            id
            body
            timeStamp
            userId
            fullName
            userName
          }
        }
      `
      const res = await axios.post(
        GRAPHQL_URL,
        {
          query: query,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      const feeds = res?.data?.data?.posts || []

      // dispatch action for setting data
      dispatch(setFeeds(feeds))
    } catch (error) {
      // Extract the error message from the response
      const { msg } = error.response.data

      // Dispatch the setError action
      dispatch(setError(msg))
    }
  }

export const addPost =
  ({ token, body, userId }) =>
  async (dispatch) => {
    try {
      // Send a request to the server
      const mutation = `
      mutation {
        createPost(userId: "${userId}", body: "${body}") {
          id
          userId
          body
          timeStamp
        }
      }
    `
      const res = await axios.post(
        GRAPHQL_URL,
        { query: mutation },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      if (res?.data?.errors) throw new Error(res?.data?.errors[0].message)
      const post = res?.data?.data?.createPost
      dispatch(appendFeed(post))
    } catch (error) {
      // Extract the error message from the response
      const { msg } = error.response.data

      // Dispatch the setError action
      dispatch(setError(msg))
    }
  }

export const editPost =
  ({ postId, body, token }) =>
  async (dispatch) => {
    try {
      const mutation = `
      mutation {
        updatePost(postId: "${postId}",  body: "${body}") {
          id
          body
          timeStamp
        }
      }
    `
      const res = await axios.post(
        GRAPHQL_URL,
        { query: mutation },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      if (res?.data?.errors) {
        throw new Error(res?.data?.errors[0].message)
      }
      const post = res?.data?.data?.updatePost
      dispatch(editFeed(post))
    } catch (error) {
      // Extract the error message from the response
      const { msg } = error.message

      // Dispatch the setError action
      dispatch(setError(msg))
    }
  }

export const deletePost =
  ({ token, postId, userId }) =>
  async (dispatch) => {
    try {
      const mutation = `
        mutation {
          deletePost(postId: "${postId}") {
            id
            userId
            body
            timeStamp
          }
        }
      `
      // Send a request to the server
      const res = await axios.post(
        GRAPHQL_URL,
        {
          query: mutation,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      if (res?.data?.errors) throw new Error(res?.data?.errors[0].message)
      const post = res?.data?.data?.deletePost
      if (post) {
        dispatch(removeFeed(post))
      }
    } catch (error) {
      // Extract the error message from the response
      const { msg } = error.response.data

      // Dispatch the setError action
      dispatch(setError(msg))
    }
  }

export const fetchUsers =
  ({ token, userId }) =>
  async (dispatch) => {
    try {
      // Send a request to the server
      const query = `
        query {
          users {
            id
            firstName
            lastName
            email
            posts
            following
            beingFollowed
          }
        }
      `
      const res = await axios.post(
        GRAPHQL_URL,
        { query: query },

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      const users = res?.data?.data?.users || []
      // dispatch action for setting data
      dispatch(setUsers(users))
    } catch (error) {
      // Extract the error message from the response
      const { msg } = error.response.data

      // Dispatch the setError action
      dispatch(setError(msg))
    }
  }

export const fetchUser = () => async (dispatch) => {
  try {
    // Send a request to the server
    const { data } = await axios.post(BASE_URL, {
      query: `
          query {
            users
          }
        `,
    })
    const users = data?.users ? data.users : []
    // dispatch action for setting data
    dispatch(setUsers(users))
  } catch (error) {
    // Extract the error message from the response
    const { msg } = error.response.data

    // Dispatch the setError action
    dispatch(setError(msg))
  }
}

export const toggleFollow =
  ({ token, userId }) =>
  async (dispatch) => {
    try {
      // Send a request to the server
      const mutation = `
        mutation {
          toggleFollowing(otherUserId: "${userId}")
        }
      `
      const res = await axios.post(
        GRAPHQL_URL,
        { query: mutation },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      const following = res?.data?.data?.toggleFollowing || []
      // dispatch action for setting data
      dispatch(updateUsersFromFollowingList(following))
    } catch (error) {
      // Extract the error message from the response
      const { msg } = error.response.data

      // Dispatch the setError action
      dispatch(setError(msg))
    }
  }
