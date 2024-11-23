interface HeadOptions {
  header?: {
    title?: string;
  };
}

export async function setHead({ header }: HeadOptions): Promise<any> {
  const createTag = (name: string, attributes?: object): HTMLElement => {
    const ele = document.createElement(name);
    Object.entries(attributes ?? {}).forEach(([key, value]) => {
      ele.setAttribute(key, value);
    });
    return ele;
  };

  return await new Promise((resolve) => {
    const headTag = document.getElementsByTagName("head")[0];
    if (document.querySelector("head meta[charset]") == null) {
      headTag.appendChild(createTag("meta", { charset: "UTF-8" }));
    }

    if (document.querySelector("head title") == null) {
      headTag.appendChild(createTag("title")).innerHTML =
        header?.title ?? "untitled";
    }

    if (document.querySelector("head meta[name='viewport']") == null) {
      headTag.appendChild(
        createTag("meta", {
          name: "viewport",
          content: "width=device-width, initial-scale=1",
        }),
      );
    }

    if (document.querySelector("head meta[name='description']") == null) {
      headTag.appendChild(
        createTag("meta", {
          name: "description",
          content: "@tomsd/md-book helps you ad hoc web book making.",
        }),
      );
    }

    headTag.appendChild(
      createTag("script", {
        src: "https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.js",
      }),
    ).onload = () => resolve(undefined);
  });
}
