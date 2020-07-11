import Router from '@koa/router'
import GithubHandler from './github/GitHubHandler'

const main = new Router()
main.post('/', GithubHandler.handlePullRequest)

export { main }

