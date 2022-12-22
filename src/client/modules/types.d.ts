export interface PageSeed {
  type: string;
  path: string;
  indexed: boolean;
  title?: string;
}

export interface GitHubPageSeed extends PageSeed {
  owner: string;
  repo: string;
}

export interface PageContent {
  indexed: boolean;
  rawPath: string;
  url: string;
  status: number;
  text: string;
  title: string;
  html: string;
}
