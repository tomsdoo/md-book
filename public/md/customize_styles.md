# Customize styles

You can customize the styles to be applied.

- using theme
- defining css variables

## Using theme

It's easy to apply the custom theme that already has existed.

Just add one line to apply the theme.

``` html
<link rel="stylesheet" href="path/to/theme.css" />
```

See [Themes](./theme.md) for the prepared themes.  
Or, see [Making a theme](./make_theme.md) to know how to make a customized theme file.

## Defining CSS variables

You can override the value for each CSS variable.  
See [CSS Variables](./css_variables.md) for detailes.

Write `<style>` tag in HTML `head` tag, to override the variables.


``` html
<style>
  /* background color on the article will be green for examle */
  :root {
    --bg-color: green;
  }
</style>
```
