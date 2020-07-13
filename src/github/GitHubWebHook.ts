import { PullRequest } from './PullRequests'


export interface User {
  login: string
}

export interface Repository {
  owner: User
  name: string
}

export interface GitHubWebHook {
  action: 'opened' | 'reopened' | 'closed'
  number: number
  pull_request: PullRequest
  repository: Repository
  sender: unknown
}