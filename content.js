(() => {
  // Map file extensions to Prism language identifiers
  const EXT_MAP = {
    js: "javascript", mjs: "javascript", cjs: "javascript",
    ts: "typescript", tsx: "tsx",
    jsx: "jsx",
    py: "python",
    rb: "ruby",
    rs: "rust",
    go: "go",
    java: "java",
    kt: "kotlin", kts: "kotlin",
    swift: "swift",
    c: "c", h: "c",
    cpp: "cpp", cc: "cpp", cxx: "cpp", hpp: "cpp",
    cs: "csharp",
    php: "php",
    sh: "bash", bash: "bash", zsh: "bash",
    ps1: "powershell",
    yaml: "yaml", yml: "yaml",
    toml: "toml",
    json: "json",
    xml: "xml", svg: "xml", html: "html", htm: "html",
    css: "css", scss: "scss", sass: "sass",
    md: "markdown", mdx: "markdown",
    sql: "sql",
    lua: "lua",
    r: "r",
    dart: "dart",
    ex: "elixir", exs: "elixir",
    erl: "erlang",
    hs: "haskell",
    coffee: "coffeescript",
    vim: "vim",
    dockerfile: "docker",
    tf: "hcl", hcl: "hcl",
    graphql: "graphql", gql: "graphql",
  };

  function getLanguage(url) {
    const pathname = new URL(url).pathname;
    const filename = pathname.split("/").pop().toLowerCase();

    // Special filenames without extension
    const specialFiles = {
      dockerfile: "docker",
      makefile: "makefile",
      gemfile: "ruby",
      rakefile: "ruby",
      brewfile: "ruby",
      vagrantfile: "ruby",
      ".bashrc": "bash", ".zshrc": "bash", ".bash_profile": "bash",
      ".gitignore": "ignore",
      ".env": "bash",
    };
    if (specialFiles[filename]) return specialFiles[filename];

    const ext = filename.includes(".") ? filename.split(".").pop() : null;
    return ext ? (EXT_MAP[ext] || null) : null;
  }

  function highlight() {
    const lang = getLanguage(window.location.href);
    if (!lang) return; // unknown extension, leave as-is

    // Raw pages serve content as plain text inside <body> > <pre>
    const pre = document.querySelector("pre");
    if (!pre) return;

    const code = pre.textContent;

    // Build highlighted DOM
    const wrapper = document.createElement("pre");
    wrapper.className = `language-${lang}`;
    const codeEl = document.createElement("code");
    codeEl.className = `language-${lang}`;
    codeEl.textContent = code;
    wrapper.appendChild(codeEl);

    // Replace the original <pre> with our highlighted version
    pre.replaceWith(wrapper);

    // Run Prism
    if (window.Prism) {
      Prism.highlightElement(codeEl);
    }
  }

  highlight();
})();