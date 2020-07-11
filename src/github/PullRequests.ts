import GitHubClient from './GitHubClient'

interface Repo {
  id: number;
  name: string;
  owner: unknown;
}

export interface PullRequest {
  id: number;
  url: string;
  number: number;
  title: string;
  body: string;
  owner: string;
  repo: Repo;
  state: string;
  base: unknown;
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

  public async edit(pullRequest: PullRequest): Promise<PullRequest> {
    const route = this.routes.pullRequest(pullRequest.owner, pullRequest.repo.name, pullRequest.number)
    return this.client.http.patch(route, {
      title: pullRequest.title,
      body: pullRequest.body,
      state: pullRequest.state,
      base: pullRequest.base
    })
  }
}