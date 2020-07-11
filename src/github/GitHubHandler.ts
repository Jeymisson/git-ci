/* eslint-disable @typescript-eslint/no-explicit-any */
import GitHubClient from './GitHubClient'
import PullRequests from './PullRequests'
import { ParameterizedContext } from 'koa'

export default class GithubHandler {
  
  public static async handlePullRequest(ctx: ParameterizedContext): Promise<void> {
    console.log('Handle pull request')

    const pullRequest = ctx.request.body
    console.log('ctx.request.body', JSON.stringify(ctx.request.body, null, 2))

    const title = pullRequest.title
    console.log('Got PR with title: ', pullRequest.title)

    const newTitle = `${title} (looks pretty legit)`

    const githubClient = GitHubClient.getInstance()

    pullRequest.title = newTitle

    const pullRequests = new PullRequests(githubClient)
    console.log(await pullRequests.edit(pullRequest))
    ctx.status = 200
  }
}