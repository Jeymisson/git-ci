import GitHubClient from './GitHubClient'
import { AxiosResponse } from 'axios'
import { User } from './GitHubWebHook'


export interface PullRequest {
  id: number
  name: string
  url: string
  number: number
  title: string
  body: string
  user: User
  state: string
  base: unknown
}

export default class PullRequests {

  private routes = {
    pullRequest: (owner: string, repo: string, number: number) => `/repos/${owner}/${repo}/pulls/${number}`
  }
  private client: GitHubClient

  constructor(client: GitHubClient){
    this.client = client
  }

  public async getPullRequest(repoOwner: string, repoName: string, prNumber: number): Promise<PullRequest> {
    return this.client.http.get(this.routes.pullRequest(repoOwner, repoName, prNumber))
  }

  public async edit(pullRequest: PullRequest): Promise<AxiosResponse<PullRequest>> {
    console.log('Calling > ' + pullRequest.url)
    return this.client.http.patch(pullRequest.url, {
      title: pullRequest.title,
      body: pullRequest.body,
      state: pullRequest.state
    })
  }

}
