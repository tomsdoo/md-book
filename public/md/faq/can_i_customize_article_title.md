# Can I customize the article title?

The first line is assumed as the title as default.  
Make some changes for it if you want.  

Put an object that has `path` and `title` properties instead of path string for `mdFiles.indexedPaths` or `mdFiles.hiddenPaths`.  
Then, the title of the article will be changed.


``` javascript
MdBook.start({
  mdFiles: {
    indexedPaths: [
      "path/to/article1.md",
      {
        path: "path/to/article2.md",
        title: "custom title for article 2"
      }
    ],
    hiddenPaths: [
      "path/to/article3.md",
      {
        path: "path/to/article4.md",
        title: "custom title for article 4"
      }
    ]
  }
});
```
