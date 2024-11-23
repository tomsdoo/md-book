import { GitHubPageSeed, PageSeed } from "./types";

export class PathInterpreter {
  protected _path: string;
  constructor(path: string) {
    this._path = path;
  }

  public get type(): string {
    const protocol = this._path.slice(0, this._path.indexOf(":"));
    return protocol === "github" ? "github" : "plain";
  }

  public get result():
    | Pick<PageSeed, "type" | "path">
    | Pick<GitHubPageSeed, "type" | "path" | "owner" | "repo"> {
    switch (this.type) {
      case "github": {
        const pathArr = this._path.split("/");
        const [, , domainAndRepo] = pathArr;
        const [owner, repo] = domainAndRepo.split(".");
        return {
          type: this.type,
          path: pathArr.slice(3).join("/"),
          owner,
          repo,
        };
      }
      default: {
        return {
          type: "plain",
          path: this._path,
        };
      }
    }
  }
}
