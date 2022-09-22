# core options

The parameter of MdBook.start() can have `core` options.  
`core` options include some experimental/draft settings so that please use them carefully.  

## properties

|name|type|description|
|:--|:--|:--|
|loading<br />&nbsp;&nbsp;.maxNumberOfFilesAtOnce|number|the number of files to be loaded at once, in the loop of markdown-file-loading process|
|verbose|boolean|log messages are to be outpted in console|


``` typescript
{
  mdFiles: {},
  header: {},
  footer: {},
  core: {
    loading: {
      maxNumberOfFilesAtOnce: number;
    },
    verbose: boolean;
  }
}
```
