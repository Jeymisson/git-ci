import axios, { AxiosInstance } from 'axios'

const gitHubCredentials = {
  accessTokenKey: process.env.GITHUB_ACCESS_TOKEN,
  webHookSecret: process.env.WEBHOOK_SECRET
}

export default class GitHubClient {

  private static instance: GitHubClient

  private baseURL: 'https://api.github.com'

  public http: AxiosInstance

  constructor(){
    this.http = axios.create(
      {
        baseURL: this.baseURL,
        headers: {
          Authorization: gitHubCredentials.accessTokenKey,
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