# Getting started

1. install
1. initialize
1. edit
1. serve
1. publish

## Install

``` shell
npm install @tomsd/md-book
```

## Initialize

An HTML file will be created with CLI.

``` shell
npx mdbook --init --directory path/to/directory
```

## edit

Open the HTML file with your editor and update it.

- set header title
- set footer text and link
- set page paths to be loaded

``` html
<script>
  MdBook.start({
    header: { title: "awesome book" }, // header title
    footer: {
      text: "see also", // footer text
      link: {
        href: "https://www.google.com/",
        text: "google"
      } // footer link
    },
    mdFiles: {
      indexedPaths: [
        "some path that the title will be displayed on index",
      ],
      hiddenPaths: [
        "some path that the title will be NOT displayed on index",
      ]
    }
  });
</script>
```

## serve

CLI provides the local server.

``` shell
npx mdbook --serve --directory path/to/directory
```

## publish

put the directory on the static web server that is like [netlify](https://www.netlify.com/).
