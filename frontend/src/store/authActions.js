import axios from 'axios'
import {
  setToken,
  setUser,
  setIsAuthenticated,
  setError,
  clearError,
} from './auth'

const BASE_URL = process.env.REACT_APP_BASE_URL || ''
const GRAPHQL_URL = BASE_URL + '/graphql'

export const login = (credentials) => async (dispatch) => {
  try {
    // Send a request to the server with the credentials
    const query = `
      query {
        login(email: "${credentials.email}", password: "${credentials.password}") {
          token
          user {
            id
            firstName
            lastName
            email
            following
            posts
          }
        }
      }
    `
    const res = await axios.post(GRAPHQL_URL, { query: query })
    if (res?.data?.errors) throw new Error(res?.data?.errors[0].message)

    const data = res?.data?.data?.login
    // Extract the token and user from the response
    const { token, user } = data

    // Save the token in the local storage
    localStorage.setItem('token', token)

    // Dispatch the setToken, setUser and setIsAuthenticated actions
    dispatch(setToken(token))
    dispatch(setUser(user))
    dispatch(setIsAuthenticated(true))
  } catch (error) {
    // Extract the error message from the response
    const { msg } = error.response.data

    // Dispatch the setError action
    dispatch(setError(msg))
  }
}

export const logout = () => (dispatch) => {
  // Remove the token from the local storage
  localStorage.removeItem('token')

  // Dispatch the setToken, setUser, setIsAuthenticated and clearError actions
  dispatch(setToken(null))
  dispatch(setUser(null))
  dispatch(setIsAuthenticated(false))
  dispatch(clearError())
}

export const signup = (credentials) => async (dispatch) => {
  try {
    // Send a request to the server with the credentials
    const mutation = `
      mutation {
        createUser(firstName: "${credentials.firstName}", lastName: "${credentials.lastName}", userName: "${credentials.userName}", email: "${credentials.email}", password: "${credentials.password}") {
          id
          email
        }
      }
    `
    const res = await axios.post(GRAPHQL_URL, { query: mutation })
    if (res?.data?.errors) throw new Error(res?.data?.errors[0].message)

    const user = res?.data?.data?.createUser
    // Extract the token and user from the response
    if (!user) throw new Error('user not created')
  } catch (error) {
    // Extract the error message from the response
    const msg = error?.message
    // Dispatch the setError action
    dispatch(setError(msg))
  }
}

export const checkAuth = () => async (dispatch) => {
  try {
    // Get the token from the local storage
    const token = localStorage.getItem('token')
    if (!token) return
    // Send a request to the server to check the authentication
    const query = `
      query {
        user {
          id
          email
          firstName
          lastName
          following
          posts
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
    const user = res?.data?.data?.user

    // Dispatch the setToken, setUser and setIsAuthenticated actions
    dispatch(setToken(token))
    dispatch(setUser(user))
    dispatch(setIsAuthenticated(true))
  } catch (error) {
    const { msg } = error.response.data
    // Dispatch the setError action
    dispatch(setError(msg))
  }
}
