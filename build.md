# Build Instructions for Raw Code Highlighter

## Overview

The only generated file is `prism.js`. All other files (`content.js`, `content.css`, `prism-one-dark.css`, `manifest.json`) are hand-written and included as-is.

## What is prism.js?

`prism.js` is a bundle of the [Prism.js](https://prismjs.com/) syntax highlighting library (v1.29.0) with selected language components concatenated into a single file. It is not minified beyond what npm ships.

## How to reproduce prism.js

### Requirements
- Node.js + npm

### Steps

```bash
# 1. Download Prism via npm
npm pack prismjs@1.29.0
tar -xzf prismjs-1.29.0.tgz

# 2. Concatenate core + markup-templating + language components
OUTPUT="prism.js"
cat package/prism.js > "$OUTPUT"
cat package/components/prism-markup-templating.min.js >> "$OUTPUT"

for lang in javascript typescript jsx tsx python ruby rust go java kotlin swift \
            c cpp csharp php bash powershell yaml toml json xml html css scss \
            sass markdown sql lua r dart elixir erlang haskell coffeescript vim \
            docker hcl graphql makefile; do
  FILE="package/components/prism-${lang}.min.js"
  [ -f "$FILE" ] && cat "$FILE" >> "$OUTPUT" && echo "" >> "$OUTPUT"
done
```

The resulting `prism.js` will be identical to the one included in the extension.

## Source of prism-one-dark.css

Based on the bundled `prism-okaidia.min.css` theme from the same npm package, with color overrides appended to match the One Dark Pro color scheme. No build step needed.
