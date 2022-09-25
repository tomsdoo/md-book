# Test content

This page is a test content.  
Use this page to check if the styles are applied appropriately.

# heading 1
## heading 2
### heading 3
#### heading 4
##### heading 5
###### heading 6

## text

|what kind of text|text|
|:--|:--|
|plain|plain test|
|inline code|`inline code`|
|link|[google](https://www.google.com)|
|deleted|~deleted~|
|bold|**bold text**|
|italic|*italic text*|
|italic and bold|***italic and bold***|

## quotes

> quotes
>> quote in quote

## code block
``` typescript
import { some } from "thing";

(async () => {
  await some.work("param", 1234);
})();
```

## hr
below is a horizontal line.
***

## unordered list
- item 1
  - sub item 1
    - [ ] done
  - sub item 2
    - [x] done
- item 2
- item 3

## ordered list
1. item 1
    1. sub item 1
    1. sub item 2
1. item 2
    - [ ] ok
1. item 3

## table

|#|name|description|notes|
|--:|:--|:--|:--|
|12345|test|some sentence|note|
|43|test 2|another expresion|long long note line abcdefghijklmnopqrstuvwxyz|

## image

![](https://picsum.photos/500)

## mermaid.js

``` mermaid
gitGraph
commit id: " "
branch feature/base
checkout feature/base
commit id: "first commit"
branch feature/some
branch feature/another
checkout feature/some
commit id: "some feature"
checkout feature/another
commit id: "another feature"
checkout feature/base
merge feature/some
merge feature/another
checkout main
merge feature/base
```
