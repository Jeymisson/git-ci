import { PullRequest } from './PullRequests'


export interface User {
  login: string
}

export interface Repository {
  owner: User
  name: string
}

export enum GitHubWebHookAction {
  opened,
  reopened,
  closed
}

export interface GitHubWebHook {
  action: GitHubWebHookAction
  number: number
  pull_request: PullRequest
  repository: Repository
  sender: unknown
}