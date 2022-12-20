export interface PageSeed {
  path: string;
  indexed: boolean;
  title?: string;
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
