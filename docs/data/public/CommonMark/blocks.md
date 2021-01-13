# 解释器

``` js
var reader = new commonmark.Parser();
var parsed = reader.parse("Hello *world*"); // parsed is a 'Node' tree # parsed 变量是一个‘节点’树
```

new Parser() 将返回具有以下属性的对象

``` js
// The Parser object. # 这是解释器对象。
function Parser(options) {
    return {
        doc: new Document(), 
        blocks: blocks,
        blockStarts: blockStarts,
        tip: this.doc,
        oldtip: this.doc,
        currentLine: "",
        lineNumber: 0,
        offset: 0,
        column: 0,
        nextNonspace: 0,
        nextNonspaceColumn: 0,
        indent: 0,
        indented: false,
        blank: false,
        partiallyConsumedTab: false,
        allClosed: true,
        lastMatchedContainer: this.doc,
        refmap: {},
        lastLineLength: 0,
        inlineParser: new InlineParser(options),
        findNextNonspace: findNextNonspace,
        advanceOffset: advanceOffset,
        advanceNextNonspace: advanceNextNonspace,
        addLine: addLine,
        addChild: addChild,
        incorporateLine: incorporateLine,
        finalize: finalize,
        processInlines: processInlines,
        closeUnmatchedBlocks: closeUnmatchedBlocks,
        parse: parse,
        options: options || {}
    };
}
```

然后，调用 Parser 对象的 parser 方法，并传入一个 md 文本。

``` js
// The main parsing function.  Returns a parsed document AST. # 主要解析函数。返回一个已解析的文档 AST(抽象语法数树)。
var parse = function(input) {
    // 初始化参数
    this.doc = new Document();
    this.tip = this.doc;
    this.refmap = {};
    this.lineNumber = 0;
    this.lastLineLength = 0;
    this.offset = 0;
    this.column = 0;
    this.lastMatchedContainer = this.doc;
    this.currentLine = "";

    // 准备
    var lines = input.split(reLineEnding); // var reLineEnding = /\r\n|\n|\r/; # 一行的结束符
    var len = lines.length; // 分割输入 md 文本的行数
    if (input.charCodeAt(input.length - 1) === C_NEWLINE) {
        // ignore last blank line created by final newline # 忽略由最后换行符创建的最后一个空行
        len -= 1;
    }

    // 块解析
    for (var i = 0; i < len; i++) {
        this.incorporateLine(lines[i]);
    }
    while (this.tip) {
        this.finalize(this.tip, len);
    }
    
    // 内联解析
    this.processInlines(this.doc);

    return this.doc;
};
```

``` js
// document 虚拟节点
var Document = function() {
    var doc = new Node("document", [
        [1, 1],
        [0, 0]
    ]);
    return doc;
};
```

