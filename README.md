# @tomsd/md-book

It provides a JS file for you who want to aggregate the markdown files in one page.  
See [https://md-book.netlify.app/](https://md-book.netlify.app/) for details.

## Installation

``` shell
npm install @tomsd/md-book
```

## Initialization

CLI creates an HTML file with `--init` option.

``` shell
npx mdbook --init --directory path/to/directory
```

## Settings

Open the HTML file and edit it.  
The markdown file paths are to be filled in the HTML file.

## Serve

CLI provides the local server.

``` shell
npx mdbook --serve --directory path/to/directory
```

## Publish

The directory can be published, to be hosted by static site hosting services.
