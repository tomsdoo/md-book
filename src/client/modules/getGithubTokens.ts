export interface RepositoryInfo {
  owner: string;
  repo: string;
}

export async function getGithubTokens(
  repositoryInfos: RepositoryInfo[]
): Promise<{ [key: string]: string }> {
  return await new Promise((resolve, reject) => {
    if (repositoryInfos.length === 0) {
      resolve({});
      return;
    }
    const wrapperDiv = document.body.appendChild(document.createElement("div"));
    wrapperDiv.classList.add("github-token-area-wrapper");
    const div = wrapperDiv.appendChild(document.createElement("div"));
    div.classList.add("github-token-area");
    const paragraph = div.appendChild(document.createElement("p"));
    paragraph.innerHTML = [
      "Input your token for each GitHub repository.",
      "",
      "You can just click OK button without input your token.",
      "The content that requires token will be 'Not Found' if the token is invalid or the token is not provided.",
    ].join("<br />");
    const ul = div.appendChild(document.createElement("ul"));
    ul.classList.add("form-list");
    Object.values(
      Object.fromEntries(
        repositoryInfos.map((info) => [`${info.owner}/${info.repo}`, info])
      )
    ).forEach(({ owner, repo }, index) => {
      const li = ul.appendChild(document.createElement("li"));
      li.classList.add("form-item");
      const formDiv = li.appendChild(document.createElement("div"));
      formDiv.classList.add("repo");
      formDiv.innerHTML = `${owner}/${repo}`;
      const box = li.appendChild(document.createElement("input"));
      box.setAttribute("data-repo", `${owner}/${repo}`);
      box.setAttribute("placeholder", `token for ${owner}/${repo}`);
      box.classList.add("tokenbox");
      if (index === 0) {
        setTimeout(() => {
          box.focus();
        }, 1);
      }
    });
    const button = div.appendChild(document.createElement("button"));
    button.setAttribute("type", "button");
    button.classList.add("ok-button");
    button.innerHTML = "OK";
    button.addEventListener("click", () => {
      resolve(
        Object.fromEntries(
          Array.from(document.querySelectorAll(".tokenbox"))
            .filter((box) => Boolean((box as HTMLInputElement).value))
            .map((box) => [
              box.getAttribute("data-repo"),
              (box as HTMLInputElement).value,
            ])
        )
      );
      setTimeout(() => {
        document.querySelector(".github-token-area")?.remove();
      }, 1);
    });
  });
}
