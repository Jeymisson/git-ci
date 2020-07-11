/* eslint-disable @typescript-eslint/no-explicit-any */
import GitHubClient from './GitHubClient'
import PullRequests from './PullRequests'
import { ParameterizedContext } from 'koa'
import { X_HUB_SIGNATURE } from './Headers'
import { isValidHook } from './utils'

export default class GithubHandler {
  public static async handlePullRequest(ctx: ParameterizedContext): Promise<void> {
    console.log('Handle pull request')
    const githubClient = GitHubClient.getInstance()

    const gitHook = ctx.request.body

    if (!isValidHook(gitHook, ctx.get(X_HUB_SIGNATURE))) {
      ctx.status = 403
      return
    }

    const pullRequest = gitHook.pull_request
    if (pullRequest) {
      console.log('payload: ' + JSON.stringify(gitHook))
      switch (gitHook.action) {
        case 'opened':
          console.log('Got PR with title: ', pullRequest.title)
          break
        case 'reopened':
          const title = pullRequest.title
          console.log('Got PR with title: ', pullRequest.title)

          const newTitle = `${title} (looks pretty legit)`

          pullRequest.title = newTitle

          const pullRequests = new PullRequests(githubClient)

          console.log('Edit Response >>' + (await pullRequests.edit(pullRequest)))
          break
      }
    }

    ctx.status = 200
  }
}
