export interface RepositoryInfo {
  owner: string;
  repo: string;
}

export async function getGithubTokens(
  repositoryInfos: RepositoryInfo[]
): Promise<{ [key: string]: string }> {
  return await new Promise((resolve, reject) => {
    document.body.innerHTML = "";
    const div = document.body.appendChild(document.createElement("div"));
    div.classList.add("github-token-area");
    const ul = div.appendChild(document.createElement("ul"));
    ul.classList.add("form-list");
    repositoryInfos.forEach(({ owner, repo }) => {
      const li = ul.appendChild(document.createElement("li"));
      li.classList.add("form-item");
      const formDiv = li.appendChild(document.createElement("div"));
      formDiv.classList.add("repo");
      formDiv.innerHTML = `${owner}/${repo}`;
      const box = li.appendChild(document.createElement("input"));
      box.setAttribute("data-repo", `${owner}/${repo}`);
      box.classList.add("tokenbox");
    });
    const button = div.appendChild(document.createElement("button"));
    button.setAttribute("type", "button");
    button.classList.add("ok-button");
    button.innerHTML = "OK";
    button.addEventListener("click", () => {
      resolve(
        Object.fromEntries(
          Array.from(document.querySelectorAll(".tokenbox")).map((box) => [
            box.getAttribute("data-repo"),
            (box as HTMLInputElement).value,
          ])
        )
      );
    });
  });
}
