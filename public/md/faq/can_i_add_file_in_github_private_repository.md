# Can I add files in GitHub private repository?

Yes.  
You can add your markdown files in GitHub private repository.  

The users who read the page will have to input GitHub tokens for each repository, if GitHub repository files are in the contents.

``` javascript
MdBook.start({
  mdFiles: {
    indexedPaths: [
      // path format
      "github://owner.repo/path.md",
      // object format
      {
        type: "github",
        path: "path/to/file.md",
        owner: "owner",
        repo: "repo",
      },
    ],
  },
  hiddenPaths: [],
});
```



