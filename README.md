# @tomsd/md-book

It provides a JS file for you who want to aggregate the markdown files in one page.  
See [https://md-book.netlify.app/](https://md-book.netlify.app/) for details.

![npm](https://img.shields.io/npm/v/@tomsd/md-book?style=for-the-badge&logo=npm)
![NPM](https://img.shields.io/npm/l/@tomsd/md-book?style=for-the-badge&logo=npm)

![ci](https://img.shields.io/github/actions/workflow/status/tomsdoo/md-book/ci.yml?style=social&logo=github)
![checks](https://img.shields.io/github/check-runs/tomsdoo/md-book/main?style=social&logo=github)
![top language](https://img.shields.io/github/languages/top/tomsdoo/md-book?style=social&logo=typescript)
![Maintenance](https://img.shields.io/maintenance/yes/2025?style=social&logo=github)
![depends on node greater or equal 20](https://img.shields.io/badge/node.js-%3E%3D%2020-lightyellow?style=social&logo=nodedotjs)

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

## Testing

### Unit and Browser Tests

```shell
npm run test
```

### E2E Tests with Visual Regression Testing

```shell
# Run E2E tests with VRT
npm run test:e2e

# Update baseline screenshots
npm run test:e2e:update
```

The E2E tests include visual regression testing (VRT) using Playwright's screenshot comparison feature. Baseline screenshots are stored in `test/e2e/__screenshots__/` and automatically compared during test runs.
