import { useState } from 'react'
import { useGetUserQuery, useGetUserReposQuery } from '../../entities/user/api/userApi'
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query'

export const useUser = () => {
  const [username, setUsername] = useState('')

  const {
    data: user,
    isLoading: userLoading,
    error: userError,
  } = useGetUserQuery(username, { skip: !username })

  const {
    data: repos = [],
    isLoading: reposLoading,
  } = useGetUserReposQuery(username, { skip: !username })

  const getErrorMessage = (error: unknown): string => {
    if (!navigator.onLine) return "Network error"
    const err = error as FetchBaseQueryError
    if (err.status === 404) return "User not found"
    return "Something went wrong"
  }

  const loading = userLoading || reposLoading

  const searchUser = (value: string) => {
    setUsername(value)
  }

  return {
    user: username ? user : undefined,
    repos: username ? repos : [],
    loading,
    error: username ? (userError ? getErrorMessage(userError) : null) : null,
    searchUser
  }
}