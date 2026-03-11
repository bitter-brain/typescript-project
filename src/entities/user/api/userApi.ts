import axios from 'axios'
import type { User, Repo } from '../model/userTypes'

export const fetchUser = async (username: string): Promise<User> => {
  const response = await axios.get(
    `https://api.github.com/users/${username}`
  )

  return response.data
}

export const fetchUserRepos = async (username: string): Promise<Repo[]> => {
  const response = await axios.get(
    `https://api.github.com/users/${username}/repos?per_page=100`
  )
  return response.data
}