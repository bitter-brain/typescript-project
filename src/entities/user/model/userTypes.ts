export interface User {
  login: string
  avatar_url: string
  public_repos: number
  html_url: string
}

export interface Repo {
  id: number
  name: string
  html_url: string
  stargazers_count: number
}