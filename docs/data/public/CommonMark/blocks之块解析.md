``` js
// Analyze a line of text and update the document appropriately. # 分析一行文本并适当地更新 document。
// We parse markdown text by calling this on each line of input, # 我们通过在每一行输入中调用markdown来解析markdown文本
// then finalizing the document. # 然后确定 document 的内容。
var incorporateLine = function(ln) {
    // 初始化参数
    var all_matched = true;
    var t;

    var container = this.doc;
    this.oldtip = this.tip;
    this.offset = 0;
    this.column = 0;
    this.blank = false;
    this.partiallyConsumedTab = false;
    this.lineNumber += 1;

    // replace NUL characters for security # 替换 NUL 字符以保证安全性
    if (ln.indexOf("\u0000") !== -1) {
        ln = ln.replace(/\0/g, "\uFFFD");
    }

    this.currentLine = ln;

    // For each containing block, try to parse the associated line start. # 对于每个包含的块，尝试解析相关的行开始。
    // Bail out on failure: container will point to the last matching block. # 失败时保释:容器将指向最后一个匹配的块。
    // Set all_matched to false if not all containers match. # 如果不是所有容器都匹配，则将 all_matched 设置为false。
    var lastChild;
    while ((lastChild = container._lastChild) && lastChild._open) {
        container = lastChild;

        this.findNextNonspace();

        switch (this.blocks[container.type].continue(this, container)) {
            case 0: // we've matched, keep going # 我们已经匹配好了，继续
                break;
            case 1: // we've failed to match a block # 我们没有匹配到一个block
                all_matched = false;
                break;
            case 2: // we've hit end of line for fenced code close and can return # 我们已经到达了fenced代码close的行尾，并且可以返回
                return;
            default:
                throw "continue returned illegal value, must be 0, 1, or 2";
        }
        if (!all_matched) {
            container = container._parent; // back up to last matching block # 返回到最后一个匹配块
            break;
        }
    }

    this.allClosed = container === this.oldtip;
    this.lastMatchedContainer = container;

    var matchedLeaf =
        container.type !== "paragraph" && blocks[container.type].acceptsLines;
    var starts = this.blockStarts;
    var startsLen = starts.length;
    // Unless last matched container is a code block, try new container starts, # 除非最后匹配的容器是一个代码块，否则尝试新容器启动，
    // adding children to the last matched container: # 向最后一个匹配的容器添加子容器:
    while (!matchedLeaf) {
        this.findNextNonspace();

        // this is a little performance optimization: # 这是一个小小的性能优化:
        if (
            !this.indented &&
            !reMaybeSpecial.test(ln.slice(this.nextNonspace))
        ) {
            this.advanceNextNonspace();
            break;
        }

        var i = 0;
        while (i < startsLen) {
            var res = starts[i](this, container);
            if (res === 1) {
                container = this.tip;
                break;
            } else if (res === 2) {
                container = this.tip;
                matchedLeaf = true;
                break;
            } else {
                i++;
            }
        }

        if (i === startsLen) {
            // nothing matched  # 没有匹配的
            this.advanceNextNonspace();
            break;
        }
    }

    // What remains at the offset is a text line.  Add the text to the
    // appropriate container.

    // First check for a lazy paragraph continuation:
    if (!this.allClosed && !this.blank && this.tip.type === "paragraph") {
        // lazy paragraph continuation
        this.addLine();
    } else {
        // not a lazy continuation

        // finalize any blocks not matched
        this.closeUnmatchedBlocks();
        if (this.blank && container.lastChild) {
            container.lastChild._lastLineBlank = true;
        }

        t = container.type;

        // Block quote lines are never blank as they start with >
        // and we don't count blanks in fenced code for purposes of tight/loose
        // lists or breaking out of lists.  We also don't set _lastLineBlank
        // on an empty list item, or if we just closed a fenced block.
        var lastLineBlank =
            this.blank &&
            !(
                t === "block_quote" ||
                (t === "code_block" && container._isFenced) ||
                (t === "item" &&
                    !container._firstChild &&
                    container.sourcepos[0][0] === this.lineNumber)
            );

        // propagate lastLineBlank up through parents:
        var cont = container;
        while (cont) {
            cont._lastLineBlank = lastLineBlank;
            cont = cont._parent;
        }

        if (this.blocks[t].acceptsLines) {
            this.addLine();
            // if HtmlBlock, check for end condition
            if (
                t === "html_block" &&
                container._htmlBlockType >= 1 &&
                container._htmlBlockType <= 5 &&
                reHtmlBlockClose[container._htmlBlockType].test(
                    this.currentLine.slice(this.offset)
                )
            ) {
                this.lastLineLength = ln.length;
                this.finalize(container, this.lineNumber);
            }
        } else if (this.offset < ln.length && !this.blank) {
            // create paragraph container for line
            container = this.addChild("paragraph", this.offset);
            this.advanceNextNonspace();
            this.addLine();
        }
    }
    this.lastLineLength = ln.length;
};
```

``` js
// 查找下一个是非空间
var findNextNonspace = function() {
    var currentLine = this.currentLine;
    var i = this.offset;
    var cols = this.column;
    var c;

    while ((c = currentLine.charAt(i)) !== "") {
        if (c === " ") {
            i++;
            cols++;
        } else if (c === "\t") {
            i++;
            cols += 4 - (cols % 4);
        } else {
            break;
        }
    }
    this.blank = c === "\n" || c === "\r" || c === "";
    this.nextNonspace = i;
    this.nextNonspaceColumn = cols;
    this.indent = this.nextNonspaceColumn - this.column;
    this.indented = this.indent >= CODE_INDENT;
};
```