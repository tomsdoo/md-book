# Making a theme

This page shows you how to make a theme for `@tomsd/md-book`.

- define CSS Variables
- define `highlight.js` theme

## define CSS Variables

CSS variables are required to be defined.  
See [CSS Variables](./css_variables.md) for details.

``` css
:root {
  --default-color: red;
  --header-bg-color: green;
  ...
}
```

## define `highlight.js` theme

`@tomsd-/md-book` is using [`highlight.js`](https://www.npmjs.com/package/highlight.js) so that the theme for it should be defined.

``` css
@import url(path/to/theme.css);
```

## example

make one file named `some-theme.css`.

``` css
@import url(path/to/theme.css);

:root {
  --default-color: black;
  ...
}
```

see [Customize styles](./customize_styles.md) to apply.
