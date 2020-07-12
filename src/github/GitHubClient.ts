import axios, { AxiosInstance } from 'axios'


export const gitHubCredentials = {
  accessTokenKey: process.env.GITHUB_PERSONAL_TOKEN,
  webHookSecret: process.env.WEBHOOK_SECRET
}

export default class GitHubClient {

  private static instance: GitHubClient

  private url: 'https://api.github.com/'
  public http: AxiosInstance

  constructor(){
    this.http = axios.create(
      {
        baseURL: this.url,
        headers: {
          Authorization: `token ${gitHubCredentials.accessTokenKey}`,
        }
      }
    )
  }

  public static getInstance(): GitHubClient {
    if(!this.instance){
      this.instance = new GitHubClient()
    }
    return this.instance
  }

}
