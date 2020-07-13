import GitHubClient from './GitHubClient'
import PullRequests from './PullRequests'
import { ParameterizedContext } from 'koa'
import { X_HUB_SIGNATURE } from './Headers'
import { isValidHook } from './utils'
import { GitHubWebHook } from './GitHubWebHook'

export default class GithubHandler {
  public static async handlePullRequest(ctx: ParameterizedContext): Promise<void> {
    console.debug('Handle pull request')
    const githubClient = GitHubClient.getInstance()

    const gitHook: GitHubWebHook = ctx.request.body

    if (!isValidHook(gitHook, ctx.get(X_HUB_SIGNATURE))) {
      ctx.status = 403
      return
    }

    const pullRequest = gitHook.pull_request
    if (pullRequest) {
      console.debug('payload: ' + JSON.stringify(gitHook))
      switch (gitHook.action) {
        case 'opened':
          const title = pullRequest.title
          console.debug('Got PR with title: ', pullRequest.title)

          const newTitle = `${title} (looks pretty legit)`

          pullRequest.title = newTitle

          const pullRequests = new PullRequests(githubClient)
          const editResponse = await pullRequests.edit(pullRequest)
          console.log('Title updated to: ' + editResponse.data.title)
          break
          case 'reopened':
            console.log('Got PR with title: ', pullRequest.title)
            break
      }
    }

    ctx.status = 200
  }
}
