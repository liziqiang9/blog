## 目录分析

直接分析它的 lib 目录

lib目录下

### render

#### html.js

#### renderer.js

#### xml.js

### block.js

解释器

### common.js

### from-code-point.js

### index.js

负责导出以下

``` js
export { default as Node } from "./node.js";
export { default as Parser } from "./blocks.js";
export { default as Renderer } from "./render/renderer.js";
export { default as HtmlRenderer } from "./render/html.js";
export { default as XmlRenderer } from "./render/xml.js";
```
### inlines.js

### node.js

### package.json


