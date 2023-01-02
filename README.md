# @tomsd/md-book

It provides a JS file for you who want to aggregate the markdown files in one page.  
See [https://md-book.netlify.app/](https://md-book.netlify.app/) for details.

![npm](https://img.shields.io/npm/v/@tomsd/md-book)
![NPM](https://img.shields.io/npm/l/@tomsd/md-book)
![npms.io (quality)](https://img.shields.io/npms-io/quality-score/@tomsd/md-book)
![Libraries.io dependency status for latest release](https://img.shields.io/librariesio/release/npm/@tomsd/md-book)
![Maintenance](https://img.shields.io/maintenance/yes/2023)

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
